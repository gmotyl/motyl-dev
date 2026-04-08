'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function ConsentGatedAnalytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = window.localStorage.getItem('gdpr-consent')
    setHasConsent(consent === 'true')

    const handleConsentChange = () => {
      const updated = window.localStorage.getItem('gdpr-consent')
      setHasConsent(updated === 'true')
    }

    window.addEventListener('gdpr-consent-changed', handleConsentChange)
    return () => window.removeEventListener('gdpr-consent-changed', handleConsentChange)
  }, [])

  if (!hasConsent) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}