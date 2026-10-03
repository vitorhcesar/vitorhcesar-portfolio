import { useContactModal } from '#/components/contact/ContactModalProvider'
import { contactContent } from '#/lib/contact'
import { cn } from '#/lib/cn'
import { Clock, MessageSquare } from 'lucide-react'
import { SectionReveal } from '../About/SectionReveal'

export function ContactPanel() {
  const { openContactModal } = useContactModal()

  return (
    <SectionReveal delay={80} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-primary/15 blur-3xl"
      />

      <div
        className={cn(
          'flex h-full flex-col justify-between gap-8 rounded-2xl border border-primary/30',
          'bg-[#071422]/60 p-6 backdrop-blur-md sm:p-8',
        )}
      >
        <div className="space-y-5">
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-primary/30',
              'bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#9fd6ff] uppercase',
              'animate-badge-glow',
            )}
          >
            <span className="relative flex size-2">
              <span
                className="absolute inline-flex size-full animate-ping rounded-full bg-primary-light opacity-75"
                aria-hidden
              />
              <span className="relative inline-flex size-2 rounded-full bg-primary-light" />
            </span>
            {contactContent.availability}
          </span>

          <p className="text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
            {contactContent.panelCopy}
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={openContactModal}
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 sm:w-auto',
              'bg-primary text-base font-semibold text-white',
              'shadow-[0_8px_28px_rgba(37,99,235,0.35)]',
              'transition-colors hover:bg-primary-light',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
            )}
          >
            <MessageSquare className="size-5" aria-hidden />
            {contactContent.ctaLabel}
          </button>

          <p className="flex items-center gap-2 text-sm text-muted">
            <Clock className="size-4 shrink-0 text-primary/70" aria-hidden />
            {contactContent.responseTime}
          </p>
        </div>
      </div>
    </SectionReveal>
  )
}
