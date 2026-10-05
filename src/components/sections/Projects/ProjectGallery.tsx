import { OptimizedImage } from '#/components/ui/OptimizedImage'
import type { IProjectScreenshot } from '#/lib/projects'
import { cn } from '#/lib/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ProjectNotebookFrame } from './ProjectNotebookFrame'

interface ProjectGalleryProps {
  screenshots: IProjectScreenshot[]
  projectName: string
  projectUrl?: string
  addressBar?: string
  isActive?: boolean
}

function getAddressBar(projectUrl?: string, projectName?: string, addressBar?: string) {
  if (addressBar) return addressBar

  if (projectUrl) {
    try {
      return new URL(projectUrl).hostname
    } catch {
      return projectUrl
    }
  }

  return `${projectName?.toLowerCase().replace(/\s+/g, '') ?? 'projeto'}.app`
}

function isPresentationSlide(index: number) {
  return index === 0
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

export function ProjectGallery({
  screenshots,
  projectName,
  projectUrl,
  addressBar: addressBarOverride,
  isActive = false,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultiple = screenshots.length > 1
  const addressBar = getAddressBar(projectUrl, projectName, addressBarOverride)
  const isPresentationActive = isPresentationSlide(activeIndex)

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + screenshots.length) % screenshots.length)
    },
    [screenshots.length],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    if (!isActive || !hasMultiple) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isActive, hasMultiple, goPrev, goNext])

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
          'relative transition-shadow duration-500',
          isPresentationActive
            ? cn(
                'aspect-video min-h-[11.5rem] overflow-hidden bg-[#071422]/40 sm:min-h-[12.5rem]',
                'rounded-none border-y border-white/10 lg:rounded-2xl lg:border',
              )
            : cn(
                'lg:rounded-2xl lg:border lg:border-white/10 lg:bg-[#071422]/20 lg:px-3 lg:py-4',
              ),
          'shadow-[0_0_40px_rgba(37,99,235,0.08)]',
          'group-hover/gallery:border-primary/20 group-hover/gallery:shadow-[0_0_60px_rgba(37,99,235,0.12)]',
        )}
      >
        <div
          className={cn(
            'relative w-full',
            isPresentationActive
              ? 'aspect-video min-h-[11.5rem] sm:min-h-[12.5rem]'
              : 'lg:min-h-[12.5rem]',
          )}
        >
          {screenshots.map((screenshot, index) => {
            const isPresentation = isPresentationSlide(index)
            const isActive = index === activeIndex

            return (
              <div
                key={screenshot.src}
                className={cn(
                  'transition-opacity duration-500 motion-reduce:transition-none',
                  isActive
                    ? 'relative z-[1] opacity-100 lg:absolute lg:inset-0'
                    : 'pointer-events-none absolute inset-x-0 top-0 opacity-0 lg:inset-0',
                  isPresentationActive && isActive && 'size-full',
                  !isPresentation && 'flex items-center justify-center lg:p-2',
                )}
                aria-hidden={!isActive}
              >
                {isPresentation ? (
                  <>
                    <OptimizedImage
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="size-full object-cover object-top"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020617]/80 to-transparent"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <ProjectNotebookFrame
                    screenshot={screenshot}
                    addressBar={addressBar}
                    loading={index === 1 ? 'eager' : 'lazy'}
                    className="w-full"
                  />
                )}
              </div>
            )
          })}
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#071422]/70 p-2 text-white backdrop-blur-md sm:left-3 sm:p-2.5',
                'opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover/gallery:opacity-100',
                'hover:border-primary/30 hover:bg-[#071422] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
              aria-label="Screenshot anterior"
            >
              <ChevronLeft className="size-4 sm:size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className={cn(
                'absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#071422]/70 p-2 text-white backdrop-blur-md sm:right-3 sm:p-2.5',
                'opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover/gallery:opacity-100',
                'hover:border-primary/30 hover:bg-[#071422] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
              aria-label="Próximo screenshot"
            >
              <ChevronRight className="size-4 sm:size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex items-center justify-between gap-4 px-4 sm:mt-4 lg:px-0">
          <p className="sr-only" aria-live="polite">
            {activeScreenshot.alt} — {activeIndex + 1} de {screenshots.length}
          </p>

          <div
            className="flex flex-1 items-center justify-center gap-2"
            role="tablist"
            aria-label="Screenshots do projeto"
          >
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
