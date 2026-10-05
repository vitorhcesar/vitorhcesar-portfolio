import { GithubIcon } from '#/components/icons/GithubIcon'
import { InstagramIcon } from '#/components/icons/InstagramIcon'
import { TikTokIcon } from '#/components/icons/TikTokIcon'
import { YouTubeIcon } from '#/components/icons/YouTubeIcon'
import { LinkedInIcon } from '#/components/icons/LinkedInIcon'
import { aboutContent } from '#/lib/about'
import { contactContent } from '#/lib/contact'
import { cn } from '#/lib/cn'
import { siteConfig } from '#/lib/seo'
import { SectionReveal } from '../About/SectionReveal'

const socialLinks = [
  { label: 'GitHub', href: aboutContent.links.github, icon: <GithubIcon /> },
  {
    label: 'Instagram',
    href: aboutContent.links.instagram,
    icon: <InstagramIcon />,
  },
  {
    label: 'TikTok',
    href: aboutContent.links.tiktok,
    icon: <TikTokIcon />,
  },
  {
    label: 'YouTube',
    href: aboutContent.links.youtube,
    icon: <YouTubeIcon />,
  },
  ...(aboutContent.links.linkedin
    ? [
        {
          label: 'LinkedIn',
          href: aboutContent.links.linkedin,
          icon: <LinkedInIcon />,
        },
      ]
    : []),
]

export function ContactFooter() {
  const year = new Date().getFullYear()

  return (
    <SectionReveal delay={240} className="mt-16 border-t border-white/5 pt-10 lg:mt-20">
      <div
        className={cn(
          'flex flex-col items-center justify-between gap-6 sm:flex-row',
        )}
      >
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="mt-1 text-xs text-muted/70">{contactContent.footerTagline}</p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={link.label}
              className={cn(
                'flex size-10 items-center justify-center rounded-xl border border-white/10',
                'text-muted transition-colors hover:border-primary/30 hover:bg-surface/50 hover:text-white',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
              )}
            >
              <span className="[&_svg]:size-4">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
