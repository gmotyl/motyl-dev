'use client'

import { useEffect, useState } from 'react'
import {
  hasMadeChoice,
  setConsent,
  getConsent,
  OPEN_SETTINGS_EVENT,
} from '@/lib/consent'

const GdprConsent = () => {
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [ads, setAds] = useState(false)

  useEffect(() => {
    if (!hasMadeChoice()) {
      setOpen(true)
    }
    const reopen = () => {
      const current = getConsent()
      setAnalytics(current.analytics)
      setAds(current.ads)
      setShowDetails(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen)
  }, [])

  if (!open) return null

  const acceptAll = () => {
    setConsent({ analytics: true, ads: true })
    setOpen(false)
  }
  const rejectAll = () => {
    setConsent({ analytics: false, ads: false })
    setOpen(false)
  }
  const saveSelection = () => {
    setConsent({ analytics, ads })
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[1000] bg-[#1a1a1a] text-foreground border-t border-border/40 p-4 md:p-5"
    >
      <div className="container max-w-4xl mx-auto flex flex-col gap-3">
        {!showDetails ? (
          <>
            <p className="text-sm text-muted-foreground">
              We use cookies for analytics and advertising. You can choose which
              ones to allow. See our{' '}
              <a href="/privacy" className="text-primary underline">
                privacy policy
              </a>{' '}
              for details.
            </p>
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => setShowDetails(true)}
                className="text-xs px-3 py-1.5 rounded bg-secondary text-secondary-foreground"
              >
                Customize
              </button>
              <button
                onClick={rejectAll}
                className="text-xs px-3 py-1.5 rounded bg-secondary text-secondary-foreground"
              >
                Reject all
              </button>
              <button
                onClick={acceptAll}
                className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground"
              >
                Accept all
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2 text-sm">
              <label className="flex items-start gap-3 cursor-not-allowed opacity-70">
                <input type="checkbox" checked disabled className="mt-1" />
                <span>
                  <strong className="block">Strictly necessary</strong>
                  <span className="text-muted-foreground text-xs">
                    Required for the site to work (auth session, consent state).
                    Always on.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <strong className="block">Analytics</strong>
                  <span className="text-muted-foreground text-xs">
                    Vercel Analytics, Vercel Speed Insights, Cloudflare Web
                    Analytics. Anonymized usage and performance data.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ads}
                  onChange={(e) => setAds(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <strong className="block">Advertising</strong>
                  <span className="text-muted-foreground text-xs">
                    Google AdSense. May set advertising cookies and share data
                    with ad partners.
                  </span>
                </span>
              </label>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={rejectAll}
                className="text-xs px-3 py-1.5 rounded bg-secondary text-secondary-foreground"
              >
                Reject all
              </button>
              <button
                onClick={saveSelection}
                className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground"
              >
                Save selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GdprConsent
