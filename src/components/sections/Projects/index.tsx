import { FooterText } from '#/components/layout/FooterText'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { useProjectsActiveSlug } from '#/hooks/useProjectsActiveSlug'
import { projectsContent } from '#/lib/projects'
import { isCurriculumMode } from '#/lib/site-mode'
import { SectionReveal } from '../About/SectionReveal'
import { ProjectShowcase } from './ProjectShowcase'
import { ProjectsBackground } from './ProjectsBackground'
import { ProjectsCornerMark } from './ProjectsCornerMark'

export function Projects() {
  const curriculumMode = isCurriculumMode()
  const { activeSlug, updateRatio } = useProjectsActiveSlug()

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
            title="O que eu construo?"
            description={projectsContent.description}
          />
        </SectionReveal>

        <div className="mt-12 space-y-10 lg:mt-16 lg:space-y-16">
          {projectsContent.items.map((project, index) => (
            <SectionReveal key={project.slug} delay={index * 80}>
              <ProjectShowcase
                project={project}
                index={index}
                isActive={activeSlug === project.slug}
                onVisibilityChange={updateRatio}
              />
            </SectionReveal>
          ))}
        </div>

        {curriculumMode && (
          <SectionReveal
            delay={240}
            className="mt-16 flex w-full flex-col items-center border-t border-white/5 pt-10 lg:mt-20"
          >
            <FooterText />
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
