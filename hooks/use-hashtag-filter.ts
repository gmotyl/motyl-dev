import { useState, useEffect, useMemo } from 'react'

interface ItemWithHashtags {
  hashtags: string[]
  [key: string]: any
}

interface UseHashtagFilterProps<T extends ItemWithHashtags> {
  items: T[]
  initialHashtags?: Set<string>
  initialMode?: 'AND' | 'OR' | 'EXCLUDE'
  initialPage?: number
}

/**
 * useHashtagFilter - Generic hook for hashtag-based filtering with URL state
 *
 * Works with any items that have a hashtags array property.
 * Manages filter state, URL synchronization, and dynamic hashtag counts.
 *
 * Usage:
 * const {
 *   selectedHashtags,
 *   filterMode,
 *   filteredItems,
 *   sortedHashtags,
 *   dynamicHashtagCounts,
 *   handleHashtagToggle,
 *   handleClearFilters,
 *   handleFilterModeChange
 * } = useHashtagFilter({ items: bookmarks })
 */
export function useHashtagFilter<T extends ItemWithHashtags>({
  items,
  initialHashtags = new Set(),
  initialMode = 'AND',
  initialPage = 1,
}: UseHashtagFilterProps<T>) {
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(initialHashtags)
  const [filterMode, setFilterMode] = useState<'AND' | 'OR' | 'EXCLUDE'>(initialMode)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  // Update selected hashtags when initial hashtags change
  useEffect(() => {
    setSelectedHashtags(initialHashtags)
  }, [initialHashtags])

  // Update filter mode when initial mode changes
  useEffect(() => {
    setFilterMode(initialMode)
  }, [initialMode])

  // Update current page when initial page changes
  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

  // Update URL when filters change
  const updateURL = (hashtags: string[], mode: 'AND' | 'OR' | 'EXCLUDE', page: number) => {
    const url = new URL(window.location.href)

    if (hashtags.length > 0) {
      url.searchParams.set('hashtags', hashtags.join(','))
      url.searchParams.set('mode', mode)
    } else {
      url.searchParams.delete('hashtags')
      url.searchParams.delete('mode')
    }

    if (page > 1) {
      url.searchParams.set('page', page.toString())
    } else {
      url.searchParams.delete('page')
    }

    window.history.pushState({}, '', url.toString())
  }

  // Toggle hashtag selection
  const handleHashtagToggle = (hashtag: string) => {
    setSelectedHashtags((prev) => {
      const next = new Set(prev)
      if (next.has(hashtag)) {
        next.delete(hashtag)
      } else {
        next.add(hashtag)
      }
      const hashtagArray = Array.from(next)
      setCurrentPage(1) // Reset to page 1 when changing filters
      updateURL(hashtagArray, filterMode, 1)
      return next
    })
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedHashtags(new Set())
    setFilterMode('AND')
    setCurrentPage(1)
    updateURL([], 'AND', 1)
  }

  // Handle filter mode change
  const handleFilterModeChange = (mode: 'AND' | 'OR' | 'EXCLUDE') => {
    setFilterMode(mode)
    setCurrentPage(1) // Reset to page 1 when changing mode
    updateURL(Array.from(selectedHashtags), mode, 1)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL(Array.from(selectedHashtags), filterMode, page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filter items based on selected hashtags and mode
  const filteredItems = useMemo(() => {
    if (selectedHashtags.size === 0) {
      return items
    }

    if (filterMode === 'AND') {
      // Must have ALL selected hashtags
      return items.filter((item) =>
        Array.from(selectedHashtags).every((tag) => item.hashtags.includes(tag))
      )
    } else if (filterMode === 'OR') {
      // Must have ANY selected hashtag
      return items.filter((item) =>
        Array.from(selectedHashtags).some((tag) => item.hashtags.includes(tag))
      )
    } else {
      // EXCLUDE: Must NOT have ANY of the selected hashtags
      return items.filter((item) =>
        !Array.from(selectedHashtags).some((tag) => item.hashtags.includes(tag))
      )
    }
  }, [items, selectedHashtags, filterMode])

  // Calculate dynamic hashtag counts based on filtered items
  const dynamicHashtagCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    filteredItems.forEach((item) => {
      item.hashtags.forEach((hashtag) => {
        counts[hashtag] = (counts[hashtag] || 0) + 1
      })
    })

    return counts
  }, [filteredItems])

  // Get all unique hashtags from all items
  const allHashtags = useMemo(() => {
    const hashtagSet = new Set<string>()
    items.forEach((item) => {
      item.hashtags.forEach((hashtag) => {
        hashtagSet.add(hashtag)
      })
    })
    return Array.from(hashtagSet)
  }, [items])

  // Sort hashtags by count (descending), then alphabetically
  // Hide hashtags with zero count
  const sortedHashtags = useMemo(() => {
    return [...allHashtags]
      .filter((hashtag) => (dynamicHashtagCounts[hashtag] || 0) > 0 || selectedHashtags.has(hashtag))
      .sort((a, b) => {
        const countA = dynamicHashtagCounts[a] || 0
        const countB = dynamicHashtagCounts[b] || 0

        // First, sort by count (descending)
        if (countB !== countA) {
          return countB - countA
        }

        // If counts are equal, sort alphabetically (ascending)
        return a.localeCompare(b)
      })
  }, [allHashtags, dynamicHashtagCounts, selectedHashtags])

  return {
    selectedHashtags,
    filterMode,
    filteredItems,
    allHashtags,
    sortedHashtags,
    dynamicHashtagCounts,
    currentPage,
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handlePageChange,
  }
}
