import { projects } from '#/lib/projects'

export const siteConfig = {
  name: 'Vitor Hugo',
  title: 'Vitor Hugo | Desenvolvedor Full Stack',
  description:
    'Portfólio de Vitor Hugo. Desenvolvimento web e mobile com React, Next.js e TypeScript. Mais de 5 anos de experiência.',
  locale: 'pt_BR',
  language: 'pt-BR',
  author: 'Vitor Hugo César',
  keywords: [
    'Vitor Hugo',
    'desenvolvedor full stack',
    'desenvolvedor web',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'portfólio',
    'desenvolvedor Brasil',
  ],
  url: import.meta.env.VITE_SITE_URL ?? 'https://vitorhcesar.dev',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@vitorhcesar',
  github: 'https://github.com/vitorhcesar',
  linkedin: import.meta.env.VITE_LINKEDIN_URL as string | undefined,
  email: import.meta.env.VITE_CONTACT_EMAIL as string | undefined,
  resume: '/vitor-cesar-pt.pdf',
  themeColor: '#020617',
} as const

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).href
}

function getSameAsLinks() {
  return [siteConfig.github, siteConfig.linkedin].filter(Boolean) as string[]
}

type MetaTag = {
  title?: string
  name?: string
  property?: string
  content?: string
  charSet?: string
}

export function createPageMeta({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}) {
  const pageTitle = title ?? siteConfig.title
  const pageDescription = description ?? siteConfig.description
  const canonicalUrl = absoluteUrl(path)
  const ogImageUrl = absoluteUrl(image ?? siteConfig.ogImage)

  const meta: MetaTag[] = [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    { name: 'author', content: siteConfig.author },
    { name: 'keywords', content: siteConfig.keywords.join(', ') },
    { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' },
    { name: 'theme-color', content: siteConfig.themeColor },
    { name: 'color-scheme', content: 'dark' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: siteConfig.locale },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${siteConfig.name} — Desenvolvedor Full Stack` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImageUrl },
    { name: 'twitter:image:alt', content: `${siteConfig.name} — Desenvolvedor Full Stack` },
  ]

  if (siteConfig.twitterHandle) {
    meta.push({ name: 'twitter:creator', content: siteConfig.twitterHandle })
  }

  const links = [
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'alternate', href: canonicalUrl, hrefLang: siteConfig.language },
  ]

  return { meta, links }
}

export function createPersonJsonLd() {
  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.author,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    jobTitle: 'Desenvolvedor Full Stack',
    description: siteConfig.description,
    sameAs: getSameAsLinks(),
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'React Native',
      'Python',
    ],
  }

  if (siteConfig.email) {
    person.email = siteConfig.email
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: { '@id': `${siteConfig.url}/#person` },
        mainEntity: { '@id': `${siteConfig.url}/#person` },
      },
      person,
      {
        '@type': 'ItemList',
        '@id': `${siteConfig.url}/#projects`,
        name: 'Projetos de Vitor Hugo',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.name,
            description: project.description,
            keywords: project.technologies.join(', '),
          },
        })),
      },
    ],
  }
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data),
  }
}
