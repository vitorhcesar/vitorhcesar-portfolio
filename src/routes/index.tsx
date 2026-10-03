import { createFileRoute } from '@tanstack/react-router'
import { Header } from '#/components/layout/Header'
import { About } from '#/components/sections/About'
import { Contact } from '#/components/sections/Contact'
import { Hero } from '#/components/sections/Hero'
import { Projects } from '#/components/sections/Projects'
import {
  createPageMeta,
  createPersonJsonLd,
  jsonLdScript,
} from '#/lib/seo'

export const Route = createFileRoute('/')({
  head: () => {
    const { meta, links } = createPageMeta({ path: '/' })

    return {
      meta,
      links,
      scripts: [jsonLdScript(createPersonJsonLd())],
    }
  },
  component: Home,
})

function Home() {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip bg-background">
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
