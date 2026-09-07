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
   * Fired on EVERY requestAnimationFrame tick during playback (~60Hz) with the
   * 0–100 progress percent — intentionally NOT throttled, so the continuous
   * reader's prefetch threshold sees continuous progress. Keep the handler
   * cheap; do not do heavy work here or it runs 60×/second.
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
  // Consecutive in-chunk synthesis failures within the current play session.
  // Reset whenever a chunk's audio is actually obtained. Bounds the auto-skip
  // below: a systemic outage (no network, edge-tts fully down) must still
  // surface as a stop + onError instead of racing silently through every
  // remaining chunk.
  const consecutiveFailuresRef = useRef(0)

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
      document.body.appendChild(element)
      audioElementRef.current = element
    }
    return audioElementRef.current
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

  // Update progress via requestAnimationFrame
  const updateProgress = useCallback(() => {
    const element = audioElementRef.current
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

    if (isPlayingRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }, [onProgress])

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

              consecutiveFailuresRef.current += 1
              if (consecutiveFailuresRef.current > MAX_CONSECUTIVE_CHUNK_FAILURES) {
                // Too many chunks in a row failed: treat as a systemic outage
                // rather than skipping through the rest of the content silently.
                isPlayingRef.current = false
                invalidatePendingRequests()
                setState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }))
                onError?.(error as Error)
                return
              }

              // A single unreadable chunk (synthesis stalled even after the
              // client's own retry) must not strand playback waiting for the
              // user to press Play again. Count it as completed for progress
              // purposes and move on to the next chunk automatically.
              completedCharsRef.current += charCountsRef.current[index] || 0
              void playChunk(index + 1, 0, generation, signal)
              return
            }
          }

          url = ensureObjectUrl(index, blob)
        }

        // Audio obtained (URL already prepared, cache hit, or freshly fetched):
        // this chunk is readable, so the failure streak resets.
        consecutiveFailuresRef.current = 0

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
        consecutiveFailuresRef.current = 0
        setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))
        element.currentTime = offset
      }

      element.onended = () => {
        if (
          !isPlayingRef.current ||
          generation !== requestGenerationRef.current ||
          signal.aborted
        ) return
        completedCharsRef.current += charCountsRef.current[index] || 0
        void playChunk(index + 1, 0, generation, signal)
      }

      // A rejected play() is handled in a later change (see the plan's Task 5);
      // swallowing it here only keeps it from becoming an unhandled rejection.
      void element.play?.()?.catch?.(() => {})

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      }
    },
    [
      ensureObjectUrl,
      fetchAudioBlob,
      fillBuffer,
      getAudioElement,
      invalidatePendingRequests,
      onComplete,
      onError,
      pruneObjectUrls,
      revokeAllObjectUrls,
      updateProgress,
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

    ensureChunks()

    voiceRef.current = voice || null
    isPlayingRef.current = true
    lastEmittedPctRef.current = -1
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
    invalidatePendingRequests,
    onError,
    playChunk,
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
      element.pause?.()
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [invalidatePendingRequests])

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

    const element = audioElementRef.current
    if (element) {
      element.onended = null
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
  }, [pause, revokeAllObjectUrls])

  // Exactly one <audio> element per hook instance, created on mount and torn
  // down (with every object URL it ever handed out) on unmount.
  useEffect(() => {
    const element = getAudioElement()
    return () => {
      stop()
      element.onended = null
      element.pause?.()
      element.removeAttribute('src')
      element.remove()
      audioElementRef.current = null
      revokeAllObjectUrls()
    }
  }, [getAudioElement, revokeAllObjectUrls, stop])

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
