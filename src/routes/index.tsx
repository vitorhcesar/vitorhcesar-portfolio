import { createFileRoute } from '@tanstack/react-router'
import { Header } from '#/components/layout/Header'
import { Hero } from '#/components/sections/Hero'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip bg-background">
      <Header />
      <Hero />
    </div>
  )
}
