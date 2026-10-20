import { listVoices } from 'anytts'
import { describe, expect, it } from 'vitest'

import { detectLanguageFromContent, detectLanguageFromHashtags, getAvailableVoices } from './voice-map'

const edgeVoiceIds = new Set(listVoices('edge').map((voice) => voice.id))
const DROPPED_LANGUAGES = ['es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'ko']

describe('voice-map', () => {
  it('every LANGUAGE_VOICE_MAP voice is in the anytts edge catalog', () => {
    const entries = getAvailableVoices()
    expect(entries.length).toBeGreaterThan(0)
    for (const { voice } of entries) {
      expect(edgeVoiceIds.has(voice), voice).toBe(true)
    }
    const languages = entries.map((entry) => entry.language)
    for (const lang of DROPPED_LANGUAGES) {
      expect(languages).not.toContain(lang)
    }
  })

  it('a hashtag for a dropped language falls back to the default voice', () => {
    const fallback = detectLanguageFromHashtags([])
    for (const lang of DROPPED_LANGUAGES) {
      expect(detectLanguageFromHashtags([lang])).toBe(fallback)
    }
  })

  it('detectors only ever return catalog voices', () => {
    const results = [
      detectLanguageFromHashtags([]),
      detectLanguageFromHashtags(['pl']),
      detectLanguageFromHashtags(['EN']),
      detectLanguageFromContent('to jest test dla tego co na do'),
      detectLanguageFromContent('this is an english sentence'),
    ]
    for (const voice of results) {
      expect(edgeVoiceIds.has(voice), voice).toBe(true)
    }
  })
})
