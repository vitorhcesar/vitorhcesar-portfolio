import { cn } from '#/lib/cn'

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
        'hidden',
        'absolute top-[46%] right-5 z-20 xl:right-8',
        '-translate-y-1/2',
        'items-center gap-4 lg:flex',
      )}
    >
      <div className="h-40 w-px bg-primary/70" />

      <div className="flex flex-col items-start gap-3.5">
        {keywords.map((keyword) => (
          <Keyword key={keyword} keyword={keyword} />
        ))}
      </div>
    </div>
  )
}
