/**
 * TTS (Text-to-Speech) utilities for language detection and voice mapping
 */

// Map of hashtags to TTS voices
const LANGUAGE_VOICE_MAP: Record<string, string> = {
  pl: 'pl-PL-MarekNeural',
  en: 'en-GB-RyanNeural',
  es: 'es-ES-ElviraNeural',
  fr: 'fr-FR-DeniseNeural',
  de: 'de-DE-KatjaNeural',
  it: 'it-IT-ElsaNeural',
  pt: 'pt-PT-RaquelNeural',
  ru: 'ru-RU-SvetlanaNeural',
  ja: 'ja-JP-NanamiNeural',
  zh: 'zh-CN-XiaoxiaoNeural',
  ko: 'ko-KR-SunHiNeural',
}

// Common Polish words for content-based language detection
const POLISH_WORDS = [
  'jest',
  'ale',
  'dla',
  'tego',
  'tak',
  'jak',
  'to',
  'co',
  'na',
  'do',
  'za',
  'od',
  'po',
  'we',
  'ze',
]

/**
 * Detect language/voice from article hashtags
 */
export function detectLanguageFromHashtags(hashtags: string[] = []): string {
  for (const hashtag of hashtags) {
    const lang = hashtag.toLowerCase()
    if (LANGUAGE_VOICE_MAP[lang]) {
      return LANGUAGE_VOICE_MAP[lang]
    }
  }

  // Default to English (British male voice)
  return 'en-GB-RyanNeural'
}

/**
 * Detect language/voice from text content using common word analysis
 * Returns a TTS voice based on detected language
 */
export function detectLanguageFromContent(text: string): string {
  // Common Polish words detection pattern
  const polishPattern = /[a-z]{1,4}(?:[a-z]*|(?:ów|ie|y|a|ego|emu|ach|ami|ami|owe|owa|owe))/i

  const words = text.toLowerCase().split(/\s+/)
  const polishWordCount = words.filter((w) => POLISH_WORDS.includes(w)).length

  // If more than 10% of common words are Polish, use Polish voice
  if (polishWordCount > words.length * 0.1) {
    return 'pl-PL-MarekNeural'
  }

  return 'en-GB-RyanNeural'
}

/**
 * Get available TTS voices for all supported languages
 */
export function getAvailableVoices(): Array<{ language: string; voice: string }> {
  return Object.entries(LANGUAGE_VOICE_MAP).map(([lang, voice]) => ({
    language: lang,
    voice,
  }))
}
