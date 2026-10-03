import { useContactModal } from '#/components/contact/ContactModalProvider'
import { GithubIcon } from '#/components/icons/GithubIcon'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { cn } from '#/lib/cn'
import { siteConfig } from '#/lib/seo'
import { ArrowRight, FileText, Mail, MessageSquare } from 'lucide-react'

export function Contact() {
  const { openContactModal } = useContactModal()

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="border-t border-white/5 px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="// Contato"
          titleId="contato-titulo"
          title="Vamos conversar?"
          description="Estou aberto a novas oportunidades, projetos e parcerias. Entre em contato por um dos canais abaixo."
        />

        <button
          type="button"
          onClick={openContactModal}
          className={cn(
            'mb-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 sm:w-auto',
            'bg-primary text-base font-semibold text-white',
            'shadow-[0_8px_28px_rgba(37,99,235,0.35)]',
            'transition-colors hover:bg-primary-light',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light',
          )}
        >
          <MessageSquare className="size-5" />
          Enviar mensagem
        </button>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-6 transition-colors hover:border-primary/30 hover:bg-surface/80"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">E-mail</p>
                <p className="text-sm text-muted">{siteConfig.email}</p>
              </div>
              <ArrowRight className="ml-auto size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </a>
          )}

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer me"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-6 transition-colors hover:border-primary/30 hover:bg-surface/80"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GithubIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-white">GitHub</p>
              <p className="text-sm text-muted">@vitorhcesar</p>
            </div>
            <ArrowRight className="ml-auto size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-white" />
          </a>

          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/50 p-6 transition-colors hover:border-primary/30 hover:bg-surface/80"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">Currículo</p>
              <p className="text-sm text-muted">PDF em português</p>
            </div>
            <ArrowRight className="ml-auto size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  )
}
