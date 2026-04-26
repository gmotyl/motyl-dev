'use client'

import { openConsentSettings } from '@/lib/consent'

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => openConsentSettings()}
      className="hover:text-primary transition-colors"
    >
      Cookie settings
    </button>
  )
}
