import {
  contactFormSchema,
  parseContactFieldErrors,
  type ContactFieldErrors,
  type ContactFieldName,
} from '#/lib/contact-schema'
import { cn } from '#/lib/cn'
import { formatMobilePhoneMask } from '#/lib/phone-mask'
import { Loader2, Mail, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type SubmitStatus = 'idle' | 'loading'

interface ContactApiErrorBody {
  error?: string
  details?: {
    fieldErrors?: Record<string, string[]>
    formErrors?: string[]
  }
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const EXIT_DURATION_MS = 320

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  reason: '',
  _hp: '',
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase"
    >
      {children}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  )
}

const fieldInputClassName = cn(
  'w-full rounded-xl border bg-background/60 px-4 py-3',
  'text-sm text-white placeholder:text-muted/70',
  'transition-all focus:bg-background/80 focus:outline-none focus:ring-2',
  'disabled:cursor-not-allowed disabled:opacity-60',
)

function getFieldInputClassName(hasError: boolean) {
  return cn(
    fieldInputClassName,
    hasError
      ? 'border-red-400/50 focus:border-red-400/60 focus:ring-red-400/15'
      : 'border-white/10 focus:border-primary/40 focus:ring-primary/15',
  )
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState(initialFormState)
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [status, setStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true))
      })
      document.body.style.overflow = 'hidden'
      return () => cancelAnimationFrame(frame)
    }

    if (isRendered) {
      setIsVisible(false)
      const timer = window.setTimeout(() => {
        setIsRendered(false)
        document.body.style.overflow = ''
      }, EXIT_DURATION_MS)
      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [isOpen, isRendered])

  useEffect(() => {
    if (!isOpen && !isRendered) {
      setFormState(initialFormState)
      setFieldErrors({})
      setFormError(null)
      setStatus('idle')
    }
  }, [isOpen, isRendered])

  useEffect(() => {
    if (!isVisible) return

    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>('input')?.focus()
    }, 80)

    return () => window.clearTimeout(timer)
  }, [isVisible])

  useEffect(() => {
    if (!isRendered) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRendered, status])

  function handleClose() {
    if (status === 'loading') return
    onClose()
  }

  function clearFieldError(field: ContactFieldName) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target

    if (
      name === 'name' ||
      name === 'email' ||
      name === 'phone' ||
      name === 'reason'
    ) {
      clearFieldError(name)
    }

    setFormError(null)
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearFieldError('phone')
    setFormError(null)
    setFormState((prev) => ({
      ...prev,
      phone: formatMobilePhoneMask(e.target.value),
    }))
  }

  function focusFirstInvalidField(errors: ContactFieldErrors) {
    const firstField = (['name', 'email', 'phone', 'reason'] as const).find(
      (field) => errors[field],
    )

    if (!firstField) return

    panelRef.current
      ?.querySelector<HTMLElement>(`#contact-${firstField}`)
      ?.focus()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const parsed = contactFormSchema.safeParse(formState)
    if (!parsed.success) {
      const errors = parseContactFieldErrors(parsed.error.flatten())
      setFieldErrors(errors)
      setFormError(null)
      focusFirstInvalidField(errors)
      return
    }

    setFieldErrors({})
    setFormError(null)
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      if (!response.ok) {
        let body: ContactApiErrorBody | null = null
        try {
          body = (await response.json()) as ContactApiErrorBody
        } catch {
          body = null
        }

        if (response.status === 400 && body?.details) {
          const errors = parseContactFieldErrors({
            formErrors: body.details.formErrors ?? [],
            fieldErrors: body.details.fieldErrors ?? {},
          })
          setFieldErrors(errors)
          setFormError(body.error ?? 'Revise os campos destacados.')
          focusFirstInvalidField(errors)
        } else {
          setFormError(
            body?.error ??
              'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
          )
        }

        setStatus('idle')
        return
      }

      setFormState(initialFormState)
      setFieldErrors({})
      setFormError(null)
      setStatus('idle')
      onClose()
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entrarei em contato em breve.',
      })
    } catch {
      setStatus('idle')
      setFormError(
        'Não foi possível enviar a mensagem. Verifique sua conexão e tente novamente.',
      )
    }
  }

  if (!isRendered) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center lg:items-center lg:p-6"
      role="presentation"
    >
      <div
        aria-hidden
        className={cn(
          'contact-modal-backdrop-blur pointer-events-none absolute inset-0',
          isVisible && 'is-visible',
        )}
      />
      <button
        type="button"
        aria-label="Fechar modal"
        className={cn(
          'contact-modal-backdrop-dim absolute inset-0 bg-[#020617]/80',
          isVisible && 'is-visible',
        )}
        onClick={handleClose}
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        className={cn(
          'contact-modal-panel relative z-10 flex w-full max-w-xl flex-col overflow-hidden',
          'max-h-[92dvh] lg:max-h-none',
          isVisible && 'is-visible',
          'rounded-t-3xl border border-white/10 lg:rounded-3xl',
          'bg-linear-to-b from-surface/98 to-background/98',
          'shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset]',
          'backdrop-blur-2xl',
        )}
      >
        <div
          aria-hidden
          className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/20 lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative shrink-0 border-b border-white/5 px-6 pt-4 pb-5 sm:px-8 sm:pt-6 lg:pt-8">
          <button
            type="button"
            onClick={handleClose}
            disabled={status === 'loading'}
            aria-label="Fechar"
            className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 sm:top-6 sm:right-6"
          >
            <X className="size-4" aria-hidden />
          </button>

          <div className="flex items-start gap-4 pr-10">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_24px_rgba(59,130,246,0.2)]"
              aria-hidden
            >
              <Mail className="size-5" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-primary-light uppercase">
                // Contato
              </p>
              <h2
                id="contact-modal-title"
                className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                Envie sua mensagem
              </h2>
              <p
                id="contact-modal-description"
                className="mt-2 max-w-md text-sm leading-relaxed text-muted"
              >
                Preencha o formulário e retorno o mais breve possível.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="on"
          className="relative flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7"
        >
          {formError ? (
            <div
              role="alert"
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {formError}
            </div>
          ) : null}

          <div>
            <FieldLabel htmlFor="contact-name">Nome</FieldLabel>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              className={getFieldInputClassName(Boolean(fieldErrors.name))}
              placeholder="Seu nome completo"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={
                fieldErrors.name ? 'contact-name-error' : undefined
              }
              disabled={status === 'loading'}
            />
            <FieldError id="contact-name-error" message={fieldErrors.name} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-email">E-mail</FieldLabel>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                className={getFieldInputClassName(Boolean(fieldErrors.email))}
                placeholder="seu@email.com"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? 'contact-email-error' : undefined
                }
                disabled={status === 'loading'}
              />
              <FieldError id="contact-email-error" message={fieldErrors.email} />
            </div>
            <div>
              <FieldLabel htmlFor="contact-phone">Celular</FieldLabel>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                value={formState.phone}
                onChange={handlePhoneChange}
                className={getFieldInputClassName(Boolean(fieldErrors.phone))}
                placeholder="(00) 00000-0000"
                autoComplete="tel"
                maxLength={15}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={
                  fieldErrors.phone ? 'contact-phone-error' : undefined
                }
                disabled={status === 'loading'}
              />
              <FieldError id="contact-phone-error" message={fieldErrors.phone} />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="contact-reason">Motivo do contato</FieldLabel>
            <textarea
              id="contact-reason"
              name="reason"
              value={formState.reason}
              onChange={handleChange}
              className={cn(
                getFieldInputClassName(Boolean(fieldErrors.reason)),
                'min-h-[128px] resize-none',
              )}
              placeholder="Conte um pouco sobre o projeto, oportunidade ou dúvida..."
              aria-invalid={Boolean(fieldErrors.reason)}
              aria-describedby={
                fieldErrors.reason ? 'contact-reason-error' : undefined
              }
              disabled={status === 'loading'}
            />
            <FieldError id="contact-reason-error" message={fieldErrors.reason} />
          </div>

          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
            tabIndex={-1}
          >
            <label htmlFor="contact-hp">Leave blank</label>
            <input
              id="contact-hp"
              name="_hp"
              type="text"
              value={formState._hp}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={status === 'loading'}
              className={cn(
                'inline-flex items-center justify-center rounded-xl px-5 py-3',
                'border border-white/15 text-sm font-semibold text-white',
                'transition-colors hover:bg-white/5',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3',
                'bg-primary text-sm font-semibold text-white',
                'shadow-[0_8px_28px_rgba(37,99,235,0.35)]',
                'transition-all hover:bg-primary-light hover:shadow-[0_10px_32px_rgba(37,99,235,0.45)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
                'disabled:cursor-not-allowed disabled:opacity-70',
              )}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem
                  <Send className="size-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
