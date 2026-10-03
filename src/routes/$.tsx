import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '#/components/pages/NotFound'
import { createPageMeta } from '#/lib/seo'

export const Route = createFileRoute('/$')({
  head: () => {
    const { meta, links } = createPageMeta({
      title: 'Página não encontrada — Vitor Hugo',
      description: 'A página solicitada não foi encontrada.',
      noIndex: true,
    })

    return { meta, links }
  },
  component: NotFound,
})
