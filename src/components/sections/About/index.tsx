import { SectionHeading } from '#/components/ui/SectionHeading'

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="// Sobre"
          titleId="sobre-titulo"
          title="Quem sou eu"
          description="Desenvolvedor full stack apaixonado por transformar problemas complexos em soluções digitais elegantes e eficientes."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
            <p>
              Com mais de <strong className="text-white">5 anos de experiência</strong>,
              atuo no desenvolvimento de produtos digitais do conceito à produção —
              desde interfaces modernas até arquiteturas backend escaláveis.
            </p>
            <p>
              Trabalho com foco em qualidade de código, performance e entrega de
              valor real para o usuário final, sempre buscando as melhores práticas
              e tecnologias do mercado.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Especialidades</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Desenvolvimento web',
                'APIs e backends',
                'Aplicações mobile',
                'Arquitetura de software',
                'Performance e SEO',
                'DevOps e containers',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted sm:text-base"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
