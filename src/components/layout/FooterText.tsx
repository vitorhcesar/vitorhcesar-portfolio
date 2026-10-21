import { cn } from '#/lib/cn'
import { contactContent } from '#/lib/contact'
import { siteConfig } from '#/lib/seo'

interface IFooterText {
  className?: string
}

export function FooterText({ className }: IFooterText) {
  const year = new Date().getFullYear()

  return (
    <div className={cn('w-full text-center', className)}>
      <p className="text-sm text-muted">
        © {year} {siteConfig.name}. Todos os direitos reservados.
      </p>
      <p className="mt-1 text-xs text-muted/70">
        {contactContent.footerTagline}
      </p>
    </div>
  )
}
