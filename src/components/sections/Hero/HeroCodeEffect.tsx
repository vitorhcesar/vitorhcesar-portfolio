import { useEffect, useRef } from 'react'

const TYPESCRIPT_SNIPPETS = [
  'interface User {',
  'type Props =',
  'export default',
  'const handler =',
  'async function',
  'Promise<T>',
  'readonly id:',
  ': string | null',
  'as const',
  '=> void',
  'extends Base',
]

const PYTHON_SNIPPETS = [
  'def main():',
  'import os',
  'async def',
  'class Service:',
  'if __name__',
  'await fetch',
  '-> dict[str]',
  'lambda x:',
  '@dataclass',
  'try/except',
  'self.data',
]

const GO_SNIPPETS = [
  'func main()',
  'package main',
  'import "fmt"',
  'go func()',
  'type Handler',
  'err != nil',
  'make(chan)',
  'struct {',
  'return nil',
  'context.Context',
]

const CODE_CHARS = '{}[]()=></;:'

const SPAWN_Y_MIN = 0.1
const SPAWN_Y_MAX = 0.52
const SPAWN_Y_IMMEDIATE_MAX = 0.68

type Lang = 'ts' | 'py' | 'go'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  text: string
  size: number
  life: number
  maxLife: number
  kind: 'snippet' | 'char'
  lang: Lang
}

const LANG_HUE: Record<Lang, number> = {
  ts: 214,
  py: 48,
  go: 186,
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function pickLang(): Lang {
  const roll = Math.random()
  if (roll < 0.38) return 'ts'
  if (roll < 0.72) return 'py'
  return 'go'
}

function pickSnippet(lang: Lang) {
  const pool =
    lang === 'ts'
      ? TYPESCRIPT_SNIPPETS
      : lang === 'py'
        ? PYTHON_SNIPPETS
        : GO_SNIPPETS
  return pool[Math.floor(Math.random() * pool.length)]
}

function createParticle(width: number, height: number, immediate = false): Particle {
  const isSnippet = Math.random() > 0.15
  const lang = pickLang()

  const spawnX = width * randomBetween(0.15, 0.85)
  const spawnYMax = immediate ? SPAWN_Y_IMMEDIATE_MAX : SPAWN_Y_MAX
  const spawnY = height * randomBetween(SPAWN_Y_MIN, spawnYMax)

  const angle = randomBetween(-Math.PI * 0.95, -Math.PI * 0.12)
  const speed = randomBetween(1.1, 2.4)

  const maxLife = randomBetween(65, 120)

  const traveled = immediate ? randomBetween(0, maxLife * 0.8) : 0
  const startY = spawnY + Math.sin(angle) * speed * 1.2 * traveled * -0.35

  return {
    x: spawnX + randomBetween(-width * 0.12, width * 0.12) + Math.cos(angle) * speed * 0.4 * traveled,
    y: Math.max(height * 0.04, startY),
    vx: Math.cos(angle) * speed * 0.6,
    vy: Math.sin(angle) * speed * 1.25,
    text: isSnippet ? pickSnippet(lang) : CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
    size: isSnippet ? randomBetween(13, 16) : randomBetween(14, 18),
    life: traveled,
    maxLife,
    kind: isSnippet ? 'snippet' : 'char',
    lang,
  }
}

export function HeroCodeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId = 0
    let width = 0
    let height = 0
    let dpr = 1
    let particles: Particle[] = []
    let isVisible = true
    let lastTime = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(175, Math.max(95, Math.floor(width / 4.5)))
      particles = Array.from({ length: count }, () => createParticle(width, height, true))
    }

    const resetParticle = (particle: Particle) => {
      Object.assign(particle, createParticle(width, height, false))
    }

    const drawGlow = (time: number) => {
      const pulse = 0.72 + Math.sin(time * 0.0018) * 0.22
      const cx = width * 0.5
      const cy = height * 0.38
      const radius = Math.min(width, height) * 0.52

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      gradient.addColorStop(0, `rgba(37, 99, 235, ${0.34 * pulse})`)
      gradient.addColorStop(0.4, `rgba(59, 130, 246, ${0.22 * pulse})`)
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    const drawParticle = (particle: Particle) => {
      const progress = particle.life / particle.maxLife
      const fadeIn = Math.min(particle.life / 10, 1)
      const fadeOut = progress > 0.78 ? 1 - (progress - 0.78) / 0.22 : 1
      const baseOpacity = particle.kind === 'snippet' ? 1 : 0.92
      const opacity = fadeIn * fadeOut * baseOpacity

      if (opacity <= 0.02) return

      const distFromCenter = Math.abs(particle.x - width * 0.5) / (width * 0.5)
      const edgeBoost = 0.9 + distFromCenter * 0.1

      const hue = LANG_HUE[particle.lang]
      const lightness = particle.kind === 'snippet' ? 78 : 74

      ctx.save()
      ctx.globalAlpha = Math.min(1, opacity * edgeBoost)
      ctx.font = `600 ${particle.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
      ctx.fillStyle = `hsla(${hue}, 92%, ${lightness}%, 1)`
      ctx.shadowColor = `hsla(${hue}, 95%, 65%, 0.85)`
      ctx.shadowBlur = particle.kind === 'snippet' ? 14 : 11
      ctx.fillText(particle.text, particle.x, particle.y)
      ctx.restore()
    }

    const tick = (time: number) => {
      animationId = requestAnimationFrame(tick)
      if (!isVisible) return

      const delta = Math.min((time - lastTime) / 16.67, 2.5)
      lastTime = time

      ctx.clearRect(0, 0, width, height)
      drawGlow(time)

      for (const particle of particles) {
        particle.life += delta
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        particle.vx += (Math.random() - 0.5) * 0.02 * delta

        if (particle.life >= particle.maxLife || particle.y < -30) {
          resetParticle(particle)
          continue
        }

        drawParticle(particle)
      }
    }

    resize()
    lastTime = performance.now()
    animationId = requestAnimationFrame(tick)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true
      },
      { threshold: 0.05 },
    )
    intersectionObserver.observe(container)

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-[26%] -top-[30%] -bottom-[2%] overflow-visible"
      style={{
        maskImage:
          'radial-gradient(ellipse 74% 84% at 50% 38%, transparent 8%, rgba(0,0,0,0.55) 32%, black 72%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 74% 84% at 50% 38%, transparent 8%, rgba(0,0,0,0.55) 32%, black 72%, transparent 100%)',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
