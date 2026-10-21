import { createFileRoute } from '@tanstack/react-router'
import { ContactModalProvider } from '#/components/contact/ContactModalProvider'
import { Header } from '#/components/layout/Header'
import { About } from '#/components/sections/About'
import { Contact } from '#/components/sections/Contact'
import { Hero } from '#/components/sections/Hero'
import { Projects } from '#/components/sections/Projects'
import { Proof } from '#/components/sections/Proof'
import { Testimonials } from '#/components/sections/Testimonials'
import { SplashBlockPrompt } from '#/components/splash/SplashBlockPrompt'
import { SplashScreen } from '#/components/splash/SplashScreen'
import { useState } from 'react'
import {
  createPageMeta,
  createPersonJsonLd,
  jsonLdScript,
} from '#/lib/seo'
import { isCurriculumMode } from '#/lib/site-mode'

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
  const [showSplashPrompt, setShowSplashPrompt] = useState(false)
  const curriculumMode = isCurriculumMode()

  return (
    <ContactModalProvider>
      <div className="relative min-h-dvh w-full overflow-x-clip bg-background">
        <SplashScreen onComplete={() => setShowSplashPrompt(true)} />
        <SplashBlockPrompt visible={showSplashPrompt} />
        <Header />
        <main id="conteudo-principal">
          <Hero />
          <Proof />
          <Testimonials />
          <About />
          <Projects />
          {!curriculumMode && <Contact />}
        </main>
      </div>
    </ContactModalProvider>
  )
}
