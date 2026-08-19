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
  onProgress?: (progress: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

export interface TTSPlayback extends TTSState {
  play: () => Promise<void>
  pause: () => void
  stop: () => void
  resume: () => Promise<void>
}

const detectLanguage = detectLanguageFromContent

// Number of chunks to keep buffered ahead of current playback
const BUFFER_AHEAD = 2

export function useTTS(content: string, options: UseTTSOptions = {}) {
  const { voice, onProgress, onComplete, onError } = options

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
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

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
        audioContext.decodeAudioData(
          arrayBuffer,
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
          isPlayingRef.current = false
          invalidatePendingRequests()
          setState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }))
          onError?.(error as Error)
          return
        }
      }

      if (
        generation !== requestGenerationRef.current ||
        signal.aborted ||
        !isPlayingRef.current
      ) return // Stopped while fetching

      setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))

      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.destination)

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

      source.start(0, offset)

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      }
    },
    [fetchAudioBuffer, fillBuffer, getAudioContext, invalidatePendingRequests, onComplete, onError, updateProgress]
  )

  // Play / resume
  const play = useCallback(async () => {
    if (isPlayingRef.current) return

    // Initialize chunks on first play or after completion reset
    if (chunksRef.current.length === 0) {
      chunksRef.current = splitIntoChunks(content)
      charCountsRef.current = chunksRef.current.map((c) => c.length)
      totalCharsRef.current = charCountsRef.current.reduce((a, b) => a + b, 0)

      const estimatedSeconds = totalCharsRef.current / 15
      setState((prev) => ({
        ...prev,
        totalChunks: chunksRef.current.length,
        totalEstimatedTime: estimatedSeconds,
      }))
    }

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
  }, [content, fetchAudioBuffer, invalidatePendingRequests, onError, playChunk, voice])

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

    if (audioContextRef.current) {
      audioContextRef.current.suspend()
    }

    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [invalidatePendingRequests])

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
    }
  }, [stop])

  const playback: TTSPlayback = {
    ...state,
    play,
    pause,
    stop,
    resume: play,
  }

  return playback
}

export default useTTS
