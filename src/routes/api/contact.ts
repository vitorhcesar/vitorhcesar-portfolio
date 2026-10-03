import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { contactFormSchema } from '#/lib/contact-schema'
import { checkRateLimit } from '#/lib/rate-limit'
import { sendContactEmail } from '#/lib/smtp'

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const limit = checkRateLimit(`contact:${clientKey(request)}`)
        if (!limit.allowed) {
          return json(
            { error: 'Muitas tentativas. Tente novamente mais tarde.' },
            {
              status: 429,
              headers: { 'Retry-After': String(limit.retryAfterSec) },
            },
          )
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
        }

        const parsed = contactFormSchema.safeParse(body)
        if (!parsed.success) {
          return json(
            { error: 'Dados do formulário inválidos.', details: parsed.error.flatten() },
            { status: 400 },
          )
        }

        const { name, email, phone, reason, _hp } = parsed.data

        if (_hp.length > 0) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[contact] Honeypot triggered — request ignored')
          }
          return json({ ok: true })
        }

        try {
          await sendContactEmail({ name, email, phone, reason })
        } catch (error) {
          console.error('[contact] Failed to send email')
          if (process.env.NODE_ENV === 'development') {
            console.error(error)
          }
          return json(
            { error: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.' },
            { status: 500 },
          )
        }

        return json({ ok: true })
      },
    },
  },
})
