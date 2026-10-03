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
    <div className="mt-12 space-y-4">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        {firstFiveTechnologies.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        {otherTechnologies.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}

        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[.9rem] font-medium text-muted/70">
            + outras
          </span>
        </div>
      </div>
    </div>
  )
}

function TechItem({ tech }: { tech: ITechnology }) {
  return (
    <div className="group flex items-center gap-2">
      <div className="flex items-center justify-center text-muted transition-colors group-hover:text-white">
        <TechIcon src={tech.icon} />
      </div>
      <span className="text-[.9rem] font-medium text-muted/70">
        {tech.name}
      </span>
    </div>
  )
}

function TechIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="block size-9 bg-current mask-center mask-no-repeat mask-contain"
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskMode: 'alpha',
      }}
    />
  )
}
