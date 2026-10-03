import { HERO_INTRO_DURATION_MS } from '#/lib/splash-config'
import { useEffect, useRef, useState } from 'react'

const SPLASH_PREFIX = 'Tudo começa com uma '
const SPLASH_ACCENT = 'ideia.'
const SPLASH_TEXT = `${SPLASH_PREFIX}${SPLASH_ACCENT}`
const TYPE_SPEED_MS = 35
const PAUSE_BEFORE_EXIT_MS = 1500

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
  const [text, setText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const prefixPart = text.slice(0, Math.min(text.length, SPLASH_PREFIX.length))
  const accentPart =
    text.length > SPLASH_PREFIX.length ? text.slice(SPLASH_PREFIX.length) : ''

  useEffect(() => {
    if (document.documentElement.dataset.splash === 'skip') {
      setSkipped(true)
      return
    }

    let cancelled = false

    async function runTypewriter() {
      for (let i = 1; i <= SPLASH_TEXT.length; i++) {
        if (cancelled) return
        setText(SPLASH_TEXT.slice(0, i))
        await sleep(TYPE_SPEED_MS)
      }

      setShowCursor(false)
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
          <span className="splash-text">{prefixPart}</span>
          {accentPart && (
            <span className="splash-text-accent">{accentPart}</span>
          )}
          {showCursor && <span className="splash-cursor" aria-hidden />}
        </p>
      </div>
    </div>
  )
}
