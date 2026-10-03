const lines = ['CÓDIGO', 'IDEIAS', 'RESULTADOS']

export function CornerMark() {
  return (
    <div className="absolute right-8 bottom-8 z-20 hidden flex-col items-end gap-2 lg:flex xl:right-12">
      <div className="flex flex-col items-end gap-0.5 text-[10px] font-bold tracking-[0.28em] text-slate-400/70">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="h-0.5 w-10 rounded-full bg-primary" />
    </div>
  )
}
