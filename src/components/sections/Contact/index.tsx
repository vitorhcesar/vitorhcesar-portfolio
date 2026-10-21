import { SectionHeading } from '#/components/ui/SectionHeading'
import { contactContent } from '#/lib/contact'
import { SectionReveal } from '../About/SectionReveal'
import { ContactBackground } from './ContactBackground'
import { ContactChannels } from './ContactChannels'
import { ContactCornerMark } from './ContactCornerMark'
import { ContactFooter } from './ContactFooter'
import { ContactPanel } from './ContactPanel'

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:px-20"
    >
      <ContactBackground />
      <ContactCornerMark />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            label="// Contato"
            titleId="contato-titulo"
            title={contactContent.title}
            description={contactContent.description}
          />
        </SectionReveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <ContactPanel />
          <ContactChannels />
        </div>

        <ContactFooter />
      </div>
    </section>
  )
}
