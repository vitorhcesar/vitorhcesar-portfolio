import { ArrowRight, ChevronDown, Code2, Mail } from 'lucide-react'
import { TechStack } from './TechStack'

const verticalKeywords = ['WEB', 'MOBILE', 'APIs', 'BACKEND', 'FRONTEND']

export function Hero() {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(59,130,246,0.15)_0%,transparent_55%)]" />

        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 select-none">
          <span className="text-[22rem] font-black leading-none text-white/[0.03] xl:text-[28rem]">
            VH
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative grid h-full w-full grid-cols-1 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col justify-center px-8 pt-24 pb-36 lg:pl-12 lg:pr-8 xl:pl-20 xl:pr-12">
          <p className="mb-5 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
            // Desenvolvedor Full Stack
          </p>

          <h1 className="max-w-xl text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
            Transformo ideias{' '}
            <span className="text-primary-light">em produtos digitais.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted lg:text-[17px]">
            Desenvolvedor full stack com{' '}
            <span className="font-semibold text-primary-light">
              mais de 5 anos de experiência
            </span>
            , especializado em construir aplicações web e mobile modernas,
            escaláveis e de alta performance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all hover:bg-primary-light"
            >
              Ver meus projetos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
              Entrar em contato
            </a>
          </div>

          <TechStack />
        </div>

        {/* Right column — portrait */}
        <div className="relative hidden lg:block">
          <img
            src="/images/vitorhcesar-pic.png"
            alt="Vitor Hugo - Desenvolvedor Full Stack"
            className="absolute right-0 bottom-0 h-[92vh] w-auto max-w-none object-contain object-bottom"
            width={600}
            height={800}
          />

          <div className="animate-pulse-glow absolute top-[22%] right-[18%] z-20 flex items-center gap-2.5 rounded-xl border border-primary/30 bg-[#0f172a]/80 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <Code2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold whitespace-nowrap text-white">
              +5 anos de experiência
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom left */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-8 z-20 flex flex-col items-center gap-2 text-primary lg:left-12 xl:left-20"
      >
        <ChevronDown className="h-5 w-5 animate-float" />
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Role para descobrir mais
        </span>
      </a>

      {/* Vertical keywords — far right */}
      <div className="absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:right-10">
        <div className="h-16 w-px bg-primary/40" />
        {verticalKeywords.map((keyword) => (
          <span
            key={keyword}
            className="text-[9px] font-bold tracking-[0.35em] text-muted/50 [writing-mode:vertical-lr]"
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* Bottom right label */}
      <div className="absolute right-12 bottom-8 z-20 hidden flex-col items-end gap-1 lg:flex xl:right-20">
        <div className="flex flex-col items-end gap-0.5 text-[10px] font-bold tracking-[0.3em] text-muted/40">
          <span>CÓDIGO</span>
          <span>IDEIAS</span>
          <span>RESULTADOS</span>
        </div>
        <div className="mt-1 h-0.5 w-10 rounded-full bg-primary" />
      </div>
    </section>
  )
}
