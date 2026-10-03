import { HeroActions } from './HeroActions'
import { HeroIntro } from './HeroIntro'
import { TechStack } from './TechStack'

export function HeroContent() {
  return (
    <div className="relative z-10 flex h-full items-center">
      <div className="flex w-full flex-col justify-center px-8 pt-20 pb-28 lg:w-[52%] lg:pt-16 lg:pr-4 lg:pb-24 lg:pl-12 xl:pl-20">
        <HeroIntro />
        <HeroActions />
        <TechStack />
      </div>
    </div>
  )
}
