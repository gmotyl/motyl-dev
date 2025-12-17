'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'

const LOCALSTORAGE_KEY = 'visitedArticles'

export function useVisitedArticles() {
  const { data: session, status } = useSession()
  const [visitedArticles, setVisitedArticles] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const hasSyncedRef = useRef(false)
  const previousSessionRef = useRef<string | null>(null)

  const getLocalStorageSlugs = (): string[] => {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
      } catch (error) {
        console.error('Failed to parse visited articles:', error)
        return []
      }
    }
    return []
  }

  // Initialize: Load and MERGE from localStorage AND database
  useEffect(() => {
    const initializeVisitedArticles = async () => {
      setIsLoading(true)

      if (status === 'loading') {
        return // Wait for session to load
      }

      // Always start by loading localStorage
      const localStorageSlugs = getLocalStorageSlugs()
      const mergedSlugs = new Set<string>(localStorageSlugs)

      if (status === 'authenticated' && session?.user) {
        // User is logged in - fetch from database AND merge with localStorage
        try {
          const response = await fetch('/api/articles/views')
          if (response.ok) {
            const data = await response.json()
            if (data.success && Array.isArray(data.data)) {
              // MERGE: Add all database slugs to the set (which already has localStorage slugs)
              data.data.forEach((slug: string) => mergedSlugs.add(slug))
            }
          }
        } catch (error) {
          console.error('Failed to fetch viewed articles from database:', error)
          // Continue with localStorage data only
        }
      }

      // Set the merged data
      setVisitedArticles(mergedSlugs)
      setIsLoading(false)
    }

    initializeVisitedArticles()
  }, [status, session])

  // Sync localStorage to database when user logs in
  useEffect(() => {
    const syncOnLogin = async () => {
      // Detect login: session changed from null/unauthenticated to authenticated
      const currentUserId = session?.user?.id
      const previousUserId = previousSessionRef.current

      // Update ref for next check
      previousSessionRef.current = currentUserId || null

      // Only sync once per login session
      if (
        status === 'authenticated' &&
        currentUserId &&
        currentUserId !== previousUserId &&
        !hasSyncedRef.current
      ) {
        console.log('User logged in - syncing localStorage to database...')
        hasSyncedRef.current = true

        try {
          // Read localStorage
          const stored = localStorage.getItem(LOCALSTORAGE_KEY)
          if (stored) {
            const localSlugs = JSON.parse(stored)
            if (Array.isArray(localSlugs) && localSlugs.length > 0) {
              // Sync to database
              const response = await fetch('/api/articles/views/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slugs: localSlugs }),
              })

              if (response.ok) {
                const data = await response.json()
                console.log(`✅ Synced ${data.count} articles to database`)

                // Clear localStorage after successful sync
                localStorage.removeItem(LOCALSTORAGE_KEY)

                // Reload from database to get the merged data
                const viewsResponse = await fetch('/api/articles/views')
                if (viewsResponse.ok) {
                  const viewsData = await viewsResponse.json()
                  if (viewsData.success && Array.isArray(viewsData.data)) {
                    setVisitedArticles(new Set(viewsData.data))
                  }
                }
              }
            } else {
              // No local data to sync, just clear localStorage
              localStorage.removeItem(LOCALSTORAGE_KEY)
            }
          }
        } catch (error) {
          console.error('Failed to sync localStorage to database:', error)
          // Don't block user experience, keep local data
        }
      }

      // Reset sync flag when user logs out
      if (status === 'unauthenticated' && previousUserId) {
        hasSyncedRef.current = false
      }
    }

    syncOnLogin()
  }, [status, session])

  // Persist to localStorage on state change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([...visitedArticles]))
    }
  }, [visitedArticles, isLoading])

  // Mark article as visited
  const markAsVisited = useCallback(
    async (slug: string) => {
      setVisitedArticles((prev) => {
        if (prev.has(slug)) {
          return prev
        }
        const updated = new Set(prev)
        updated.add(slug)
        return updated
      })

      if (status === 'authenticated' && session?.user) {
        try {
          const response = await fetch(`/api/articles/${slug}/view`, {
            method: 'POST',
          })
          if (response.ok) {
            console.log(`Successfully marked article ${slug} as viewed`)
          } else {
            console.error(`Failed to mark article ${slug} as viewed`)
          }
        } catch (error) {
          console.error('Failed to save article view to database:', error)
        }
      }
    },
    [status, session]
  )

  // Check if article is visited
  const isVisited = useCallback((slug: string) => visitedArticles.has(slug), [visitedArticles])

  return { markAsVisited, isVisited, visitedArticles, isLoading }
}
