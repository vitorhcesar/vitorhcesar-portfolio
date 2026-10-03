import { GithubIcon } from '#/components/icons/GithubIcon'
import { aboutContent } from '#/lib/about'
import { cn } from '#/lib/cn'
import { ArrowRight, FileText, Link2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionReveal } from './SectionReveal'

interface AboutLinkItem {
  label: string
  description: string
  href: string
  icon: ReactNode
}

const links: AboutLinkItem[] = [
  {
    label: 'GitHub',
    description: '@vitorhcesar',
    href: aboutContent.links.github,
    icon: <GithubIcon />,
  },
  {
    label: 'Currículo online',
    description: 'Experiência e projetos detalhados',
    href: aboutContent.links.cv,
    icon: <FileText className="size-5" aria-hidden="true" />,
  },
]

if (aboutContent.links.linkedin) {
  links.push({
    label: 'LinkedIn',
    description: 'Conecte-se comigo',
    href: aboutContent.links.linkedin,
    icon: <Link2 className="size-5" aria-hidden="true" />,
  })
}

export function AboutLinks() {
  return (
    <SectionReveal delay={200} className="mt-10 lg:mt-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {link.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-white">{link.label}</p>
              <p className="text-sm text-muted">{link.description}</p>
            </div>
            <ArrowRight
              className="ml-auto size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-white"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </SectionReveal>
  )
}
