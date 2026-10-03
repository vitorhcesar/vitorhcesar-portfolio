import { SectionHeading } from '#/components/ui/SectionHeading'
import { AboutBackground } from './AboutBackground'
import { AboutBio } from './AboutBio'
import { AboutCornerMark } from './AboutCornerMark'
import { AboutEducation } from './AboutEducation'
import { AboutLinks } from './AboutLinks'
import { AboutTimeline } from './AboutTimeline'
import { AboutValues } from './AboutValues'
import { SectionReveal } from './SectionReveal'

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="relative overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:px-20"
    >
      <AboutBackground />
      <AboutCornerMark />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            label="// Sobre"
            titleId="sobre-titulo"
            title="Quem sou eu?"
          />
        </SectionReveal>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <AboutBio />
          <AboutTimeline />
        </div>

        <AboutValues />
        <AboutEducation />
        <AboutLinks />
      </div>
    </section>
  )
}
