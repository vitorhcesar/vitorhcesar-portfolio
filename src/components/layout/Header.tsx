import { FileText, Moon } from 'lucide-react'

const navLinks = [
  { label: 'Início', href: '#inicio', active: true },
  { label: 'Sobre', href: '#sobre', active: false },
  { label: 'Projetos', href: '#projetos', active: false },
  { label: 'Contato', href: '#contato', active: false },
]

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
            <a
              key={link.href}
              href={link.href}
              className={`relative pb-1 text-sm font-medium transition-colors hover:text-white ${
                link.active ? 'text-white' : 'text-muted'
              }`}
            >
              {link.label}
              {link.active && (
                <span className="absolute right-0 -bottom-0.5 left-0 mx-auto h-0.5 w-5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Alternar tema"
            className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-white"
          >
            <Moon className="h-[18px] w-[18px]" />
          </button>

          <a
            href="#"
            className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/50"
          >
            <FileText className="h-3.5 w-3.5" />
            Currículo
          </a>
        </div>
      </div>
    </header>
  )
}
