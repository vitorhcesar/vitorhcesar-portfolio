import { CornerMark } from './CornerMark'
import { ExperienceBadge } from './ExperienceBadge'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'
import { HeroPortrait } from './HeroPortrait'
import { ScrollHint } from './ScrollHint'
import { VerticalKeywords } from './VerticalKeywords'

export function Hero() {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      <HeroBackground />
      <HeroContent />
      <HeroPortrait />
      <ExperienceBadge />
      <ScrollHint />
      <VerticalKeywords />
      <CornerMark />
    </section>
  )
}
