'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { detectLanguageFromContent } from '@/lib/tts/voice-map'
import { splitIntoChunks } from '@/lib/tts/chunks'
import { synthesizeSpeech } from '@/lib/tts/client'

export interface TTSState {
  isPlaying: boolean
  isBuffering: boolean
  progress: number
  currentTime: number
  totalEstimatedTime: number
  currentChunkIndex: number
  totalChunks: number
}

export interface UseTTSOptions {
  voice?: string
  /**
   * Pre-split speech units for `content`, in play order (title → TLDR → body
   * chunks — see `splitIntoSpeechUnits`). When provided and non-empty, these are
   * used verbatim as the chunk list instead of `splitIntoChunks(content)`, so
   * the first spoken unit is tiny (fast-start) and matches the strings the
   * prebuffer ladder warms. Must correspond to `content` (same section).
   */
  units?: string[]
  /**
   * Fired on EVERY progress tick during playback with the 0–100 progress
   * percent — that is every animation frame while the page is visible (~60Hz)
   * AND every element `timeupdate` (~4Hz, and the only one that survives a
   * hidden page). Intentionally NOT throttled, so the continuous reader's
   * prefetch threshold sees continuous progress even with the screen off. Keep
   * the handler cheap; do not do heavy work here or it runs 60×/second.
   */
  onProgress?: (progress: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

export interface TTSPlayback extends TTSState {
  play: () => Promise<void>
  /** Abort current audio and start at `unitIndex` of the current content. */
  playFromUnit: (unitIndex: number) => Promise<void>
  pause: () => void
  stop: () => void
  resume: () => Promise<void>
}

const detectLanguage = detectLanguageFromContent

// Number of chunks to keep buffered ahead of current playback
const BUFFER_AHEAD = 3

// A chunk whose synthesis fails (even after lib/tts-client's own
// fresh-connection retry — see STREAM_STALL_TIMEOUT_MS) is skipped rather than
// stopping playback outright, so a single unreadable paragraph does not force
// the user to manually resume. This caps how many *consecutive* chunks may be
// skipped before giving up: past it, the failure is treated as systemic (e.g.
// no network) and surfaced as a real stop + onError.
const MAX_CONSECUTIVE_CHUNK_FAILURES = 3

// `lib/tts/client` returns MP3 bytes straight from edge-tts. Nothing in the
// reader needs decoded samples (no runtime playback-rate or EQ feature), so the
// bytes are handed to the media element as-is, correctly typed, and the browser
// decodes them on its own audio thread.
const AUDIO_MIME_TYPE = 'audio/mpeg'

export function useTTS(content: string, options: UseTTSOptions = {}) {
  const { voice, units, onProgress, onComplete, onError } = options

  // Latest units, read inside play() without adding array-identity churn to its
  // deps (the caller passes a fresh array per render).
  const unitsRef = useRef<string[] | undefined>(units)
  unitsRef.current = units

  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isBuffering: false,
    progress: 0,
    currentTime: 0,
    totalEstimatedTime: 0,
    currentChunkIndex: 0,
    totalChunks: 0,
  })

  // Refs for audio management
  //
  // THE output device: one long-lived <audio> element per hook instance whose
  // `src` is swapped per speech unit. A real (URL-backed) media element is what
  // earns Chrome for Android the media treatment — notification, lockscreen,
  // AVRCP metadata in the car — and, crucially, the background-media exemption
  // that keeps the main thread alive with the screen off. A MediaStream-backed
  // element gets none of that, which is why the Web Audio carrier is gone.
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  // Whether this element has already been poked inside a user gesture (see
  // `unlockElementForGesture`). Once true it stays true for the element's whole
  // life — WebKit's per-element unlock does not expire.
  const elementUnlockedRef = useRef(false)
  // Index of the unit currently loaded into the element, so a mid-unit resume
  // can be told apart from a fresh unit start.
  const loadedUnitIndexRef = useRef<number | null>(null)
  const chunksRef = useRef<string[]>([])
  const charCountsRef = useRef<number[]>([])
  const totalCharsRef = useRef<number>(0)
  const completedCharsRef = useRef<number>(0)
  const pauseOffsetRef = useRef<number>(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const requestGenerationRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)
  const currentChunkIndexRef = useRef(0)
  const voiceRef = useRef<string | null>(null)
  // Last integer percent emitted to setState, so progress-driven re-renders fire
  // at most ~1/percent instead of on every ~60fps rAF tick (hover flicker fix).
  const lastEmittedPctRef = useRef(-1)
  // Consecutive unreadable units within the current play session — synthesis
  // that never produced bytes, or bytes the element refused. Reset when a unit
  // actually plays to its end (and at the start of a play session), NOT when
  // synthesis merely resolves. Bounds the auto-skip below: a systemic outage
  // (no network, edge-tts fully down, a decoder that rejects everything) must
  // still surface as a stop + onError instead of racing silently through every
  // remaining chunk.
  const consecutiveFailuresRef = useRef(0)
  // The element's `timeupdate` handler is attached once, at element creation,
  // so it has to reach the CURRENT progress emitter — whose identity changes
  // with `onProgress` — instead of closing over the one that existed at mount.
  const emitProgressRef = useRef<() => void>(() => {})

  // Buffer cache: pre-fetched MP3 blobs keyed by chunk index. An entry is
  // dropped once its object URL exists — the URL then owns the bytes.
  const bufferCacheRef = useRef<Map<number, Blob>>(new Map())
  // Live `blob:` object URLs keyed by chunk index. Every URL in here MUST be
  // revoked eventually (unit consumed, stop(), unmount) or a long Read All News
  // session leaks the whole article's audio.
  const objectUrlsRef = useRef<Map<number, string>>(new Map())
  // Track in-flight fetches to avoid duplicate requests
  const fetchingRef = useRef<Set<number>>(new Set())

  const invalidatePendingRequests = useCallback(() => {
    requestGenerationRef.current += 1
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
  }, [])

  // Create (once) the single element every unit plays through. Created
  // imperatively rather than rendered by React so nothing about the reader's
  // render tree can remount it mid-article and drop the OS media session.
  const getAudioElement = useCallback((): HTMLAudioElement => {
    if (!audioElementRef.current) {
      const element = document.createElement('audio')
      // playsInline is not declared on HTMLMediaElement in lib.dom, but iOS
      // needs it to keep playback out of the native fullscreen player.
      ;(element as HTMLAudioElement & { playsInline: boolean }).playsInline = true
      element.controls = false
      // Unlike the old MediaStream carrier there IS something to load here, and
      // the next unit's blob is already local — 'auto' lets the element decode
      // its head immediately so the swap at `ended` is inaudible.
      element.preload = 'auto'
      // The authoritative progress clock. Unlike requestAnimationFrame this
      // keeps firing (~4Hz) while the page is hidden, which is the only reason
      // background prefetch keeps being evaluated with the screen off. Attached
      // once for the element's whole life — no per-unit add/remove — so a src
      // swap can never drop it mid-article.
      element.addEventListener('timeupdate', () => emitProgressRef.current())
      document.body.appendChild(element)
      audioElementRef.current = element
      elementUnlockedRef.current = false
    }
    return audioElementRef.current
  }, [])

  /**
   * Spend the user gesture on the element, synchronously, before anything is
   * awaited.
   *
   * WebKit (iOS Safari, and every iOS browser, since they all use it) gates
   * `play()` on the *gesture task itself*: only a call made synchronously inside
   * the handler — or a later call on an element that call already unlocked —
   * is allowed. Our real per-unit `play()` happens after
   * `await fetchAudioBlob(...)`, which is a different task, so without this poke
   * the very first unit would reject with `NotAllowedError` and the spec's
   * "Apple browsers are no longer carved out" would be a lie.
   *
   * Chrome for Android does NOT need this: its gate is *sticky* user activation,
   * which persists for the document's lifetime, so the `ended`-driven chain,
   * media-session `nexttrack` and resume-after-pause all pass on their own.
   *
   * The element has no source at this point, so nothing becomes audible; the
   * immediate `pause()` keeps it that way if the engine did start something. The
   * returned promise rejects here as a matter of course (`NotSupportedError` for
   * the empty element, `AbortError` for the pause that interrupts it) and that
   * rejection is deliberately swallowed — it is NOT the refused start that
   * `playChunk` reports through `onError`.
   */
  const unlockElementForGesture = useCallback((element: HTMLAudioElement) => {
    if (elementUnlockedRef.current) return
    elementUnlockedRef.current = true
    try {
      const attempt = element.play?.()
      element.pause?.()
      void attempt?.catch?.(() => {})
    } catch {
      // Older engines throw synchronously instead of rejecting; either way an
      // unlock that fails must never surface to the user.
    }
  }, [])

  // Expose a unit's MP3 as a blob: URL, reusing the one it already has. Called
  // as soon as a unit's audio lands (prefetch) so the source swap at `ended` is
  // a local assignment with no network round-trip.
  const ensureObjectUrl = useCallback((index: number, blob: Blob): string => {
    const existing = objectUrlsRef.current.get(index)
    if (existing) return existing

    const url = URL.createObjectURL(blob)
    objectUrlsRef.current.set(index, url)
    // The URL keeps the blob alive; holding the Blob too would double the
    // retained audio for the whole buffered window.
    bufferCacheRef.current.delete(index)
    return url
  }, [])

  /**
   * Detach the current unit's `ended` / `error` handlers.
   *
   * Called wherever the unit in the element is abandoned (pause, stop, give-up,
   * completion). Both handlers do check the generation and abort signal, but a
   * *structural* detach is what actually makes a late event harmless: an `ended`
   * that was already queued when the user hit pause would otherwise still run
   * `completedChars += charCounts[index]` and silently inflate progress for the
   * rest of the session. A handler that cannot run at all cannot be broken by a
   * later refactor of those guards either.
   */
  const detachUnitHandlers = useCallback(() => {
    const element = audioElementRef.current
    if (!element) return
    element.onended = null
    element.onerror = null
  }, [])

  const revokeAllObjectUrls = useCallback(() => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    objectUrlsRef.current.clear()
  }, [])

  /**
   * Revoke every object URL outside the live window [current, current +
   * BUFFER_AHEAD]. Called AFTER the element's src has been swapped, so the URL
   * being dropped is never the one the element is currently reading. This is
   * what releases a consumed unit, and also what cleans up behind a backwards
   * or long-distance `playFromUnit` jump.
   */
  const pruneObjectUrls = useCallback((currentIndex: number) => {
    const keepUntil = currentIndex + BUFFER_AHEAD
    objectUrlsRef.current.forEach((url, index) => {
      if (index >= currentIndex && index <= keepUntil) return
      URL.revokeObjectURL(url)
      objectUrlsRef.current.delete(index)
    })
  }, [])

  // Synthesize a single chunk and wrap its MP3 for the element.
  const fetchAudioBlob = useCallback(
    async (text: string, signal: AbortSignal): Promise<Blob> => {
      const detectedVoice = voiceRef.current || detectLanguage(content)

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

      const arrayBuffer = await synthesizeSpeech(text, { voice: detectedVoice })

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

      // The synthesis cache (lib/tts/client) hands the SAME ArrayBuffer instance
      // to every caller for a given voice+text. `new Blob([buffer])` COPIES it,
      // so — unlike the old Web Audio decode step, which detached its input and
      // forced a slice(0) dance — replay / play-from-here / prefetch-then-play can all
      // wrap the cached buffer again without any chance of a detached buffer.
      return new Blob([arrayBuffer], { type: AUDIO_MIME_TYPE })
    },
    [content]
  )

  // Fill the buffer cache for chunks [startIndex .. startIndex + BUFFER_AHEAD)
  const fillBuffer = useCallback(
    (startIndex: number, generation: number, signal: AbortSignal) => {
      if (generation !== requestGenerationRef.current || signal.aborted) return

      const end = Math.min(startIndex + BUFFER_AHEAD, chunksRef.current.length)
      for (let i = startIndex; i < end; i++) {
        if (
          objectUrlsRef.current.has(i) ||
          bufferCacheRef.current.has(i) ||
          fetchingRef.current.has(i)
        ) continue

        fetchingRef.current.add(i)

        fetchAudioBlob(chunksRef.current[i], signal)
          .then((blob) => {
            fetchingRef.current.delete(i)
            if (generation !== requestGenerationRef.current || signal.aborted) return
            bufferCacheRef.current.set(i, blob)
            // Prepare the URL now, not at the swap: `ended` must only have to
            // assign a string.
            ensureObjectUrl(i, blob)
          })
          .catch((err) => {
            fetchingRef.current.delete(i)
            if ((err as Error).name !== 'AbortError') {
              console.warn(`[TTS] Buffer fetch failed for chunk ${i}:`, err)
            }
          })
      }
    },
    [ensureObjectUrl, fetchAudioBlob]
  )

  /**
   * THE progress emitter — the single source of truth both clocks go through.
   *
   * Progress has two clocks (see the change's design.md):
   *   - `timeupdate` (~4Hz) is the AUTHORITATIVE one, because it keeps firing
   *     while the page is hidden. That is the whole point of this change: phone
   *     screen off, reader playing in the background. `use-continuous-reader`
   *     evaluates its prefetch threshold from `onProgress`, so a progress
   *     stream that dies with the page would stall the prefetch ladder and
   *     starve the reader at a section boundary.
   *   - `requestAnimationFrame` is cosmetic: it does not tick while hidden, and
   *     exists only to move the reader bar smoothly between timeupdates.
   *
   * Both read the SAME `element.currentTime` through this one function; if the
   * percentage maths were duplicated per clock they would drift apart.
   */
  const emitProgress = useCallback(() => {
    const element = audioElementRef.current
    // Also the "stop emitting" gate: after pause/stop/completion the element
    // keeps its `timeupdate` listener attached, but this guard makes it inert.
    if (!isPlayingRef.current || !element) return

    // duration is NaN until the element has metadata, and the element rewinds to
    // 0 on every src swap — so an unknown duration reads as "just started"
    // rather than poisoning the percentage with NaN.
    const duration = element.duration
    const chunkProgress =
      Number.isFinite(duration) && duration > 0
        ? Math.min(element.currentTime / duration, 1)
        : 0

    const completedChars = completedCharsRef.current
    const currentChunkChars = charCountsRef.current[currentChunkIndexRef.current] || 0
    const currentProgress = completedChars + currentChunkChars * chunkProgress
    const totalProgress = (currentProgress / totalCharsRef.current) * 100

    const clamped = Math.min(totalProgress, 100)
    // Emit progress to callers EVERY frame — the reader's prefetch threshold
    // depends on it.
    onProgress?.(clamped)

    // Only re-render (setState) when the rounded percent actually changes,
    // cutting progress-driven re-renders from ~60/sec to ~1 per 1%. This keeps
    // the backdrop-blur reader bar from re-rendering at 60fps (hover flicker).
    // The latch lives here, shared by both clocks, so a timeupdate and a frame
    // landing on the same percent cost exactly one re-render between them.
    const pct = Math.round(clamped)
    if (pct !== lastEmittedPctRef.current) {
      lastEmittedPctRef.current = pct
      setState((prev) => ({
        ...prev,
        progress: clamped,
        currentTime: prev.totalEstimatedTime * (clamped / 100),
        currentChunkIndex: currentChunkIndexRef.current,
      }))
    }
  }, [onProgress])

  emitProgressRef.current = emitProgress

  // The cosmetic clock: emit, then re-arm. Self-rescheduling stops on its own
  // as soon as playback does, and pause()/stop()/completion additionally cancel
  // the frame already in flight.
  const runProgressFrame = useCallback(() => {
    if (!isPlayingRef.current || !audioElementRef.current) return
    emitProgress()
    animationFrameRef.current = requestAnimationFrame(runProgressFrame)
  }, [emitProgress])

  // Play a single chunk
  const playChunk = useCallback(
    async (index: number, offset: number, generation: number, signal: AbortSignal) => {
      if (generation !== requestGenerationRef.current || signal.aborted) return

      if (index >= chunksRef.current.length) {
        // All chunks played
        isPlayingRef.current = false
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        detachUnitHandlers()
        invalidatePendingRequests()
        setState((prev) => ({ ...prev, isPlaying: false, progress: 100 }))
        onComplete?.()

        currentChunkIndexRef.current = 0
        completedCharsRef.current = 0
        loadedUnitIndexRef.current = null
        pauseOffsetRef.current = 0
        bufferCacheRef.current.clear()
        fetchingRef.current.clear()
        // The last unit is consumed: nothing may outlive the article.
        revokeAllObjectUrls()
        return
      }

      const element = getAudioElement()

      /**
       * End the session on an unrecoverable failure. There is exactly one output
       * path now, so anything that reaches here would otherwise be silence with
       * `isPlaying` still true — the failure mode this change exists to prevent.
       *
       * The animation-frame handle is cancelled AND nulled: `runProgressFrame`
       * early-returns without clearing it, so a stale handle left here would make
       * the next `play()` skip re-arming the loop
       * (`if (!animationFrameRef.current)`) and `onProgress` would stay dead for
       * the rest of the session — which now also starves the continuous reader's
       * prefetch threshold.
       */
      const stopWithError = (error: Error) => {
        isPlayingRef.current = false
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        detachUnitHandlers()
        invalidatePendingRequests()
        setState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }))
        onError?.(error)
      }

      /**
       * A unit can fail two ways — synthesis never produced bytes, or the element
       * refused the bytes it was handed (`error`: undecodable MP3, dead object
       * URL). Both mean "this unit is unreadable", so both get the same
       * treatment: drop it, count its characters complete so progress does not
       * stall on it, and continue — bounded by the same streak counter, so a
       * systemic outage still stops loudly instead of racing silently through
       * the rest of the article.
       */
      const failUnit = (failedIndex: number, error: Error) => {
        consecutiveFailuresRef.current += 1

        // The unit is abandoned, so nothing will ever read its object URL again.
        // Revoke it here rather than leaving it to the next unit's prune: on the
        // give-up path below there is no next unit to prune behind us.
        const failedUrl = objectUrlsRef.current.get(failedIndex)
        if (failedUrl) {
          URL.revokeObjectURL(failedUrl)
          objectUrlsRef.current.delete(failedIndex)
          if (loadedUnitIndexRef.current === failedIndex) {
            loadedUnitIndexRef.current = null
          }
        }

        if (consecutiveFailuresRef.current > MAX_CONSECUTIVE_CHUNK_FAILURES) {
          // Too many units in a row were unreadable: systemic (no network,
          // edge-tts down, a decoder that rejects everything) rather than one bad
          // paragraph. The session ends here, so the whole buffered window of
          // object URLs goes with it.
          revokeAllObjectUrls()
          loadedUnitIndexRef.current = null
          stopWithError(error)
          return
        }

        // A single unreadable unit must not strand playback waiting for the user
        // to press Play again.
        completedCharsRef.current += charCountsRef.current[failedIndex] || 0
        void playChunk(failedIndex + 1, 0, generation, signal)
      }

      currentChunkIndexRef.current = index

      // Eagerly start buffering upcoming chunks
      fillBuffer(index + 1, generation, signal)

      // Resuming the unit the element already holds: keep its source (a src
      // assignment rewinds) and just seek back to where pause() left off.
      const resuming =
        offset > 0 &&
        loadedUnitIndexRef.current === index &&
        objectUrlsRef.current.has(index)

      if (!resuming) {
        let url = objectUrlsRef.current.get(index)

        if (!url) {
          let blob = bufferCacheRef.current.get(index)

          if (!blob) {
            // Not buffered yet — fetch inline and show buffering state
            setState((prev) => ({ ...prev, isBuffering: true }))

            try {
              blob = await fetchAudioBlob(chunksRef.current[index], signal)
            } catch (error) {
              if (
                generation !== requestGenerationRef.current ||
                signal.aborted ||
                (error as Error).name === 'AbortError'
              ) return
              console.warn(`[TTS] Chunk ${index} failed:`, error)

              // Synthesis stalled even after lib/tts-client's own retry.
              failUnit(index, error as Error)
              return
            }
          }

          url = ensureObjectUrl(index, blob)
        }

        if (
          generation !== requestGenerationRef.current ||
          signal.aborted ||
          !isPlayingRef.current
        ) return // Stopped while fetching

        setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))

        element.src = url
        loadedUnitIndexRef.current = index
        // Only now is the previous unit's URL safe to drop: the element has
        // already been repointed away from it.
        pruneObjectUrls(index)
      } else {
        setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))
        element.currentTime = offset
      }

      element.onended = () => {
        if (
          !isPlayingRef.current ||
          generation !== requestGenerationRef.current ||
          signal.aborted
        ) return
        // A unit that played all the way through is the only real proof the
        // pipeline is healthy, so THAT is what clears the failure streak.
        // Synthesis merely resolving is not proof: an element `error` means the
        // bytes were unusable, and resetting the streak on those would let a
        // systemic decode failure skip every unit in the article without ever
        // reaching MAX_CONSECUTIVE_CHUNK_FAILURES.
        consecutiveFailuresRef.current = 0
        completedCharsRef.current += charCountsRef.current[index] || 0
        void playChunk(index + 1, 0, generation, signal)
      }

      // The element could not use the media it was handed. With the Web Audio
      // carrier gone there is nothing to retry on, so this is a unit failure of
      // exactly the same kind as a synthesis failure.
      element.onerror = () => {
        if (
          !isPlayingRef.current ||
          generation !== requestGenerationRef.current ||
          signal.aborted
        ) return
        detachUnitHandlers()
        const mediaError = element.error
        failUnit(
          index,
          new Error(
            `[TTS] Media element failed on unit ${index}` +
              (mediaError?.message ? `: ${mediaError.message}` : '')
          )
        )
      }

      // A refused start is the one thing that must never be swallowed: there is
      // no second output path, so silence with `isPlaying` left true is the only
      // other outcome. (The gesture-unlock poke in play() is a separate call and
      // swallows its own, expected, rejection.)
      const started = element.play?.()
      void started?.catch?.((error: unknown) => {
        if (
          !isPlayingRef.current ||
          generation !== requestGenerationRef.current ||
          signal.aborted
        ) return
        console.warn(`[TTS] Element refused to play unit ${index}:`, error)
        stopWithError(error as Error)
      })

      // Only the smooth-bar clock needs starting here; `timeupdate` is already
      // wired to the element and starts emitting on its own once it plays.
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(runProgressFrame)
      }
    },
    [
      detachUnitHandlers,
      ensureObjectUrl,
      fetchAudioBlob,
      fillBuffer,
      getAudioElement,
      invalidatePendingRequests,
      onComplete,
      onError,
      pruneObjectUrls,
      revokeAllObjectUrls,
      runProgressFrame,
    ]
  )

  // Initialize chunks on first play or after completion reset. Prefer pre-split
  // speech units (title → TLDR → body) when the caller supplies them; otherwise
  // fall back to length-based chunking of the raw content. No-op once
  // initialized — `stop()` clears the list.
  const ensureChunks = useCallback(() => {
    if (chunksRef.current.length > 0) return

    const providedUnits = unitsRef.current
    chunksRef.current =
      providedUnits && providedUnits.length > 0
        ? providedUnits
        : splitIntoChunks(content)
    charCountsRef.current = chunksRef.current.map((c) => c.length)
    totalCharsRef.current = charCountsRef.current.reduce((a, b) => a + b, 0)

    const estimatedSeconds = totalCharsRef.current / 15
    setState((prev) => ({
      ...prev,
      totalChunks: chunksRef.current.length,
      totalEstimatedTime: estimatedSeconds,
    }))
  }, [content])

  // Play / resume
  const play = useCallback(async () => {
    if (isPlayingRef.current) return

    // FIRST, and before any await: this call may be running inside the user's
    // tap, and on WebKit that is the only moment the element can be unlocked.
    unlockElementForGesture(getAudioElement())

    ensureChunks()

    voiceRef.current = voice || null
    isPlayingRef.current = true
    lastEmittedPctRef.current = -1
    // A new play session starts with a clean failure streak: whatever went wrong
    // before was already surfaced (or skipped past), and a user pressing Play
    // again deserves the same tolerance as the first time.
    consecutiveFailuresRef.current = 0
    const generation = requestGenerationRef.current + 1
    requestGenerationRef.current = generation
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    const signal = abortController.signal

    setState((prev) => ({ ...prev, isPlaying: true, isBuffering: true }))

    // Pre-buffer: fetch the first few chunks before starting playback
    const startIdx = currentChunkIndexRef.current
    const preBufferEnd = Math.min(startIdx + BUFFER_AHEAD, chunksRef.current.length)

    // Fetch first chunk (must have it to start playing)
    if (
      pauseOffsetRef.current === 0 &&
      !objectUrlsRef.current.has(startIdx) &&
      !bufferCacheRef.current.has(startIdx)
    ) {
      try {
        const blob = await fetchAudioBlob(chunksRef.current[startIdx], signal)
        if (generation !== requestGenerationRef.current || signal.aborted) return
        bufferCacheRef.current.set(startIdx, blob)
        ensureObjectUrl(startIdx, blob)
      } catch (error) {
        if (
          generation !== requestGenerationRef.current ||
          signal.aborted ||
          (error as Error).name === 'AbortError'
        ) return
        isPlayingRef.current = false
        invalidatePendingRequests()
        onError?.(error as Error)
        setState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }))
        return
      }
    }

    // Kick off prefetch for upcoming chunks (don't await)
    for (let i = startIdx + 1; i < preBufferEnd; i++) {
      if (
        !objectUrlsRef.current.has(i) &&
        !bufferCacheRef.current.has(i) &&
        !fetchingRef.current.has(i)
      ) {
        fetchingRef.current.add(i)
        fetchAudioBlob(chunksRef.current[i], signal)
          .then((blob) => {
            fetchingRef.current.delete(i)
            if (generation !== requestGenerationRef.current || signal.aborted) return
            bufferCacheRef.current.set(i, blob)
            ensureObjectUrl(i, blob)
          })
          .catch(() => { fetchingRef.current.delete(i) })
      }
    }

    setState((prev) => ({ ...prev, isBuffering: false }))

    const offset = pauseOffsetRef.current
    pauseOffsetRef.current = 0
    void playChunk(startIdx, offset, generation, signal)
  }, [
    ensureChunks,
    ensureObjectUrl,
    fetchAudioBlob,
    getAudioElement,
    invalidatePendingRequests,
    onError,
    playChunk,
    unlockElementForGesture,
    voice,
  ])

  // Pause
  const pause = useCallback(() => {
    isPlayingRef.current = false
    invalidatePendingRequests()

    const element = audioElementRef.current
    if (element) {
      // The element keeps its currentTime across a pause; remember it anyway so
      // play() can seek back explicitly even if something else moved the
      // playhead in between.
      const duration = element.duration
      const elapsed = Number.isFinite(element.currentTime) ? element.currentTime : 0
      pauseOffsetRef.current =
        Number.isFinite(duration) && duration > 0 ? Math.min(elapsed, duration) : elapsed
      // Detach BEFORE pausing: an `ended` already queued for this unit would
      // otherwise still run and count the unit complete, inflating progress by a
      // whole unit's characters for the rest of the session. play() re-attaches
      // handlers for whichever unit it resumes.
      detachUnitHandlers()
      element.pause?.()
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [detachUnitHandlers, invalidatePendingRequests])

  /**
   * Interrupting skip ("play from here"): abort whatever is playing and start at
   * `unitIndex` of the current content. Progress is seeded from the units BEFORE
   * `unitIndex`, so it reflects the skipped audio instead of restarting at 0.
   */
  const playFromUnit = useCallback(
    async (unitIndex: number) => {
      // Aborts in-flight synthesis and pauses the element. The mid-unit offset
      // it records belongs to the OLD unit, so it is dropped below.
      pause()

      ensureChunks()
      if (chunksRef.current.length === 0) return

      // Normalise before clamping: a fractional index would index `chunksRef`
      // to undefined and surface as a synthesis error via onError. NaN carries
      // no position, so it falls back to 0; infinities are left to the clamp
      // below, which reads +Infinity as the last unit and -Infinity as the first.
      const requested = Number.isNaN(unitIndex) ? 0 : Math.trunc(unitIndex)
      const index = Math.min(Math.max(requested, 0), chunksRef.current.length - 1)
      currentChunkIndexRef.current = index
      completedCharsRef.current = charCountsRef.current
        .slice(0, index)
        .reduce((a, b) => a + b, 0)
      // Forget which unit the element holds so the jump always re-points it,
      // even when landing on the unit that was already loaded.
      loadedUnitIndexRef.current = null
      pauseOffsetRef.current = 0

      await play()
    },
    [ensureChunks, pause, play]
  )

  // Stop
  const stop = useCallback(() => {
    pause()

    chunksRef.current = []
    charCountsRef.current = []
    totalCharsRef.current = 0
    completedCharsRef.current = 0
    currentChunkIndexRef.current = 0
    loadedUnitIndexRef.current = null
    pauseOffsetRef.current = 0
    bufferCacheRef.current.clear()
    fetchingRef.current.clear()
    lastEmittedPctRef.current = -1
    consecutiveFailuresRef.current = 0

    detachUnitHandlers()
    const element = audioElementRef.current
    if (element) {
      // The URLs below are about to die, so the element must not keep reading
      // one of them.
      element.removeAttribute('src')
    }
    revokeAllObjectUrls()

    setState({
      isPlaying: false,
      isBuffering: false,
      progress: 0,
      currentTime: 0,
      totalEstimatedTime: 0,
      currentChunkIndex: 0,
      totalChunks: 0,
    })
  }, [detachUnitHandlers, pause, revokeAllObjectUrls])

  // Exactly one <audio> element per hook instance, created on mount and torn
  // down (with every object URL it ever handed out) on unmount.
  useEffect(() => {
    const element = getAudioElement()
    return () => {
      stop()
      detachUnitHandlers()
      element.pause?.()
      element.removeAttribute('src')
      element.remove()
      audioElementRef.current = null
      revokeAllObjectUrls()
    }
  }, [detachUnitHandlers, getAudioElement, revokeAllObjectUrls, stop])

  const playback: TTSPlayback = {
    ...state,
    play,
    playFromUnit,
    pause,
    stop,
    resume: play,
  }

  return playback
}

export default useTTS
