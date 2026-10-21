import { salesContent } from '#/lib/sales'
import { SectionReveal } from '../About/SectionReveal'

export function Proof() {
  return (
    <section
      aria-label="Números e experiência"
      className="relative overflow-hidden border-t border-white/5 px-4 py-12 sm:px-6 md:px-8 lg:px-12 lg:py-16 xl:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.1)_0%,transparent_65%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {salesContent.stats.map((stat, index) => (
            <li key={stat.value}>
              <SectionReveal delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur-sm sm:p-6">
                  <p className="text-2xl font-extrabold tracking-tight text-primary-light sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </SectionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
