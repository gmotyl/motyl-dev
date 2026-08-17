export const TTS_VOICE_STORAGE_KEY = 'tts-voice'
export const DEFAULT_TTS_VOICE = 'en-AU-WilliamMultilingualNeural'

export const TTS_VOICES = [
  {
    id: 'en-AU-WilliamMultilingualNeural',
    label: 'William (multilingual)',
  },
  {
    id: 'en-US-AndrewMultilingualNeural',
    label: 'Andrew (multilingual)',
  },
  {
    id: 'en-US-EmmaMultilingualNeural',
    label: 'Emma (multilingual)',
  },
  {
    id: 'pl-PL-MarekNeural',
    label: 'Marek (Polish)',
  },
  {
    id: 'pl-PL-ZofiaNeural',
    label: 'Zofia (Polish)',
  },
] as const

export type TtsVoice = (typeof TTS_VOICES)[number]['id']

const supportedVoices = new Set<string>(TTS_VOICES.map((voice) => voice.id))

export function isSupportedTtsVoice(value: string | null | undefined): value is TtsVoice {
  return value !== null && value !== undefined && supportedVoices.has(value)
}

export function resolveTtsVoice(value: string | null | undefined): TtsVoice {
  return isSupportedTtsVoice(value) ? value : DEFAULT_TTS_VOICE
}

function getBrowserStorage(): Storage | null {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function getStoredTtsVoice(): TtsVoice {
  return resolveTtsVoice(getBrowserStorage()?.getItem(TTS_VOICE_STORAGE_KEY))
}

export function setStoredTtsVoice(value: string): TtsVoice {
  const voice = resolveTtsVoice(value)
  getBrowserStorage()?.setItem(TTS_VOICE_STORAGE_KEY, voice)
  return voice
}
