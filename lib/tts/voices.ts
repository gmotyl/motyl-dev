export const TTS_VOICE_STORAGE_KEY = 'tts-voice'
export const TTS_VOICE_CHANGE_EVENT = 'tts-voice-change'
export const DEFAULT_TTS_VOICE = 'en-AU-WilliamMultilingualNeural'

export const TTS_VOICES = [
  {
    id: 'en-AU-WilliamMultilingualNeural',
    label: 'William (multilingual · EN-AU)',
  },
  {
    id: 'en-US-AndrewMultilingualNeural',
    label: 'Andrew (multilingual · EN-US)',
  },
  {
    id: 'en-US-EmmaMultilingualNeural',
    label: 'Emma (multilingual · EN-US)',
  },
  {
    id: 'en-US-AvaMultilingualNeural',
    label: 'Ava (multilingual · EN-US)',
  },
  {
    id: 'en-US-BrianMultilingualNeural',
    label: 'Brian (multilingual · EN-US)',
  },
  {
    id: 'de-DE-SeraphinaMultilingualNeural',
    label: 'Seraphina (multilingual · DE)',
  },
  {
    id: 'de-DE-FlorianMultilingualNeural',
    label: 'Florian (multilingual · DE)',
  },
  {
    id: 'fr-FR-VivienneMultilingualNeural',
    label: 'Vivienne (multilingual · FR)',
  },
  {
    id: 'fr-FR-RemyMultilingualNeural',
    label: 'Remy (multilingual · FR)',
  },
  {
    id: 'it-IT-GiuseppeMultilingualNeural',
    label: 'Giuseppe (multilingual · IT)',
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
  const storage = getBrowserStorage()
  if (!storage) return DEFAULT_TTS_VOICE

  try {
    return resolveTtsVoice(storage.getItem(TTS_VOICE_STORAGE_KEY))
  } catch {
    return DEFAULT_TTS_VOICE
  }
}

export function setStoredTtsVoice(value: string): TtsVoice {
  if (!isSupportedTtsVoice(value)) return getStoredTtsVoice()

  const voice = value
  try {
    getBrowserStorage()?.setItem(TTS_VOICE_STORAGE_KEY, voice)
  } catch {
    // Preferences remain usable when browser storage is unavailable.
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(TTS_VOICE_CHANGE_EVENT))
  }

  return voice
}
