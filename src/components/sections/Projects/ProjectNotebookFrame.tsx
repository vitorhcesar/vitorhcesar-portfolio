import { OptimizedImage } from '#/components/ui/OptimizedImage'
import type { IProjectScreenshot } from '#/lib/projects'
import { cn } from '#/lib/cn'

interface ProjectNotebookFrameProps {
  screenshot: IProjectScreenshot
  addressBar: string
  loading?: 'lazy' | 'eager'
  className?: string
}

export function ProjectNotebookFrame({
  screenshot,
  addressBar,
  loading = 'lazy',
  className,
}: ProjectNotebookFrameProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div
        className={cn(
          'w-full overflow-hidden bg-[#0a0a0c]',
          'rounded-none border-y border-white/10 lg:rounded-xl lg:border lg:bg-[#141416]',
          'shadow-[0_12px_40px_rgba(0,0,0,0.35)] lg:shadow-[0_24px_80px_rgba(0,0,0,0.45)]',
        )}
      >
        <div
          className={cn(
            'hidden items-center gap-3 border-b border-white/5 bg-[#1c1c1f] px-4 py-3',
            'lg:flex',
          )}
        >
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex min-w-0 flex-1 justify-center px-2">
            <div
              className={cn(
                'max-w-full truncate rounded-md border border-white/5 bg-[#0a0a0c] px-3 py-1',
                'text-xs text-muted/80',
              )}
            >
              {addressBar}
            </div>
          </div>

          <div className="w-[52px] shrink-0" aria-hidden="true" />
        </div>

        <div className="bg-[#0a0a0c]">
          <OptimizedImage
            src={screenshot.src}
            alt={screenshot.alt}
            className="block w-full object-contain object-top"
            loading={loading}
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
          />
        </div>
      </div>

      <div
        className="mt-1.5 hidden h-2 w-[72%] rounded-b-lg bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1d] lg:block"
        aria-hidden="true"
      />
    </div>
  )
}
