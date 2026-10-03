import { cn } from '#/lib/cn'
import type { CSSProperties } from 'react'

const keywords: string[] = ['WEB', 'MOBILE', 'APIs', 'BACKEND', 'FRONTEND']

function Keyword({ keyword }: { keyword: string }) {
  return (
    <span className="text-[.8rem] font-semibold tracking-[0.32em] text-[#9fd6ff]/80 uppercase">
      {keyword}
    </span>
  )
}

export function VerticalKeywords() {
  return (
    <div
      className={cn(
        'hero-reveal-slide-right hidden 2xl:flex',
        'absolute top-[46%] right-5 z-20 2xl:right-8',
      )}
      style={{ '--reveal-delay': '480ms' } as CSSProperties}
    >
      <div className={cn('-translate-y-1/2', 'flex items-center gap-4')}>
        <div className="h-40 w-px bg-primary/70" />

        <div className="flex flex-col items-start gap-3.5">
          {keywords.map((keyword) => (
            <Keyword key={keyword} keyword={keyword} />
          ))}
        </div>
      </div>
    </div>
  )
}
