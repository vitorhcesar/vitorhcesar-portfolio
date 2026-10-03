import { cn } from '#/lib/cn'
import type { PropsWithChildren } from 'react'

const lines = ['CRIAR', 'ENTREGAR', 'IMPACTO']

function Line({ children }: PropsWithChildren) {
  return (
    <span className="text-[.75rem] font-bold tracking-[0.28em] text-[#9fd6ff]/70 uppercase">
      {children}
    </span>
  )
}

export function ProjectsCornerMark() {
  return (
    <div
      className={cn(
        'pointer-events-none absolute top-24 left-8 z-10 hidden flex-col items-start gap-5 2xl:flex 2xl:left-20',
      )}
      aria-hidden="true"
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
