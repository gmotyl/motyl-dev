'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Hook to prevent screen from sleeping while reading articles
 * Uses the Wake Lock API (supported on most modern mobile browsers)
 */
export function useWakeLock() {
  const [isSupported, setIsSupported] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    // Check if Wake Lock API is supported (client-side only)
    setIsSupported(typeof navigator !== 'undefined' && 'wakeLock' in navigator)
  }, [])

  const requestWakeLock = async () => {
    if (!isSupported) {
      console.log('Wake Lock API not supported')
      return
    }

    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen')
      setIsActive(true)

      console.log('Wake Lock active - screen will stay on')

      // Handle wake lock release (e.g., when tab becomes inactive)
      wakeLockRef.current.addEventListener('release', () => {
        console.log('Wake Lock released')
        setIsActive(false)
      })
    } catch (err) {
      console.error('Failed to activate Wake Lock:', err)
      setIsActive(false)
    }
  }

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release()
        wakeLockRef.current = null
        setIsActive(false)
        console.log('Wake Lock manually released')
      } catch (err) {
        console.error('Failed to release Wake Lock:', err)
      }
    }
  }

  // Automatically request wake lock on mount
  useEffect(() => {
    requestWakeLock()

    // Re-request wake lock when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isSupported) {
        requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup: release wake lock on unmount
    return () => {
      releaseWakeLock()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isSupported])

  return {
    isSupported,
    isActive,
    requestWakeLock,
    releaseWakeLock,
  }
}
