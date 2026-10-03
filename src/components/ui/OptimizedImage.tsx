interface OptimizedImageProps {
  src: string
  webpSrc?: string
  alt: string
  className?: string
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
