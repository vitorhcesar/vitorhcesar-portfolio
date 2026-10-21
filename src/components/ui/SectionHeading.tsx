import { cn } from '#/lib/cn'

interface SectionHeadingProps {
  label: string
  title: string
  titleId?: string
  description?: string
  className?: string
}

export function SectionHeading({
  label,
  title,
  titleId,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 max-w-2xl lg:mb-14', className)}>
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase sm:text-sm sm:tracking-[0.24em]">
        {label}
      </p>
      <h2
        id={titleId}
        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
