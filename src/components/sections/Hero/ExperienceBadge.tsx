import { cn } from '#/lib/cn'
import { CodeXml } from 'lucide-react'

export function ExperienceBadge() {
  return (
    <div
      className={cn(
        'hidden lg:block',
        'absolute top-[17%] right-[4.5%] z-20 xl:top-[16%] xl:right-[6%]',
        'animate-float',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-visible"
      >
        <div
          className={cn(
            'absolute -inset-5 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.28)_0%,transparent_72%)]',
            'blur-2xl animate-badge-smoke',
          )}
        />
        <div
          className={cn(
            'absolute -inset-3 top-2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(22,136,245,0.22)_0%,transparent_68%)]',
            'blur-3xl animate-badge-smoke-alt',
          )}
        />
      </div>

      <div
        className={cn(
          'flex items-start gap-3.5',
          'border border-primary/70 rounded-2xl',
          'px-5 py-3.5',
          'bg-[#071422]/80 backdrop-blur-md',
          'animate-badge-glow',
        )}
      >
        <CodeXml
          className="size-9 shrink-0 text-primary-light"
          aria-hidden="true"
        />

        <div className="leading-none pt-6">
          <p className="text-[2rem] font-bold tracking-tight text-[#1688f5]">
            +5 anos
          </p>
          <p className="mt-1 text-[1.2rem] text-[#9fd6ff]/80">de experiência</p>
        </div>
      </div>
    </div>
  )
}
