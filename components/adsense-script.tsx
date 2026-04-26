'use client'

import Script from 'next/script'
import { useConsent } from '@/lib/consent'

const AdsenseScript = () => {
  const { ads } = useConsent()

  if (!ads) return null

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5937972178718571"
      crossOrigin="anonymous"
    />
  )
}

export default AdsenseScript
