'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoTooltipProps {
  text: string
  className?: string
}

export function InfoTooltip({ text, className }: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const [openedByClick, setOpenedByClick] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const tooltipId = useId()

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
        setOpenedByClick(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setOpenedByClick(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const handleClick = () => {
    setOpenedByClick(true)
    setOpen(v => !v)
  }

  const handleMouseEnter = () => {
    if (!openedByClick) setOpen(true)
  }

  const handleMouseLeave = () => {
    if (!openedByClick) setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="More information"
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-xs rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-lg"
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      )}
    </div>
  )
}
