'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'motyl:recent-hashtags'
const MAX_RECENT = 10

export function useRecentHashtags() {
  const [recent, setRecent] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setRecent(parsed.slice(0, MAX_RECENT))
        }
      }
    } catch (error) {
      console.error('Failed to load recent hashtags:', error)
    }
    setIsLoaded(true)
  }, [])

  // Add a hashtag to the recent list (moves to front if already exists)
  const addRecent = useCallback((hashtag: string) => {
    const normalized = hashtag.toLowerCase().trim().replace(/^#/, '')
    if (!normalized) return

    setRecent((prev) => {
      const next = [normalized, ...prev.filter((t) => t !== normalized)].slice(
        0,
        MAX_RECENT
      )
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (error) {
        console.error('Failed to save recent hashtags:', error)
      }
      return next
    })
  }, [])

  // Clear all recent hashtags
  const clearRecent = useCallback(() => {
    setRecent([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear recent hashtags:', error)
    }
  }, [])

  return { recent, addRecent, clearRecent, isLoaded }
}
