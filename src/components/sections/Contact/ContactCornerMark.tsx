import { cn } from '#/lib/cn'
import type { PropsWithChildren } from 'react'

const lines = ['CONECTAR', 'COLABORAR', 'CRIAR']

function Line({ children }: PropsWithChildren) {
  return (
    <span className="text-[.75rem] font-bold tracking-[0.28em] text-[#9fd6ff]/70 uppercase">
      {children}
    </span>
  )
}

export function ContactCornerMark() {
  return (
    <div
      className={cn(
        'pointer-events-none absolute right-8 bottom-24 z-10 hidden flex-col items-end gap-5 2xl:flex 2xl:right-20',
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col items-end gap-0.5">
        {lines.map((line) => (
          <Line key={line}>{line}</Line>
        ))}
      </div>

      <div className="h-0.5 w-10 rounded-full bg-primary" />
    </div>
  )
}
