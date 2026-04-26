'use client'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CloudflareAnalytics } from '@/components/cloudflare-analytics'
import { useConsent } from '@/lib/consent'

export function ConsentGatedAnalytics() {
  const { analytics } = useConsent()

  if (!analytics) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <CloudflareAnalytics />
    </>
  )
}
