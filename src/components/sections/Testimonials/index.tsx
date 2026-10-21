import { SectionGlow } from '#/components/ui/SectionGlow'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { cn } from '#/lib/cn'
import type { ITestemonial } from '#/lib/testemonials'
import { testemonialsContent } from '#/lib/testemonials'
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react'
import type { PointerEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { SectionReveal } from '../About/SectionReveal'

const { label, title, description, items } = testemonialsContent

const BASE_SPEED = 46

function getInitials(name: string) {
  const parts = name
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-zÀ-ÿ]/g, ''))
    .filter((part) => part.length > 0)

  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function formatRating(rating: number) {
  return rating.toFixed(1).replace('.', ',')
}

function TestemonialCard({
  item,
  hidden,
  expanded,
  onToggle,
}: {
  item: ITestemonial
  hidden?: boolean
  expanded: boolean
  onToggle: () => void
}) {
  const isLong = item.quote.length > 160

  return (
    <article
      data-card
      aria-hidden={hidden || undefined}
      className="flex w-[min(20.5rem,calc(100vw-4.75rem))] shrink-0 flex-col rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-sm sm:w-[22.5rem] sm:p-6 lg:w-96"
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-sm font-bold text-primary-light"
        >
          {getInitials(item.author)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white sm:text-base">
            {item.author}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
            {item.project}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={cn(
                'size-3.5',
                index < item.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-transparent text-white/20',
              )}
            />
          ))}
        </div>
        <p className="text-xs font-semibold text-white">
          <span className="sr-only">Nota </span>
          {formatRating(item.rating)}
          <span className="sr-only"> de 5</span>
          <span aria-hidden="true" className="mx-1.5 text-white/25">
            ·
          </span>
          <span className="font-medium text-muted">{item.date}</span>
        </p>
      </div>

      <blockquote
        className={cn(
          'mt-4 text-sm leading-relaxed whitespace-pre-line text-white/90',
          isLong && !expanded && 'line-clamp-6',
        )}
      >
        “{item.quote}”
      </blockquote>

      {isLong && (
        <button
          type="button"
          className="mt-3 self-start text-xs font-semibold text-primary-light transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          aria-expanded={expanded}
          tabIndex={hidden ? -1 : 0}
          onClick={(event) => {
            event.stopPropagation()
            onToggle()
          }}
        >
          {expanded ? 'Ler menos' : 'Ler mais'}
        </button>
      )}

      {item.skills.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

function CardSet({
  hidden,
  expandedId,
  onToggle,
}: {
  hidden?: boolean
  expandedId: string | null
  onToggle: (id: string) => void
}) {
  return (
    <div
      data-set
      aria-hidden={hidden || undefined}
      inert={hidden}
      className="flex items-start gap-4 pr-4"
    >
      {items.map((item) => (
        <TestemonialCard
          key={item.id}
          item={item}
          hidden={hidden}
          expanded={expandedId === item.id}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  )
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function wrapOffset(offset: number, width: number) {
  if (width <= 0) return offset

  let next = offset % width
  if (next > 0) next -= width
  return next
}

function TestemonialCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const staticRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const boostRef = useRef(0)
  const pausedRef = useRef(false)
  const hoverRef = useRef(false)
  const draggingRef = useRef(false)
  const visibleRef = useRef(true)
  const holdUntilRef = useRef(0)
  const pointerRef = useRef({ id: -1, x: 0, y: 0, locked: false })
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? null : id))
    setPaused(true)
  }

  const setWidth = () =>
    trackRef.current?.querySelector<HTMLElement>('[data-set]')?.offsetWidth ?? 0

  const paint = () => {
    const track = trackRef.current
    if (!track) return

    if (!draggingRef.current) {
      offsetRef.current = wrapOffset(offsetRef.current, setWidth())
    }

    track.style.transform = `translate3d(${offsetRef.current}px,0,0)`
  }

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 },
    )

    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      frame = requestAnimationFrame(tick)

      if (
        prefersReducedMotion() ||
        !visibleRef.current ||
        draggingRef.current
      ) {
        return
      }

      const held =
        pausedRef.current || hoverRef.current || now < holdUntilRef.current

      let delta = held ? 0 : -BASE_SPEED * dt

      if (boostRef.current !== 0) {
        const step =
          Math.sign(boostRef.current) *
          Math.min(Math.abs(boostRef.current), 1100 * dt)
        boostRef.current -= step
        if (Math.abs(boostRef.current) < 0.4) boostRef.current = 0
        delta += step
      }

      if (delta !== 0) offsetRef.current += delta
      paint()
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const cardStep = () => {
    const card = trackRef.current?.querySelector<HTMLElement>('[data-card]')
    if (!card) return 340

    const set = card.parentElement
    const gap = set ? Number.parseFloat(getComputedStyle(set).columnGap) : 16

    return (
      card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 16)
    )
  }

  const shift = (direction: -1 | 1) => {
    holdUntilRef.current = performance.now() + 1400

    if (prefersReducedMotion()) {
      const scroller = staticRef.current
      const card = scroller?.querySelector<HTMLElement>('[data-card]')
      if (!scroller || !card) return

      const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 16
      const amount = card.getBoundingClientRect().width + gap
      const max = scroller.scrollWidth - scroller.clientWidth
      let next = scroller.scrollLeft - direction * amount

      if (next > max + 8) next = 0
      if (next < -8) next = max

      scroller.scrollTo({ left: next })
      return
    }

    boostRef.current += direction * cardStep()
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || prefersReducedMotion()) return

    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      locked: false,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (pointer.id !== event.pointerId) return

    const dx = event.clientX - pointer.x
    const dy = event.clientY - pointer.y

    if (!pointer.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      if (Math.abs(dy) > Math.abs(dx)) {
        pointer.id = -1
        return
      }

      pointer.locked = true
      draggingRef.current = true
      setDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    pointer.x = event.clientX
    offsetRef.current = wrapOffset(offsetRef.current + dx, setWidth())
    paint()
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current.id !== event.pointerId) return

    pointerRef.current.id = -1
    holdUntilRef.current = performance.now() + 1400

    if (!draggingRef.current) return

    draggingRef.current = false
    setDragging(false)
    paint()
  }

  const controlClass =
    'inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-surface/80 text-white transition-colors hover:border-primary/40 hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light'

  return (
    <div className="mt-8 lg:mt-10">
      <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <p className="text-xs font-medium tracking-wide text-muted sm:text-sm">
          {items.length} avaliações · média {formatRating(5)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={controlClass}
            aria-label="Depoimento anterior"
            onClick={() => shift(1)}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={cn(controlClass, 'motion-reduce:hidden')}
            aria-pressed={paused}
            aria-label={paused ? 'Retomar depoimentos' : 'Pausar depoimentos'}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? (
              <Play className="size-4" aria-hidden="true" />
            ) : (
              <Pause className="size-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className={controlClass}
            aria-label="Próximo depoimento"
            onClick={() => shift(-1)}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          'cursor-grab touch-pan-y overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]',
          dragging && 'cursor-grabbing select-none',
        )}
        onMouseEnter={() => {
          hoverRef.current = true
        }}
        onMouseLeave={() => {
          hoverRef.current = false
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          <CardSet expandedId={expandedId} onToggle={toggleExpanded} />
          <CardSet hidden expandedId={expandedId} onToggle={toggleExpanded} />
        </div>
      </div>

      <div
        ref={staticRef}
        className="hidden snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 motion-reduce:flex sm:px-6 md:px-8 lg:px-12 xl:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div key={item.id} className="snap-start">
            <TestemonialCard
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => toggleExpanded(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      aria-roledescription="carrossel"
      className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32"
    >
      <SectionGlow variant="center" />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <SectionReveal>
            <SectionHeading
              label={label}
              titleId="depoimentos-titulo"
              title={title}
              description={description}
              className="mb-0 lg:mb-0"
            />
          </SectionReveal>
        </div>

        <TestemonialCarousel />
      </div>
    </section>
  )
}
