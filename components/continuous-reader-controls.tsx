'use client'

import { BookCheck, ChevronDown, Loader2, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ContinuousReaderControlsProps {
  isPlaying: boolean
  isBuffering?: boolean
  markReadDisabled?: boolean
  canNext?: boolean
  onMarkRead?: () => void
  onPlayPause: () => void
  onNext: () => void
  className?: string
}

export function ContinuousReaderControls({
  isPlaying,
  isBuffering = false,
  markReadDisabled = false,
  canNext = true,
  onMarkRead,
  onPlayPause,
  onNext,
  className,
}: ContinuousReaderControlsProps) {
  return (
    <div
      role="group"
      aria-label="Continuous reader controls"
      className={cn('flex w-full items-stretch gap-2 sm:flex-row', className)}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onMarkRead}
        disabled={markReadDisabled}
        className="min-h-[56px] flex-1 gap-2"
        aria-label="Mark read"
        data-reader-action="mark-read"
      >
        <BookCheck className="h-5 w-5" aria-hidden="true" />
        Mark read
      </Button>

      <Button
        type="button"
        variant={isPlaying ? 'default' : 'outline'}
        onClick={onPlayPause}
        className="min-h-[56px] flex-1 gap-2"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        aria-pressed={isPlaying}
        aria-busy={isBuffering}
        data-reader-action="play-pause"
      >
        {isBuffering ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5" aria-hidden="true" />
        )}
        {isPlaying ? 'Pause' : 'Play'}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onNext}
        disabled={!canNext}
        className="min-h-[56px] flex-1 gap-2"
        aria-label="Next"
        data-reader-action="next"
      >
        Next
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  )
}

export default ContinuousReaderControls
