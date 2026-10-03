import type { CSSProperties } from 'react'

export function HeroIntro() {
  return (
    <>
      <p
        className="hero-reveal-item mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase sm:mb-4 sm:text-sm sm:tracking-[0.24em] lg:mb-5 lg:text-[1rem] lg:tracking-[0.28em]"
        style={{ '--reveal-delay': '160ms' } as CSSProperties}
      >
        // Desenvolvedor Full Stack
      </p>

      <h1
        className="hero-reveal-item max-w-[30ch] text-[clamp(2.25rem,11vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.35rem] xl:text-[4rem] 2xl:text-[5.5rem]"
        style={{ '--reveal-delay': '280ms' } as CSSProperties}
      >
        Transformo ideias
        <br />
        em <span className="text-primary-light">produtos digitais.</span>
      </h1>

      <p
        className="hero-reveal-item mt-4 max-w-175 text-sm leading-relaxed text-muted sm:mt-5 sm:text-[15px] lg:mt-6 lg:text-[1.1rem] 2xl:text-[1.3rem]"
        style={{ '--reveal-delay': '420ms' } as CSSProperties}
      >
        Desenvolvedor full stack com{' '}
        <span className="font-semibold text-primary-light">
          mais de 5 anos de experiência
        </span>
        , especializado em construir aplicações web e mobile modernas,
        escaláveis e de alta performance.
      </p>
    </>
  )
}
