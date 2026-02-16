'use client'

import { Play, Pause, Square, Loader2, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useTTS } from '@/hooks/useTTS'
import { cn } from '@/lib/utils'

interface TTSPlayerProps {
  content: string
  title?: string
  voice?: string
  className?: string
  compact?: boolean
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function TTSPlayer({ content, title, voice, className, compact = false }: TTSPlayerProps) {
  const {
    isPlaying,
    isBuffering,
    progress,
    currentTime,
    totalEstimatedTime,
    currentChunkIndex,
    totalChunks,
    play,
    pause,
    stop,
  } = useTTS(content, { voice })

  // Handle play click - no authentication required
  const handlePlayClick = () => {
    isPlaying ? pause() : play()
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Button
          onClick={handlePlayClick}
          variant={isPlaying ? 'default' : 'outline'}
          size="sm"
          disabled={isBuffering}
          className="gap-2"
          title={isPlaying ? 'Pause reading' : 'Read article aloud'}
        >
          {isBuffering ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isBuffering ? 'Loading...' : isPlaying ? 'Pause' : 'Read Aloud'}
        </Button>
        {isPlaying && (
          <Button onClick={stop} variant="ghost" size="sm" title="Stop reading">
            <Square className="h-4 w-4" />
          </Button>
        )}
        {isPlaying && (
          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('rounded-lg border bg-card p-4 shadow-sm', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          <span className="font-medium text-sm">
            {title ? `Playing: ${title}` : 'Text-to-Speech'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(totalEstimatedTime)}
          </span>
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePlayClick}
            variant={isPlaying ? 'default' : 'secondary'}
            size="sm"
            disabled={isBuffering}
            className="gap-2 min-w-[100px]"
          >
            {isBuffering ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Buffering...
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {progress > 0 ? 'Resume' : 'Play'}
              </>
            )}
          </Button>
          <Button
            onClick={stop}
            variant="outline"
            size="sm"
            disabled={!isPlaying && progress === 0}
            className="gap-2"
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          {totalChunks > 0 && (
            <span>
              Chunk {currentChunkIndex + 1} of {totalChunks}
            </span>
          )}
        </div>
      </div>

      {isBuffering && (
        <div className="mt-2 text-xs text-muted-foreground animate-pulse">Loading audio...</div>
      )}
    </div>
  )
}

export default TTSPlayer
