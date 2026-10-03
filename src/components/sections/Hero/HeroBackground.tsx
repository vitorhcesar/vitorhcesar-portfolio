import { OptimizedImage } from '#/components/ui/OptimizedImage'
import type { CSSProperties } from 'react'

export function HeroBackground() {
  return (
    <>
      <div
        className="hero-reveal-fade pointer-events-none absolute inset-0"
        style={{ '--reveal-delay': '0ms' } as CSSProperties}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_38%,rgba(37,99,235,0.16)_0%,transparent_60%)] lg:bg-[radial-gradient(ellipse_at_16%_48%,rgba(37,99,235,0.16)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_58%,rgba(37,99,235,0.14)_0%,transparent_54%)] md:bg-[radial-gradient(ellipse_at_68%_46%,rgba(37,99,235,0.18)_0%,transparent_52%)] lg:bg-[radial-gradient(ellipse_at_62%_40%,rgba(37,99,235,0.2)_0%,transparent_52%)]" />
      </div>

      <div
        className="hero-reveal-scale-in pointer-events-none absolute top-[24%] right-[-2%] hidden md:block lg:top-[18%] lg:right-[9%] xl:top-[17%] xl:right-[12%] 2xl:top-[16%] 2xl:right-[18%]"
        style={{ '--reveal-delay': '300ms' } as CSSProperties}
      >
        <OptimizedImage
          src="/images/back-vitor.png"
          webpSrc="/images/back-vitor.webp"
          alt=""
          ariaHidden
          className="animate-back-pulse h-[40vh] w-auto max-w-none origin-center object-contain opacity-70 select-none lg:h-[45vh] lg:opacity-100 xl:h-[46vh] 2xl:h-[50vh]"
          width={670}
          height={590}
          loading="lazy"
        />
      </div>
    </>
  )
}
