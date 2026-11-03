import type { VoiceInfo } from 'anytts'

export const OMNIVOICE_ENABLED_KEY = 'tts-omnivoice-enabled'
export const OMNIVOICE_RELAY_URL_KEY = 'tts-omnivoice-relay-url'
export const OMNIVOICE_VOICE_KEY = 'tts-voice-omnivoice'
/** How long a reader session waits for the relay's `/health` before using Edge. */
export const OMNIVOICE_PROBE_MS = 2000

export interface OmniVoiceSettings {
  enabled: boolean
  relayUrl: string | null
  voice: string | null
}

function getBrowserStorage(): Storage | null {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function readStorage(key: string): string | null {
  try {
    return getBrowserStorage()?.getItem(key) ?? null
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string | null): void {
  try {
    const storage = getBrowserStorage()
    if (value === null) storage?.removeItem(key)
    else storage?.setItem(key, value)
  } catch {
    // Settings remain usable for this render when browser storage is unavailable.
  }
}

/** Blank or whitespace-only strings count as "not set". */
function normalizeText(value: string | null | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function readOmniVoiceSettings(): OmniVoiceSettings {
  return {
    // Only the exact "1" written by `writeOmniVoiceSettings` enables OmniVoice.
    enabled: readStorage(OMNIVOICE_ENABLED_KEY) === '1',
    relayUrl: normalizeText(readStorage(OMNIVOICE_RELAY_URL_KEY)),
    voice: normalizeText(readStorage(OMNIVOICE_VOICE_KEY)),
  }
}

/** Applies `patch` on top of the stored settings and returns the merged result. */
export function writeOmniVoiceSettings(patch: Partial<OmniVoiceSettings>): OmniVoiceSettings {
  const next: OmniVoiceSettings = { ...readOmniVoiceSettings() }

  if (patch.enabled !== undefined) {
    next.enabled = patch.enabled
    writeStorage(OMNIVOICE_ENABLED_KEY, patch.enabled ? '1' : null)
  }
  if (patch.relayUrl !== undefined) {
    next.relayUrl = normalizeText(patch.relayUrl)
    writeStorage(OMNIVOICE_RELAY_URL_KEY, next.relayUrl)
  }
  if (patch.voice !== undefined) {
    next.voice = normalizeText(patch.voice)
    writeStorage(OMNIVOICE_VOICE_KEY, next.voice)
  }

  return next
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

/**
 * A page served over https cannot call a plain-http relay (mixed content), so
 * only https URLs count, plus http on localhost for development.
 */
function isUsableRelayUrl(relayUrl: string): boolean {
  let url: URL
  try {
    url = new URL(relayUrl)
  } catch {
    return false
  }

  if (url.protocol === 'https:') return true
  return url.protocol === 'http:' && LOCAL_HOSTS.has(url.hostname)
}

/** enabled AND relayUrl is https:, or http://localhost / 127.0.0.1 */
export function isOmniVoiceConfigured(s: OmniVoiceSettings): boolean {
  return s.enabled && s.relayUrl !== null && isUsableRelayUrl(s.relayUrl)
}

/** Joins a relay base URL and an endpoint path, tolerating trailing slashes on the base. */
function relayEndpoint(relayUrl: string, path: string): string {
  return `${relayUrl.trim().replace(/\/+$/, '')}/${path}`
}

/** True only when `GET <relay>/health` answers 200 within `timeoutMs`; the request is aborted otherwise. */
export async function probeRelay(
  relayUrl: string,
  timeoutMs: number = OMNIVOICE_PROBE_MS
): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(relayEndpoint(relayUrl, 'health'), {
      signal: controller.signal,
      cache: 'no-store',
    })
    return response.status === 200
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

/** The relay's voice catalog from `GET <relay>/voices`; rejects on a network error or non-2xx answer. */
export async function fetchRelayVoices(relayUrl: string): Promise<VoiceInfo[]> {
  const response = await fetch(relayEndpoint(relayUrl, 'voices'))
  if (!response.ok) {
    throw new Error(`OmniVoice relay /voices answered ${response.status}`)
  }

  const voices: unknown = await response.json()
  if (!Array.isArray(voices)) {
    throw new Error('OmniVoice relay /voices did not return a list')
  }
  return voices as VoiceInfo[]
}
