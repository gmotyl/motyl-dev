'use client'

import { BookCheck, ChevronDown, Loader2, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ContinuousReaderControlsProps {
  isPlaying: boolean
  isBuffering?: boolean
  markReadDisabled?: boolean
  canPlay?: boolean
  canNext?: boolean
  /**
   * The session reads with Edge because SPOCK (OmniVoice) did not answer. Marks
   * Play/Pause with an amber `Edge` under its label; nothing is rendered otherwise.
   */
  engineFallback?: boolean
  onMarkRead?: () => void
  onPlayPause: () => void
  onNext: () => void
  className?: string
}

export function ContinuousReaderControls({
  isPlaying,
  isBuffering = false,
  markReadDisabled = false,
  canPlay = true,
  canNext = true,
  engineFallback = false,
  onMarkRead,
  onPlayPause,
  onNext,
  className,
}: ContinuousReaderControlsProps) {
  const playLabel = isPlaying ? 'Pause' : 'Play'
  // The full reason lives in the accessible name and tooltip; the visible
  // marker stays one short word so the button keeps its height.
  const playName = engineFallback ? `${playLabel}, reading with Edge: SPOCK did not answer` : playLabel

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
        disabled={!canPlay}
        className="min-h-[56px] flex-1 gap-2"
        aria-label={playName}
        title={engineFallback ? playName : undefined}
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
        {/* Label and marker stack in one column INSIDE the button, so the
            marker adds no element to the bar and no height to the row. */}
        <span className="flex flex-col items-center leading-tight">
          {playLabel}
          {engineFallback && (
            <span
              data-reader-engine-marker
              aria-hidden="true"
              className={cn(
                'text-[10px] font-semibold',
                // Shade per variant so the 10px marker keeps >= 4.5:1 on every
                // background, hover included: playing sits on bg-primary
                // (near-black light / near-white dark), paused on bg-background.
                isPlaying ? 'text-amber-300 dark:text-amber-800' : 'text-amber-700 dark:text-amber-400'
              )}
            >
              Edge
            </span>
          )}
        </span>
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
