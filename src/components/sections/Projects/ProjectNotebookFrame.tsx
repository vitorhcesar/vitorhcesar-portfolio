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
          'w-full overflow-hidden rounded-xl border border-white/10 bg-[#141416]',
          'shadow-[0_24px_80px_rgba(0,0,0,0.45)]',
        )}
      >
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#1c1c1f] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
            <span className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
            <span className="size-2.5 rounded-full bg-[#28c840] sm:size-3" />
          </div>

          <div className="flex min-w-0 flex-1 justify-center px-1 sm:px-2">
            <div
              className={cn(
                'max-w-full truncate rounded-md border border-white/5 bg-[#0a0a0c] px-3 py-1',
                'text-[10px] text-muted/80 sm:text-xs',
              )}
            >
              {addressBar}
            </div>
          </div>

          <div className="hidden w-[52px] shrink-0 sm:block" aria-hidden="true" />
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
        className="mt-1 h-1.5 w-[72%] rounded-b-lg bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1d] sm:mt-1.5 sm:h-2"
        aria-hidden="true"
      />
    </div>
  )
}
