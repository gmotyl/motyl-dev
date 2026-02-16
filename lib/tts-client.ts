/**
 * TTS client using edge-tts-universal/browser Communicate class directly.
 * The simple EdgeTTS/EdgeTTSBrowser wrappers have a bug where the DRM token
 * (async generateSecMsGec) is not awaited in the WebSocket URL construction.
 * BrowserCommunicate.stream() correctly awaits it.
 */

interface TTSOptions {
  voice?: string
  rate?: string
  pitch?: string
}

/**
 * Synthesize speech from text using edge-tts-universal browser Communicate API
 * @param text - The text to synthesize
 * @param options - TTS options (voice, rate, pitch)
 * @returns ArrayBuffer containing the audio data (MP3 format)
 */
export async function synthesizeSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<ArrayBuffer> {
  const { Communicate } = await import('edge-tts-universal/browser')

  const voice = options.voice || 'en-GB-RyanNeural'

  console.log('[TTS Client] Synthesizing speech for voice:', voice, 'text length:', text.length)

  try {
    const communicate = new Communicate(text, {
      voice,
      rate: options.rate,
      pitch: options.pitch,
    })

    const audioChunks: Uint8Array[] = []

    for await (const chunk of communicate.stream()) {
      if (chunk.type === 'audio' && chunk.data) {
        audioChunks.push(chunk.data)
      }
    }

    // Concatenate all audio chunks into a single ArrayBuffer
    const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    for (const chunk of audioChunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }

    console.log('[TTS Client] Got audio data, size:', result.byteLength)
    return result.buffer
  } catch (error) {
    console.error('[TTS Client] Synthesis error:', error)
    throw error
  }
}
