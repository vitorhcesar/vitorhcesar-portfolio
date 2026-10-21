import type { CSSProperties } from 'react'

interface OptimizedImageProps {
  src: string
  webpSrc?: string
  alt: string
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
  ariaHidden?: boolean
}

export function OptimizedImage({
  src,
  webpSrc,
  alt,
  className,
  style,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  sizes,
  ariaHidden,
}: OptimizedImageProps) {
  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
        <img
          src={src}
          alt={alt}
          className={className}
          style={style}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          sizes={sizes}
          aria-hidden={ariaHidden}
          decoding="async"
        />
      </picture>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
      aria-hidden={ariaHidden}
      decoding="async"
    />
  )
}
