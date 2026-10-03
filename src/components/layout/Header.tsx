import { FileText } from 'lucide-react'
import { GithubIcon } from '../icons/GithubIcon'

interface INavLink {
  label: string
  href: string
  active: boolean
}

const navLinks: INavLink[] = [
  { label: 'Início', href: '#inicio', active: true },
  { label: 'Sobre', href: '#sobre', active: false },
  { label: 'Projetos', href: '#projetos', active: false },
  { label: 'Contato', href: '#contato', active: false },
]

function NavLink({ label, href, active }: INavLink) {
  return (
    <a
      href={href}
      className={`relative pb-1 text-[1rem] font-medium transition-colors hover:text-white ${
        active ? 'text-white' : 'text-muted'
      }`}
    >
      {label}
      {active && (
        <span className="absolute right-0 -bottom-0.5 left-0 mx-auto h-0.5 w-5 rounded-full bg-primary" />
      )}
    </a>
  )
}

export function Header() {
  return (
    <header className="absolute top-0 right-0 left-0 z-50 px-8 lg:px-12 xl:px-20">
      <div className="relative flex h-20 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="text-2xl font-extrabold tracking-tighter">
            <img src="/images/logo-vh.png" alt="Vitor Hugo" className="h-8" />
          </span>
        </a>

        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="/vitor-cesar-pt.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[.9rem] font-medium text-white transition-colors hover:border-white/50"
          >
            <FileText className="size-4" />
            Currículo
          </a>
          <a
            href="https://github.com/vitorhcesar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/50"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </header>
  )
}
