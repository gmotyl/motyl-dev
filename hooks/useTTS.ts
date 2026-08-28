'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { detectLanguageFromContent } from '@/lib/tts'
import { splitIntoChunks } from '@/lib/tts-chunks'
import { synthesizeSpeech } from '@/lib/tts-client'

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

/**
 * Deliberate platform carve-out: Apple/WebKit browsers do NOT get the
 * media-element playback path.
 *
 * `createMediaStreamDestination` exists in Safari, so feature detection alone
 * would happily route iOS into `<audio srcObject=MediaStream>` — a path with a
 * long history of rendering no sound at all for Web-Audio-originated
 * MediaStreams on iOS Safari. Because the routing is exclusive (the source is
 * connected to the stream destination INSTEAD of `audioContext.destination`),
 * taking it on WebKit would be a straight regression: silence where direct
 * output works today. WebKit therefore keeps the plain
 * `audioContext.destination` path and simply forgoes the background-playback
 * exemption; only non-WebKit (the Chrome-for-Android target) streams.
 *
 * `navigator.vendor === 'Apple Computer, Inc.'` is the check because it is
 * stable across Apple browsers AND correctly catches Chrome/Firefox on iOS,
 * which are WebKit underneath and share the same defect. SSR-safe: this module
 * is imported by a Next.js client component that still renders on the server.
 */
const isWebKitBrowser = (): boolean =>
  typeof navigator !== 'undefined' && navigator.vendor === 'Apple Computer, Inc.'

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
  const audioContextRef = useRef<AudioContext | null>(null)
  // Stream destination + <audio> element that carry the graph's output. Null
  // when the browser has no createMediaStreamDestination, when it is WebKit
  // (see isWebKitBrowser), or once the element has refused to start — playback
  // then goes straight to audioContext.destination.
  const streamDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null)
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  // Latches once the element's play() has rejected. The element stays in the
  // DOM (unmount tears it down) but is never driven again.
  const mediaElementUnusableRef = useRef(false)
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const chunksRef = useRef<string[]>([])
  const charCountsRef = useRef<number[]>([])
  const totalCharsRef = useRef<number>(0)
  const completedCharsRef = useRef<number>(0)
  const currentChunkStartTimeRef = useRef<number>(0)
  const currentChunkDurationRef = useRef<number>(0)
  const pauseOffsetRef = useRef<number>(0)
  const currentChunkBufferRef = useRef<AudioBuffer | null>(null)
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

  // Buffer cache: pre-fetched AudioBuffers keyed by chunk index
  const bufferCacheRef = useRef<Map<number, AudioBuffer>>(new Map())
  // Track in-flight fetches to avoid duplicate requests
  const fetchingRef = useRef<Set<number>>(new Set())

  const invalidatePendingRequests = useCallback(() => {
    requestGenerationRef.current += 1
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
  }, [])

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const audioContext: AudioContext =
        new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext

      // Mobile browsers exempt a backgrounded page from tab freezing and
      // timer/network throttling on the basis of MEDIA ELEMENT playback — a
      // running AudioContext does not qualify. Route the graph through a
      // MediaStreamAudioDestinationNode into a real <audio> element so the
      // synthesis socket and chunk-advance chain survive a screen-off phone.
      // The element is created imperatively (never rendered by React) and torn
      // down on unmount.
      // isWebKitBrowser() is a deliberate carve-out, not a feature test — see
      // its doc comment. Apple browsers stay on audioContext.destination.
      if (typeof audioContext.createMediaStreamDestination === 'function' && !isWebKitBrowser()) {
        const streamDestination = audioContext.createMediaStreamDestination()
        streamDestinationRef.current = streamDestination

        const element = document.createElement('audio')
        // playsInline is not declared on HTMLMediaElement in lib.dom, but iOS
        // needs it to keep playback out of the native fullscreen player.
        ;(element as HTMLAudioElement & { playsInline: boolean }).playsInline = true
        element.controls = false
        // The element is fed by a MediaStream, never by a URL — nothing to
        // preload, and 'none' avoids a pointless network state machine.
        element.preload = 'none'
        element.srcObject = streamDestination.stream
        document.body.appendChild(element)
        audioElementRef.current = element
      }
    }
    return audioContextRef.current
  }, [])

  /**
   * The element could not start (autoplay policy / no user gesture, or a
   * platform that will not render this MediaStream). Routing is EXCLUSIVE —
   * the source is connected to the stream destination INSTEAD of
   * `audioContext.destination` — so leaving it there means the graph renders
   * into a MediaStream nobody consumes: total silence while `isPlaying` stays
   * true, progress keeps advancing and chunks keep chaining. Recover audibility
   * instead: re-wire the source that was just started to
   * `audioContext.destination` and drop the element for the rest of this hook
   * instance (later chunks then connect straight to the context destination).
   * Background playback is lost, but the user hears the article.
   */
  const fallBackToContextDestination = useCallback(
    (source: AudioBufferSourceNode | null) => {
      if (mediaElementUnusableRef.current) return
      mediaElementUnusableRef.current = true

      const streamDestination = streamDestinationRef.current
      // Subsequent sources take the `?? audioContext.destination` branch.
      streamDestinationRef.current = null
      audioElementRef.current?.pause?.()

      const audioContext = audioContextRef.current
      const target = source ?? currentSourceRef.current
      if (!audioContext || !target) return

      try {
        if (streamDestination) target.disconnect(streamDestination)
      } catch (_) { /* already disconnected */ }
      try {
        target.connect(audioContext.destination)
      } catch (_) { /* source already ended */ }
    },
    []
  )

  // Drive the <audio> element for `source`. A rejected play() is NOT harmless:
  // with exclusive routing it means silence, so recover instead of swallowing.
  const playAudioElement = useCallback(
    (source: AudioBufferSourceNode | null) => {
      if (mediaElementUnusableRef.current) return
      const played = audioElementRef.current?.play?.()
      void played?.catch?.(() => fallBackToContextDestination(source))
    },
    [fallBackToContextDestination]
  )

  // Synthesize and decode a single chunk, returns AudioBuffer
  const fetchAudioBuffer = useCallback(
    async (text: string, signal: AbortSignal): Promise<AudioBuffer> => {
      const detectedVoice = voiceRef.current || detectLanguage(content)

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

      const arrayBuffer = await synthesizeSpeech(text, { voice: detectedVoice })

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

      const audioContext = getAudioContext()

      return new Promise((resolve, reject) => {
        if (signal.aborted) {
          reject(new DOMException('Aborted', 'AbortError'))
          return
        }
        // decodeAudioData DETACHES (neuters) the ArrayBuffer it receives. The
        // synthesis cache (lib/tts-client) hands the SAME ArrayBuffer instance
        // to every caller for a given voice+text, so decoding the cached buffer
        // would detach it and any later decode of the same chunk — replay,
        // play-from-here (stop() clears the decoded-buffer cache but not the
        // synthesis cache), or prefetch-then-play — throws "Cannot decode
        // detached ArrayBuffer". Decode a copy so the cached buffer stays intact.
        // slice(0) can throw if the buffer is already detached; reject with the
        // same prefix shape as the decode error path for consistent triage.
        let decodable: ArrayBuffer
        try {
          decodable = arrayBuffer.slice(0)
        } catch (error) {
          reject(new Error(`Failed to copy audio buffer for decode: ${error}`))
          return
        }
        audioContext.decodeAudioData(
          decodable,
          (buffer) => {
            if (signal.aborted) {
              reject(new DOMException('Aborted', 'AbortError'))
              return
            }
            resolve(buffer)
          },
          (error) => reject(new Error(`Failed to decode audio: ${error}`))
        )
      })
    },
    [content, getAudioContext]
  )

  // Fill the buffer cache for chunks [startIndex .. startIndex + BUFFER_AHEAD)
  const fillBuffer = useCallback(
    (startIndex: number, generation: number, signal: AbortSignal) => {
      if (generation !== requestGenerationRef.current || signal.aborted) return

      const end = Math.min(startIndex + BUFFER_AHEAD, chunksRef.current.length)
      for (let i = startIndex; i < end; i++) {
        if (bufferCacheRef.current.has(i) || fetchingRef.current.has(i)) continue

        fetchingRef.current.add(i)

        fetchAudioBuffer(chunksRef.current[i], signal)
          .then((buffer) => {
            fetchingRef.current.delete(i)
            if (generation !== requestGenerationRef.current || signal.aborted) return
            bufferCacheRef.current.set(i, buffer)
          })
          .catch((err) => {
            fetchingRef.current.delete(i)
            if ((err as Error).name !== 'AbortError') {
              console.warn(`[TTS] Buffer fetch failed for chunk ${i}:`, err)
            }
          })
      }
    },
    [fetchAudioBuffer]
  )

  // Update progress via requestAnimationFrame
  const updateProgress = useCallback(() => {
    if (!isPlayingRef.current || !audioContextRef.current) return

    const audioContext = audioContextRef.current
    const elapsedInChunk = audioContext.currentTime - currentChunkStartTimeRef.current
    const chunkProgress = Math.min(elapsedInChunk / currentChunkDurationRef.current, 1)

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
        currentChunkBufferRef.current = null
        pauseOffsetRef.current = 0
        bufferCacheRef.current.clear()
        fetchingRef.current.clear()
        return
      }

      const audioContext = getAudioContext()
      // Resume unconditionally. `pause()`/`stop()` call `suspend()` without
      // awaiting it, so on the play-from-here path the suspend can still be
      // in flight here with `state` reading 'running'. A conditional resume
      // would then be skipped and the pending suspend would freeze the audio.
      // WebAudio processes suspend/resume control messages in call order, so a
      // resume queued after an in-flight suspend leaves the context running;
      // resume() on an already-running context is a no-op that resolves at once.
      await audioContext.resume()

      if (generation !== requestGenerationRef.current || signal.aborted) return

      currentChunkIndexRef.current = index

      // Eagerly start buffering upcoming chunks
      fillBuffer(index + 1, generation, signal)

      let buffer: AudioBuffer

      if (offset > 0 && currentChunkBufferRef.current) {
        // Resuming mid-chunk
        buffer = currentChunkBufferRef.current
      } else if (bufferCacheRef.current.has(index)) {
        // Use cached buffer
        buffer = bufferCacheRef.current.get(index)!
        bufferCacheRef.current.delete(index)
      } else {
        // Not buffered yet — fetch inline and show buffering state
        setState((prev) => ({ ...prev, isBuffering: true }))

        try {
          buffer = await fetchAudioBuffer(chunksRef.current[index], signal)
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
          // client's own retry) must not strand playback waiting for the user
          // to press Play again. Count it as completed for progress purposes
          // and move on to the next chunk automatically.
          completedCharsRef.current += charCountsRef.current[index] || 0
          void playChunk(index + 1, 0, generation, signal)
          return
        }
      }

      // Buffer obtained (cache hit, resumed mid-chunk, or freshly fetched):
      // this chunk is readable, so the failure streak resets.
      consecutiveFailuresRef.current = 0

      if (
        generation !== requestGenerationRef.current ||
        signal.aborted ||
        !isPlayingRef.current
      ) return // Stopped while fetching

      setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))

      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(streamDestinationRef.current ?? audioContext.destination)

      currentSourceRef.current = source
      currentChunkBufferRef.current = buffer
      currentChunkStartTimeRef.current = audioContext.currentTime - offset
      currentChunkDurationRef.current = buffer.duration

      source.onended = () => {
        try { source.disconnect() } catch (_) { /* already disconnected */ }
        if (
          !isPlayingRef.current ||
          generation !== requestGenerationRef.current ||
          signal.aborted
        ) return
        completedCharsRef.current += charCountsRef.current[index] || 0
        void playChunk(index + 1, 0, generation, signal)
      }

      // Start the element FIRST. A MediaStreamAudioDestinationNode is a LIVE
      // stream: the element plays from "now", not from stream start, so any
      // element start latency clips the head of the chunk. Both calls are in
      // the same synchronous task, so the window is tiny — but free to close.
      playAudioElement(source)
      source.start(0, offset)

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      }
    },
    [fetchAudioBuffer, fillBuffer, getAudioContext, invalidatePendingRequests, onComplete, onError, playAudioElement, updateProgress]
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
    if (pauseOffsetRef.current === 0 && !bufferCacheRef.current.has(startIdx)) {
      try {
        const buf = await fetchAudioBuffer(chunksRef.current[startIdx], signal)
        if (generation !== requestGenerationRef.current || signal.aborted) return
        bufferCacheRef.current.set(startIdx, buf)
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
      if (!bufferCacheRef.current.has(i) && !fetchingRef.current.has(i)) {
        fetchingRef.current.add(i)
        fetchAudioBuffer(chunksRef.current[i], signal)
          .then((buf) => {
            fetchingRef.current.delete(i)
            if (generation !== requestGenerationRef.current || signal.aborted) return
            bufferCacheRef.current.set(i, buf)
          })
          .catch(() => { fetchingRef.current.delete(i) })
      }
    }

    setState((prev) => ({ ...prev, isBuffering: false }))

    const offset = pauseOffsetRef.current
    pauseOffsetRef.current = 0
    void playChunk(startIdx, offset, generation, signal)
  }, [ensureChunks, fetchAudioBuffer, invalidatePendingRequests, onError, playChunk, voice])

  // Pause
  const pause = useCallback(() => {
    isPlayingRef.current = false
    invalidatePendingRequests()

    if (audioContextRef.current && currentChunkDurationRef.current > 0) {
      const elapsed = audioContextRef.current.currentTime - currentChunkStartTimeRef.current
      pauseOffsetRef.current = Math.min(elapsed, currentChunkDurationRef.current)
    }

    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop()
        currentSourceRef.current.disconnect()
      } catch (_) { /* already stopped */ }
      currentSourceRef.current = null
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    audioElementRef.current?.pause?.()

    if (audioContextRef.current) {
      audioContextRef.current.suspend()
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
      // Aborts in-flight synthesis and stops the current source. The mid-chunk
      // offset it records belongs to the OLD unit, so it is dropped below.
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
      currentChunkBufferRef.current = null
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
    currentChunkBufferRef.current = null
    pauseOffsetRef.current = 0
    bufferCacheRef.current.clear()
    fetchingRef.current.clear()
    lastEmittedPctRef.current = -1
    consecutiveFailuresRef.current = 0

    setState({
      isPlaying: false,
      isBuffering: false,
      progress: 0,
      currentTime: 0,
      totalEstimatedTime: 0,
      currentChunkIndex: 0,
      totalChunks: 0,
    })
  }, [pause])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop()
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      const element = audioElementRef.current
      if (element) {
        element.pause?.()
        element.srcObject = null
        element.remove()
        audioElementRef.current = null
      }
      streamDestinationRef.current = null
    }
  }, [stop])

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
