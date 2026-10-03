export interface IProjectScreenshot {
  src: string
  webpSrc?: string
  alt: string
}

export interface IProject {
  slug: string
  name: string
  description: string
  technologies: string[]
  screenshots: IProjectScreenshot[]
  url?: string
}

interface IProjectsContent {
  description: string
  items: IProject[]
}

export const projectsContent: IProjectsContent = {
  description:
    'Projetos reais que construí — de gateways de pagamento a plataformas SaaS com milhares de usuários.',
  items: [
    {
      slug: 'oasyfy',
      name: 'Oasyfy',
      description:
        'Gateway de pagamentos com API PIX, portais admin e seller, KYC, checkout personalizado e integrações com adquirentes. Desenvolvimento full stack da plataforma completa.',
      technologies: ['React', 'Vite', 'Bun', 'Elysia', 'Prisma', 'PostgreSQL'],
      screenshots: [
        {
          src: '/images/projects/oasyfy/01.png',
          webpSrc: '/images/projects/oasyfy/01.webp',
          alt: 'Dashboard principal do Oasyfy',
        },
        {
          src: '/images/projects/oasyfy/02.png',
          webpSrc: '/images/projects/oasyfy/02.webp',
          alt: 'Portal seller do Oasyfy',
        },
      ],
      url: 'https://app.oasyfy.com',
    },
    {
      slug: 'astrofy',
      name: 'Astrofy',
      description:
        'Plataforma SaaS com mais de 1000 usuários ativos e funcionalidades complexas. Desenvolvimento do frontend com foco em performance, UX e escalabilidade.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'React Flow'],
      screenshots: [
        {
          src: '/images/projects/astrofy/01.png',
          webpSrc: '/images/projects/astrofy/01.webp',
          alt: 'Interface principal da Astrofy',
        },
        {
          src: '/images/projects/astrofy/02.png',
          webpSrc: '/images/projects/astrofy/02.webp',
          alt: 'Fluxo de automação da Astrofy',
        },
        {
          src: '/images/projects/astrofy/03.png',
          webpSrc: '/images/projects/astrofy/03.webp',
          alt: 'Painel de configurações da Astrofy',
        },
      ],
      url: 'https://app.astrofy.site',
    },
    {
      slug: 'projeto-interno',
      name: 'Plataforma Interna',
      description:
        'Sistema interno de gestão com dashboards em tempo real, relatórios customizados e integrações com APIs de terceiros. Projeto confidencial sem link público.',
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      screenshots: [
        {
          src: '/images/projects/projeto-interno/01.png',
          webpSrc: '/images/projects/projeto-interno/01.webp',
          alt: 'Dashboard da plataforma interna',
        },
      ],
    },
  ] satisfies IProject[],
} as const

export const projects = projectsContent.items
