export interface IProjectScreenshot {
  src: string
  alt: string
}

export interface IProject {
  slug: string
  name: string
  description: string
  technologies: string[]
  screenshots: IProjectScreenshot[]
  url?: string
  addressBar?: string
}

interface IProjectsContent {
  description: string
  items: IProject[]
}

function buildScreenshots(
  slug: string,
  name: string,
  count: number,
): IProjectScreenshot[] {
  const items: IProjectScreenshot[] = [
    {
      src: `/images/projects/${slug}/01.webp`,
      alt: `Logo ${name}`,
    },
  ]

  for (let i = 2; i <= count; i++) {
    const num = String(i).padStart(2, '0')
    items.push({
      src: `/images/projects/${slug}/${num}.webp`,
      alt: `${name} — captura ${i - 1}`,
    })
  }

  return items
}

export const projectsContent: IProjectsContent = {
  description:
    'Projetos reais que construo e coordeno — de gateways de pagamento a plataformas SaaS com milhares de usuários.',
  items: [
    {
      slug: 'raytickets',
      name: 'Raytickets',
      description:
        'Como CEO, coordeno o desenvolvimento da Raytickets, uma plataforma SaaS B2B de atendimento, vendas e automação via WhatsApp. Inbox multiatendente em tempo real, CRM, campanhas, editor visual de fluxos, agentes de IA e billing integrado (Stripe/Mercado Pago).',
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
      screenshots: buildScreenshots('raytickets', 'Raytickets', 10),
      url: 'https://app.raytickets.com',
    },
    {
      slug: 'planeja-post',
      name: 'PlanejaPost',
      description:
        'Como sócio, coordeno o desenvolvimento do PlanejaPost, um SaaS de agendamento e publicação multi-plataforma para criadores e agências. Conexão OAuth em 6 redes, workspaces, agendamento com filas, assinaturas com PIX e cartão, painel admin e landing SEO.',
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
      screenshots: buildScreenshots('planeja-post', 'PlanejaPost', 7),
      url: 'https://app.planejapost.com',
    },
    {
      slug: 'astrofy',
      name: 'Astrofy',
      description:
        'Desenvolvimento do frontend da Astrofy, uma plataforma SaaS de automação e gestão de bots (Telegram/Discord) com mais de 1000 usuários ativos. Editor visual de fluxos, checkouts, assinaturas, remarketing, afiliados e painel admin com arquitetura em camadas.',
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
      screenshots: buildScreenshots('astrofy', 'Astrofy', 7),
      url: 'https://app.astrofy.site',
    },
    {
      slug: 'oasyfy',
      name: 'Oasyfy',
      description:
        'Desenvolvimento full stack do Oasyfy, um gateway de pagamentos PIX com portais admin e seller, KYC, checkout personalizado, API gateway, webhooks, roteamento entre adquirentes e PWA com push notifications.',
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
      screenshots: buildScreenshots('oasyfy', 'Oasyfy', 7),
      url: 'https://app.oasyfyv2.com.br',
    },
    {
      slug: 'vippets',
      name: 'VipPets',
      description:
        'Projeto freelance desenvolvido do zero para a VIP Pets, uma plataforma de identificação para animais com cadastro conversacional via chat, página pública acessada por QR Code na coleira, geração de códigos e dashboard para gestão da produção das identificações físicas.',
      technologies: [
        'React',
        'Vite',
        'TypeScript',
        'Hono',
        'Bun',
        'Prisma',
        'PostgreSQL',
        'MinIO',
        'Better Auth',
        'Tailwind CSS',
      ],
      screenshots: buildScreenshots('vippets', 'VipPets', 4),
      addressBar: 'anonimo',
    },
    {
      slug: 'claudia-cesar',
      name: 'Psicóloga Claudia Cesar',
      description:
        'Landing page desenvolvida para a psicóloga Claudia Cesar, com foco em conversão e SEO. Apresentação dos serviços de terapia individual e de casal, seções de acolhimento e processo terapêutico, integração com agendamento online e identidade visual refinada com tipografia serifada.',
      technologies: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Vercel Analytics',
      ],
      screenshots: buildScreenshots(
        'claudia-cesar',
        'Psicóloga Claudia Cesar',
        7,
      ),
      url: 'https://psicologa-claudia-cesar.com.br',
    },
  ] satisfies IProject[],
} as const

export const projects = projectsContent.items
