'use client'

import { useState, useEffect, useRef } from 'react'
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
  /** Slug of the article the reader is currently on; starts unchecked with a badge. */
  currentlyReadingSlug?: string | null
  onConfirm: (selectedSlugs: string[]) => void
  onCancel: () => void
}

export function MarkReadDialog({
  open,
  onOpenChange,
  items,
  currentlyReadingSlug,
  onConfirm,
  onCancel,
}: MarkReadDialogProps) {
  // The list is snapshotted on open: the parent recomputes `items` on every
  // render, so reading the live prop would reset the rows and wipe the user's
  // unchecks mid-dialog.
  const [snapshot, setSnapshot] = useState<MarkReadItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const wasOpen = useRef(false)

  // Snapshot the list and pre-check everything except the currently-read
  // article, on the closed -> open transition only
  useEffect(() => {
    if (open && !wasOpen.current) {
      setSnapshot(items)
      setSelected(
        new Set(
          items
            .filter(item => item.slug !== currentlyReadingSlug)
            .map(item => item.slug)
        )
      )
    }
    wasOpen.current = open
  }, [open, items, currentlyReadingSlug])

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
    if (selected.size === snapshot.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(snapshot.map(item => item.slug)))
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
          {snapshot.length > 1 && (
            <div className="flex items-center gap-3 pb-2 border-b border-border/40">
              <Checkbox
                id="select-all"
                checked={selected.size === snapshot.length}
                onCheckedChange={toggleAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                {selected.size === snapshot.length ? 'Uncheck all' : 'Check all'}
              </label>
            </div>
          )}

          {snapshot.map((item) => (
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
              {item.slug === currentlyReadingSlug && (
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  czytane teraz
                </span>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col sm:gap-2">
          <Button
            size="lg"
            className="w-full text-base"
            onClick={() => onConfirm([...selected])}
          >
            Mark {selected.size} as read
          </Button>
          <Button variant="ghost" size="sm" className="w-full" onClick={onCancel}>
            Skip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
