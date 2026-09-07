'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const wakeLockSupported = () =>
  typeof navigator !== 'undefined' && 'wakeLock' in navigator

/**
 * Hook to prevent the screen from sleeping while reading articles.
 *
 * The browser auto-releases a `WakeLockSentinel` whenever the page hides, so a
 * lock taken once is dead after the first screen-off. We therefore remember the
 * *desired* state and re-acquire on `visibilitychange → visible`; only an
 * explicit `releaseWakeLock()` clears that intent.
 */
export function useWakeLock() {
  const [isSupported, setIsSupported] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  // Intent, not browser state: survives the browser's auto-release on hide.
  const wantsLockRef = useRef(false)

  useEffect(() => {
    // Client-side only: the server render must not claim support.
    setIsSupported(wakeLockSupported())
  }, [])

  // Support is read from `navigator` rather than from state so every callback
  // below can keep empty deps — consumers hang effects off these identities.
  const acquire = useCallback(async () => {
    if (!wakeLockSupported() || wakeLockRef.current) return

    try {
      const sentinel = await navigator.wakeLock.request('screen')
      wakeLockRef.current = sentinel
      setIsActive(true)

      // Fires both for our own release() and for the browser's auto-release.
      sentinel.addEventListener('release', () => {
        if (wakeLockRef.current === sentinel) wakeLockRef.current = null
        setIsActive(false)
      })
    } catch (err) {
      console.error('Failed to activate Wake Lock:', err)
      wakeLockRef.current = null
      setIsActive(false)
    }
  }, [])

  const requestWakeLock = useCallback(async () => {
    wantsLockRef.current = true
    await acquire()
  }, [acquire])

  const releaseWakeLock = useCallback(async () => {
    wantsLockRef.current = false

    const sentinel = wakeLockRef.current
    wakeLockRef.current = null
    if (!sentinel) {
      setIsActive(false)
      return
    }

    try {
      await sentinel.release()
    } catch (err) {
      console.error('Failed to release Wake Lock:', err)
    }
    setIsActive(false)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && wantsLockRef.current) {
        void acquire()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      void releaseWakeLock()
    }
  }, [acquire, releaseWakeLock])

  return {
    isSupported,
    isActive,
    requestWakeLock,
    releaseWakeLock,
  }
}
