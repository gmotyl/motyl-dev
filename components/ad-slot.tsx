'use client'

import Script from 'next/script'
import { useConsent } from '@/lib/consent'

interface AdSlotProps {
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export function AdSlot({ format = 'auto', className = '' }: AdSlotProps) {
  const { ads } = useConsent()

  if (!ads) return null

  return (
    <aside className={`ad-slot ${className}`}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5937972178718571"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5937972178718571"
        data-ad-slot="9748901656"
        data-ad-format={format}
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
