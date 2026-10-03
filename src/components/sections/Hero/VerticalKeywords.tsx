const keywords = ['WEB', 'MOBILE', 'APIs', 'BACKEND', 'FRONTEND']

export function VerticalKeywords() {
  return (
    <div className="absolute top-[46%] right-5 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:right-8">
      <div className="h-14 w-px bg-primary/70" />
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="text-[10px] font-semibold tracking-[0.32em] text-slate-400/80 [writing-mode:vertical-lr]"
        >
          {keyword}
        </span>
      ))}
    </div>
  )
}
