'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { detectLanguageFromContent } from '@/lib/tts'
import { synthesizeSpeech } from '@/lib/tts-client'

interface TTSState {
  isPlaying: boolean
  isBuffering: boolean
  progress: number
  currentTime: number
  totalEstimatedTime: number
  currentChunkIndex: number
  totalChunks: number
}

interface UseTTSOptions {
  voice?: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

const detectLanguage = detectLanguageFromContent

// Split text into chunks suitable for TTS
const splitIntoChunks = (text: string, maxLength = 1000): string[] => {
  const chunks: string[] = []
  const paragraphs = text.split(/\n\n+/)

  for (const paragraph of paragraphs) {
    // Skip horizontal rules (section separators)
    if (/^-{3,}$/.test(paragraph.trim())) continue

    let clean = paragraph
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
      .replace(/>\s+/g, '') // Remove blockquotes
      .replace(/[-*+]\s+/g, '') // Remove list markers
      .replace(/\d+\.\s+/g, '') // Remove numbered list markers
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    if (!clean) continue

    if (clean.length <= maxLength) {
      chunks.push(clean)
    } else {
      const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean]
      let currentChunk = ''

      for (const sentence of sentences) {
        if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
          currentChunk = (currentChunk + ' ' + sentence).trim()
        } else {
          if (currentChunk) chunks.push(currentChunk)

          if (sentence.length > maxLength) {
            const words = sentence.split(/\s+/)
            let wordChunk = ''
            for (const word of words) {
              if ((wordChunk + ' ' + word).trim().length <= maxLength) {
                wordChunk = (wordChunk + ' ' + word).trim()
              } else {
                if (wordChunk) chunks.push(wordChunk)
                wordChunk = word
              }
            }
            if (wordChunk) currentChunk = wordChunk
          } else {
            currentChunk = sentence
          }
        }
      }
      if (currentChunk) chunks.push(currentChunk)
    }
  }

  return chunks.filter((c) => c.length > 0)
}

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
  const animationFrameRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)
  const currentChunkIndexRef = useRef(0)
  const voiceRef = useRef<string | null>(null)

  // Buffer cache: pre-fetched AudioBuffers keyed by chunk index
  const bufferCacheRef = useRef<Map<number, AudioBuffer>>(new Map())
  // Track in-flight fetches to avoid duplicate requests
  const fetchingRef = useRef<Set<number>>(new Set())

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
          (buffer) => resolve(buffer),
          (error) => reject(new Error(`Failed to decode audio: ${error}`))
        )
      })
    },
    [content, getAudioContext]
  )

  // Fill the buffer cache for chunks [startIndex .. startIndex + BUFFER_AHEAD)
  const fillBuffer = useCallback(
    (startIndex: number) => {
      if (!abortControllerRef.current) return

      const end = Math.min(startIndex + BUFFER_AHEAD, chunksRef.current.length)
      for (let i = startIndex; i < end; i++) {
        if (bufferCacheRef.current.has(i) || fetchingRef.current.has(i)) continue

        fetchingRef.current.add(i)
        const signal = abortControllerRef.current!.signal

        fetchAudioBuffer(chunksRef.current[i], signal)
          .then((buffer) => {
            bufferCacheRef.current.set(i, buffer)
            fetchingRef.current.delete(i)
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

    setState((prev) => ({
      ...prev,
      progress: Math.min(totalProgress, 100),
      currentTime: prev.totalEstimatedTime * (totalProgress / 100),
      currentChunkIndex: currentChunkIndexRef.current,
    }))

    onProgress?.(Math.min(totalProgress, 100))

    if (isPlayingRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }, [onProgress])

  // Play a single chunk
  const playChunk = useCallback(
    async (index: number, offset = 0) => {
      if (index >= chunksRef.current.length) {
        // All chunks played
        isPlayingRef.current = false
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
          abortControllerRef.current = null
        }
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
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      currentChunkIndexRef.current = index

      // Eagerly start buffering upcoming chunks
      fillBuffer(index + 1)

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

        if (!abortControllerRef.current) return
        try {
          buffer = await fetchAudioBuffer(
            chunksRef.current[index],
            abortControllerRef.current.signal
          )
        } catch (error) {
          if ((error as Error).name === 'AbortError') return
          console.warn(`[TTS] Chunk ${index} failed, skipping:`, error)
          // Skip failed chunk and continue with next
          if (isPlayingRef.current) {
            completedCharsRef.current += charCountsRef.current[index] || 0
            setState((prev) => ({ ...prev, isBuffering: false }))
            playChunk(index + 1)
          }
          return
        }
      }

      if (!isPlayingRef.current) return // Stopped while fetching

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
        if (!isPlayingRef.current) return
        completedCharsRef.current += charCountsRef.current[index] || 0
        playChunk(index + 1)
      }

      source.start(0, offset)

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      }
    },
    [fetchAudioBuffer, fillBuffer, getAudioContext, onComplete, onError, updateProgress]
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
    abortControllerRef.current = new AbortController()

    setState((prev) => ({ ...prev, isPlaying: true, isBuffering: true }))

    // Pre-buffer: fetch the first few chunks before starting playback
    const startIdx = currentChunkIndexRef.current
    const preBufferEnd = Math.min(startIdx + BUFFER_AHEAD, chunksRef.current.length)
    const signal = abortControllerRef.current.signal

    // Fetch first chunk (must have it to start playing)
    if (pauseOffsetRef.current === 0 && !bufferCacheRef.current.has(startIdx)) {
      try {
        const buf = await fetchAudioBuffer(chunksRef.current[startIdx], signal)
        bufferCacheRef.current.set(startIdx, buf)
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
        isPlayingRef.current = false
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
            bufferCacheRef.current.set(i, buf)
            fetchingRef.current.delete(i)
          })
          .catch(() => { fetchingRef.current.delete(i) })
      }
    }

    setState((prev) => ({ ...prev, isBuffering: false }))

    const offset = pauseOffsetRef.current
    pauseOffsetRef.current = 0
    playChunk(startIdx, offset)
  }, [content, fetchAudioBuffer, onError, playChunk, voice])

  // Pause
  const pause = useCallback(() => {
    isPlayingRef.current = false

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

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.suspend()
    }

    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [])

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

  return {
    ...state,
    play,
    pause,
    stop,
    resume: play,
  }
}

export default useTTS
