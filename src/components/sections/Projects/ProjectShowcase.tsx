import type { IProject } from '#/lib/projects'
import { cn } from '#/lib/cn'
import { ArrowRight } from 'lucide-react'
import { ProjectGallery } from './ProjectGallery'
import { ProjectTechStack } from './ProjectTechStack'

interface ProjectShowcaseProps {
  project: IProject
  index: number
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const isReversed = index % 2 === 1

  return (
    <article
      aria-labelledby={`project-${project.slug}-title`}
      className={cn(
        'group overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md transition-colors',
        'hover:border-primary/30 hover:bg-surface/80',
      )}
    >
      <div
        className={cn(
          'grid items-center lg:grid-cols-2 lg:gap-12 lg:p-8',
          isReversed && 'lg:[&>*:first-child]:order-2',
        )}
      >
        <div
          className={cn(
            'relative w-[calc(100%+2rem)] max-w-none -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 md:w-[calc(100%+4rem)] md:-mx-8',
            'lg:mx-0 lg:w-full',
          )}
        >
          <ProjectGallery screenshots={project.screenshots} projectName={project.name} />
        </div>

        <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:p-0">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
              Projeto {String(index + 1).padStart(2, '0')}
            </p>
            <h3
              id={`project-${project.slug}-title`}
              className="mt-2 text-xl font-bold text-white sm:text-2xl"
            >
              {project.name}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>

          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-muted/80 uppercase">
              Tecnologias
            </p>
            <ProjectTechStack technologies={project.technologies} />
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group/link mt-2 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-[#071422]/60 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors',
                'hover:border-primary/30 hover:bg-[#071422]',
              )}
            >
              Ver projeto
              <ArrowRight
                className="size-4 transition-transform group-hover/link:translate-x-1"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
