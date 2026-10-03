export function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_16%_48%,rgba(37,99,235,0.16)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_40%,rgba(37,99,235,0.2)_0%,transparent_52%)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-[4%] right-[16%] hidden h-[82vh] w-[46vw] lg:block"
      >
        <svg viewBox="0 0 680 780" className="h-full w-full" fill="none">
          <path
            d="M118 24h78L318 756h-86L118 24Z"
            fill="#1d4ed8"
            fillOpacity="0.42"
          />
          <path d="M292 24h92L548 756h-98L292 24Z" fill="#2563eb" />
          <path
            d="M468 90h70L668 756h-78L468 90Z"
            fill="#3b82f6"
            fillOpacity="0.35"
          />
        </svg>
      </div>
    </>
  )
}
