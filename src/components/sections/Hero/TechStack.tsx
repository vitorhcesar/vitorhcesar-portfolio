import type { CSSProperties } from 'react'

interface ITechnology {
  name: string
  icon: string
}

const technologies: ITechnology[] = [
  { name: 'Next.js', icon: '/icons/tech/nextjs.svg' },
  { name: 'React', icon: '/icons/tech/react.svg' },
  { name: 'TypeScript', icon: '/icons/tech/typescript.svg' },
  { name: 'Node.js', icon: '/icons/tech/nodejs.svg' },
  { name: 'PostgreSQL', icon: '/icons/tech/postgresql.svg' },
  { name: 'Docker', icon: '/icons/tech/docker.svg' },
  { name: 'Tailwind', icon: '/icons/tech/tailwind.svg' },
  { name: 'React Native', icon: '/icons/tech/react-native.svg' },
  { name: 'Python', icon: '/icons/tech/python.svg' },
]

const firstFiveTechnologies = technologies.slice(0, 5)

const otherTechnologies = technologies.slice(5)

export function TechStack() {
  return (
    <div className="mt-8 space-y-3 sm:mt-10 lg:space-y-4 2xl:mt-12">
      <div className="grid grid-cols-2 items-center gap-x-3 gap-y-3 min-[430px]:grid-cols-3 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-3 lg:gap-x-7 lg:gap-y-4">
        {firstFiveTechnologies.map((tech, index) => (
          <TechItem key={tech.name} tech={tech} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-2 items-center gap-x-3 gap-y-3 min-[430px]:grid-cols-3 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-3 lg:gap-x-7 lg:gap-y-4">
        {otherTechnologies.map((tech, index) => (
          <TechItem key={tech.name} tech={tech} index={index + 5} />
        ))}

        <div
          className="hero-reveal-item flex min-h-8 items-center sm:min-h-0 sm:flex-col sm:gap-1.5"
          style={
            {
              '--reveal-delay': `${760 + technologies.length * 50}ms`,
            } as CSSProperties
          }
        >
          <span className="text-xs font-medium text-muted/70 sm:text-[.8rem] 2xl:text-[.9rem]">
            + outras
          </span>
        </div>
      </div>
    </div>
  )
}

function TechItem({ tech, index }: { tech: ITechnology; index: number }) {
  return (
    <div
      className="hero-reveal-item group flex min-w-0 items-center gap-2"
      style={{ '--reveal-delay': `${760 + index * 50}ms` } as CSSProperties}
    >
      <div className="flex items-center justify-center text-muted transition-colors group-hover:text-white">
        <TechIcon src={tech.icon} />
      </div>
      <span className="truncate text-xs font-medium text-muted/70 sm:text-[.8rem] 2xl:text-[.9rem]">
        {tech.name}
      </span>
    </div>
  )
}

function TechIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="block size-7 shrink-0 bg-current mask-center mask-no-repeat mask-contain sm:size-8 2xl:size-9"
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskMode: 'alpha',
      }}
    />
  )
}
