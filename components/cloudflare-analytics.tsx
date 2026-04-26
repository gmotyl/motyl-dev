'use client'

import Script from 'next/script'

const TOKEN = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN

export function CloudflareAnalytics() {
  if (!TOKEN) return null

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
      strategy="afterInteractive"
      defer
    />
  )
}
