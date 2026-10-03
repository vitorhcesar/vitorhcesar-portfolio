interface ProjectTechStackProps {
  technologies: string[]
}

export function ProjectTechStack({ technologies }: ProjectTechStackProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-[#9fd6ff]/80 sm:text-sm"
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}
