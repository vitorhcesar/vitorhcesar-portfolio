import { OptimizedImage } from '#/components/ui/OptimizedImage'
import type { IProjectScreenshot } from '#/lib/projects'
import { cn } from '#/lib/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useState } from 'react'

interface ProjectGalleryProps {
  screenshots: IProjectScreenshot[]
  projectName: string
}

export function ProjectGallery({ screenshots, projectName }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultiple = screenshots.length > 1

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + screenshots.length) % screenshots.length)
    },
    [screenshots.length],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const activeScreenshot = screenshots[activeIndex]

  return (
    <div
      className="group/gallery relative"
      role="region"
      aria-label={`Galeria de screenshots de ${projectName}`}
      aria-roledescription="carrossel"
    >
      <div
        className={cn(
          'relative aspect-video min-h-[11.5rem] overflow-hidden bg-[#071422]/40 sm:min-h-[12.5rem]',
          'rounded-none border-y border-white/10 lg:rounded-2xl lg:border',
          'shadow-[0_0_40px_rgba(37,99,235,0.08)] transition-shadow duration-500',
          'group-hover/gallery:border-primary/20 group-hover/gallery:shadow-[0_0_60px_rgba(37,99,235,0.12)]',
        )}
      >
        <div className="relative size-full">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.src}
              className={cn(
                'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none',
                index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
              aria-hidden={index !== activeIndex}
            >
              <OptimizedImage
                src={screenshot.src}
                alt={screenshot.alt}
                className="size-full object-cover object-top"
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
              />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020617]/80 to-transparent"
          aria-hidden="true"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#071422]/80 p-2.5 text-white backdrop-blur-md sm:left-3',
                'opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover/gallery:opacity-100',
                'hover:border-primary/30 hover:bg-[#071422] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
              aria-label="Screenshot anterior"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className={cn(
                'absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#071422]/80 p-2.5 text-white backdrop-blur-md sm:right-3',
                'opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover/gallery:opacity-100',
                'hover:border-primary/30 hover:bg-[#071422] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
              aria-label="Próximo screenshot"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex items-center justify-between gap-4 px-4 sm:mt-4 sm:px-0">
          <p className="sr-only" aria-live="polite">
            {activeScreenshot.alt} — {activeIndex + 1} de {screenshots.length}
          </p>

          <div className="flex flex-1 items-center justify-center gap-2" role="tablist" aria-label="Screenshots do projeto">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`${screenshot.alt} (${index + 1} de ${screenshots.length})`}
                onClick={() => goTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300 motion-reduce:transition-none',
                  index === activeIndex
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-white/20 hover:bg-white/40',
                )}
              />
            ))}
          </div>

          <span className="text-xs font-medium tracking-[0.14em] text-[#9fd6ff]/70 tabular-nums">
            {activeIndex + 1}/{screenshots.length}
          </span>
        </div>
      )}
    </div>
  )
}
