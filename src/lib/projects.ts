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
    'Projetos reais que construo e coordeno — de gateways de pagamento a plataformas SaaS com milhares de usuários.',
  items: [
    {
      slug: 'raytickets',
      name: 'Raytickets',
      description:
        'Como CEO, coordeno o desenvolvimento da Raytickets — plataforma SaaS B2B de atendimento, vendas e automação via WhatsApp. Inbox multiatendente em tempo real, CRM, campanhas, editor visual de fluxos, agentes de IA e billing integrado (Stripe/Mercado Pago).',
      technologies: [
        'TanStack Start',
        'React',
        'TypeScript',
        'Elysia',
        'Bun',
        'Prisma',
        'PostgreSQL',
        'Socket.IO',
        'React Flow',
        'Stripe',
      ],
      screenshots: [
        {
          src: '/images/projects/raytickets/01.png',
          webpSrc: '/images/projects/raytickets/01.webp',
          alt: 'Inbox de atendimento da Raytickets',
        },
        {
          src: '/images/projects/raytickets/02.png',
          webpSrc: '/images/projects/raytickets/02.webp',
          alt: 'Editor visual de fluxos da Raytickets',
        },
      ],
      url: 'https://app.raytickets.com',
    },
    {
      slug: 'planeja-post',
      name: 'PlanejaPost',
      description:
        'Como sócio, coordeno o desenvolvimento do PlanejaPost — SaaS de agendamento e publicação multi-plataforma para criadores e agências. Conexão OAuth em 6 redes, workspaces, agendamento com filas, assinaturas com PIX e cartão, painel admin e landing SEO.',
      technologies: [
        'TanStack Start',
        'React',
        'TypeScript',
        'Elysia',
        'Bun',
        'Prisma',
        'PostgreSQL',
        'Better Auth',
        'Stripe',
        'Docker',
      ],
      screenshots: [
        {
          src: '/images/projects/planeja-post/01.png',
          webpSrc: '/images/projects/planeja-post/01.webp',
          alt: 'Painel de publicações do PlanejaPost',
        },
        {
          src: '/images/projects/planeja-post/02.png',
          webpSrc: '/images/projects/planeja-post/02.webp',
          alt: 'Agendamento multi-plataforma do PlanejaPost',
        },
      ],
      url: 'https://app.planejapost.com',
    },
    {
      slug: 'astrofy',
      name: 'Astrofy',
      description:
        'Desenvolvimento do frontend da Astrofy — plataforma SaaS de automação e gestão de bots (Telegram/Discord) com mais de 1000 usuários ativos. Editor visual de fluxos, checkouts, assinaturas, remarketing, afiliados e painel admin com arquitetura em camadas.',
      technologies: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'TanStack Query',
        'React Flow',
        'Zustand',
        'Stripe',
        'Docker',
      ],
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
      slug: 'oasyfy',
      name: 'Oasyfy',
      description:
        'Desenvolvimento full stack do Oasyfy — gateway de pagamentos PIX com portais admin e seller, KYC, checkout personalizado, API gateway, webhooks, roteamento entre adquirentes e PWA com push notifications.',
      technologies: [
        'React',
        'Vite',
        'TypeScript',
        'Elysia',
        'Bun',
        'Prisma',
        'PostgreSQL',
        'Redis',
        'BullMQ',
        'Docker',
      ],
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
      url: 'https://app.oasyfyv2.com.br',
    },
  ] satisfies IProject[],
} as const

export const projects = projectsContent.items
