import {
  DEFAULT_TTS_VOICE,
  TTS_VOICE_STORAGE_KEY,
  TTS_VOICES,
  getStoredTtsVoice,
  isSupportedTtsVoice,
} from './tts-voices'

describe('TTS voice preferences', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to William Multilingual', () => {
    expect(DEFAULT_TTS_VOICE).toBe('en-AU-WilliamMultilingualNeural')
    expect(getStoredTtsVoice()).toBe(DEFAULT_TTS_VOICE)
  })

  it('accepts only curated multilingual and Polish voices', () => {
    expect(TTS_VOICES.map((voice) => voice.id)).toEqual([
      'en-AU-WilliamMultilingualNeural',
      'en-US-AndrewMultilingualNeural',
      'en-US-EmmaMultilingualNeural',
      'pl-PL-MarekNeural',
      'pl-PL-ZofiaNeural',
    ])
    expect(isSupportedTtsVoice('en-US-AndrewMultilingualNeural')).toBe(true)
    expect(isSupportedTtsVoice('en-GB-RyanNeural')).toBe(false)
    expect(isSupportedTtsVoice(null)).toBe(false)
  })

  it('falls back for an invalid persisted voice', () => {
    localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'en-GB-RyanNeural')

    expect(getStoredTtsVoice()).toBe(DEFAULT_TTS_VOICE)
  })
})
