import { useCallback, useRef, useState } from 'react'

export function useProjectsActiveSlug() {
  const ratiosRef = useRef<Map<string, number>>(new Map())
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const updateRatio = useCallback((slug: string, ratio: number) => {
    ratiosRef.current.set(slug, ratio)

    let bestSlug: string | null = null
    let bestRatio = 0

    ratiosRef.current.forEach((value, key) => {
      if (value > bestRatio) {
        bestRatio = value
        bestSlug = key
      }
    })

    if (!bestSlug || bestRatio <= 0) return

    setActiveSlug((current) => (current === bestSlug ? current : bestSlug))
  }, [])

  return { activeSlug, updateRatio }
}
