import { cn } from '#/lib/cn'
import { ArrowDown } from 'lucide-react'

export function ScrollHint() {
  return (
    <a
      href="#sobre"
      className={cn(
        'absolute bottom-8 left-8 z-20 hidden 2xl:left-20',
        'items-center gap-3 2xl:flex',
        'text-primary',
        'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
      )}
    >
      <ArrowDown className="size-10 animate-bounce" />
      <span className="text-[.7rem] font-semibold tracking-[0.22em] uppercase">
        Role para descobrir mais
      </span>
    </a>
  )
}
