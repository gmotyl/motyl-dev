'use client'

import Script from 'next/script'
import { useState } from 'react'

export function AdSlot() {
  const [consent] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedConsent = window.localStorage.getItem('gdpr-consent')
      return storedConsent === 'true'
    }
    return false
  })

  if (!consent) {
    return null
  }

  return (
    <aside className="ad-slot">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5937972178718571"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block', height: 250 }}
        data-ad-client="ca-pub-5937972178718571"
        data-ad-slot="9748901656"
        data-full-width-responsive="true"
      ></ins>
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </aside>
  )
}