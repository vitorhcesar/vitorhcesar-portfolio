import { HeroActions } from './HeroActions'
import { HeroIntro } from './HeroIntro'
import { TechStack } from './TechStack'

export function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-dvh items-center">
      <div className="flex w-full flex-col justify-center px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:w-[62%] md:px-0 md:pt-24 md:pr-4 md:pb-20 md:pl-8 lg:w-[52%] lg:pt-16 lg:pr-4 lg:pb-24 lg:pl-12 xl:pl-20">
        <HeroIntro />
        <HeroActions />
        <TechStack />
      </div>
    </div>
  )
}
