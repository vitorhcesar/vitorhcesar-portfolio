/**
 * Depoimentos reais extraídos das avaliações de clientes.
 * O texto de cada avaliação é mantido como foi escrito.
 */

export interface ITestemonial {
  id: string
  project: string
  author: string
  rating: number
  date: string
  quote: string
  skills: string[]
}

export const testemonialsContent = {
  label: '// Depoimentos',
  title: 'Quem já contratou volta a chamar',
  description:
    'Avaliações reais de clientes em projetos de site, sistema, app, automação e integração. Todas com nota máxima.',
  items: [
    {
      id: 'johnny-andrews',
      project:
        'Desenvolvimento de Sistema Web Completo para Gestão de Identificação de Pets Vip Pets',
      author: 'Johnny Andrews',
      rating: 5,
      date: 'há 1 mês',
      quote:
        'Vitor é um freelancer nota 1000! Fez exatamente o que eu precisava e ainda entregou o trabalho muito antes do prazo combinado. Demonstrou conhecimento, profissionalismo e muita competência durante todo o projeto. Sem dúvidas voltarei a contratar para outros trabalhos. Para quem estiver pensando em contratá-lo, pode ir de olhos fechados: ele sabe muito bem o que faz. Recomendo demais!',
      skills: [
        'PHP',
        'MySQL',
        'HTML',
        'CSS',
        'JavaScript',
        'Responsive Web Design',
        'Database',
        'API',
      ],
    },
    {
      id: 'john-lucas',
      project: 'Criação de Duas Páginas de Vendas para Low Tiket',
      author: 'John Lucas Vialle da Silva dos Santos',
      rating: 5,
      date: 'há 1 mês',
      quote: 'Trabalho impecável.',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Responsive Web Design',
        'Design Gráfico',
      ],
    },
    {
      id: 'marcio',
      project:
        'Desenvolvimento de Nova Funcionalidade para Plataforma Next.js Existente',
      author: 'Marcio',
      rating: 5,
      date: 'há 8 meses',
      quote:
        'Ótimo profissional, me indicou melhorias na minha plataforma, fez o trabalho com excelência, entregando mais do que o esperado e muito antes do prazo estabelecido, com um preço super justo. Indico de olhos fechados, e com certeza voltaria a fazer outros trabalhos com o Vitor.',
      skills: ['JavaScript', 'React.js', 'HTML', 'CSS', 'Next.js'],
    },
    {
      id: 'roberio-dos-santos',
      project: 'Projeto em React Native com Expo',
      author: 'Robério dos Santos',
      rating: 5,
      date: 'há 1 ano',
      quote:
        'Profissional muito qualificado! Atendeu todas as expectativas. Indico fortemente.',
      skills: ['Android', 'iPhone', 'Responsive Web Design'],
    },
    {
      id: 'juarez',
      project: 'Converter uma Pagina de Vendas em Html',
      author: 'Juarez',
      rating: 5,
      date: 'há 1 ano',
      quote: 'Trabalho muito bem executado. Recomendo!',
      skills: [
        'HTML',
        'WordPress',
        'Responsive Web Design',
        'CSS',
        'JavaScript',
        'Web Design',
      ],
    },
    {
      id: 'marcos-henrique',
      project: 'Auteração',
      author: 'Marcos Henrique Ormundo Martins',
      rating: 5,
      date: 'há 1 ano',
      quote: 'Excelente profissional',
      skills: ['Adobe After Effects', 'Adobe Premiere', 'Edição de vídeo'],
    },
    {
      id: 'tiago',
      project: 'Whaticket implemetacao de menus extras',
      author: 'Tiago',
      rating: 5,
      date: 'há 1 ano',
      quote:
        'Muito bom recomendo 100% ... tem todo conhecimento que precisava para menu projeto... fez o projeto em tempo record ... so a agradecer pelo empenho e dedicação.',
      skills: ['JavaScript', 'PostgresSQL', 'React.js', 'Typescript'],
    },
    {
      id: 'paulo-milanels',
      project:
        'Integração para realizar conversa telefonica utilizando a Twillo',
      author: 'Paulo Milanels',
      rating: 5,
      date: 'há 1 ano',
      quote:
        'Vitor é um profissional muito dedicado e competentes, entendeu nossa demandada facilmente, e encontrou algumas alternativas diferentes para nosso projeto.\n\nVitor é bastante proativo e seus skill tecnológicos são bem diversificados. Profissional. Finalizou o projeto muito antes do esperado, super recomendo seu trabalho e certamente voltarei a fazer projetos futuros com ele.',
      skills: ['JavaScript', 'MySQL', 'PHP', 'API', 'Node.js', 'Python'],
    },
    {
      id: 'next-level',
      project: 'Automação de pagamentos via Pix',
      author: 'Next Level',
      rating: 5,
      date: 'há 1 ano',
      quote:
        'Vitor Hugo é um excelente profissional, tem conhecimento em várias linguagens e aspectos, é super flexível e facilmente indentificará e adaptará seu projeto!\nFoi super atencioso e educado, podem confiar de olhos fechados!\nCom toda certeza voltaria a trabalhar com ele, nota 10, ele é o profissional que você está procurando!',
      skills: ['JavaScript', 'MySQL', 'PHP', 'CSS'],
    },
    {
      id: 'geovane-soares',
      project: 'Plataforma de Atendimento via chatbot',
      author: 'Geovane Soares',
      rating: 5,
      date: 'há 2 anos',
      quote: 'Excelente profissional! Nota 10 ao seu trabalho!',
      skills: ['JavaScript', 'MySQL', 'PHP', 'API'],
    },
    {
      id: 'allisson',
      project: 'Mudar o Css do site',
      author: 'Allisson G. M. D.',
      rating: 5,
      date: 'há 2 anos',
      quote:
        'Excelente profissional, altamente qualificado e superou minhas expectativas! Super recomendo!!!',
      skills: ['JavaScript', 'MySQL', 'PHP', 'API', 'CSS', 'HTML'],
    },
    {
      id: 'samuel-ribeiro',
      project: 'Api De Consulta Mei (Dasn e Das)',
      author: 'Samuel Ribeiro',
      rating: 5,
      date: 'há 2 anos',
      quote:
        'Ótimo! Conduziu o projeto com profissionalismo, transparência e dedicação.',
      skills: ['JavaScript', 'API', 'HTML', 'WordPress'],
    },
    {
      id: 'leonardo',
      project: 'Bot para criar contas em site',
      author: 'Leonardo',
      rating: 5,
      date: 'há 2 anos',
      quote:
        'Vitor foi excepcional! Sempre respondendo rapidamente às mensagens. Entendeu perfeitamente o conceito passado e entregou o projeto exatamente como planejado. Com certeza recomendo à comunidade!',
      skills: ['Node.js', 'Python', 'Puppet', 'Selenium'],
    },
    {
      id: 'luiz-humberto',
      project: 'Vítor Hugo - Captação de dados',
      author: 'Luiz Humberto Zago Leão',
      rating: 5,
      date: 'há 2 anos',
      quote:
        'Profissional muito responsável, excelente comunicação, o projeto que fez para mim ficou maravilhoso e superou minhas expectativas.',
      skills: [],
    },
    {
      id: 'jonathan-verginio',
      project: 'Consulta de Cnpj Mei',
      author: 'Jonathan Verginio',
      rating: 5,
      date: 'há 2 anos',
      quote:
        'Inteligente, pensa rápido e resolve o problema mais rápido ainda, recomendo o trabalho dele fácil.',
      skills: [
        'HTML5',
        'MySQL',
        'PHP',
        'API',
        'CSS',
        'HTML',
        'JavaScript',
        'Responsive Web Design',
      ],
    },
    {
      id: 'danilo-carlos',
      project: 'Integração com Twillio voice + Chatgpt4.0 + phyton',
      author: 'Danilo Carlos',
      rating: 5,
      date: 'há 2 anos',
      quote:
        'Vitor Hugo, come o código é eficaz no literal da palavra, entrega rápido e parceiro entendo o projeto e indica melhorias. Podem contratar de olho fechado! Menino muito bom!',
      skills: ['Python', 'Twilio', 'ChatGPT'],
    },
  ] satisfies ITestemonial[],
}
