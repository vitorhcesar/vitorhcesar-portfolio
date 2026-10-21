export interface IStat {
  value: string
  label: string
}

export const salesContent = {
  stats: [
    {
      value: '+5 anos',
      label: 'entregando software de verdade, não protótipo.',
    },
    {
      value: '+1.000',
      label: 'usuários ativos em uma plataforma que ajudei a construir.',
    },
    {
      value: `+25 projetos`,
      label: 'reais entregues, de SaaS a landing pages.',
    },
    { value: '24h úteis', label: 'para você receber o retorno do seu pedido.' },
  ] satisfies IStat[],
}
