import { createFileRoute } from '@tanstack/react-router'
import { Header } from '#/components/layout/Header'
import { Hero } from '#/components/sections/Hero'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Header />
      <Hero />
    </div>
  )
}
