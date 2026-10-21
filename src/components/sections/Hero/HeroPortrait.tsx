import { HeroCodeEffect } from '#/components/sections/Hero/HeroCodeEffect'
import { OptimizedImage } from '#/components/ui/OptimizedImage'
import type { CSSProperties } from 'react'

export function HeroPortrait() {
  return (
    <div
      className="hero-reveal-from-right pointer-events-none absolute right-[-8%] bottom-0 z-[5] hidden md:block lg:right-[5%] lg:z-10 xl:right-[10%] 2xl:right-[16%]"
      style={{ '--reveal-delay': '240ms' } as CSSProperties}
    >
      <div className="relative inline-block h-[62vh] lg:h-[78vh] xl:h-[82vh] 2xl:h-[90vh]">
        <HeroCodeEffect />
        <OptimizedImage
          src="/images/vitorhcesar-pic.png"
          webpSrc="/images/vitorhcesar-pic.webp"
          alt="Vitor Hugo — Desenvolvedor Full Stack"
          className="relative z-10 h-full w-auto max-w-none object-contain object-bottom opacity-100 select-none"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  )
}
