import { cn } from '#/lib/cn'
import {
  blockSplash,
  dismissSplashPrompt,
  shouldShowSplashPrompt,
} from '#/lib/splash-storage'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SplashBlockPromptProps {
  visible: boolean
}

export function SplashBlockPrompt({ visible }: SplashBlockPromptProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!visible || !shouldShowSplashPrompt()) return

    const timer = window.setTimeout(() => setIsOpen(true), 600)
    return () => window.clearTimeout(timer)
  }, [visible])

  if (!isOpen) return null

  function handleBlock() {
    blockSplash()
    setIsOpen(false)
  }

  function handleKeep() {
    dismissSplashPrompt()
    setIsOpen(false)
  }

  function handleDismiss() {
    dismissSplashPrompt()
    setIsOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-labelledby="splash-prompt-title"
      aria-describedby="splash-prompt-description"
      className={cn(
        'fixed right-4 bottom-4 z-50 w-[min(100%,22rem)]',
        'rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-2xl backdrop-blur-xl',
        'splash-prompt-enter',
        'sm:right-6 sm:bottom-6',
      )}
    >
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Fechar"
        className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <X className="size-4" aria-hidden />
      </button>

      <p
        id="splash-prompt-title"
        className="pr-6 text-sm font-semibold text-white"
      >
        Desativar animação de entrada?
      </p>
      <p
        id="splash-prompt-description"
        className="mt-1.5 text-sm leading-relaxed text-muted"
      >
        Nas próximas visitas, a página abrirá direto no conteúdo.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleBlock}
          className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          Sim, desativar
        </button>
        <button
          type="button"
          onClick={handleKeep}
          className="flex-1 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          Manter animação
        </button>
      </div>
    </div>
  )
}
