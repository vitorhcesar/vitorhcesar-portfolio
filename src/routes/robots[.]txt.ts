import { createFileRoute } from '@tanstack/react-router'
import { absoluteUrl } from '#/lib/seo'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`

        return new Response(robots, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
