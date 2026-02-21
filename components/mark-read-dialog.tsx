'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface MarkReadItem {
  slug: string
  title: string
}

interface MarkReadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: MarkReadItem[]
  onConfirm: (selectedSlugs: string[]) => void
  onCancel: () => void
}

export function MarkReadDialog({
  open,
  onOpenChange,
  items,
  onConfirm,
  onCancel,
}: MarkReadDialogProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Pre-check all items when dialog opens
  useEffect(() => {
    if (open) {
      setSelected(new Set(items.map(item => item.slug)))
    }
  }, [open, items])

  const toggleItem = (slug: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === items.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(items.map(item => item.slug)))
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onCancel()
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark articles as read</DialogTitle>
          <DialogDescription>
            Select which articles you've actually read. Uncheck any you skipped.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto py-2">
          {items.length > 1 && (
            <div className="flex items-center gap-3 pb-2 border-b border-border/40">
              <Checkbox
                id="select-all"
                checked={selected.size === items.length}
                onCheckedChange={toggleAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                {selected.size === items.length ? 'Uncheck all' : 'Check all'}
              </label>
            </div>
          )}

          {items.map((item) => (
            <div key={item.slug} className="flex items-start gap-3">
              <Checkbox
                id={item.slug}
                checked={selected.has(item.slug)}
                onCheckedChange={() => toggleItem(item.slug)}
                className="mt-0.5"
              />
              <label
                htmlFor={item.slug}
                className="text-sm leading-snug cursor-pointer"
              >
                {item.title}
              </label>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel}>
            Skip
          </Button>
          <Button onClick={() => onConfirm([...selected])}>
            Mark {selected.size} as read
          </Button>
        </DialogFooter>

        <div className="pt-3 border-t border-border/40">
          <a
            href="https://www.buymeacoffee.com/motyl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors text-white hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #BD5FFF 0%, #9d3dff 100%)',
            }}
          >
            ☕ Enjoyed the reads? Fuel the next ones
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
