'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { detectLanguageFromContent } from '@/lib/tts'

interface TTSState {
  isPlaying: boolean
  isBuffering: boolean
  progress: number
  currentTime: number
  totalEstimatedTime: number
  currentChunkIndex: number
  totalChunks: number
}

interface AudioBufferItem {
  buffer: AudioBuffer
  text: string
  charCount: number
}

interface UseTTSOptions {
  voice?: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

// Language detection from content (using shared utility)
const detectLanguage = detectLanguageFromContent

// Split text into chunks suitable for TTS (max ~500 chars each)
const splitIntoChunks = (text: string, maxLength = 450): string[] => {
  const chunks: string[] = []

  // First, split by double newlines (paragraphs)
  const paragraphs = text.split(/\n\n+/)

  for (const paragraph of paragraphs) {
    // Clean up the paragraph
    let cleanParagraph = paragraph
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
      .replace(/>\s+/g, '') // Remove blockquotes
      .replace(/[-*+]\s+/g, '') // Remove list markers
      .replace(/\d+\.\s+/g, '') // Remove numbered list markers
      .replace(/\n/g, ' ') // Replace single newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    if (!cleanParagraph) continue

    // If paragraph fits in one chunk, add it
    if (cleanParagraph.length <= maxLength) {
      chunks.push(cleanParagraph)
    } else {
      // Split long paragraphs by sentences
      const sentences = cleanParagraph.match(/[^.!?]+[.!?]+/g) || [cleanParagraph]
      let currentChunk = ''

      for (const sentence of sentences) {
        if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
          currentChunk = (currentChunk + ' ' + sentence).trim()
        } else {
          if (currentChunk) chunks.push(currentChunk)

          // If single sentence is too long, split by words
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
  const audioQueueRef = useRef<AudioBufferItem[]>([])
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const chunksRef = useRef<string[]>([])
  const charCountsRef = useRef<number[]>([])
  const totalCharsRef = useRef<number>(0)
  const completedCharsRef = useRef<number>(0)
  const currentChunkStartTimeRef = useRef<number>(0)
  const currentChunkDurationRef = useRef<number>(0)
  const pauseOffsetRef = useRef<number>(0) // seconds elapsed in current chunk when paused
  const currentChunkBufferRef = useRef<AudioBuffer | null>(null) // retained for resume
  const abortControllerRef = useRef<AbortController | null>(null)
  const prefetchAbortControllerRef = useRef<AbortController | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)
  const currentChunkIndexRef = useRef(0)
  const nextChunkBufferRef = useRef<AudioBuffer | null>(null)
  const voiceRef = useRef<string | null>(null)

  // Initialize audio context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // Fetch audio buffer from API
  const fetchAudioBuffer = useCallback(
    async (text: string, signal: AbortSignal): Promise<AudioBuffer> => {
      const detectedVoice = voiceRef.current || detectLanguage(content)
      console.log('[TTS] Fetching audio for voice:', detectedVoice, 'text length:', text.length)

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: detectedVoice }),
        signal,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[TTS] API error:', response.status, errorText)
        throw new Error(`TTS API error: ${response.status}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      console.log('[TTS] Got audio data, size:', arrayBuffer.byteLength)
      const audioContext = getAudioContext()

      // Decode the MP3 audio data
      return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(
          arrayBuffer,
          (buffer) => {
            console.log('[TTS] Decoded audio, duration:', buffer.duration)
            resolve(buffer)
          },
          (error) => reject(new Error(`Failed to decode audio: ${error}`))
        )
      })
    },
    [content, getAudioContext]
  )

  // Prefetch next chunk
  const prefetchNextChunk = useCallback(
    async (nextIndex: number) => {
      if (nextIndex >= chunksRef.current.length) return
      if (nextChunkBufferRef.current) return // Already prefetched

      // Cancel any existing prefetch
      if (prefetchAbortControllerRef.current) {
        prefetchAbortControllerRef.current.abort()
      }

      prefetchAbortControllerRef.current = new AbortController()

      try {
        const buffer = await fetchAudioBuffer(
          chunksRef.current[nextIndex],
          prefetchAbortControllerRef.current.signal
        )
        nextChunkBufferRef.current = buffer
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.warn('Prefetch failed:', error)
        }
      }
    },
    [fetchAudioBuffer]
  )

  // Update progress
  const updateProgress = useCallback(() => {
    if (!isPlayingRef.current || !audioContextRef.current) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime
    const chunkStart = currentChunkStartTimeRef.current
    const chunkDuration = currentChunkDurationRef.current

    // Calculate elapsed time in current chunk
    const elapsedInChunk = currentTime - chunkStart
    const chunkProgress = Math.min(elapsedInChunk / chunkDuration, 1)

    // Calculate total progress
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

    // Check if current chunk is 80% done - prefetch next
    if (chunkProgress >= 0.8 && currentChunkIndexRef.current < chunksRef.current.length - 1) {
      prefetchNextChunk(currentChunkIndexRef.current + 1)
    }

    // Continue animation loop
    if (isPlayingRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }
  }, [onProgress, prefetchNextChunk])

  // Play a single chunk, optionally starting from an offset (seconds)
  const playChunk = useCallback(
    async (index: number, offset = 0) => {
      if (index >= chunksRef.current.length) {
        // All chunks played
        setState((prev) => ({ ...prev, isPlaying: false, progress: 100 }))
        onComplete?.()

        // Reset for next playback
        currentChunkIndexRef.current = 0
        completedCharsRef.current = 0
        nextChunkBufferRef.current = null
        currentChunkBufferRef.current = null
        pauseOffsetRef.current = 0

        return
      }

      const audioContext = getAudioContext()

      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      currentChunkIndexRef.current = index

      // Check if we have a cached/prefetched buffer
      let buffer: AudioBuffer

      if (offset > 0 && currentChunkBufferRef.current) {
        // Resuming mid-chunk: reuse the stored buffer
        buffer = currentChunkBufferRef.current
      } else if (nextChunkBufferRef.current && index > 0) {
        buffer = nextChunkBufferRef.current
        nextChunkBufferRef.current = null
      } else {
        // Need to fetch this buffer
        setState((prev) => ({ ...prev, isBuffering: true }))

        // Cancel any existing fetch
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
        abortControllerRef.current = new AbortController()

        try {
          buffer = await fetchAudioBuffer(
            chunksRef.current[index],
            abortControllerRef.current.signal
          )
        } catch (error) {
          if ((error as Error).name === 'AbortError') return
          onError?.(error as Error)
          setState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }))
          return
        }
      }

      setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))

      // Create and configure source
      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.destination)

      // Store reference for stopping/resuming
      currentSourceRef.current = source
      currentChunkBufferRef.current = buffer
      // Adjust start time so progress calculation accounts for the offset
      currentChunkStartTimeRef.current = audioContext.currentTime - offset
      currentChunkDurationRef.current = buffer.duration

      // Handle chunk end
      source.onended = () => {
        if (!isPlayingRef.current) return

        // Update completed characters
        completedCharsRef.current += charCountsRef.current[index] || 0

        // Play next chunk
        playChunk(index + 1)
      }

      // Start playback (from offset if resuming mid-chunk)
      source.start(0, offset)

      // Start progress updates
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      }
    },
    [fetchAudioBuffer, getAudioContext, onComplete, onError, updateProgress]
  )

  // Play function
  const play = useCallback(() => {
    if (state.isPlaying) return

    // Initialize chunks if not done
    if (chunksRef.current.length === 0) {
      chunksRef.current = splitIntoChunks(content)
      charCountsRef.current = chunksRef.current.map((c) => c.length)
      totalCharsRef.current = charCountsRef.current.reduce((a, b) => a + b, 0)

      // Estimate total time (roughly 15 chars per second for TTS)
      const estimatedSeconds = totalCharsRef.current / 15
      setState((prev) => ({
        ...prev,
        totalChunks: chunksRef.current.length,
        totalEstimatedTime: estimatedSeconds,
      }))
    }

    // Set voice
    voiceRef.current = voice || null

    isPlayingRef.current = true
    setState((prev) => ({ ...prev, isPlaying: true }))

    // Resume from the exact position within the current chunk
    const offset = pauseOffsetRef.current
    pauseOffsetRef.current = 0
    playChunk(currentChunkIndexRef.current, offset)
  }, [content, playChunk, state.isPlaying, voice])

  // Pause function
  const pause = useCallback(() => {
    isPlayingRef.current = false

    // Record how far into the current chunk we got
    if (audioContextRef.current && currentChunkDurationRef.current > 0) {
      const elapsed = audioContextRef.current.currentTime - currentChunkStartTimeRef.current
      pauseOffsetRef.current = Math.min(elapsed, currentChunkDurationRef.current)
    }

    // Stop current source
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop()
      } catch (e) {
        // Source might already be stopped
      }
      currentSourceRef.current = null
    }

    // Cancel any pending fetches
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    if (prefetchAbortControllerRef.current) {
      prefetchAbortControllerRef.current.abort()
      prefetchAbortControllerRef.current = null
    }

    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Suspend audio context
    if (audioContextRef.current) {
      audioContextRef.current.suspend()
    }

    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [])

  // Stop function
  const stop = useCallback(() => {
    pause()

    // Reset all state
    chunksRef.current = []
    charCountsRef.current = []
    totalCharsRef.current = 0
    completedCharsRef.current = 0
    currentChunkIndexRef.current = 0
    nextChunkBufferRef.current = null
    currentChunkBufferRef.current = null
    pauseOffsetRef.current = 0

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
    resume: play, // Alias for play (resumes from where it was)
  }
}

export default useTTS
