import { HERO_INTRO_DURATION_MS } from '#/lib/splash-config'
import { useEffect, useRef, useState } from 'react'

const LINE_1 = 'Já pensou na sua ideia...'
const LINE_2 = 'no digital?'
const TYPE_SPEED_MS = 35
const PAUSE_BETWEEN_LINES_MS = 1200
const PAUSE_BEFORE_EXIT_MS = 1000

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

interface SplashScreenProps {
  onComplete?: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const splashRef = useRef<HTMLDivElement>(null)
  const revealingStartedAtRef = useRef(0)
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [showLine2, setShowLine2] = useState(false)
  const [activeLine, setActiveLine] = useState<1 | 2 | null>(1)
  const [exiting, setExiting] = useState(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (document.documentElement.dataset.splash === 'skip') {
      setSkipped(true)
      return
    }

    let cancelled = false

    async function runTypewriter() {
      for (let i = 1; i <= LINE_1.length; i++) {
        if (cancelled) return
        setLine1(LINE_1.slice(0, i))
        await sleep(TYPE_SPEED_MS)
      }

      await sleep(PAUSE_BETWEEN_LINES_MS)
      if (cancelled) return

      setShowLine2(true)
      setActiveLine(2)

      for (let i = 1; i <= LINE_2.length; i++) {
        if (cancelled) return
        setLine2(LINE_2.slice(0, i))
        await sleep(TYPE_SPEED_MS)
      }

      setActiveLine(null)
      await sleep(PAUSE_BEFORE_EXIT_MS)
      if (cancelled) return

      revealingStartedAtRef.current = performance.now()
      document.documentElement.dataset.splash = 'revealing'
      setExiting(true)
    }

    runTypewriter()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!exiting) return

    const splash = splashRef.current
    if (!splash) return

    let introTimer: ReturnType<typeof setTimeout> | undefined

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName !== 'splash-exit') return

      const elapsed = performance.now() - revealingStartedAtRef.current
      const remaining = Math.max(0, HERO_INTRO_DURATION_MS - elapsed)

      introTimer = window.setTimeout(() => {
        document.documentElement.dataset.splash = 'done'
        onComplete?.()
      }, remaining)
    }

    splash.addEventListener('animationend', handleAnimationEnd)
    return () => {
      splash.removeEventListener('animationend', handleAnimationEnd)
      window.clearTimeout(introTimer)
    }
  }, [exiting, onComplete])

  if (skipped) return null

  return (
    <div
      ref={splashRef}
      className={`splash-screen${exiting ? ' splash-exiting' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="splash-content">
        <p className="splash-line">
          <span className="splash-text">{line1}</span>
          {activeLine === 1 && <span className="splash-cursor" aria-hidden />}
        </p>
        {showLine2 && (
          <p className="splash-line splash-line-2">
            <span className="splash-text splash-text-accent">{line2}</span>
            {activeLine === 2 && <span className="splash-cursor" aria-hidden />}
          </p>
        )}
      </div>
    </div>
  )
}
