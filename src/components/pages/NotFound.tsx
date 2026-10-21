import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
