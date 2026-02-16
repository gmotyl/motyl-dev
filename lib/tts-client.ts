/**
 * TTS client using edge-tts-universal with lazy loading
 * This module provides client-side text-to-speech synthesis
 */

interface TTSOptions {
  voice?: string
  rate?: number
  pitch?: string
}

interface SynthesizeResult {
  audio: ArrayBuffer
}

interface EdgeTTSClass {
  synthesize(options: {
    text: string
    voice: string
    rate?: number
    pitch?: string
  }): Promise<SynthesizeResult>
  getVoices(): Promise<Array<{ name: string; shortName: string; gender: string; locale: string }>>
}

// Lazy load the edge-tts-universal module
let edgeTTSModule: Promise<{ EdgeTTS: new () => EdgeTTSClass }> | null = null

async function loadEdgeTTS(): Promise<{ EdgeTTS: new () => EdgeTTSClass }> {
  if (!edgeTTSModule) {
    edgeTTSModule = import('edge-tts-universal').then(
      (mod) => mod as { EdgeTTS: new () => EdgeTTSClass }
    )
  }
  return edgeTTSModule
}

/**
 * Synthesize speech from text using edge-tts-universal
 * @param text - The text to synthesize
 * @param options - TTS options (voice, rate, pitch)
 * @returns ArrayBuffer containing the audio data (MP3 format)
 */
export async function synthesizeSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<ArrayBuffer> {
  const { EdgeTTS } = await loadEdgeTTS()
  const tts = new EdgeTTS()

  const voice = options.voice || 'en-GB-RyanNeural'

  console.log('[TTS Client] Synthesizing speech for voice:', voice, 'text length:', text.length)

  try {
    const result = await tts.synthesize({
      text,
      voice,
      rate: options.rate,
      pitch: options.pitch,
    })

    console.log('[TTS Client] Got audio data, size:', result.audio.byteLength)
    return result.audio
  } catch (error) {
    console.error('[TTS Client] Synthesis error:', error)
    throw error
  }
}

/**
 * Get available TTS voices
 * @returns Array of available voices
 */
export async function getAvailableVoices(): Promise<
  Array<{ name: string; shortName: string; gender: string; locale: string }>
> {
  const { EdgeTTS } = await loadEdgeTTS()
  const tts = new EdgeTTS()
  return tts.getVoices()
}
