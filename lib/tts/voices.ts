import { listEngines, listVoices } from 'anytts'

export const TTS_VOICE_STORAGE_KEY = 'tts-voice'
export const TTS_ENGINE_STORAGE_KEY = 'tts-engine'
export const TTS_VOICE_CHANGE_EVENT = 'tts-voice-change'
export const DEFAULT_TTS_VOICE = 'en-AU-WilliamMultilingualNeural'
export const DEFAULT_TTS_ENGINE = 'edge'

/** A voice id from the anytts catalog of the chosen engine. */
export type TtsVoice = string

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

function writeStorage(key: string, value: string): void {
  try {
    getBrowserStorage()?.setItem(key, value)
  } catch {
    // Preferences remain usable when browser storage is unavailable.
  }
}

function isKnownEngine(value: string | null): value is string {
  return value !== null && listEngines().some((engine) => engine.id === value)
}

function isCatalogVoice(engine: string, value: string | null): value is string {
  return value !== null && listVoices(engine).some((voice) => voice.id === value)
}

/** The raw stored voice id, unchecked — for the settings card's `resolveVoice` pass. */
export function readStoredTtsVoice(): string | null {
  return readStorage(TTS_VOICE_STORAGE_KEY)
}

export function getStoredTtsEngine(): string {
  const stored = readStorage(TTS_ENGINE_STORAGE_KEY)
  return isKnownEngine(stored) ? stored : DEFAULT_TTS_ENGINE
}

export function setStoredTtsEngine(value: string): string {
  if (!isKnownEngine(value)) return getStoredTtsEngine()

  writeStorage(TTS_ENGINE_STORAGE_KEY, value)
  return value
}

/**
 * The stored voice when it is in the chosen engine's catalog, else the default.
 * Synthesis rejects a voice outside the catalog (`unknown-voice`), so a stale
 * id saved by an older build must never reach it; this check needs no anytts
 * instance and matches `resolveVoice` with `voices.default` = the default voice.
 */
export function getStoredTtsVoice(): TtsVoice {
  const stored = readStoredTtsVoice()
  return isCatalogVoice(getStoredTtsEngine(), stored) ? stored : DEFAULT_TTS_VOICE
}

export function setStoredTtsVoice(value: string): TtsVoice {
  if (!isCatalogVoice(getStoredTtsEngine(), value)) return getStoredTtsVoice()

  writeStorage(TTS_VOICE_STORAGE_KEY, value)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(TTS_VOICE_CHANGE_EVENT))
  }

  return value
}
