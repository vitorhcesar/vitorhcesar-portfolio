import { SectionHeading } from '#/components/ui/SectionHeading'
import { projects } from '#/lib/projects'

export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-titulo"
      className="border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="// Projetos"
          titleId="projetos-titulo"
          title="O que eu construo"
          description="Experiência em diferentes frentes do desenvolvimento de software, sempre com foco em qualidade e impacto."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-2xl border border-white/10 bg-surface/50 p-6 transition-colors hover:border-primary/30 hover:bg-surface/80"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-primary-light">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
