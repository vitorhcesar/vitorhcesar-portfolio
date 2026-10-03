export interface IProject {
  name: string
  description: string
  technologies: string[]
  url?: string
}

export const projects: IProject[] = [
  {
    name: 'Plataformas web escaláveis',
    description:
      'Desenvolvimento de aplicações web com React, Next.js e TypeScript, focadas em performance, SEO e experiência do usuário.',
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
  },
  {
    name: 'APIs e backends robustos',
    description:
      'Construção de APIs REST e serviços backend com Node.js e Python, com arquitetura modular e integração a bancos relacionais.',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    name: 'Aplicações mobile',
    description:
      'Apps mobile com React Native, compartilhando lógica de negócio e entregando interfaces nativas para iOS e Android.',
    technologies: ['React Native', 'TypeScript', 'Node.js'],
  },
]
