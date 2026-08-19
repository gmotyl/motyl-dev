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

const DEFAULT_VOICE = 'en-GB-RyanNeural'

// Maximum number of distinct synthesis results to keep cached (FIFO-bounded).
const MAX_CACHE_ENTRIES = 24

/**
 * Module-level synthesis cache keyed by `${voice}::${text}`.
 *
 * Stores the in-flight promise so concurrent callers (and cross-section
 * prefetch) dedupe onto a single synthesis. Survives useTTS `content` swaps so
 * the next section's first chunk can be warmed while the current one plays.
 */
const synthesisCache = new Map<string, Promise<ArrayBuffer>>()

function cacheKey(voice: string, text: string): string {
  return `${voice}::${text}`
}

function storeInCache(key: string, promise: Promise<ArrayBuffer>): void {
  synthesisCache.set(key, promise)

  // FIFO eviction: drop the oldest inserted key(s) once over the cap.
  while (synthesisCache.size > MAX_CACHE_ENTRIES) {
    const oldest = synthesisCache.keys().next().value
    if (oldest === undefined) break
    synthesisCache.delete(oldest)
  }

  // Never cache a failure permanently: evict on rejection so retries are possible.
  promise.catch(() => {
    if (synthesisCache.get(key) === promise) {
      synthesisCache.delete(key)
    }
  })
}

async function synthesizeToBuffer(
  text: string,
  options: TTSOptions,
  voice: string
): Promise<ArrayBuffer> {
  const { Communicate } = await import('edge-tts-universal/browser')

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

/**
 * Synthesize speech from text using edge-tts-universal browser Communicate API.
 * Results are cached by resolved voice + text; repeat calls resolve from cache.
 * @param text - The text to synthesize
 * @param options - TTS options (voice, rate, pitch)
 * @returns ArrayBuffer containing the audio data (MP3 format)
 */
export async function synthesizeSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<ArrayBuffer> {
  if (!text || !text.trim()) {
    // Surface the failure to the caller instead of caching an empty/garbage
    // buffer forever (prefetchSpeech guards this earlier; this protects direct callers).
    throw new Error('synthesizeSpeech: empty text')
  }

  const voice = options.voice || DEFAULT_VOICE
  const key = cacheKey(voice, text)

  const cached = synthesisCache.get(key)
  if (cached) return cached

  // Store the in-flight promise BEFORE awaiting so concurrent callers dedupe.
  const promise = synthesizeToBuffer(text, options, voice)
  storeInCache(key, promise)
  return promise
}

/**
 * Fire-and-forget warm of the synthesis cache. No-op on empty/whitespace text;
 * swallows synthesis errors (the eventual `synthesizeSpeech` call will retry).
 */
export function prefetchSpeech(text: string, options: TTSOptions = {}): void {
  if (!text || !text.trim()) return
  void synthesizeSpeech(text, options).catch(() => {
    /* prefetch is best-effort; failures are handled on the real request */
  })
}
