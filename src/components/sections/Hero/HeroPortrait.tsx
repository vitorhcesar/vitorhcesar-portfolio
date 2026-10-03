import { OptimizedImage } from '#/components/ui/OptimizedImage'

export function HeroPortrait() {
  return (
    <OptimizedImage
      src="/images/vitorhcesar-pic.png"
      webpSrc="/images/vitorhcesar-pic.webp"
      alt="Vitor Hugo — Desenvolvedor Full Stack"
      className="pointer-events-none absolute right-[-8%] bottom-0 z-[5] hidden h-[62vh] w-auto max-w-none object-contain object-bottom opacity-100 select-none md:block lg:right-[5%] lg:z-10 lg:h-[78vh] xl:right-[10%] xl:h-[82vh] 2xl:right-[16%] 2xl:h-[90vh]"
      loading="eager"
      fetchPriority="high"
    />
  )
}
