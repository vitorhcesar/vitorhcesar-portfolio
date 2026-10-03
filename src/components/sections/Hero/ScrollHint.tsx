import { ArrowDown } from 'lucide-react'

export function ScrollHint() {
  return (
    <a
      href="#sobre"
      className="absolute bottom-8 left-8 z-20 flex items-center gap-3 text-primary lg:left-12 xl:left-20"
    >
      <ArrowDown className="h-4 w-4" />
      <span className="text-[10px] font-semibold tracking-[0.22em] uppercase [writing-mode:vertical-rl] rotate-180">
        Role para descobrir mais
      </span>
    </a>
  )
}
