import { aboutContent } from '#/lib/about'
import { cn } from '#/lib/cn'
import { GraduationCap } from 'lucide-react'
import { SectionReveal } from './SectionReveal'

export function AboutEducation() {
  return (
    <SectionReveal delay={120} className="mt-10 lg:mt-14">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-white">Formação</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {aboutContent.education.map((item) => (
          <article
            key={item.institution}
            className={cn(
              'rounded-2xl border border-white/10 bg-[#071422]/50 p-5 backdrop-blur-sm transition-colors sm:p-6',
              'hover:border-primary/30 hover:bg-[#071422]/70',
            )}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {item.institution}
            </p>
            <h4 className="mt-2 text-base font-semibold text-white">{item.course}</h4>
            {item.period && (
              <p className="mt-2 text-sm text-[#9fd6ff]/70">{item.period}</p>
            )}
          </article>
        ))}
      </div>
    </SectionReveal>
  )
}
