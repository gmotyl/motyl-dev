'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRecentHashtags } from './use-recent-hashtags'

export interface HashtagSuggestion {
  hashtag: string
  isNew: boolean
  source: 'recent' | 'match' | 'popular'
}

interface HashtagStats {
  frequency: Record<string, number>
  totalHashtags: number
}

// Cache for hashtag stats to avoid refetching
let statsCache: HashtagStats | null = null
let statsCachePromise: Promise<HashtagStats | null> | null = null

async function fetchHashtagStats(): Promise<HashtagStats | null> {
  if (statsCache) return statsCache

  if (statsCachePromise) return statsCachePromise

  statsCachePromise = fetch('/api/hashtags/stats')
    .then(async (response) => {
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      statsCache = data
      return data
    })
    .catch((error) => {
      console.error('Failed to fetch hashtag stats:', error)
      statsCachePromise = null
      return null
    })

  return statsCachePromise
}

interface UseHashtagSuggestionsProps {
  inputValue: string
  selectedHashtags: string[]
  maxSuggestions?: number
  enabled?: boolean
}

interface UseHashtagSuggestionsReturn {
  suggestions: HashtagSuggestion[]
  isLoading: boolean
  isNewHashtag: boolean
  allHashtags: string[]
}

export function useHashtagSuggestions({
  inputValue,
  selectedHashtags,
  maxSuggestions = 10,
  enabled = true,
}: UseHashtagSuggestionsProps): UseHashtagSuggestionsReturn {
  const [stats, setStats] = useState<HashtagStats | null>(statsCache)
  const [isLoading, setIsLoading] = useState(!statsCache && enabled)
  const { recent } = useRecentHashtags()
  const hasFetched = useRef(false)

  // Fetch stats when enabled
  useEffect(() => {
    if (!enabled || hasFetched.current) return

    hasFetched.current = true

    if (statsCache) {
      setStats(statsCache)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    fetchHashtagStats().then((data) => {
      setStats(data)
      setIsLoading(false)
    })
  }, [enabled])

  // All available hashtags
  const allHashtags = useMemo(() => {
    if (!stats) return []
    return Object.keys(stats.frequency)
  }, [stats])

  // Normalized input for matching
  const normalizedInput = useMemo(() => {
    return inputValue.toLowerCase().trim().replace(/^#/, '')
  }, [inputValue])

  // Check if input is a new hashtag
  const isNewHashtag = useMemo(() => {
    if (!normalizedInput || !stats) return false
    return !stats.frequency[normalizedInput]
  }, [normalizedInput, stats])

  // Compute suggestions
  const suggestions = useMemo(() => {
    if (!stats) return []

    const selectedSet = new Set(selectedHashtags.map((t) => t.toLowerCase()))
    const results: HashtagSuggestion[] = []
    const addedHashtags = new Set<string>()

    const addSuggestion = (
      hashtag: string,
      source: HashtagSuggestion['source']
    ) => {
      const normalized = hashtag.toLowerCase()
      if (selectedSet.has(normalized) || addedHashtags.has(normalized)) return
      addedHashtags.add(normalized)
      results.push({
        hashtag: normalized,
        isNew: !stats.frequency[normalized],
        source,
      })
    }

    if (normalizedInput) {
      // User is typing - filter by input

      // 1. Exact match first (if exists)
      if (stats.frequency[normalizedInput]) {
        addSuggestion(normalizedInput, 'match')
      }

      // 2. Recent hashtags that match input
      for (const tag of recent) {
        if (results.length >= maxSuggestions) break
        if (tag.includes(normalizedInput)) {
          addSuggestion(tag, 'recent')
        }
      }

      // 3. Other hashtags that match input, sorted by frequency
      const matchingTags = Object.entries(stats.frequency)
        .filter(([tag]) => tag.includes(normalizedInput))
        .sort((a, b) => b[1] - a[1])

      for (const [tag] of matchingTags) {
        if (results.length >= maxSuggestions) break
        addSuggestion(tag, 'match')
      }
    } else {
      // Empty input - show recent and popular

      // 1. Recent hashtags (up to 5)
      const recentLimit = Math.min(5, maxSuggestions)
      for (const tag of recent.slice(0, recentLimit)) {
        if (stats.frequency[tag]) {
          // Only show recent if it still exists
          addSuggestion(tag, 'recent')
        }
      }

      // 2. Popular hashtags to fill remaining slots
      const popularTags = Object.entries(stats.frequency)
        .sort((a, b) => b[1] - a[1])

      for (const [tag] of popularTags) {
        if (results.length >= maxSuggestions) break
        addSuggestion(tag, 'popular')
      }
    }

    return results
  }, [stats, normalizedInput, selectedHashtags, recent, maxSuggestions])

  return { suggestions, isLoading, isNewHashtag, allHashtags }
}
