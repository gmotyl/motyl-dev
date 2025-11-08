'use client'

import { useWakeLock } from '@/hooks/useWakeLock'
import { Button } from '@/components/ui/button'
import { Monitor, MonitorOff } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Toggle button to control screen wake lock
 * Allows users to enable/disable screen sleep prevention
 */
export function WakeLockToggle() {
  const { isSupported, isActive, requestWakeLock, releaseWakeLock } = useWakeLock()
  const [isEnabled, setIsEnabled] = useState(true)

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wakeLockEnabled')
    if (saved !== null) {
      const enabled = saved === 'true'
      setIsEnabled(enabled)
    }
  }, [])

  // Sync wake lock state with enabled state
  useEffect(() => {
    if (isSupported) {
      if (isEnabled) {
        requestWakeLock()
      } else {
        releaseWakeLock()
      }
    }
  }, [isEnabled, isSupported])

  const handleToggle = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    localStorage.setItem('wakeLockEnabled', String(newState))
  }

  // Don't render if not supported
  if (!isSupported) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className={`flex items-center gap-2 transition-colors ${
        isEnabled && isActive
          ? 'bg-purple-100 hover:bg-purple-200 text-purple-900 border-purple-300'
          : 'bg-background hover:bg-accent'
      }`}
      title={isEnabled ? 'Screen will stay awake' : 'Screen may sleep'}
    >
      {isEnabled && isActive ? (
        <>
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline">Screen Awake</span>
        </>
      ) : (
        <>
          <MonitorOff className="h-4 w-4" />
          <span className="hidden sm:inline">Allow Sleep</span>
        </>
      )}
    </Button>
  )
}
