/**
 * TTS client using edge-tts-universal/browser Communicate class directly.
 * The simple EdgeTTS/EdgeTTSBrowser wrappers have a bug where the DRM token
 * (async generateSecMsGec) is not awaited in the WebSocket URL construction.
 * BrowserCommunicate.stream() correctly awaits it.
 */

/**
 * Who is asking for a synthesis. `play` is anything the reader needs to keep
 * reading (the unit about to play, retries); `warm` is speculative prebuffering.
 * Play is served before warm by the synthesis queue below.
 */
export type SynthesisPriority = 'play' | 'warm'

interface TTSOptions {
  voice?: string
  rate?: string
  pitch?: string
  /** Queue lane for a synthesis this call has to start. Default `'play'`. */
  priority?: SynthesisPriority
  /**
   * Called once, when the synthesis serving this call leaves the queue and
   * starts running — or at once when it already started (or resolved). Lets a
   * caller tell queue wait from synthesis time without the queue knowing about
   * any log.
   */
  onStart?: () => void
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
 * The synthesis queue: at most one edge-tts synthesis runs at a time.
 *
 * Why: device logs show stalls clustering on bursts of 2-3 concurrent sockets
 * from a hidden page, while single requests on the same page pass. So every
 * synthesis that is not a cache hit waits here for the one slot. Play jobs are
 * served before warm jobs (FIFO within each lane); a running job is never
 * pre-empted, since interrupting a socket would only open another one.
 *
 * A job's promise goes into the cache at enqueue time, so callers arriving
 * while it waits dedupe onto it exactly as onto an in-flight synthesis, and
 * eviction-on-reject still applies. Module-level like the cache: one per page.
 */
interface SynthesisJob {
  text: string
  options: TTSOptions
  voice: string
  priority: SynthesisPriority
  // Enqueue order; keeps a promoted warm job's age within the play lane.
  seq: number
  // Every caller's onStart, the enqueuing one and later cache hits alike.
  onStarts: Array<() => void>
  promise: Promise<ArrayBuffer>
  resolve: (buffer: ArrayBuffer) => void
  reject: (error: unknown) => void
}

const playLane: SynthesisJob[] = []
const warmLane: SynthesisJob[] = []
// Jobs still waiting in a lane, by their cached promise, so a cache hit can
// attach its onStart or promote the job. A job leaves this map when it starts.
const waitingJobs = new Map<Promise<ArrayBuffer>, SynthesisJob>()
let running = false
let nextSeq = 0

function insertByAge(lane: SynthesisJob[], job: SynthesisJob): void {
  let index = lane.length
  while (index > 0 && lane[index - 1].seq > job.seq) index -= 1
  lane.splice(index, 0, job)
}

function runNextJob(): void {
  if (running) return
  const job = playLane.shift() ?? warmLane.shift()
  if (!job) return
  running = true
  waitingJobs.delete(job.promise)
  for (const onStart of job.onStarts) onStart()
  job.onStarts = []
  synthesizeToBuffer(job.text, job.options, job.voice)
    .then(job.resolve, job.reject)
    .finally(() => {
      // Resolve or reject alike frees the slot for the next job.
      running = false
      runNextJob()
    })
}

function enqueue(
  text: string,
  options: TTSOptions,
  voice: string,
  priority: SynthesisPriority
): Promise<ArrayBuffer> {
  let resolve!: (buffer: ArrayBuffer) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<ArrayBuffer>((res, rej) => {
    resolve = res
    reject = rej
  })
  const job: SynthesisJob = {
    text,
    options,
    voice,
    priority,
    seq: nextSeq++,
    onStarts: options.onStart ? [options.onStart] : [],
    promise,
    resolve,
    reject,
  }
  ;(priority === 'play' ? playLane : warmLane).push(job)
  waitingJobs.set(promise, job)
  return promise
}

// A cache hit joins the existing job: its onStart fires with that job's start
// (or now, if it already started), and a play request lifts a waiting warm job
// into the play lane.
function joinCachedJob(
  promise: Promise<ArrayBuffer>,
  priority: SynthesisPriority,
  onStart: (() => void) | undefined
): void {
  const job = waitingJobs.get(promise)
  if (!job) {
    onStart?.()
    return
  }
  if (onStart) job.onStarts.push(onStart)
  if (priority === 'play' && job.priority === 'warm') {
    warmLane.splice(warmLane.indexOf(job), 1)
    job.priority = 'play'
    insertByAge(playLane, job)
  }
}

/**
 * Synthesize speech from text using edge-tts-universal browser Communicate API.
 * Results are cached by resolved voice + text; repeat calls resolve from cache.
 * A synthesis that is not cached waits in the synthesis queue (one at a time,
 * `play` before `warm`).
 * @param text - The text to synthesize
 * @param options - TTS options (voice, rate, pitch, priority, onStart)
 * @returns ArrayBuffer containing the audio data (MP3 format)
 */
export function synthesizeSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<ArrayBuffer> {
  if (!text || !text.trim()) {
    // Surface the failure to the caller instead of caching an empty/garbage
    // buffer forever (prefetchSpeech guards this earlier; this protects direct callers).
    return Promise.reject(new Error('synthesizeSpeech: empty text'))
  }

  const voice = options.voice || DEFAULT_VOICE
  const priority = options.priority ?? 'play'
  const key = cacheKey(voice, text)

  const cached = synthesisCache.get(key)
  if (cached) {
    touchCache(key) // LRU: reading an entry marks it most-recently-used.
    joinCachedJob(cached, priority, options.onStart)
    return cached
  }

  // Cache the job's promise BEFORE it runs so concurrent callers dedupe,
  // whether the job is still waiting or already synthesizing.
  const promise = enqueue(text, options, voice, priority)
  storeInCache(key, promise)
  runNextJob()
  return promise
}

/**
 * Fire-and-forget warm of the synthesis cache. No-op on empty/whitespace text;
 * swallows synthesis errors (the eventual `synthesizeSpeech` call will retry).
 */
export function prefetchSpeech(text: string, options: TTSOptions = {}): void {
  if (!text || !text.trim()) return
  // Warming is speculative: it must never hold up a unit the reader needs now.
  void synthesizeSpeech(text, { ...options, priority: 'warm' }).catch(() => {
    /* prefetch is best-effort; failures are handled on the real request */
  })
}
