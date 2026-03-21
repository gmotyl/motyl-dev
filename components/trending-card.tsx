'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ExternalLink, X } from 'lucide-react'
import { toast } from 'sonner'
import { VoteButton } from '@/components/vote-button'
import { CategoryIconMini } from '@/components/category-icon'
import { cn } from '@/lib/utils'
import { CONTENT_CATEGORIES, type ContentCategory } from '@/lib/og'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const ADMIN_HEADERS = { 'Content-Type': 'application/json', 'x-requested-with': 'motyl-admin' }
const SWIPE_MAX_PX = -100
const SWIPE_THRESHOLD_PX = -80

interface TrendingCardProps {
  title: string
  description?: string
  linkUrl: string
  voteCount: number
  category: ContentCategory
  sourceDomain?: string
  isSuperAdmin?: boolean
  onRemoved?: (linkUrl: string) => void
  onCategoryChanged?: (linkUrl: string, category: ContentCategory) => void
}

export function TrendingCard({
  title,
  description,
  linkUrl,
  voteCount,
  category,
  sourceDomain,
  isSuperAdmin,
  onRemoved,
  onCategoryChanged,
}: TrendingCardProps) {
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory>(category)
  const [isRemoving, setIsRemoving] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<ContentCategory>(category)

  // Swipe state
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      const res = await fetch('/api/trends/votes', {
        method: 'DELETE',
        headers: ADMIN_HEADERS,
        body: JSON.stringify({ linkUrl }),
      })
      if (!res.ok) throw new Error('Failed to remove')
      toast.success('Removed from trending')
      onRemoved?.(linkUrl)
    } catch (error) {
      console.error('Failed to remove item:', error)
      toast.error('Failed to remove item')
    } finally {
      setIsRemoving(false)
      setConfirmRemoveOpen(false)
    }
  }

  const handleCategoryChange = async () => {
    if (selectedCategory === currentCategory) {
      setCategoryDialogOpen(false)
      return
    }
    try {
      const res = await fetch('/api/trends/votes', {
        method: 'PATCH',
        headers: ADMIN_HEADERS,
        body: JSON.stringify({ linkUrl, category: selectedCategory }),
      })
      if (!res.ok) throw new Error('Failed to update')
      setCurrentCategory(selectedCategory)
      toast.success(`Category changed to ${selectedCategory}`)
      onCategoryChanged?.(linkUrl, selectedCategory)
    } catch (error) {
      console.error('Failed to change category:', error)
      toast.error('Failed to change category')
      setSelectedCategory(currentCategory)
    } finally {
      setCategoryDialogOpen(false)
    }
  }

  // Touch handlers for swipe-to-remove
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isSuperAdmin) return
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }, [isSuperAdmin])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSuperAdmin || !cardRef.current) return
    const delta = e.touches[0].clientX - touchStartX.current
    // Only allow swiping left
    if (delta < 0) {
      touchDeltaX.current = delta
      cardRef.current.style.transform = `translateX(${Math.max(delta, SWIPE_MAX_PX)}px)`
      cardRef.current.style.transition = 'none'
    }
  }, [isSuperAdmin])

  const onTouchEnd = useCallback(() => {
    if (!isSuperAdmin || !cardRef.current) return
    cardRef.current.style.transition = 'transform 0.2s ease-out'
    cardRef.current.style.transform = 'translateX(0)'
    if (touchDeltaX.current < SWIPE_THRESHOLD_PX) {
      setConfirmRemoveOpen(true)
    }
  }, [isSuperAdmin])

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Swipe background — red remove indicator */}
      {isSuperAdmin && (
        <div className="absolute inset-0 flex items-center justify-end pr-4 bg-red-600/20 rounded-lg">
          <X className="h-5 w-5 text-red-400" />
        </div>
      )}

      <div
        ref={cardRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={cn(
          'group relative rounded-lg border transition-all duration-200 hover:shadow-md flex flex-row overflow-hidden bg-background',
          `category-${currentCategory} unvisited-article`
        )}
      >
        {/* Left column: icon + vote */}
        <div className="flex-shrink-0 w-16 md:w-24 flex flex-col items-center gap-4 py-3 px-2">
          {isSuperAdmin ? (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(currentCategory)
                setCategoryDialogOpen(true)
              }}
              className="cursor-pointer hover:opacity-80 transition-opacity hover:ring-2 hover:ring-primary/40 rounded-lg"
              title="Change category"
            >
              <CategoryIconMini category={currentCategory} className="w-10 h-10" />
            </button>
          ) : (
            <CategoryIconMini category={currentCategory} className="w-10 h-10" />
          )}
          <VoteButton
            linkUrl={linkUrl}
            title={title}
            description={description}
            category={currentCategory}
            sourceDomain={sourceDomain}
            initialVoteCount={voteCount}
          />
        </div>

        {/* Right column: content */}
        <div className="p-3 pl-2 flex flex-col flex-grow min-w-0 justify-center">
          <Link
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-start gap-1 font-semibold text-white/90 hover:text-white transition-colors"
          >
            <span className="line-clamp-2">{title}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </Link>
          {description && <p className="mt-1 text-sm text-white/60 line-clamp-2">{description}</p>}
        </div>

        {/* Superadmin: hover remove button (desktop) */}
        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => setConfirmRemoveOpen(true)}
            className="hidden md:flex absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center h-6 w-6 rounded-full bg-red-600/80 hover:bg-red-600 text-white"
            title="Remove from trending"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Confirm remove dialog */}
      <AlertDialog open={confirmRemoveOpen} onOpenChange={setConfirmRemoveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from trending?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete &ldquo;{title}&rdquo; and its votes. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              disabled={isRemoving}
              className="bg-red-600 hover:bg-red-700"
            >
              {isRemoving ? 'Removing...' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Category change dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Change Category</DialogTitle>
          </DialogHeader>
          <RadioGroup
            value={selectedCategory}
            onValueChange={(v) => setSelectedCategory(v as ContentCategory)}
            className="gap-3 py-2"
          >
            {CONTENT_CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={cat} />
                <CategoryIconMini category={cat} className="w-7 h-7" />
                <span className="capitalize text-sm font-medium">{cat}</span>
              </label>
            ))}
          </RadioGroup>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCategoryDialogOpen(false)}
              className="px-3 py-1.5 text-sm rounded-md border hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCategoryChange}
              className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
