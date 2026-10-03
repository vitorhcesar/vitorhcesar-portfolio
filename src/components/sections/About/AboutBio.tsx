import { aboutContent } from '#/lib/about'
import { SectionReveal } from './SectionReveal'

export function AboutBio() {
  return (
    <SectionReveal className="space-y-5">
      <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
        {aboutContent.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-[#071422]/60 p-5 backdrop-blur-md sm:p-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
          Atualmente
        </p>
        <p className="mt-2 text-base font-semibold text-white sm:text-lg">
          {aboutContent.currentRole.title}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {aboutContent.currentRole.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-[#9fd6ff]/80 sm:text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  )
}
