export function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_16%_48%,rgba(37,99,235,0.16)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_40%,rgba(37,99,235,0.2)_0%,transparent_52%)]" />
      </div>

      <img
        src="/images/back-vitor.png"
        alt=""
        aria-hidden
        className="animate-back-pulse pointer-events-none absolute top-[16%] right-[14%] hidden h-[50vh] w-auto max-w-none origin-center object-contain select-none lg:block xl:right-[18%]"
      />
    </>
  )
}
