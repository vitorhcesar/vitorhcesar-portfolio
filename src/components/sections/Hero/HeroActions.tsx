import { useContactModal } from '#/components/contact/ContactModalProvider'
import { cn } from '#/lib/cn'
import { siteConfig } from '#/lib/seo'
import { isCurriculumMode } from '#/lib/site-mode'
import { ArrowRight, Mail, ShoppingBag } from 'lucide-react'
import type { CSSProperties } from 'react'

export function HeroActions() {
  const curriculumMode = isCurriculumMode()
  const { openContactModal } = useContactModal()

  return (
    <div
      className="hero-reveal-item mt-6 grid w-full grid-cols-1 gap-3 sm:mt-7 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5 lg:mt-8"
      style={{ '--reveal-delay': '560ms' } as CSSProperties}
    >
      <a
        href="#projetos"
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'px-6 py-3.5 sm:px-8 2xl:px-10 2xl:py-4',
          'bg-primary hover:bg-primary-light',
          'text-base font-semibold text-white',
          'shadow-[0_8px_28px_rgba(37,99,235,0.35)]',
          'transition-colors',
          'rounded-xl',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
        )}
      >
        Ver meus projetos
        <ArrowRight className="h-4 w-4" />
      </a>
      {!curriculumMode && (
        <>
          <a
            href={siteConfig.store}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'px-6 py-3.5 sm:px-8 2xl:px-10 2xl:py-4',
              'hover:bg-white/10',
              'border border-white/25',
              'text-base font-semibold text-white',
              'transition-colors',
              'rounded-xl',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
            )}
          >
            Minha loja
            <ShoppingBag className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={openContactModal}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'px-6 py-3.5 sm:px-8 2xl:px-10 2xl:py-4',
              'hover:bg-white/10',
              'border border-white/25',
              'text-base font-semibold text-white',
              'transition-colors',
              'rounded-xl',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
            )}
          >
            Entrar em contato
            <Mail className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  )
}
