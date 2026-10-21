import { useEffect, useRef } from 'react'

const VISIBILITY_THRESHOLDS = Array.from({ length: 11 }, (_, index) => index / 10)

export function useProjectInView(
  slug: string,
  onVisibilityChange: (slug: string, ratio: number) => void,
) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(slug, entry.intersectionRatio)
      },
      { threshold: VISIBILITY_THRESHOLDS },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [slug, onVisibilityChange])

  return ref
}
