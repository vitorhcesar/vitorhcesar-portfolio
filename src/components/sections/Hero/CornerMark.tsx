import { cn } from '#/lib/cn'
import type { PropsWithChildren } from 'react'

const lines = ['CÓDIGO', 'IDEIAS', 'RESULTADOS']

function Line({ children }: PropsWithChildren) {
  return (
    <span className="text-[.75rem] font-bold tracking-[0.28em] text-[#9fd6ff]/70 uppercase">
      {children}
    </span>
  )
}

export function CornerMark() {
  return (
    <div
      className={cn(
        'hidden',
        'flex-col items-start gap-5 2xl:flex',
        'absolute right-8 bottom-8 z-20 2xl:right-20',
      )}
    >
      <div className="flex flex-col items-start gap-0.5">
        {lines.map((line) => (
          <Line key={line}>{line}</Line>
        ))}
      </div>

      <div className="h-0.5 w-10 rounded-full bg-primary" />
    </div>
  )
}
