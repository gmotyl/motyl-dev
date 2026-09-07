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
  // The grant currently in flight. `wakeLockRef` can only be assigned *after*
  // `request('screen')` resolves, so it is blind during that window.
  const pendingRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    // Client-side only: the server render must not claim support.
    setIsSupported(wakeLockSupported())
  }, [])

  // Support is read from `navigator` rather than from state so every callback
  // below can keep empty deps — consumers hang effects off these identities.
  const acquire = useCallback(async () => {
    if (!wakeLockSupported() || wakeLockRef.current) return
    // Re-entry while a grant is in flight (a `visibilitychange → visible`, a
    // second toggle, StrictMode's double-invoked effect) would otherwise sail
    // past the guard above and take a *second* sentinel; the first one is then
    // orphaned by the assignment below and holds the screen on forever. Join
    // the in-flight request instead of issuing another.
    if (pendingRef.current) return pendingRef.current

    // `request('screen')` is issued synchronously inside this IIFE, so there is
    // no await between the guards above and the assignment below for another
    // caller to slip through.
    const pending = (async () => {
      try {
        const sentinel = await navigator.wakeLock.request('screen')

        // Intent can be withdrawn mid-flight — an explicit releaseWakeLock(),
        // the reader pausing, unmount. That call found `wakeLockRef` empty and
        // released nothing, so this sentinel is unreachable to everyone else:
        // drop it here or it keeps the screen lit against an explicit request.
        if (!wantsLockRef.current) {
          try {
            await sentinel.release()
          } catch (err) {
            console.error('Failed to release Wake Lock:', err)
          }
          setIsActive(false)
          return
        }

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
    })()

    pendingRef.current = pending
    try {
      await pending
    } finally {
      // Only the call that parked this promise clears it; joiners must not
      // wipe a newer request's slot.
      if (pendingRef.current === pending) pendingRef.current = null
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
