import { aboutContent } from '#/lib/about'
import { siteConfig } from '#/lib/seo'
import { getGithubUsername } from '#/lib/social-avatars'

export type ContactChannelType =
  'email' | 'github' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'resume'

export interface ContactChannel {
  type: ContactChannelType
  label: string
  description: string
  href: string
  external: boolean
}

export const contactContent = {
  title: 'Vamos tirar sua ideia do papel?',
  description:
    'Desenvolvo soluções digitais sob medida para transformar necessidades reais em produtos funcionais. Se você tem um projeto em mente, me chame!',
  panelCopy:
    'Projetos bem definidos, desafios técnicos e parcerias de longo prazo.',
  availability: 'DISPONÍVEL PARA NOVOS PROJETOS',
  responseTime: 'Retorno em até 24 horas úteis.',
  ctaLabel: 'Conversar sobre um projeto',
  footerTagline: 'Dedicatória primeiro a Deus, depois a minha esposa.',
} as const

function buildChannels(): ContactChannel[] {
  const channels: ContactChannel[] = []

  if (siteConfig.email) {
    channels.push({
      type: 'email',
      label: 'E-mail',
      description: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      external: false,
    })
  }

  channels.push({
    type: 'github',
    label: 'GitHub',
    description: `@${getGithubUsername(aboutContent.links.github)}`,
    href: aboutContent.links.github,
    external: true,
  })

  channels.push({
    type: 'instagram',
    label: 'Instagram',
    description: `@${siteConfig.instagramHandle}`,
    href: aboutContent.links.instagram,
    external: true,
  })

  channels.push({
    type: 'tiktok',
    label: 'TikTok',
    description: `@${siteConfig.instagramHandle}`,
    href: aboutContent.links.tiktok,
    external: true,
  })

  channels.push({
    type: 'youtube',
    label: 'YouTube',
    description: 'Assista ao canal',
    href: aboutContent.links.youtube,
    external: true,
  })

  if (aboutContent.links.linkedin) {
    channels.push({
      type: 'linkedin',
      label: 'LinkedIn',
      description: 'Conecte-se comigo',
      href: aboutContent.links.linkedin,
      external: true,
    })
  }

  channels.push({
    type: 'resume',
    label: 'Currículo',
    description: 'PDF em português',
    href: aboutContent.links.cv,
    external: true,
  })

  return channels
}

export const contactChannels = buildChannels()
