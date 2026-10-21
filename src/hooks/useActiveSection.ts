import { useEffect, useState } from 'react'

function getMostVisibleSection(sectionIds: readonly string[]) {
  let activeId = sectionIds[0]
  let maxVisibleHeight = 0

  for (let index = sectionIds.length - 1; index >= 0; index--) {
    const id = sectionIds[index]
    const section = document.getElementById(id)
    if (!section) continue

    const { top, bottom } = section.getBoundingClientRect()
    const visibleTop = Math.max(top, 0)
    const visibleBottom = Math.min(bottom, window.innerHeight)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)

    if (visibleHeight >= maxVisibleHeight) {
      maxVisibleHeight = visibleHeight
      activeId = id
    }
  }

  return activeId
}

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const updateActiveSection = () => {
      setActiveSection(getMostVisibleSection(sectionIds))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sectionIds])

  return activeSection
}
