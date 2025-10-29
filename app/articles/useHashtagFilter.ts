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
}

export function useHashtagFilter({
  articles,
  initialHashtags = new Set(),
  initialMode = 'AND',
  initialShowUnseen = false,
  visitedSlugs = new Set(),
}: UseHashtagFilterProps) {
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(initialHashtags)
  const [filterMode, setFilterMode] = useState<'AND' | 'OR' | 'EXCLUDE'>(initialMode)
  const [showUnseenOnly, setShowUnseenOnly] = useState<boolean>(initialShowUnseen)

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

  // Update URL when filters change
  const updateURL = (hashtags: string[], mode: 'AND' | 'OR' | 'EXCLUDE', unseen: boolean) => {
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
      updateURL(hashtagArray, filterMode, showUnseenOnly)
      return next
    })
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedHashtags(new Set())
    setFilterMode('AND')
    setShowUnseenOnly(false)
    updateURL([], 'AND', false)
  }

  // Handle filter mode change
  const handleFilterModeChange = (mode: 'AND' | 'OR' | 'EXCLUDE') => {
    setFilterMode(mode)
    updateURL(Array.from(selectedHashtags), mode, showUnseenOnly)
  }

  // Toggle unseen filter
  const handleToggleUnseen = () => {
    setShowUnseenOnly((prev) => {
      const next = !prev
      updateURL(Array.from(selectedHashtags), filterMode, next)
      return next
    })
  }

  // Filter articles based on selected hashtags and mode
  const filteredArticles = useMemo(() => {
    let result = articles

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
      return result.filter((article) =>
        !Array.from(selectedHashtags).some((tag) => article.hashtags.includes(tag))
      )
    }
  }, [articles, selectedHashtags, filterMode, showUnseenOnly, visitedSlugs])

  // Calculate dynamic hashtag counts based on filtered articles
  const dynamicHashtagCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    filteredArticles.forEach((article) => {
      article.hashtags.forEach((hashtag) => {
        counts[hashtag] = (counts[hashtag] || 0) + 1
      })
    })

    return counts
  }, [filteredArticles])

  // Get all unique hashtags from all articles
  const allHashtags = useMemo(() => {
    const hashtagSet = new Set<string>()
    articles.forEach((article) => {
      article.hashtags.forEach((hashtag) => {
        hashtagSet.add(hashtag)
      })
    })
    return Array.from(hashtagSet)
  }, [articles])

  // Sort hashtags by count (descending)
  const sortedHashtags = useMemo(() => {
    return [...allHashtags].sort((a, b) => {
      const countA = dynamicHashtagCounts[a] || 0
      const countB = dynamicHashtagCounts[b] || 0
      return countB - countA // Descending order
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
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handleToggleUnseen,
  }
}
