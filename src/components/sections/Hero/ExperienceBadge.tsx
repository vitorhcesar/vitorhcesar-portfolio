export function ExperienceBadge() {
  return (
    <div className="absolute top-[17%] right-[4.5%] z-20 hidden items-center gap-3.5 rounded-2xl border border-primary/70 bg-[#071422]/80 px-5 py-3.5 shadow-[0_0_28px_rgba(37,99,235,0.16)] backdrop-blur-md lg:flex xl:top-[16%] xl:right-[6%]">
      <span className="text-[22px] leading-none font-semibold tracking-tight text-primary-light">
        {'</>'}
      </span>
      <div className="leading-none">
        <p className="text-[17px] font-bold tracking-tight text-white">
          +5 anos
        </p>
        <p className="mt-1 text-[13px] font-medium text-slate-300">
          de experiência
        </p>
      </div>
    </div>
  )
}
