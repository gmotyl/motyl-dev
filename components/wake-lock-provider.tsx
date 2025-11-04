'use client'

import { useWakeLock } from '@/hooks/useWakeLock'
import { useEffect } from 'react'

/**
 * Component that automatically activates Wake Lock to prevent screen sleep
 * while reading articles on mobile devices
 */
export function WakeLockProvider() {
  const { isSupported, isActive } = useWakeLock()

  useEffect(() => {
    // Log status for debugging (can be removed in production)
    if (isSupported) {
      console.log(`Wake Lock ${isActive ? 'activated' : 'inactive'} - screen sleep prevention ${isActive ? 'enabled' : 'disabled'}`)
    }
  }, [isSupported, isActive])

  // This component doesn't render anything visible
  return null
}
