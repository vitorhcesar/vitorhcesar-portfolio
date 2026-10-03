import { cn } from '#/lib/cn'
import { formatMobilePhoneMask } from '#/lib/phone-mask'
import { Loader2, Mail, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type SubmitStatus = 'idle' | 'loading'

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

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState(initialFormState)
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prev) => ({
      ...prev,
      phone: formatMobilePhoneMask(e.target.value),
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        setStatus('idle')
        toast.error('Não foi possível enviar a mensagem', {
          description: 'Tente novamente mais tarde.',
        })
        return
      }

      setFormState(initialFormState)
      setStatus('idle')
      onClose()
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Entrarei em contato em breve.',
      })
    } catch {
      setStatus('idle')
      toast.error('Não foi possível enviar a mensagem', {
        description: 'Tente novamente mais tarde.',
      })
    }
  }

  if (!isRendered) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
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
          'contact-modal-panel relative z-10 w-full max-w-xl overflow-hidden',
          isVisible && 'is-visible',
          'rounded-3xl border border-white/10',
          'bg-linear-to-b from-surface/98 to-background/98',
          'shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset]',
          'backdrop-blur-2xl',
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative border-b border-white/5 px-6 pt-6 pb-5 sm:px-8 sm:pt-8">
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
          autoComplete="on"
          className="relative space-y-5 px-6 py-6 sm:px-8 sm:py-7"
        >
          <div>
            <FieldLabel htmlFor="contact-name">Nome</FieldLabel>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              className={cn(
                'w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3',
                'text-sm text-white placeholder:text-muted/70',
                'transition-all focus:border-primary/40 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/15',
                'disabled:cursor-not-allowed disabled:opacity-60',
              )}
              placeholder="Seu nome completo"
              autoComplete="name"
              required
              disabled={status === 'loading'}
            />
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
                className={cn(
                  'w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3',
                  'text-sm text-white placeholder:text-muted/70',
                  'transition-all focus:border-primary/40 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/15',
                  'disabled:cursor-not-allowed disabled:opacity-60',
                )}
                placeholder="seu@email.com"
                autoComplete="email"
                required
                disabled={status === 'loading'}
              />
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
                className={cn(
                  'w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3',
                  'text-sm text-white placeholder:text-muted/70',
                  'transition-all focus:border-primary/40 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/15',
                  'disabled:cursor-not-allowed disabled:opacity-60',
                )}
                placeholder="(00) 00000-0000"
                autoComplete="tel"
                maxLength={15}
                required
                disabled={status === 'loading'}
              />
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
                'min-h-[128px] w-full resize-none rounded-xl border border-white/10 bg-background/60 px-4 py-3',
                'text-sm text-white placeholder:text-muted/70',
                'transition-all focus:border-primary/40 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/15',
                'disabled:cursor-not-allowed disabled:opacity-60',
              )}
              placeholder="Conte um pouco sobre o projeto, oportunidade ou dúvida..."
              required
              disabled={status === 'loading'}
            />
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
