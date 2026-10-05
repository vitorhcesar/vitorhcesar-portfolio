import { GithubIcon } from '#/components/icons/GithubIcon'
import { InstagramIcon } from '#/components/icons/InstagramIcon'
import { TikTokIcon } from '#/components/icons/TikTokIcon'
import { YouTubeIcon } from '#/components/icons/YouTubeIcon'
import { LinkedInIcon } from '#/components/icons/LinkedInIcon'
import {
  contactChannels,
  type ContactChannel,
  type ContactChannelType,
} from '#/lib/contact'
import { cn } from '#/lib/cn'
import { siteConfig } from '#/lib/seo'
import { ArrowRight, Check, Copy, FileText, Mail } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { SectionReveal } from '../About/SectionReveal'
import { SocialLinkIcon } from '../About/SocialLinkIcon'

function getChannelIcon(type: ContactChannelType): ReactNode {
  switch (type) {
    case 'email':
      return <Mail className="size-5" aria-hidden />
    case 'github':
      return <GithubIcon />
    case 'instagram':
      return <InstagramIcon />
    case 'tiktok':
      return <TikTokIcon />
    case 'youtube':
      return <YouTubeIcon />
    case 'linkedin':
      return <LinkedInIcon />
    case 'resume':
      return <FileText className="size-5" aria-hidden />
  }
}

function LabelWithIcon({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium text-white">
      <span className="text-primary [&_svg]:size-4">{icon}</span>
      {label}
    </p>
  )
}

function EmailChannelCard({ channel }: { channel: ContactChannel }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const email = siteConfig.email
    if (!email) return

    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast.success('E-mail copiado!')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Não foi possível copiar o e-mail')
    }
  }

  const icon = getChannelIcon(channel.type)

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-6',
        'transition-colors hover:border-primary/30 hover:bg-surface/80',
      )}
    >
      <SocialLinkIcon
        avatarUrl={siteConfig.socialAvatar}
        label={channel.label}
        fallbackIcon={icon}
      />
      <div className="min-w-0 flex-1">
        <LabelWithIcon label={channel.label} icon={icon} />
        <p className="truncate text-sm text-muted">{channel.description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'E-mail copiado' : 'Copiar e-mail'}
          className={cn(
            'flex size-9 items-center justify-center rounded-lg border border-white/10',
            'text-muted transition-colors hover:border-primary/30 hover:bg-white/5 hover:text-white',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
          )}
        >
          {copied ? (
            <Check className="size-4 text-primary-light" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
        </button>
        <a
          href={channel.href}
          aria-label={`Enviar e-mail para ${channel.description}`}
          className={cn(
            'flex size-9 items-center justify-center rounded-lg border border-white/10',
            'text-muted transition-colors hover:border-primary/30 hover:bg-white/5 hover:text-white',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
          )}
        >
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </div>
  )
}

function ChannelCard({ channel }: { channel: ContactChannel }) {
  if (channel.type === 'email') {
    return <EmailChannelCard channel={channel} />
  }

  const icon = getChannelIcon(channel.type)

  return (
    <a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer me' : undefined}
      className={cn(
        'group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-6',
        'transition-colors hover:border-primary/30 hover:bg-surface/80',
      )}
    >
      <SocialLinkIcon
        avatarUrl={siteConfig.socialAvatar}
        label={channel.label}
        fallbackIcon={icon}
      />
      <div className="min-w-0 flex-1">
        <LabelWithIcon label={channel.label} icon={icon} />
        <p className="truncate text-sm text-muted">{channel.description}</p>
      </div>
      <ArrowRight
        className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-white"
        aria-hidden
      />
    </a>
  )
}

export function ContactChannels() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {contactChannels.map((channel, index) => (
        <SectionReveal key={channel.type} delay={160 + index * 60}>
          <ChannelCard channel={channel} />
        </SectionReveal>
      ))}
    </div>
  )
}
