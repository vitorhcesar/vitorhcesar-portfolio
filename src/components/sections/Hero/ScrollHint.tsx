import { cn } from '#/lib/cn'
import { ArrowDown } from 'lucide-react'

export function ScrollHint() {
  return (
    <a
      href="#sobre"
      className={cn(
        'absolute bottom-8 left-8 z-20 lg:left-12 xl:left-20',
        'flex items-center gap-3',
        'text-primary',
      )}
    >
      <ArrowDown className="size-10 animate-bounce" />
      <span className="text-[.7rem] font-semibold tracking-[0.22em] uppercase">
        Role para descobrir mais
      </span>
    </a>
  )
}
