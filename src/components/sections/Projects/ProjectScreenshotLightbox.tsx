import { OptimizedImage } from '#/components/ui/OptimizedImage'
import { useScreenshotCarousel } from '#/hooks/useScreenshotCarousel'
import type { IProjectScreenshot } from '#/lib/projects'
import { cn } from '#/lib/cn'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ProjectScreenshotLightboxProps {
  isOpen: boolean
  onClose: () => void
  screenshots: IProjectScreenshot[]
  projectName: string
  initialIndex: number
  onIndexChange?: (index: number) => void
}

const EXIT_DURATION_MS = 320
const SWIPE_THRESHOLD_PX = 48

export function ProjectScreenshotLightbox({
  isOpen,
  onClose,
  screenshots,
  projectName,
  initialIndex,
  onIndexChange,
}: ProjectScreenshotLightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const hasMultiple = screenshots.length > 1

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { activeIndex, goTo, goPrev, goNext } = useScreenshotCarousel(screenshots.length, {
    initialIndex,
    enabled: isOpen && isVisible,
  })

  const activeScreenshot = screenshots[activeIndex]

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true))
      })
      document.body.style.overflow = 'hidden'
      return () => cancelAnimationFrame(frame)
    }

    if (isRendered) {
      setIsVisible(false)
      const timer = window.setTimeout(() => {
        setIsRendered(false)
        document.body.style.overflow = ''
      }, EXIT_DURATION_MS)
      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [isOpen, isRendered])

  useEffect(() => {
    if (!isVisible) return

    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>('[data-lightbox-close]')?.focus()
    }, 80)

    return () => window.clearTimeout(timer)
  }, [isVisible])

  useEffect(() => {
    if (!isRendered) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRendered, onClose])

  useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? 0
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (!hasMultiple) return

    const touchEndX = event.changedTouches[0]?.clientX ?? 0
    const deltaX = touchEndX - touchStartX.current

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return

    if (deltaX > 0) goPrev()
    else goNext()
  }

  if (!isRendered || !isMounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center lg:items-center lg:p-6"
      role="presentation"
    >
      <div
        aria-hidden
        className={cn(
          'contact-modal-backdrop-blur pointer-events-none absolute inset-0',
          isVisible && 'is-visible',
        )}
      />
      <button
        type="button"
        aria-label="Fechar visualização"
        className={cn(
          'contact-modal-backdrop-dim absolute inset-0 bg-[#020617]/80',
          isVisible && 'is-visible',
        )}
        onClick={onClose}
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Screenshots de ${projectName}`}
        className={cn(
          'screenshot-lightbox-panel relative z-10 flex w-full flex-col overflow-hidden',
          'max-h-[92dvh] lg:max-h-[90vh] lg:max-w-6xl',
          'rounded-t-3xl border border-white/10 lg:rounded-3xl',
          'bg-linear-to-b from-surface/98 to-background/98',
          'shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset]',
          'backdrop-blur-2xl',
          isVisible && 'is-visible',
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          aria-hidden
          className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/20 lg:hidden"
        />

        <div className="relative flex shrink-0 items-center justify-between gap-4 border-b border-white/5 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {projectName}
            </p>
            <p className="mt-1 truncate text-sm text-muted">
              {activeScreenshot.alt}
            </p>
          </div>

          <button
            type="button"
            data-lightbox-close
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-[#020617]/40 px-3 py-4 sm:px-6 sm:py-6">
          <div className="flex min-h-[min(52dvh,560px)] w-full items-center justify-center lg:min-h-[min(60vh,640px)]">
            <OptimizedImage
              key={activeScreenshot.src}
              src={activeScreenshot.src}
              alt={activeScreenshot.alt}
              className="max-h-[min(52dvh,560px)] w-full object-contain lg:max-h-[min(60vh,640px)]"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 90vw"
            />
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className={cn(
                  'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#071422]/80 p-2.5 text-white backdrop-blur-md sm:left-4',
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
                  'absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#071422]/80 p-2.5 text-white backdrop-blur-md sm:right-4',
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
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/5 px-4 py-4 sm:px-6">
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
    </div>,
    document.body,
  )
}
