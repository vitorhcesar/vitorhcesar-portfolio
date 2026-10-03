import { cn } from '#/lib/cn'
import { ArrowRight, Mail } from 'lucide-react'

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3.5">
      <a
        href="#projetos"
        className={cn(
          'inline-flex items-center gap-2',
          'px-10 py-4',
          'bg-primary hover:bg-primary-light',
          'text-base font-semibold text-white',
          'shadow-[0_8px_28px_rgba(37,99,235,0.35)]',
          'transition-colors',
          'rounded-xl',
        )}
      >
        Ver meus projetos
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href="#contato"
        className={cn(
          'inline-flex items-center gap-2',
          'px-10 py-4',
          'hover:bg-white/10',
          'border border-white/25',
          'text-base font-semibold text-white',
          'transition-colors',
          'rounded-xl',
        )}
      >
        Entrar em contato
        <Mail className="h-4 w-4" />
      </a>
    </div>
  )
}
