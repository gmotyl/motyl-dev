import { useState, useEffect, useMemo } from 'react'

interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  hashtags: string[]
}

interface UseHashtagFilterProps {
  articles: Article[]
  initialHashtags?: Set<string>
  initialMode?: 'AND' | 'OR' | 'EXCLUDE'
  initialShowUnseen?: boolean
  visitedSlugs?: Set<string>
  initialPage?: number
  // New filter config options
  excludeHashtags?: string[] // Always exclude articles with these hashtags
  requireHashtags?: string[] // Always require articles to have these hashtags
}

export function applyBaseFilters(
  articles: Article[],
  {
    excludeHashtags = [],
    requireHashtags = [],
  }: { excludeHashtags?: string[]; requireHashtags?: string[] }
) {
  let result = articles

  if (requireHashtags.length > 0) {
    result = result.filter((article) =>
      requireHashtags.every((tag) => article.hashtags.includes(tag))
    )
  }

  if (excludeHashtags.length > 0) {
    result = result.filter(
      (article) => !excludeHashtags.some((tag) => article.hashtags.includes(tag))
    )
  }

  return result
}

export function useHashtagFilter({
  articles,
  initialHashtags = new Set(),
  initialMode = 'AND',
  initialShowUnseen = false,
  visitedSlugs = new Set(),
  initialPage = 1,
  excludeHashtags = [],
  requireHashtags = [],
}: UseHashtagFilterProps) {
  const preFilteredArticles = useMemo(() => {
    return applyBaseFilters(articles, { excludeHashtags, requireHashtags })
  }, [articles, excludeHashtags, requireHashtags])

  // Hashtags to hide from filter UI (those in excludeHashtags or requireHashtags)
  const hiddenHashtags = useMemo(() => {
    return new Set([...excludeHashtags, ...requireHashtags])
  }, [excludeHashtags, requireHashtags])
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(initialHashtags)
  const [filterMode, setFilterMode] = useState<'AND' | 'OR' | 'EXCLUDE'>(initialMode)
  const [showUnseenOnly, setShowUnseenOnly] = useState<boolean>(initialShowUnseen)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  // Update selected hashtags when initial hashtags change
  useEffect(() => {
    setSelectedHashtags(initialHashtags)
  }, [initialHashtags])

  // Update filter mode when initial mode changes
  useEffect(() => {
    setFilterMode(initialMode)
  }, [initialMode])

  // Update show unseen when initial value changes
  useEffect(() => {
    setShowUnseenOnly(initialShowUnseen)
  }, [initialShowUnseen])

  // Update current page when initial page changes
  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

  // Update URL when filters change
  const updateURL = (
    hashtags: string[],
    mode: 'AND' | 'OR' | 'EXCLUDE',
    unseen: boolean,
    page: number
  ) => {
    const url = new URL(window.location.href)

    if (hashtags.length > 0) {
      url.searchParams.set('hashtags', hashtags.join(','))
      url.searchParams.set('mode', mode)
    } else {
      url.searchParams.delete('hashtags')
      url.searchParams.delete('mode')
    }

    if (unseen) {
      url.searchParams.set('unseen', 'true')
    } else {
      url.searchParams.delete('unseen')
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
      updateURL(hashtagArray, filterMode, showUnseenOnly, 1)
      return next
    })
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedHashtags(new Set())
    setFilterMode('AND')
    setShowUnseenOnly(false)
    setCurrentPage(1)
    updateURL([], 'AND', false, 1)
  }

  // Handle filter mode change
  const handleFilterModeChange = (mode: 'AND' | 'OR' | 'EXCLUDE') => {
    setFilterMode(mode)
    setCurrentPage(1) // Reset to page 1 when changing mode
    updateURL(Array.from(selectedHashtags), mode, showUnseenOnly, 1)
  }

  // Toggle unseen filter
  const handleToggleUnseen = () => {
    setShowUnseenOnly((prev) => {
      const next = !prev
      setCurrentPage(1) // Reset to page 1 when changing unseen filter
      updateURL(Array.from(selectedHashtags), filterMode, next, 1)
      return next
    })
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL(Array.from(selectedHashtags), filterMode, showUnseenOnly, page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filter articles based on selected hashtags and mode
  const filteredArticles = useMemo(() => {
    let result = preFilteredArticles

    // Apply UNSEEN filter first if enabled
    if (showUnseenOnly) {
      result = result.filter((article) => !visitedSlugs.has(article.slug))
    }

    // Apply hashtag filters
    if (selectedHashtags.size === 0) {
      return result
    }

    if (filterMode === 'AND') {
      // Must have ALL selected hashtags
      return result.filter((article) =>
        Array.from(selectedHashtags).every((tag) => article.hashtags.includes(tag))
      )
    } else if (filterMode === 'OR') {
      // Must have ANY selected hashtag
      return result.filter((article) =>
        Array.from(selectedHashtags).some((tag) => article.hashtags.includes(tag))
      )
    } else {
      // EXCLUDE: Must NOT have ANY of the selected hashtags
      return result.filter(
        (article) => !Array.from(selectedHashtags).some((tag) => article.hashtags.includes(tag))
      )
    }
  }, [preFilteredArticles, selectedHashtags, filterMode, showUnseenOnly, visitedSlugs])

  // Calculate dynamic hashtag counts based on filtered articles (excluding hidden hashtags)
  const dynamicHashtagCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    filteredArticles.forEach((article) => {
      article.hashtags.forEach((hashtag) => {
        // Skip hidden hashtags (those in excludeHashtags or requireHashtags)
        if (!hiddenHashtags.has(hashtag)) {
          counts[hashtag] = (counts[hashtag] || 0) + 1
        }
      })
    })

    return counts
  }, [filteredArticles, hiddenHashtags])

  // Get all unique hashtags from pre-filtered articles (excluding hidden hashtags)
  const allHashtags = useMemo(() => {
    const hashtagSet = new Set<string>()
    preFilteredArticles.forEach((article) => {
      article.hashtags.forEach((hashtag) => {
        // Skip hidden hashtags (those in excludeHashtags or requireHashtags)
        if (!hiddenHashtags.has(hashtag)) {
          hashtagSet.add(hashtag)
        }
      })
    })
    return Array.from(hashtagSet)
  }, [preFilteredArticles, hiddenHashtags])

  // Sort hashtags by count (descending), then alphabetically
  const sortedHashtags = useMemo(() => {
    return [...allHashtags].sort((a, b) => {
      const countA = dynamicHashtagCounts[a] || 0
      const countB = dynamicHashtagCounts[b] || 0

      // First, sort by count (descending)
      if (countB !== countA) {
        return countB - countA
      }

      // If counts are equal, sort alphabetically (ascending)
      return a.localeCompare(b)
    })
  }, [allHashtags, dynamicHashtagCounts])

  return {
    selectedHashtags,
    filterMode,
    showUnseenOnly,
    filteredArticles,
    allHashtags,
    sortedHashtags,
    dynamicHashtagCounts,
    currentPage,
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handleToggleUnseen,
    handlePageChange,
  }
}
