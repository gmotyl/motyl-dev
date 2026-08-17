'use client'

import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface SectionPlayFromHereProps {
  sectionIndex: number
  onPlayFromHere: (sectionIndex: number) => void
  disabled?: boolean
  className?: string
}

export function SectionPlayFromHere({
  sectionIndex,
  onPlayFromHere,
  disabled = false,
  className,
}: SectionPlayFromHereProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => onPlayFromHere(sectionIndex)}
      disabled={disabled}
      className={cn(
        'my-4 min-h-[56px] w-full justify-center gap-2 border-primary/60 text-base',
        className
      )}
      aria-label="Play from here"
    >
      <Play className="h-5 w-5" aria-hidden="true" />
      Play from here
    </Button>
  )
}

export default SectionPlayFromHere
