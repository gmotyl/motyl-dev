'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'

const LOCALSTORAGE_KEY = 'visitedArticles'

// Global cache to prevent duplicate API calls across multiple hook instances
let globalViewsCache: Promise<string[]> | null = null
let globalViewsCacheTimestamp = 0
const CACHE_DURATION = 5000 // 5 seconds

// Pending view requests to batch them
let pendingViewRequests = new Set<string>()
let viewRequestTimeout: NodeJS.Timeout | null = null

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

  // Cached fetch function to prevent duplicate API calls
  const fetchViewedArticles = async (): Promise<string[]> => {
    const now = Date.now()

    // Return cached data if still valid
    if (globalViewsCache && now - globalViewsCacheTimestamp < CACHE_DURATION) {
      return globalViewsCache
    }

    // Create new fetch promise and cache it
    globalViewsCache = fetch('/api/articles/views')
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json()
          if (data.success && Array.isArray(data.data)) {
            return data.data
          }
        }
        return []
      })
      .catch((error) => {
        console.error('Failed to fetch viewed articles from database:', error)
        return []
      })

    globalViewsCacheTimestamp = now
    return globalViewsCache
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
          const databaseSlugs = await fetchViewedArticles()
          databaseSlugs.forEach((slug: string) => mergedSlugs.add(slug))
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

                // Invalidate cache and reload from database to get the merged data
                globalViewsCache = null
                const databaseSlugs = await fetchViewedArticles()
                setVisitedArticles(new Set(databaseSlugs))
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
        // Clear cache on logout
        globalViewsCache = null
      }
    }

    syncOnLogin()
  }, [status, session])

  // Persist to localStorage and cookie on state change
  useEffect(() => {
    if (!isLoading) {
      const slugArray = [...visitedArticles]
      const cookieValue = JSON.stringify(slugArray)
      localStorage.setItem(LOCALSTORAGE_KEY, cookieValue)
      document.cookie = `visitedArticles=${cookieValue};path=/;max-age=31536000;samesite=lax`
    }
  }, [visitedArticles, isLoading])

  // Batch process pending view requests
  const processPendingViews = useCallback(async () => {
    if (pendingViewRequests.size === 0 || status !== 'authenticated' || !session?.user) {
      return
    }

    const slugsToProcess = Array.from(pendingViewRequests)
    pendingViewRequests.clear()

    // Process all pending views in parallel (but limit concurrency)
    const promises = slugsToProcess.map((slug) =>
      fetch(`/api/articles/${slug}/view`, {
        method: 'POST',
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Successfully marked article ${slug} as viewed`)
          } else {
            console.error(`Failed to mark article ${slug} as viewed`)
          }
        })
        .catch((error) => {
          console.error(`Failed to save article view to database for ${slug}:`, error)
        })
    )

    await Promise.all(promises)
  }, [status, session])

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
        // Add to pending requests
        pendingViewRequests.add(slug)

        // Clear existing timeout
        if (viewRequestTimeout) {
          clearTimeout(viewRequestTimeout)
        }

        // Batch requests - wait 500ms for more requests before sending
        viewRequestTimeout = setTimeout(() => {
          processPendingViews()
        }, 500)
      }
    },
    [status, session, processPendingViews]
  )

  // Check if article is visited
  const isVisited = useCallback((slug: string) => visitedArticles.has(slug), [visitedArticles])

  return { markAsVisited, isVisited, visitedArticles, isLoading }
}
