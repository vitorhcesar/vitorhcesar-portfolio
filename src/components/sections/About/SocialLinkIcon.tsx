import { cn } from '#/lib/cn'
import { useState, type ReactNode } from 'react'

interface SocialLinkIconProps {
  avatarUrl?: string
  label: string
  fallbackIcon: ReactNode
  className?: string
}

export function SocialLinkIcon({
  avatarUrl,
  label,
  fallbackIcon,
  className,
}: SocialLinkIconProps) {
  const [useFallback, setUseFallback] = useState(!avatarUrl)

  if (useFallback || !avatarUrl) {
    return (
      <span
        className={cn(
          'flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary',
          className,
        )}
      >
        {fallbackIcon}
      </span>
    )
  }

  return (
    <img
      src={avatarUrl}
      alt={`Foto de perfil — ${label}`}
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      className={cn('size-12 rounded-xl object-cover', className)}
      onError={() => setUseFallback(true)}
    />
  )
}
