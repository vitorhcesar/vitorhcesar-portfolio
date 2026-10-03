export function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_38%,rgba(37,99,235,0.16)_0%,transparent_60%)] lg:bg-[radial-gradient(ellipse_at_16%_48%,rgba(37,99,235,0.16)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_58%,rgba(37,99,235,0.14)_0%,transparent_54%)] md:bg-[radial-gradient(ellipse_at_68%_46%,rgba(37,99,235,0.18)_0%,transparent_52%)] lg:bg-[radial-gradient(ellipse_at_62%_40%,rgba(37,99,235,0.2)_0%,transparent_52%)]" />
      </div>

      <img
        src="/images/back-vitor.png"
        alt=""
        aria-hidden
        className="animate-back-pulse pointer-events-none absolute top-[24%] right-[-2%] hidden h-[40vh] w-auto max-w-none origin-center object-contain opacity-70 select-none md:block lg:top-[18%] lg:right-[9%] lg:h-[45vh] lg:opacity-100 xl:top-[17%] xl:right-[12%] xl:h-[46vh] 2xl:top-[16%] 2xl:right-[18%] 2xl:h-[50vh]"
      />
    </>
  )
}
