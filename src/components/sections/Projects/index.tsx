import { SectionHeading } from '#/components/ui/SectionHeading'
import { projectsContent } from '#/lib/projects'
import { SectionReveal } from '../About/SectionReveal'
import { ProjectShowcase } from './ProjectShowcase'
import { ProjectsBackground } from './ProjectsBackground'
import { ProjectsCornerMark } from './ProjectsCornerMark'

export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-titulo"
      className="relative overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:px-20"
    >
      <ProjectsBackground />
      <ProjectsCornerMark />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionReveal>
          <SectionHeading
            label="// Projetos"
            titleId="projetos-titulo"
            title="O que eu construo"
            description={projectsContent.description}
          />
        </SectionReveal>

        <div className="mt-12 space-y-10 lg:mt-16 lg:space-y-16">
          {projectsContent.items.map((project, index) => (
            <SectionReveal key={project.slug} delay={index * 80}>
              <ProjectShowcase project={project} index={index} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
