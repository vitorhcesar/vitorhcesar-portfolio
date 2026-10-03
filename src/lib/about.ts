import { siteConfig } from '#/lib/seo'

export interface IAboutValue {
  label: string
  description: string
}

export interface IAboutExperience {
  company: string
  role: string
  period: string
  description: string
  current?: boolean
  siteUrl?: string
}

export interface IAboutEducation {
  institution: string
  course: string
  period?: string
}

interface IAboutHighlights {
  title: string
  description: string
}

interface IAboutLinks {
  github: string
  cv: string
  linkedin: string
}

interface IAboutContent {
  tagline: string
  intro: string[]
  currentRole: {
    title: string
    stack: string[]
  }
  values: IAboutValue[]
  experience: IAboutExperience[]
  education: IAboutEducation[]
  links: IAboutLinks
}

export const aboutContent: IAboutContent = {
  tagline: 'A programação é a minha vida.',
  intro: [
    'Meu nome é Vítor Hugo, sou desenvolvedor full stack com mais de 5 anos de experiência profissional e atuo de forma autônoma no desenvolvimento de soluções digitais. Trabalho em projetos variados, desde plataformas SaaS e integrações entre sistemas até automações e aplicações web sob medida, acompanhando o processo desde a concepção até a implementação.',
    'Atualmente, curso o 8º período de Ciência da Computação no IBMR e sou técnico em Programação de Jogos Digitais pelo SENAI. Minha trajetória na tecnologia também inclui experiências na COREN-RJ, com criação de materiais visuais para redes sociais, e na ESSIA, onde trabalhei com edição de código XML para transformar capítulos de livros didáticos em experiências interativas na web.',
    'Minha formação e minhas experiências me permitem combinar conhecimentos de desenvolvimento, design e tecnologia para construir soluções funcionais, eficientes e alinhadas às necessidades de cada projeto.',
  ],
  currentRole: {
    title: 'Desenvolvedor Full Stack (autônomo)',
    stack: [
      'Next.js',
      'Tanstack Start',
      'TypeScript',
      'Tailwind CSS',
      'Python',
      'Node.js',
      'Bun',
      'Selenium',
      'Express.js',
      'Hono',
      'Docker',
      '+ outros...',
    ],
  },
  values: [
    {
      label: 'Foco',
      description: 'A chave para qualquer desafio dar certo.',
    },
    {
      label: 'Responsabilidade',
      description: 'Compromisso com entregas de qualidade.',
    },
    {
      label: 'Respeito',
      description: 'Procuro sempre o respeito com o próximo.',
    },
    {
      label: 'Colaboração',
      description: 'Trabalho bem em equipe.',
    },
  ] satisfies IAboutValue[],
  experience: [
    {
      company: 'Freelance',
      role: 'Desenvolvedor Full Stack',
      period: 'Atual',
      description:
        'Desenvolvimento autônomo de aplicações web, SaaS, APIs, integrações e automações com diversas tecnologias.',
      current: true,
    },
    {
      company: 'Astrofy',
      role: 'Desenvolvedor Frontend',
      period: '1 ano e 6 meses',
      description:
        'Desenvolvimento do frontend da plataforma Astrofy, utilizando tecnologias como Next.js, TypeScript, Tailwind CSS, Tanstack Query, React Flow e muito mais. Esse projeto foi um dos maiores que trabalhei, tendo mais de 1000 usuários ativos e muitas funcionalidades complexas implementadas.',
      siteUrl: 'https://app.astrofy.site',
    },
    {
      company: 'ESSIA',
      role: 'Editor de códigos XML',
      period: '6 meses',
      description:
        'Transformação de capítulos PDF de livros didáticos em livros totalmente interativos em ambiente web.',
    },
    {
      company: 'COREN-RJ',
      role: 'Assessoria técnica (design/redes sociais)',
      period: '8 meses',
      description:
        'Assessoria técnica no setor de design para redes sociais do Conselho Regional de Enfermagem do Rio de Janeiro.',
    },
  ] satisfies IAboutExperience[],
  education: [
    {
      institution: 'IBMR',
      course: 'Ciência da Computação',
      period: '8º período',
    },
    {
      institution: 'SENAI',
      course: 'Técnico em Programação de Jogos Digitais',
    },
    {
      institution: 'SESI',
      course: 'Ensino Médio',
    },
  ] satisfies IAboutEducation[],
  links: {
    github: siteConfig.github,
    cv: siteConfig.resume,
    linkedin: siteConfig.linkedin ?? '',
  },
} as const
