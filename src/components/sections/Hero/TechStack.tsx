const technologies = [
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

export function TechStack() {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-end gap-x-7 gap-y-4">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="flex h-8 w-8 items-center justify-center text-muted transition-colors group-hover:text-white">
              <TechIcon src={tech.icon} />
            </div>
            <span className="text-[10px] font-medium text-muted/70">
              {tech.name}
            </span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-medium text-muted/50">+ outras</span>
        </div>
      </div>
    </div>
  )
}

function TechIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="block h-6 w-6 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskMode: 'alpha',
      }}
    />
  )
}
