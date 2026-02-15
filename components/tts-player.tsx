'use client'

import { Play, Pause, Square, Loader2, Volume2, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useTTS } from '@/hooks/useTTS'
import { cn } from '@/lib/utils'
import { useSession, signIn } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

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

// Login modal component (reused in both compact and full views)
const LoginModal = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sign In Required</DialogTitle>
        <DialogDescription>
          You need to sign in to use the Text-to-Speech feature. This helps protect the API from
          abuse.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 mt-4">
        <Button
          onClick={() => {
            signIn()
            onOpenChange(false)
          }}
          className="gap-2"
        >
          <LogIn className="h-4 w-4" />
          Sign In with GitHub
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)

export function TTSPlayer({ content, title, voice, className, compact = false }: TTSPlayerProps) {
  const { data: session } = useSession()
  const [showLoginModal, setShowLoginModal] = useState(false)

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

  // Handle play click - show login modal if not authenticated
  const handlePlayClick = () => {
    if (!session?.user) {
      setShowLoginModal(true)
      return
    }
    isPlaying ? pause() : play()
  }

  // Handle login
  const handleLogin = () => {
    signIn()
    setShowLoginModal(false)
  }

  if (compact) {
    return (
      <>
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

        <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      </>
    )
  }

  return (
    <>
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

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  )
}

export default TTSPlayer
