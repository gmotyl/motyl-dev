/**
 * TTS client: motyl's seam over one anytts instance (Edge engine, direct mode).
 *
 * Everything that used to live here — the `voice::text` LRU cache with
 * in-flight dedupe, the one-at-a-time synthesis queue (`play` before `warm`,
 * promotion of a waiting warm job), the 8 s first-byte deadline, the 15 s
 * inactivity timeout, the one fresh-socket retry and the Sec-MS-GEC handshake —
 * now lives in anytts. This module only configures that instance with the
 * values the reader was tuned with and maps motyl's options onto its requests,
 * so callers (`useTTS`, the continuous reader, the carrier spike) are unchanged.
 *
 * Known limit, unchanged: Microsoft refuses (403) any handshake whose
 * User-Agent is not Edge >= 137, and browsers do not let page code set it, so
 * only Edge browsers synthesize directly; elsewhere synthesis rejects with a
 * `TtsError` of kind `rejected`. A relay (anytts `relayUrl`) is the fix for
 * other browsers and is deliberately not configured yet.
 */

import { createTts, type Tts } from 'anytts'
import { DEFAULT_TTS_VOICE } from './voices'

/**
 * Who is asking for a synthesis. `play` is anything the reader needs to keep
 * reading (the unit about to play, retries); `warm` is speculative prebuffering.
 * They are the anytts scheduler's tiers, so play is served before warm.
 */
export type SynthesisPriority = 'play' | 'warm'

interface TTSOptions {
  voice?: string
  /** Scheduler tier for a synthesis this call has to start. Default `'play'`. */
  priority?: SynthesisPriority
  /**
   * Called once, when the synthesis serving this call leaves the queue and
   * starts running — or soon after the call when it already started (or is
   * cached). Lets a caller tell queue wait from synthesis time.
   */
  onStart?: () => void
  /**
   * Called once, when the first audio chunk of the synthesis serving this call
   * arrives (on any attempt, the first time only) — or soon after the call when
   * it already arrived. Lets a caller tell time-to-first-byte from total
   * synthesis time, which is what sizes a stall timeout.
   */
  onFirstByte?: () => void
}

const ENGINE = 'edge'

// Created on first use, not at import: the module is imported by client
// components only, but laziness keeps an SSR import free of side effects.
// One instance per page, so its cache and queue are shared by every caller and
// survive useTTS `content` swaps (the next section warms while one plays).
let instance: Tts | null = null

function tts(): Tts {
  instance ??= createTts({
    engines: {
      [ENGINE]: {
        // Callers always pass a voice; the default only covers one that does not.
        voices: { default: DEFAULT_TTS_VOICE },
        // Device logs: a live connection delivers its first audio byte within
        // 5.3 s (hidden page included); a dead one never does. 8 s declares it
        // dead without waiting out the inactivity timer.
        firstByteMs: 8000,
        // After the first byte, a socket that neither sends nor closes for 15 s
        // is stalled (the old "TTS freezes after N paragraphs" hang).
        stallMs: 15000,
        // One retry on a fresh socket for a transient failure: a single stalled
        // connection must not surface as a hard failure.
        retries: 1,
        // No relayUrl: direct mode.
      },
    },
    defaultEngine: ENGINE,
    // One synthesis at a time: stalls cluster on bursts of 2-3 concurrent
    // sockets from a hidden page, while single requests on the same page pass.
    scheduler: { concurrency: 1, tiers: [{ name: 'play' }, { name: 'warm' }] },
    // Enough for the prebuffer ladder to warm every loaded section's title and
    // TLDR plus the playing section's body without thrashing; entries are
    // compressed MP3 (~tens of KB), so ~200 cost a few MB.
    cache: { max: 200 },
  })
  return instance
}

/**
 * Synthesize speech from text. Results are cached by engine + voice + text;
 * repeat and concurrent calls share one synthesis. A synthesis that is not
 * cached waits in the anytts scheduler (one at a time, `play` before `warm`).
 * Failures reject with the anytts `TtsError` as is, so callers can log its kind.
 * @param text - The text to synthesize
 * @param options - TTS options (voice, priority, onStart, onFirstByte)
 * @returns ArrayBuffer containing the audio data (MP3 format)
 */
export async function synthesizeSpeech(
  text: string,
  options: TTSOptions = {}
): Promise<ArrayBuffer> {
  if (!text || !text.trim()) {
    // Surface the failure to the caller instead of synthesizing nothing
    // (prefetchSpeech guards this earlier; this protects direct callers).
    throw new Error('synthesizeSpeech: empty text')
  }

  const { bytes } = await tts().synthesize({
    text,
    voice: options.voice,
    engine: ENGINE,
    tier: options.priority ?? 'play',
    onStart: options.onStart,
    onFirstByte: options.onFirstByte,
  })
  // anytts shares `bytes` with its cache and every caller served the same
  // entry, and forbids detaching it. A copy here keeps the cached audio
  // replayable whatever a caller does with the buffer it gets.
  return bytes.slice(0)
}

/**
 * Fire-and-forget warm of the synthesis cache on the `warm` tier, so it never
 * holds up a unit the reader needs now. No-op on empty/whitespace text;
 * anytts swallows failures (the eventual `synthesizeSpeech` call will retry).
 */
export function prefetchSpeech(text: string, options: TTSOptions = {}): void {
  if (!text || !text.trim()) return
  tts().prefetch({ text, voice: options.voice, engine: ENGINE, tier: 'warm' })
}

/**
 * Declare every running synthesis attempt that has not delivered its first
 * audio byte dead now. It fails as a first-byte timeout, so the synthesis
 * either starts its one fresh-connection retry at once or, if this already was
 * the retry, fails. Used when the screen turns on while the reader is starved:
 * the listener is back, and waiting out the deadline would only add silence.
 * @returns true when an attempt was restarted; false when nothing is running or
 * the running attempt already streams audio.
 */
export function restartStalledSynthesis(): boolean {
  return tts().restartStalled()
}
