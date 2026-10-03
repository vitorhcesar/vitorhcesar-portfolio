import { ArrowRight, Mail } from 'lucide-react'

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3.5">
      <a
        href="#projetos"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,0.35)] transition-colors hover:bg-primary-light"
      >
        Ver meus projetos
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href="#contato"
        className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
      >
        Entrar em contato
        <Mail className="h-4 w-4" />
      </a>
    </div>
  )
}
