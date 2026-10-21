const variants = {
  right: [
    'bg-[radial-gradient(ellipse_at_88%_18%,rgba(37,99,235,0.11)_0%,transparent_55%)]',
    'bg-[radial-gradient(ellipse_at_10%_82%,rgba(22,136,245,0.09)_0%,transparent_50%)]',
  ],
  left: [
    'bg-[radial-gradient(ellipse_at_12%_28%,rgba(37,99,235,0.12)_0%,transparent_58%)]',
    'bg-[radial-gradient(ellipse_at_88%_72%,rgba(22,136,245,0.1)_0%,transparent_52%)]',
  ],
  center: [
    'bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.14)_0%,transparent_60%)]',
    'bg-[radial-gradient(ellipse_at_50%_100%,rgba(22,136,245,0.1)_0%,transparent_55%)]',
  ],
} as const

interface SectionGlowProps {
  variant?: keyof typeof variants
}

/** Brilho azul de fundo, no mesmo estilo das seções Sobre/Projetos/Contato. */
export function SectionGlow({ variant = 'right' }: SectionGlowProps) {
  const [first, second] = variants[variant]

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className={`absolute inset-0 ${first}`} />
      <div className={`absolute inset-0 ${second}`} />
    </div>
  )
}
