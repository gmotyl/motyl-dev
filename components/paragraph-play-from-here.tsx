'use client'

import { Play } from 'lucide-react'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ParagraphPlayFromHereProps {
  /** Markdown line the paragraph starts on; the reader maps it to a speech unit. */
  line: number
  onPlayFromLine: (line: number) => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

/**
 * Paragraph-granular "Play from here". Two click targets live in the DOM at once
 * and CSS alone picks the active one, so server markup never depends on pointer
 * capability: a gutter button on hover-capable pointers, tapping the paragraph
 * body on the rest.
 */
export function ParagraphPlayFromHere({
  line,
  onPlayFromLine,
  disabled = false,
  className,
  children,
}: ParagraphPlayFromHereProps) {
  const tapProbeRef = useRef<HTMLSpanElement>(null)

  // The probe is `display: none` unless `@media (hover: none)` matches, so reading
  // its computed style at click time is how the body-tap path learns it is inert
  // on hover-capable pointers — where the gutter button is the only click target.
  const bodyTapActive = (): boolean => {
    const probe = tapProbeRef.current
    if (!probe) return true
    return window.getComputedStyle(probe).display !== 'none'
  }

  const play = (): void => {
    if (!disabled) onPlayFromLine(line)
  }

  const handleBodyClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.button !== 0) return // keep the native context menu / middle click
    if (!bodyTapActive()) return
    const target = event.target as Element | null
    if (target?.closest('a, button')) return // links and buttons keep their own action
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return // selecting text is not a tap
    play()
  }

  return (
    <div className={cn('group relative', className)} onClick={handleBodyClick}>
      <span
        ref={tapProbeRef}
        aria-hidden="true"
        data-paragraph-tap-probe=""
        className="hidden [@media(hover:none)]:block"
      />
      <Button
        type="button"
        variant="ghost"
        onClick={(event) => {
          event.stopPropagation() // the body-tap path must not fire a second time
          play()
        }}
        disabled={disabled}
        data-line={line}
        aria-label="Play from here"
        className="absolute -left-9 top-1 hidden h-8 w-8 p-0 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:flex"
      >
        <Play className="h-4 w-4" aria-hidden="true" />
      </Button>
      {children}
    </div>
  )
}

export default ParagraphPlayFromHere
