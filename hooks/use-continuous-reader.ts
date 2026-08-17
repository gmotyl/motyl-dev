'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { SpeechSection } from '@/lib/tts-speech'
import { getStoredTtsVoice } from '@/lib/tts-voices'
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
  const [error, setError] = useState<Error | null>(null)
  const currentIndexRef = useRef(0)
  const itemsRef = useRef(items)
  const onItemChangeRef = useRef(onItemChange)
  const pendingStartRef = useRef<number | null>(null)
  const playbackRef = useRef<TTSPlayback | null>(null)

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    onItemChangeRef.current = onItemChange
  }, [onItemChange])

  const selectAndStart = useCallback((index: number, reportChange: boolean) => {
    const selectedItem = itemsRef.current[index]
    if (!selectedItem) return

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
    voice: getStoredTtsVoice(),
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

  playbackRef.current = playback

  useEffect(() => {
    if (pendingStartRef.current !== currentIndex) return

    pendingStartRef.current = null
    void playback.play()
  }, [currentIndex, playback.play])

  const play = useCallback(() => {
    setError(null)
    void playbackRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    playbackRef.current?.pause()
  }, [])

  const next = useCallback(() => {
    selectAndStart(currentIndexRef.current + 1, true)
  }, [selectAndStart])

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

  return {
    ...playback,
    currentIndex,
    currentItem: items[currentIndex],
    error,
    play,
    pause,
    next,
    playFrom,
    playFromHere: playFrom,
    retry,
  }
}

export default useContinuousReader
