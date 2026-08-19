'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SpeechSection } from '@/lib/tts-speech'
import { splitIntoChunks } from '@/lib/tts-chunks'
import { prefetchSpeech } from '@/lib/tts-client'
import { DEFAULT_TTS_VOICE, getStoredTtsVoice, TTS_VOICE_CHANGE_EVENT, type TtsVoice } from '@/lib/tts-voices'
import { useTTS } from './useTTS'
import type { TTSPlayback } from './useTTS'

export interface ContinuousReaderOptions {
  onItemChange?: (item: SpeechSection, index: number) => void
}

export function useContinuousReader(
  items: readonly SpeechSection[],
  { onItemChange }: ContinuousReaderOptions = {}
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const currentIndexRef = useRef(0)
  const previewIndexRef = useRef(0)
  const itemsRef = useRef(items)
  const onItemChangeRef = useRef(onItemChange)
  const pendingStartRef = useRef<number | null>(null)
  const playbackRef = useRef<TTSPlayback | null>(null)
  // Tracks the section index for which the next-section prefetch has fired, so
  // it warms the following section's first chunk at most once per section.
  const prefetchedForIndexRef = useRef<number | null>(null)
  // Tracks the first section's text already warmed by the mount preload, so it
  // fires once per distinct first-section content and does not re-fire when the
  // stored voice resolves right after mount.
  const preloadedFirstTextRef = useRef<string | null>(null)
  const [voice, setVoice] = useState<TtsVoice>(DEFAULT_TTS_VOICE)

  useEffect(() => {
    setVoice(getStoredTtsVoice())
  }, [])

  // Warm the first section's first chunk as soon as the reader has sections, so
  // the very first Play is near-instant. Guarded on the first section's text
  // (not voice) so the post-mount stored-voice update does not re-trigger it.
  useEffect(() => {
    const firstText = items[0]?.speechText
    if (!firstText) return
    if (preloadedFirstTextRef.current === firstText) return

    preloadedFirstTextRef.current = firstText
    prefetchSpeech(splitIntoChunks(firstText)[0] ?? '', { voice })
  }, [items, voice])

  useEffect(() => {
    currentIndexRef.current = currentIndex
    // Reset the once-per-section prefetch guard on every section change.
    prefetchedForIndexRef.current = null
  }, [currentIndex])

  useEffect(() => {
    previewIndexRef.current = previewIndex
  }, [previewIndex])

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    onItemChangeRef.current = onItemChange
  }, [onItemChange])

  useEffect(() => {
    const syncVoice = () => setVoice(getStoredTtsVoice())
    window.addEventListener(TTS_VOICE_CHANGE_EVENT, syncVoice)
    window.addEventListener('storage', syncVoice)
    return () => {
      window.removeEventListener(TTS_VOICE_CHANGE_EVENT, syncVoice)
      window.removeEventListener('storage', syncVoice)
    }
  }, [])

  const selectAndStart = useCallback((index: number, reportChange: boolean) => {
    const selectedItem = itemsRef.current[index]
    if (!selectedItem) return

    previewIndexRef.current = index
    setPreviewIndex(index)

    playbackRef.current?.stop()
    setError(null)

    if (reportChange) onItemChangeRef.current?.(selectedItem, index)

    if (index === currentIndexRef.current) {
      pendingStartRef.current = null
      void playbackRef.current?.play()
      return
    }

    pendingStartRef.current = index
    setCurrentIndex(index)
  }, [])

  const playback = useTTS(items[currentIndex]?.speechText ?? '', {
    voice,
    onProgress: useCallback((progress: number) => {
      if (progress < 70) return

      const index = currentIndexRef.current
      const nextIndex = index + 1
      if (nextIndex >= itemsRef.current.length) return
      if (prefetchedForIndexRef.current === index) return

      prefetchedForIndexRef.current = index
      const nextText = itemsRef.current[nextIndex]?.speechText ?? ''
      prefetchSpeech(splitIntoChunks(nextText)[0] ?? '', { voice })
    }, [voice]),
    onComplete: useCallback(() => {
      if (currentIndexRef.current !== currentIndex) return

      const nextIndex = currentIndexRef.current + 1
      if (nextIndex < itemsRef.current.length) {
        selectAndStart(nextIndex, true)
      }
    }, [currentIndex, selectAndStart]),
    onError: useCallback((nextError: Error) => {
      playbackRef.current?.stop()
      setError(nextError)
    }, []),
  })

  useEffect(() => {
    playbackRef.current = playback
  }, [playback])

  useEffect(() => {
    if (pendingStartRef.current !== currentIndex) return

    pendingStartRef.current = null
    void playback.play()
  }, [currentIndex, playback.play])

  const play = useCallback(() => {
    setError(null)
    previewIndexRef.current = currentIndexRef.current
    setPreviewIndex(currentIndexRef.current)
    void playbackRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    playbackRef.current?.pause()
  }, [])

  const next = useCallback(() => {
    const currentItems = itemsRef.current
    const lastIndex = currentItems.length - 1
    if (lastIndex < 0) return

    const audioActive = Boolean(
      playbackRef.current?.isPlaying || playbackRef.current?.isBuffering
    )

    if (audioActive) {
      // Non-interrupting soft advance: move the eye/scroll only. The current
      // section keeps playing; auto-advance still continues to currentIndex + 1.
      const nextPreview = Math.min(previewIndexRef.current + 1, lastIndex)
      previewIndexRef.current = nextPreview
      setPreviewIndex(nextPreview)
      const previewItem = currentItems[nextPreview]
      if (previewItem) onItemChangeRef.current?.(previewItem, nextPreview)
      return
    }

    // Audio not active: select the next section as the pending start without
    // starting playback. Pressing Play afterwards begins at that section.
    const nextIndex = Math.min(currentIndexRef.current + 1, lastIndex)
    const nextItem = currentItems[nextIndex]
    if (!nextItem) return

    previewIndexRef.current = nextIndex
    setPreviewIndex(nextIndex)
    if (nextIndex !== currentIndexRef.current) {
      setCurrentIndex(nextIndex)
    }
    onItemChangeRef.current?.(nextItem, nextIndex)
  }, [])

  const playFrom = useCallback(
    (index: number) => {
      selectAndStart(index, true)
    },
    [selectAndStart]
  )

  const retry = useCallback(() => {
    setError(null)
    void playbackRef.current?.play()
  }, [])

  const {
    isPlaying,
    isBuffering,
    progress,
    currentTime,
    totalEstimatedTime,
    currentChunkIndex,
    totalChunks,
    stop: playbackStop,
    resume: playbackResume,
  } = playback

  const canNext = Math.max(currentIndex, previewIndex) < items.length - 1

  return useMemo(() => ({
    isPlaying,
    isBuffering,
    progress,
    currentTime,
    totalEstimatedTime,
    currentChunkIndex,
    totalChunks,
    play,
    pause,
    stop: playbackStop,
    resume: playbackResume,
    currentIndex,
    currentItem: items[currentIndex],
    error,
    next,
    canNext,
    playFrom,
    playFromHere: playFrom,
    retry,
  }), [
    isPlaying, isBuffering, progress, currentTime, totalEstimatedTime,
    currentChunkIndex, totalChunks, playbackStop, playbackResume, currentIndex,
    items, error, play, pause, next, canNext,
    playFrom, retry,
  ])
}

export default useContinuousReader
