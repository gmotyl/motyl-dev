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

/**
 * Where the reader is. The section is addressed by its stable key, never by a
 * numeric index into the queue, so removing articles (mark-as-read, DOM
 * eviction) cannot silently shift what is being read.
 */
export interface ReadingPosition {
  /** `sectionKey(sourceSlug, ordinal)` */
  sectionKey: string
  unitIndex: number
}

const NO_POSITION: ReadingPosition = { sectionKey: '', unitIndex: 0 }

/**
 * Resolve the position's section to an index in the CURRENT sections. When its
 * key is gone, fall back per the PREVIOUS order: the first survivor that
 * followed it, else the last survivor before it. Returns -1 for an empty queue.
 */
function resolvePositionIndex(
  items: readonly SpeechSection[],
  positionKey: string,
  previousKeys: readonly string[]
): number {
  if (items.length === 0) return -1

  const direct = items.findIndex((section) => section.key === positionKey)
  if (direct >= 0) return direct

  const liveIndexByKey = new Map(items.map((section, index) => [section.key, index] as const))
  const wasAt = previousKeys.indexOf(positionKey)
  if (wasAt < 0) return 0

  for (let index = wasAt + 1; index < previousKeys.length; index += 1) {
    const survivor = liveIndexByKey.get(previousKeys[index])
    if (survivor !== undefined) return survivor
  }
  for (let index = wasAt - 1; index >= 0; index -= 1) {
    const survivor = liveIndexByKey.get(previousKeys[index])
    if (survivor !== undefined) return survivor
  }

  return 0
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
  const [position, setPosition] = useState<ReadingPosition>(() =>
    items[0] ? { sectionKey: items[0].key, unitIndex: 0 } : NO_POSITION
  )
  const [previewIndex, setPreviewIndex] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const positionRef = useRef(position)
  const currentIndexRef = useRef(0)
  const previewIndexRef = useRef(0)
  const itemsRef = useRef(items)
  const onItemChangeRef = useRef(onItemChange)
  const pendingStartRef = useRef<ReadingPosition | null>(null)
  const playbackRef = useRef<TTSPlayback | null>(null)
  // The section keys of the previously rendered queue, in order — the only way
  // to tell where a removed section used to sit when resolving the fallback.
  const previousKeysRef = useRef<readonly string[]>([])
  const [voice, setVoice] = useState<TtsVoice>(DEFAULT_TTS_VOICE)

  const updatePosition = useCallback((sectionKey: string, unitIndex: number) => {
    positionRef.current = { sectionKey, unitIndex }
    setPosition((previous) =>
      previous.sectionKey === sectionKey && previous.unitIndex === unitIndex
        ? previous
        : { sectionKey, unitIndex }
    )
  }, [])

  // `currentIndex` is DERIVED from the position, never the other way round: the
  // queue mutating re-derives the index instead of renumbering what is read.
  const resolvedIndex = useMemo(
    () => resolvePositionIndex(items, position.sectionKey, previousKeysRef.current),
    [items, position.sectionKey]
  )
  const currentIndex = Math.max(resolvedIndex, 0)
  const currentItem = items[currentIndex]
  const currentKey = currentItem?.key ?? ''

  useEffect(() => {
    previousKeysRef.current = items.map((section) => section.key)
  }, [items])

  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    setVoice(getStoredTtsVoice())
  }, [])

  // Speech units per section (title → TLDR → body units), each with the source
  // line range it speaks. Recomputed only when the loaded section set changes.
  const unitsBySection = useMemo(
    () => items.map((section) => splitIntoSpeechUnits(section)),
    [items]
  )
  // Unit texts only: these exact strings are the synthesis-cache keys that feed
  // useTTS and the prebuffer ladder.
  const unitTextsBySection = useMemo(
    () => unitsBySection.map((units) => units.map((unit) => unit.text)),
    [unitsBySection]
  )
  const unitTextsBySectionRef = useRef(unitTextsBySection)
  useEffect(() => {
    unitTextsBySectionRef.current = unitTextsBySection
  }, [unitTextsBySection])
  // Units with their line ranges — what `playFromLine` searches.
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

  const selectAndStart = useCallback(
    (index: number, unitIndex: number, reportChange: boolean) => {
      const selectedItem = itemsRef.current[index]
      if (!selectedItem) return

      previewIndexRef.current = index
      setPreviewIndex(index)

      playbackRef.current?.stop()
      setError(null)

      if (reportChange) onItemChangeRef.current?.(selectedItem, index)

      // Already on this section: `useTTS` holds its units, so start right away.
      if (selectedItem.key === positionRef.current.sectionKey) {
        pendingStartRef.current = null
        updatePosition(selectedItem.key, unitIndex)
        void (unitIndex > 0
          ? playbackRef.current?.playFromUnit(unitIndex)
          : playbackRef.current?.play())
        return
      }

      // Another section: `useTTS` only sees its units after the position commits,
      // so hand the start to the effect below.
      pendingStartRef.current = { sectionKey: selectedItem.key, unitIndex }
      updatePosition(selectedItem.key, unitIndex)
    },
    [updatePosition]
  )

  const playback = useTTS(currentItem?.speechText ?? '', {
    voice,
    units: unitTextsBySection[currentIndex],
    onComplete: useCallback(() => {
      // Stale completion: the position moved on since this section started.
      if (positionRef.current.sectionKey !== currentKey) return

      const nextIndex = itemsRef.current.findIndex((section) => section.key === currentKey) + 1
      if (nextIndex > 0 && nextIndex < itemsRef.current.length) {
        selectAndStart(nextIndex, 0, true)
      }
    }, [currentKey, selectAndStart]),
    onError: useCallback((nextError: Error) => {
      playbackRef.current?.stop()
      setError(nextError)
    }, []),
  })

  useEffect(() => {
    playbackRef.current = playback
  }, [playback])

  // The position's section disappeared (mark-as-read, DOM eviction): the derived
  // index has already resolved to a survivor per the previous order, so adopt it
  // as the new position and, when audio was running, continue there from unit 0.
  // Declared after the `playbackRef` sync so it sees this commit's playback.
  useEffect(() => {
    if (position.sectionKey === currentKey) return

    if (!currentItem) {
      playbackRef.current?.stop()
      updatePosition(NO_POSITION.sectionKey, NO_POSITION.unitIndex)
      return
    }

    const wasActive = Boolean(
      playbackRef.current?.isPlaying || playbackRef.current?.isBuffering
    )
    updatePosition(currentItem.key, 0)
    previewIndexRef.current = currentIndex
    setPreviewIndex(currentIndex)
    if (!wasActive) return

    onItemChangeRef.current?.(currentItem, currentIndex)
    playbackRef.current?.stop()
    setError(null)
    void playbackRef.current?.play()
  }, [currentIndex, currentItem, currentKey, position.sectionKey, updatePosition])

  // Prebuffer ladder: warm the synthesis cache ahead of user intent so
  // play-from-here on any section starts from cache. Order: current section's
  // title + TLDR first (secures playback runway = "T1 buffered"), THEN every
  // loaded section's title, THEN every loaded section's TLDR. Restarts on voice
  // change, section-set change, or current-section change; idempotent (warm
  // requests hit the cache and skip). Non-current bodies are not prebuffered
  // here — they load on demand as playback approaches them.
  useEffect(() => {
    if (unitTextsBySection.length === 0) return

    const controller = new AbortController()
    const { signal } = controller

    const run = async (): Promise<void> => {
      const all = unitTextsBySectionRef.current
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
  }, [unitTextsBySection, voice, currentIndex])

  useEffect(() => {
    const pending = pendingStartRef.current
    if (pending?.sectionKey !== currentKey) return

    pendingStartRef.current = null
    void (pending.unitIndex > 0 ? playback.playFromUnit(pending.unitIndex) : playback.play())
  }, [currentKey, playback.play, playback.playFromUnit])

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
    updatePosition(nextItem.key, 0)
    onItemChangeRef.current?.(nextItem, nextIndex)
  }, [updatePosition])

  const playFromHere = useCallback(
    (sectionIndex: number, unitIndex = 0) => {
      selectAndStart(sectionIndex, unitIndex, true)
    },
    [selectAndStart]
  )

  /**
   * Resolve an article line to its section + unit and start there. The target is
   * the unit with the greatest `startLine` <= `line`; several units can share
   * that line (a paragraph split at sentence boundaries, or the no-TLDR
   * first-sentence unit and its remainder), and the FIRST of them wins so a
   * paragraph click starts at the paragraph's beginning, not mid-way through it.
   */
  const playFromLine = useCallback(
    (sourceSlug: string, line: number) => {
      const currentItems = itemsRef.current
      const unitsBySectionValue = unitsBySectionRef.current
      let target: { sectionIndex: number; unitIndex: number } | null = null
      let bestLine = -1

      for (let sectionIndex = 0; sectionIndex < currentItems.length; sectionIndex += 1) {
        if (currentItems[sectionIndex].sourceSlug !== sourceSlug) continue

        const units = unitsBySectionValue[sectionIndex] ?? []
        for (let unitIndex = 0; unitIndex < units.length; unitIndex += 1) {
          const { startLine } = units[unitIndex]
          // Strictly greater: ties keep the earlier unit.
          if (startLine <= line && startLine > bestLine) {
            bestLine = startLine
            target = { sectionIndex, unitIndex }
          }
        }
      }

      if (!target) return
      selectAndStart(target.sectionIndex, target.unitIndex, true)
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
    currentItem,
    position,
    currentSlug: currentItem?.sourceSlug ?? null,
    error,
    next,
    canNext,
    playFrom: playFromHere,
    playFromHere,
    playFromLine,
    retry,
  }), [
    isPlaying, isBuffering, progress, currentTime, totalEstimatedTime,
    currentChunkIndex, totalChunks, playbackStop, playbackResume, currentIndex,
    currentItem, position, error, play, pause, next, canNext,
    playFromHere, playFromLine, retry,
  ])
}

export default useContinuousReader
