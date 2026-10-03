import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { useActiveSection } from '#/hooks/useActiveSection'
import { GithubIcon } from '../icons/GithubIcon'

const SCROLL_THRESHOLD = 48

interface INavLink {
  label: string
  href: string
}

const navLinks: INavLink[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

const sectionIds = navLinks.map((link) => link.href.slice(1))

function NavLink({
  label,
  href,
  active,
  onClick,
}: INavLink & { active: boolean; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative pb-1 text-[1rem] font-medium transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`hero-reveal-fade fixed top-0 right-0 left-0 z-50 px-4 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 sm:px-6 md:px-8 lg:px-12 xl:px-20 ${
        isScrolled
          ? 'border-b border-white/5 bg-background/75 shadow-lg shadow-black/10 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
      style={{ '--reveal-delay': '80ms' } as CSSProperties}
      onKeyDown={(event) => {
        if (event.key === 'Escape') closeMenu()
      }}
    >
      <div className="relative flex h-16 items-center justify-between sm:h-20">
        <a
          href="#inicio"
          aria-label="Ir para o início"
          className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          onClick={closeMenu}
        >
          <span className="text-2xl font-extrabold tracking-tighter">
            <img
              src="/images/logo-vh.png"
              alt="Vitor Hugo"
              className="h-7 w-auto sm:h-8"
            />
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 md:flex lg:gap-8 xl:gap-10"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={activeSection === link.href.slice(1)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="/vitor-cesar-pt.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir currículo em PDF"
            className="flex size-10 items-center justify-center gap-2 rounded-full border border-white/30 text-[.9rem] font-medium text-white transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:w-auto lg:px-4"
          >
            <FileText className="size-4" />
            <span className="hidden lg:inline">Currículo</span>
          </a>
          <a
            href="https://github.com/vitorhcesar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <GithubIcon />
          </a>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegação mobile"
        aria-hidden={!isMenuOpen}
        className={`absolute top-full right-4 left-4 overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-2xl backdrop-blur-xl transition-all duration-200 sm:right-6 sm:left-6 md:hidden ${
          isMenuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 p-3">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="rounded-xl px-4 py-3 hover:bg-white/5"
            >
              <NavLink
                {...link}
                active={activeSection === link.href.slice(1)}
                onClick={closeMenu}
              />
            </div>
          ))}
        </div>
      </nav>
    </header>
  )
}
