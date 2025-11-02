'use client'

import { useState, useEffect, useCallback } from 'react'

export function useVisitedArticles() {
  const [visitedArticles, setVisitedArticles] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load visited articles from localStorage
    const stored = localStorage.getItem('visitedArticles')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setVisitedArticles(new Set(parsed))
      } catch (error) {
        console.error('Failed to parse visited articles:', error)
      }
    }
  }, [])

  const markAsVisited = useCallback((slug: string) => {
    setVisitedArticles((prev) => {
      // Don't update if already visited
      if (prev.has(slug)) {
        return prev
      }
      const updated = new Set(prev)
      updated.add(slug)
      // Save to localStorage
      localStorage.setItem('visitedArticles', JSON.stringify([...updated]))
      return updated
    })
  }, [])

  const isVisited = useCallback((slug: string) => visitedArticles.has(slug), [visitedArticles])

  return { markAsVisited, isVisited, visitedArticles }
}
