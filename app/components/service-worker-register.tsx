'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    let intervalId: ReturnType<typeof setInterval> | undefined
    let registration: ServiceWorkerRegistration | undefined

    const onUpdateFound = () => {
      const newWorker = registration?.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available - show update notification
            // This will be handled by the UpdateNotification component in Phase 3
            console.log('[PWA] New version available')
          }
        })
      }
    }

    // Register directly — not inside a window 'load' listener. This effect
    // often runs after 'load' has already fired, so a listener added here
    // would never fire and the SW would silently never register.
    // updateViaCache: 'none' makes the browser always revalidate sw.js so
    // a deployed fix is picked up on the next visit.
    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((reg) => {
        registration = reg
        console.log('[PWA] Service Worker registered:', reg.scope)

        // Check for updates periodically
        intervalId = setInterval(() => {
          reg.update()
        }, 60 * 60 * 1000) // Check every hour

        // Listen for updates
        reg.addEventListener('updatefound', onUpdateFound)
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error)
      })

    // Cleanup guards against duplicate intervals/listeners on re-mount
    // (e.g. dev StrictMode); the registration itself is long-lived.
    return () => {
      if (intervalId) clearInterval(intervalId)
      registration?.removeEventListener('updatefound', onUpdateFound)
    }
  }, [])

  return null
}
