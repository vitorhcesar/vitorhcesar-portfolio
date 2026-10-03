import { GithubIcon } from '#/components/icons/GithubIcon'
import { InstagramIcon } from '#/components/icons/InstagramIcon'
import { LinkedInIcon } from '#/components/icons/LinkedInIcon'
import { aboutContent } from '#/lib/about'
import { cn } from '#/lib/cn'
import { getGithubUsername } from '#/lib/social-avatars'
import { siteConfig } from '#/lib/seo'
import { ArrowRight, FileText } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionReveal } from './SectionReveal'
import { SocialLinkIcon } from './SocialLinkIcon'

interface AboutLinkItem {
  label: string
  description: string
  href: string
  icon: ReactNode
  labelIcon?: ReactNode
  avatarUrl?: string
}

const links: AboutLinkItem[] = [
  {
    label: 'GitHub',
    description: `@${getGithubUsername(aboutContent.links.github)}`,
    href: aboutContent.links.github,
    icon: <GithubIcon />,
    labelIcon: <GithubIcon />,
    avatarUrl: siteConfig.socialAvatar,
  },
  {
    label: 'Instagram',
    description: `@${siteConfig.instagramHandle}`,
    href: aboutContent.links.instagram,
    icon: <InstagramIcon />,
    labelIcon: <InstagramIcon />,
    avatarUrl: siteConfig.socialAvatar,
  },
]

if (aboutContent.links.linkedin) {
  links.push({
    label: 'LinkedIn',
    description: 'Conecte-se comigo',
    href: aboutContent.links.linkedin,
    icon: <LinkedInIcon />,
    labelIcon: <LinkedInIcon />,
    avatarUrl: siteConfig.socialAvatar,
  })
}

links.push({
  label: 'Currículo',
  description: 'PDF em português',
  href: aboutContent.links.cv,
  icon: <FileText className="size-5" aria-hidden="true" />,
})

function LabelWithIcon({ label, labelIcon }: { label: string; labelIcon?: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium text-white">
      {labelIcon ? (
        <span className="text-primary [&_svg]:size-4">{labelIcon}</span>
      ) : null}
      {label}
    </p>
  )
}

export function AboutLinks() {
  return (
    <SectionReveal delay={200} className="mt-10 lg:mt-14">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer me"
            className={cn(
              'group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-6 transition-colors',
              'hover:border-primary/30 hover:bg-surface/80',
            )}
          >
            {link.avatarUrl ? (
              <SocialLinkIcon
                avatarUrl={link.avatarUrl}
                label={link.label}
                fallbackIcon={link.icon}
              />
            ) : link.labelIcon ? null : (
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {link.icon}
              </span>
            )}
            <div>
              <LabelWithIcon label={link.label} labelIcon={link.labelIcon} />
              <p className="text-sm text-muted">{link.description}</p>
            </div>
            <ArrowRight
              className="ml-auto size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-white"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </SectionReveal>
  )
}
