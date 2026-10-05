import { useCallback, useEffect, useState } from 'react'

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

interface UseScreenshotCarouselOptions {
  initialIndex?: number
  enabled?: boolean
}

export function useScreenshotCarousel(
  length: number,
  { initialIndex = 0, enabled = true }: UseScreenshotCarouselOptions = {},
) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  useEffect(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + length) % length)
    },
    [length],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    if (!enabled || length <= 1) return

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
  }, [enabled, length, goPrev, goNext])

  return { activeIndex, goTo, goPrev, goNext, setActiveIndex }
}
