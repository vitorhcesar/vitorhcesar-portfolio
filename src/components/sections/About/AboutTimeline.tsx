import { aboutContent } from '#/lib/about'
import { cn } from '#/lib/cn'
import { Briefcase } from 'lucide-react'
import { SectionReveal } from './SectionReveal'

export function AboutTimeline() {
  return (
    <SectionReveal delay={120}>
      <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Briefcase className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-white">Trajetória profissional</h3>
        </div>

        <ol className="space-y-6">
          {aboutContent.experience.map((item, index) => (
            <li key={item.company} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'size-2.5 shrink-0 rounded-full',
                    item.current ? 'bg-primary-light shadow-[0_0_12px_rgba(96,165,250,0.6)]' : 'bg-primary',
                  )}
                />
                {index < aboutContent.experience.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-primary/30" />
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-base font-semibold text-white">{item.company}</p>
                  <span className="text-xs font-medium tracking-[0.14em] text-[#9fd6ff]/70 uppercase">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-primary-light">{item.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  )
}
