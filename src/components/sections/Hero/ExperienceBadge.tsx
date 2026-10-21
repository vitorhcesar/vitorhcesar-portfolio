import { cn } from '#/lib/cn'
import { CodeXml } from 'lucide-react'
import type { CSSProperties } from 'react'

export function ExperienceBadge() {
  return (
    <div
      className={cn(
        'hero-reveal-pop-in hidden lg:block',
        'absolute top-[15%] right-[2%] z-20 2xl:top-[16%] 2xl:right-[6%]',
      )}
      style={{ '--reveal-delay': '420ms' } as CSSProperties}
    >
      <div
        className={cn(
          'relative origin-top-right scale-75 2xl:scale-100',
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
    </div>
  )
}
