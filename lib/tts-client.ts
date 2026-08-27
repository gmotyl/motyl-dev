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

// Maximum number of distinct synthesis results to keep cached (LRU-bounded).
// Raised well above the old 24 so the prebuffer ladder can warm every loaded
// section's title AND TLDR (2 per section) plus the playing section's body
// without thrashing. Entries are compressed MP3 (~tens of KB), so the memory
// cost of ~200 entries is a few MB.
const MAX_CACHE_ENTRIES = 200

/**
 * Module-level synthesis cache keyed by `${voice}::${text}`.
 *
 * Stores the in-flight promise so concurrent callers (and cross-section
 * prefetch) dedupe onto a single synthesis. Survives useTTS `content` swaps so
 * the next section's units can be warmed while the current one plays.
 *
 * Eviction is LRU: a Map preserves insertion order, so every *use* (a cache hit
 * in `synthesizeSpeech`) re-inserts the key to move it to the most-recent end,
 * and eviction drops the least-recently-used (front) key. This protects a
 * prebuffered title/TLDR that has not been played yet and the currently-playing
 * body from being evicted by later prefetch, which pure FIFO could not.
 */
const synthesisCache = new Map<string, Promise<ArrayBuffer>>()

function cacheKey(voice: string, text: string): string {
  return `${voice}::${text}`
}

// Mark a key as most-recently-used by moving it to the end of the Map's order.
function touchCache(key: string): void {
  const promise = synthesisCache.get(key)
  if (promise === undefined) return
  synthesisCache.delete(key)
  synthesisCache.set(key, promise)
}

function storeInCache(key: string, promise: Promise<ArrayBuffer>): void {
  synthesisCache.set(key, promise)

  // LRU eviction: drop the least-recently-used key(s) once over the cap.
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

// The edge-tts WebSocket occasionally stalls mid-stream — it neither sends
// the next audio frame nor closes, so `for await (... of communicate.stream())`
// would hang forever with no error and no timeout anywhere upstream. This is
// the "TTS freezes after N paragraphs" failure mode: whichever chunk lands on
// a stalled socket blocks playback indefinitely. Race each `.next()` against
// an inactivity timeout so a stall surfaces as a rejection instead of a hang.
const STREAM_STALL_TIMEOUT_MS = 15000

class TTSStreamStallError extends Error {
  constructor(timeoutMs: number) {
    super(`TTS stream stalled: no data received for ${timeoutMs}ms`)
    this.name = 'TTSStreamStallError'
  }
}

async function collectAudio(
  text: string,
  options: TTSOptions,
  voice: string
): Promise<ArrayBuffer> {
  const { Communicate } = await import('edge-tts-universal/browser')

  const communicate = new Communicate(text, {
    voice,
    rate: options.rate,
    pitch: options.pitch,
  })

  const iterator = communicate.stream()[Symbol.asyncIterator]()
  const audioChunks: Uint8Array[] = []

  while (true) {
    let timeoutHandle: ReturnType<typeof setTimeout>
    const next = await Promise.race([
      iterator.next(),
      new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(
          () => reject(new TTSStreamStallError(STREAM_STALL_TIMEOUT_MS)),
          STREAM_STALL_TIMEOUT_MS
        )
      }),
    ]).finally(() => clearTimeout(timeoutHandle))

    if (next.done) break
    if (next.value.type === 'audio' && next.value.data) {
      audioChunks.push(next.value.data)
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

  return result.buffer
}

async function synthesizeToBuffer(
  text: string,
  options: TTSOptions,
  voice: string
): Promise<ArrayBuffer> {
  console.log('[TTS Client] Synthesizing speech for voice:', voice, 'text length:', text.length)

  try {
    const result = await collectAudio(text, options, voice)
    console.log('[TTS Client] Got audio data, size:', result.byteLength)
    return result
  } catch (error) {
    if (error instanceof TTSStreamStallError) {
      // Transient: a fresh WebSocket usually succeeds. Retry once before
      // giving up so a single stalled connection doesn't surface as a hang
      // (previously) or a hard failure (without this retry).
      console.warn('[TTS Client] Stream stalled, retrying with a fresh connection:', error.message)
      try {
        const result = await collectAudio(text, options, voice)
        console.log('[TTS Client] Got audio data on retry, size:', result.byteLength)
        return result
      } catch (retryError) {
        console.error('[TTS Client] Synthesis error (after stall retry):', retryError)
        throw retryError
      }
    }
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
  if (cached) {
    touchCache(key) // LRU: reading an entry marks it most-recently-used.
    return cached
  }

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
