'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { splitIntoSpeechUnits, type SpeechSection } from '@/lib/tts-speech'
import { synthesizeSpeech } from '@/lib/tts-client'
import { DEFAULT_TTS_VOICE, getStoredTtsVoice, TTS_VOICE_CHANGE_EVENT, type TtsVoice } from '@/lib/tts-voices'
import { useTTS } from './useTTS'
import type { TTSPlayback } from './useTTS'

export interface ContinuousReaderOptions {
  onItemChange?: (item: SpeechSection, index: number) => void
}

// How many prebuffer warm requests run concurrently. Each edge-tts synthesis is
// a fresh WebSocket, so keep this low enough not to starve the real
// play-from-here request while still warming the ladder quickly.
const PREBUFFER_CONCURRENCY = 2

/**
 * Warm the synthesis cache for a tier of unit texts with bounded concurrency.
 * Best-effort: `synthesizeSpeech` caches + dedupes, so already-warm texts are
 * skipped and failures are ignored (the real playback request retries).
 */
async function warmTier(
  texts: readonly string[],
  voice: string,
  concurrency: number,
  signal: AbortSignal
): Promise<void> {
  const queue = [...texts]
  const worker = async (): Promise<void> => {
    while (queue.length > 0) {
      if (signal.aborted) return
      const text = queue.shift()
      if (!text) continue
      try {
        await synthesizeSpeech(text, { voice })
      } catch {
        /* best-effort warm; the real request will retry */
      }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker))
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
  const [voice, setVoice] = useState<TtsVoice>(DEFAULT_TTS_VOICE)

  useEffect(() => {
    setVoice(getStoredTtsVoice())
  }, [])

  // Speech units per section (title → TLDR → body chunks). Recomputed only when
  // the loaded section set changes; the current section's units feed useTTS and
  // the [0]/[1] units feed the prebuffer ladder.
  const unitsBySection = useMemo(
    () => items.map((section) => splitIntoSpeechUnits(section)),
    [items]
  )
  const unitsBySectionRef = useRef(unitsBySection)
  useEffect(() => {
    unitsBySectionRef.current = unitsBySection
  }, [unitsBySection])

  useEffect(() => {
    currentIndexRef.current = currentIndex
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
    units: unitsBySection[currentIndex],
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

  // Prebuffer ladder: warm the synthesis cache ahead of user intent so
  // play-from-here on any section starts from cache. Order: current section's
  // title + TLDR first (secures playback runway = "T1 buffered"), THEN every
  // loaded section's title, THEN every loaded section's TLDR. Restarts on voice
  // change, section-set change, or current-section change; idempotent (warm
  // requests hit the cache and skip). Non-current bodies are not prebuffered
  // here — they load on demand as playback approaches them.
  useEffect(() => {
    if (unitsBySection.length === 0) return

    const controller = new AbortController()
    const { signal } = controller

    const run = async (): Promise<void> => {
      const all = unitsBySectionRef.current
      const current = all[currentIndexRef.current]
      // T1: current section's title + TLDR.
      if (current) {
        await warmTier(current.slice(0, 2), voice, PREBUFFER_CONCURRENCY, signal)
      }
      if (signal.aborted) return
      // T2: every loaded section's title unit.
      const titles = all.map((u) => u[0]).filter((t): t is string => Boolean(t))
      await warmTier(titles, voice, PREBUFFER_CONCURRENCY, signal)
      if (signal.aborted) return
      // T3: every loaded section's TLDR (second) unit — only after all titles.
      const tldrs = all.map((u) => u[1]).filter((t): t is string => Boolean(t))
      await warmTier(tldrs, voice, PREBUFFER_CONCURRENCY, signal)
    }

    const useIdle = typeof requestIdleCallback === 'function'
    const handle = useIdle
      ? requestIdleCallback(() => void run())
      : setTimeout(() => void run(), 0)

    return () => {
      controller.abort()
      if (useIdle && typeof cancelIdleCallback === 'function') {
        cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as ReturnType<typeof setTimeout>)
      }
    }
  }, [unitsBySection, voice, currentIndex])

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
