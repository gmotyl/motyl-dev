'use client'

import { Play } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
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
 * and the pointer's hover capability picks the active one, so server markup never
 * depends on pointer capability: a gutter button on hover-capable pointers,
 * tapping the paragraph body on the rest.
 */
export function ParagraphPlayFromHere({
  line,
  onPlayFromLine,
  disabled = false,
  className,
  children,
}: ParagraphPlayFromHereProps) {
  // The same query the gutter button's CSS keys off, so exactly one of the two
  // targets is live. Read at click time, not render time, so a pointer change
  // needs no re-render. Without matchMedia (SSR, older jsdom) the body tap stays
  // active: CSS hides the gutter button on `hover: none`, so failing the other
  // way would leave a touch reader no target at all.
  const bodyTapActive = (): boolean => !window.matchMedia?.('(hover: hover)').matches

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
    // @tailwindcss/typography emits its edge margin resets as child combinators
    // (`.prose > :first-child`), and this wrapper is what the `.prose` child now
    // is, so it forwards them to the <p>; without that every article body gains a
    // trailing 1.25em.
    <div
      className={cn('group relative [&:first-child>p]:mt-0 [&:last-child>p]:mb-0', className)}
      onClick={handleBodyClick}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={(event) => {
          event.stopPropagation() // the body-tap path must not fire a second time
          play()
        }}
        disabled={disabled}
        // One tab stop per paragraph, all named the same, is unusable; the h2
        // SectionPlayFromHere is play-from-here's keyboard path. Still reachable
        // by pointer, and focus-visible below still applies to programmatic focus.
        tabIndex={-1}
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
