import { aboutContent } from '#/lib/about'
import { cn } from '#/lib/cn'
import { Handshake, Heart, Target, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionReveal } from './SectionReveal'

const valueIcons: Record<string, LucideIcon> = {
  Foco: Target,
  Responsabilidade: Zap,
  Respeito: Heart,
  Colaboração: Handshake,
}

export function AboutValues() {
  return (
    <SectionReveal delay={80} className="mt-10 lg:mt-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutContent.values.map((value, index) => {
          const Icon = valueIcons[value.label] ?? Target

          return (
            <div
              key={value.label}
              className={cn(
                'group rounded-2xl border border-white/10 bg-surface/50 p-5 transition-colors',
                'hover:border-primary/30 hover:bg-surface/80',
              )}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:text-primary-light">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{value.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </div>
          )
        })}
      </div>
    </SectionReveal>
  )
}
