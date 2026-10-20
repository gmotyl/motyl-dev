import {
  DEFAULT_TTS_VOICE,
  TTS_ENGINE_STORAGE_KEY,
  TTS_VOICE_STORAGE_KEY,
  getStoredTtsEngine,
  getStoredTtsVoice,
  setStoredTtsEngine,
  setStoredTtsVoice,
} from '@/lib/tts/voices'

describe('TTS voice preferences', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to William Multilingual', () => {
    expect(DEFAULT_TTS_VOICE).toBe('en-AU-WilliamMultilingualNeural')
    expect(getStoredTtsVoice()).toBe(DEFAULT_TTS_VOICE)
  })

  it('returns a stored catalog voice as is', () => {
    localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'pl-PL-ZofiaNeural')

    expect(getStoredTtsVoice()).toBe('pl-PL-ZofiaNeural')
  })

  it('falls back for a persisted voice outside the catalog', () => {
    localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'xx-XX-NotARealVoiceNeural')

    expect(getStoredTtsVoice()).toBe(DEFAULT_TTS_VOICE)
  })

  it('does not overwrite a valid stored voice for a voice outside the catalog', () => {
    localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'pl-PL-ZofiaNeural')

    expect(setStoredTtsVoice('xx-XX-NotARealVoiceNeural')).toBe('pl-PL-ZofiaNeural')
    expect(localStorage.getItem(TTS_VOICE_STORAGE_KEY)).toBe('pl-PL-ZofiaNeural')
  })
})

describe('TTS engine preferences', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to edge', () => {
    expect(getStoredTtsEngine()).toBe('edge')
  })

  it('stores a known engine', () => {
    expect(setStoredTtsEngine('edge')).toBe('edge')
    expect(localStorage.getItem(TTS_ENGINE_STORAGE_KEY)).toBe('edge')
  })

  it('ignores an unknown engine, stored or chosen', () => {
    localStorage.setItem(TTS_ENGINE_STORAGE_KEY, 'nope')
    expect(getStoredTtsEngine()).toBe('edge')

    expect(setStoredTtsEngine('also-nope')).toBe('edge')
    expect(localStorage.getItem(TTS_ENGINE_STORAGE_KEY)).toBe('nope')
  })
})
