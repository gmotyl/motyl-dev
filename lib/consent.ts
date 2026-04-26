'use client'

import { useEffect, useState } from 'react'

export type ConsentState = {
  analytics: boolean
  ads: boolean
  version: 1
}

const STORAGE_KEY = 'gdpr-consent'
const CHANGE_EVENT = 'gdpr-consent-changed'
export const OPEN_SETTINGS_EVENT = 'gdpr-consent-open'

export const DEFAULT_CONSENT: ConsentState = {
  analytics: false,
  ads: false,
  version: 1,
}

function readRaw(): ConsentState | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  if (raw === 'true') return { analytics: true, ads: true, version: 1 }
  if (raw === 'false') return { analytics: false, ads: false, version: 1 }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    return {
      analytics: parsed.analytics === true,
      ads: parsed.ads === true,
      version: 1,
    }
  } catch {
    return null
  }
}

export function getConsent(): ConsentState {
  return readRaw() ?? DEFAULT_CONSENT
}

export function hasMadeChoice(): boolean {
  return readRaw() !== null
}

export function setConsent(next: Omit<ConsentState, 'version'>): void {
  if (typeof window === 'undefined') return
  const value: ConsentState = { ...next, version: 1 }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function openConsentSettings(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}

export function useConsent(): ConsentState {
  const [state, setState] = useState<ConsentState>(DEFAULT_CONSENT)

  useEffect(() => {
    setState(getConsent())
    const handler = () => setState(getConsent())
    window.addEventListener(CHANGE_EVENT, handler)
    return () => window.removeEventListener(CHANGE_EVENT, handler)
  }, [])

  return state
}
