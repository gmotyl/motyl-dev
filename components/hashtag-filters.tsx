'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useHashtagFilter } from '@/hooks/use-hashtag-filter'
import { HashtagInput } from '@/components/hashtag-input'

interface ItemWithHashtags {
  hashtags: string[]
  [key: string]: any
}

interface HashtagFiltersProps<T extends ItemWithHashtags> {
  items: T[]
  onFilteredItemsChange?: (items: T[]) => void
  showUnseenButton?: boolean
  showUnseenOnly?: boolean
  onToggleUnseen?: () => void
  visitedSlugs?: Set<string>
  className?: string
}

/**
 * HashtagFilters - Reusable hashtag filter component with integrated state management
 *
 * Encapsulates both the filter UI and the useHashtagFilter hook.
 * Automatically syncs with URL parameters and provides filtered items through callback.
 *
 * Provides a complete filtering interface with:
 * - Mode selector (HAS/ANY/EXCLUDE)
 * - Hashtag buttons with counts
 * - Show more/less functionality
 * - Optional UNSEEN filter button
 * - URL state synchronization
 *
 * Usage:
 * <HashtagFilters
 *   items={bookmarks}
 *   onFilteredItemsChange={(filtered) => setDisplayedItems(filtered)}
 * />
 */
export function HashtagFilters<T extends ItemWithHashtags>({
  items,
  onFilteredItemsChange,
  showUnseenButton = false,
  showUnseenOnly = false,
  onToggleUnseen,
  className = ''
}: HashtagFiltersProps<T>) {
  const searchParams = useSearchParams()
  const hashtagsFromUrl = searchParams.get('hashtags')
  const modeFromUrl = searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE' | null
  const pageFromUrl = searchParams.get('page')

  // Parse hashtags from URL
  const initialHashtags = useMemo(() => {
    if (!hashtagsFromUrl) return new Set<string>()
    return new Set(hashtagsFromUrl.split(',').filter(Boolean))
  }, [hashtagsFromUrl])

  // Parse page from URL (default to 1)
  const initialPage = useMemo(() => {
    const page = parseInt(pageFromUrl || '1', 10)
    return page > 0 ? page : 1
  }, [pageFromUrl])

  // Use the hashtag filter hook
  const {
    selectedHashtags,
    filterMode,
    filteredItems,
    sortedHashtags,
    dynamicHashtagCounts,
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
  } = useHashtagFilter({
    items,
    initialHashtags,
    initialMode: modeFromUrl || 'AND',
    initialPage,
  })

  // Notify parent of filtered items changes
  useMemo(() => {
    if (onFilteredItemsChange) {
      onFilteredItemsChange(filteredItems)
    }
  }, [filteredItems, onFilteredItemsChange])
  const [showAllHashtags, setShowAllHashtags] = useState(false)
  const [showZeroCountHashtags, setShowZeroCountHashtags] = useState(false)

  // Calculate visible hashtags based on collapse state
  const { visibleHashtags, hiddenHashtagsWithCounts, hiddenHashtagsWithoutCounts } = useMemo(() => {
    // Always include selected hashtags
    const selectedHashtagsArray = Array.from(selectedHashtags)
    const selectedHashtagsSet = new Set(selectedHashtagsArray)

    // Separate hashtags with and without counts, but keep selected ones separate
    const hashtagsWithCounts = sortedHashtags.filter(hashtag =>
      (dynamicHashtagCounts[hashtag] || 0) > 0 || selectedHashtagsSet.has(hashtag)
    )
    const hashtagsWithoutCounts = sortedHashtags.filter(hashtag =>
      (dynamicHashtagCounts[hashtag] || 0) === 0 && !selectedHashtagsSet.has(hashtag)
    )

    if (showAllHashtags) {
      // When expanded, show all hashtags with counts (including selected with zero counts)
      // Show zero-count hashtags only if toggle is on
      const hiddenZeroCounts = showZeroCountHashtags ? [] : hashtagsWithoutCounts

      return {
        visibleHashtags: showZeroCountHashtags ? sortedHashtags : hashtagsWithCounts,
        hiddenHashtagsWithCounts: [],
        hiddenHashtagsWithoutCounts: hiddenZeroCounts
      }
    }

    // Calculate two rows worth of hashtags (approximately)
    // We'll estimate based on average button width: ~100px per button, ~8 buttons per row on desktop
    const VISIBLE_COUNT = 16 // Approximately 2 rows

    // Build visible list: selected + top hashtags (with counts) up to VISIBLE_COUNT
    const visible: string[] = []
    const hidden: string[] = []

    hashtagsWithCounts.forEach(hashtag => {
      if (selectedHashtagsSet.has(hashtag) || visible.length < VISIBLE_COUNT) {
        visible.push(hashtag)
      } else {
        hidden.push(hashtag)
      }
    })

    return {
      visibleHashtags: visible,
      hiddenHashtagsWithCounts: hidden,
      hiddenHashtagsWithoutCounts: hashtagsWithoutCounts
    }
  }, [sortedHashtags, dynamicHashtagCounts, selectedHashtags, showAllHashtags, showZeroCountHashtags])

  if (sortedHashtags.length === 0) {
    return null
  }

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-lg font-semibold">Filter by hashtags:</h2>
          {/* Hashtag Search Input */}
          <HashtagInput
            selectedHashtags={Array.from(selectedHashtags)}
            onHashtagAdd={handleHashtagToggle}
            onHashtagRemove={handleHashtagToggle}
            placeholder="Search hashtags..."
            allowNewHashtags={false}
            showSelectedBadges={false}
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* UNSEEN Filter */}
          {showUnseenButton && onToggleUnseen && (
            <Button
              onClick={onToggleUnseen}
              variant={showUnseenOnly ? 'default' : 'outline'}
              size="sm"
              className="font-semibold"
            >
              {showUnseenOnly ? '✓ ' : ''}UNSEEN
            </Button>
          )}

          {/* Mode Selector */}
          {selectedHashtags.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Match:</span>
              <div className="flex gap-1 border rounded-md overflow-hidden">
                <button
                  onClick={() => handleFilterModeChange('AND')}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    filterMode === 'AND'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  HAS
                </button>
                <button
                  onClick={() => handleFilterModeChange('OR')}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    filterMode === 'OR'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  ANY
                </button>
                <button
                  onClick={() => handleFilterModeChange('EXCLUDE')}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    filterMode === 'EXCLUDE'
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  EXCLUDE
                </button>
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {(selectedHashtags.size > 0 || showUnseenOnly) && (
            <Button onClick={handleClearFilters} variant="destructive" size="sm">
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Hashtag Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedHashtags.size === 0 ? 'default' : 'outline'}
          size="sm"
          onClick={handleClearFilters}
        >
          All ({items.length})
        </Button>

        {/* Visible hashtags */}
        {visibleHashtags.map((hashtag) => {
          const count = dynamicHashtagCounts[hashtag] || 0
          const isSelected = selectedHashtags.has(hashtag)

          return (
            <Button
              key={hashtag}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleHashtagToggle(hashtag)}
              className={count === 0 ? 'text-muted-foreground' : ''}
            >
              #{hashtag}
              {count > 1 && ` (${count})`}
            </Button>
          )
        })}

        {/* Show more/less button - only one visible at a time */}
        {/* Show first "more..." when collapsed */}
        {!showAllHashtags && (hiddenHashtagsWithCounts.length > 0 || hiddenHashtagsWithoutCounts.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllHashtags(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            more...
          </Button>
        )}

        {/* Show second "more..." when expanded but zero-count hashtags still hidden */}
        {showAllHashtags && !showZeroCountHashtags && hiddenHashtagsWithoutCounts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowZeroCountHashtags(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            more...
          </Button>
        )}

        {/* Show "less..." only when fully expanded OR when expanded without zero-count option */}
        {showAllHashtags && (showZeroCountHashtags || hiddenHashtagsWithoutCounts.length === 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowAllHashtags(false)
              setShowZeroCountHashtags(false)
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            less...
          </Button>
        )}
      </div>
    </div>
  )
}
