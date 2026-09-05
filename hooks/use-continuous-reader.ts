'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { splitIntoSpeechUnits, type SpeechSection } from '@/lib/tts/speech'
import { synthesizeSpeech } from '@/lib/tts/client'
import { DEFAULT_TTS_VOICE, getStoredTtsVoice, TTS_VOICE_CHANGE_EVENT, type TtsVoice } from '@/lib/tts/voices'
import {
  resolveNextTrackIndex,
  resolvePreviousTrackIndex,
  resolveTrackGranularity,
} from '@/lib/reader/media-session-tracks'
import { useMediaSession } from './use-media-session'
import { useTTS } from './useTTS'
import type { TTSPlayback } from './useTTS'

/** Shown as the album on every OS media control. */
const MEDIA_SESSION_ALBUM = 'Motyl.dev'

// Where the consumer should anchor the scroll for this change:
//  - { line }  paragraph play → scroll to that exact paragraph.
//  - { link: true }  Next → scroll to the section's source link (bottom "Link:"),
//    so its link stays at the top and the next section's title appears below it.
//  - undefined  section-level change (heading play, section click, auto-advance) →
//    scroll to the section heading.
export type ScrollHint = { line: number } | { link: true }

export interface ContinuousReaderOptions {
  onItemChange?: (item: SpeechSection, index: number, scroll?: ScrollHint) => void
}

/**
 * Where the reader is. The section is addressed by its stable key, never by a
 * numeric index into the queue, so removing articles (mark-as-read, DOM
 * eviction) cannot silently shift what is being read.
 */
export interface ReadingPosition {
  /** `sectionKey(sourceSlug, ordinal)` */
  sectionKey: string
  /**
   * Command-time, NOT live: the unit the reader was last told to start at.
   * Nothing feeds `useTTS`'s `currentChunkIndex` back here, so this does not
   * track where the voice currently is — read `currentChunkIndex` for that.
   */
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
  // The position's key is in neither order: either the queue was fully replaced
  // rather than filtered, or this is the first resolve against a populated queue
  // (no position yet, so no previous keys). Policy either way: start at the top.
  if (wasAt < 0) return 0

  for (let index = wasAt + 1; index < previousKeys.length; index += 1) {
    const survivor = liveIndexByKey.get(previousKeys[index])
    if (survivor !== undefined) return survivor
  }
  for (let index = wasAt - 1; index >= 0; index -= 1) {
    const survivor = liveIndexByKey.get(previousKeys[index])
    if (survivor !== undefined) return survivor
  }

  // No survivor either side of where it sat: the queue was fully replaced.
  // Same policy as above — restart at the top.
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
  // The eye: the preview pointer Next cascades and `canNext` is read from. Like
  // the reading position it is addressed by a stable section key, never by a
  // numeric index, so removing articles cannot silently shift what Next
  // advances from. `previewKeyRef` is the SYNCHRONOUS source of truth — two
  // rapid `next()` presses must cascade without waiting for a render — while
  // the state exists only to drive the render-phase derivation below.
  const [previewKey, setPreviewKey] = useState<string>(() => items[0]?.key ?? '')
  const previewKeyRef = useRef(previewKey)
  const [error, setError] = useState<Error | null>(null)
  const positionRef = useRef(position)
  const currentIndexRef = useRef(0)
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
  // `previousKeysRef.current` is deliberately not a dep of the memo below. The
  // ref's writer is an effect, so it only runs post-commit: the render-phase
  // memo therefore always reads the LAST COMMITTED key order — exactly the
  // "previous order" the fallback needs — and the ref can never be ahead of
  // `items`. Listing `.current` would not even be inert: it is a fresh array on
  // every write, so it would re-run the memo after every commit.
  const resolvedIndex = useMemo(
    () => resolvePositionIndex(items, position.sectionKey, previousKeysRef.current),
    [items, position.sectionKey]
  )
  const currentIndex = Math.max(resolvedIndex, 0)
  const currentItem = items[currentIndex]
  const currentKey = currentItem?.key ?? ''

  // The eye's index is derived the same way, through the same resolver and with
  // the same previous-order snapshot, so a queue mutation re-seats it on its own
  // section instead of leaving it pointing a slot too far.
  const resolvedPreviewIndex = useMemo(
    () => resolvePositionIndex(items, previewKey, previousKeysRef.current),
    [items, previewKey]
  )
  const previewIndex = Math.max(resolvedPreviewIndex, 0)
  const previewItem = items[previewIndex]

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

  // Adopt the survivor the render above resolved the eye to. Without this the
  // removed section's key would outlive the previous-order snapshot (rewritten
  // post-commit from the NEW queue), and the next resolve would find it in
  // neither order and restart the eye at the top of the queue.
  useEffect(() => {
    const liveKey = previewItem?.key ?? ''
    if (liveKey === previewKeyRef.current) return
    previewKeyRef.current = liveKey
    setPreviewKey(liveKey)
  }, [previewItem])

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
    (index: number, unitIndex: number, reportChange: boolean, scroll?: ScrollHint) => {
      const selectedItem = itemsRef.current[index]
      if (!selectedItem) return

      previewKeyRef.current = selectedItem.key
      setPreviewKey(selectedItem.key)

      playbackRef.current?.stop()
      setError(null)

      if (reportChange) {
        // Only forward a scroll hint when one applies (paragraph play); section-level
        // changes stay a 2-arg call (heading scroll).
        if (scroll === undefined) onItemChangeRef.current?.(selectedItem, index)
        else onItemChangeRef.current?.(selectedItem, index, scroll)
      }

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

  // Destructured here, above the prebuffer ladder, so the ladder can depend on
  // `isPlaying`/`isBuffering` as VALUES: `playback`'s identity churns every
  // progress tick, these do not. The other bindings are not ladder deps — they
  // came along because the whole destructuring statement was hoisted as one.
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

  // The position's section disappeared (mark-as-read, DOM eviction): the derived
  // index has already resolved to a survivor per the previous order, so adopt it
  // as the new position, re-seat `useTTS` on it, and — only when audio was
  // running — continue there from unit 0.
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
    previewKeyRef.current = currentItem.key
    setPreviewKey(currentItem.key)
    onItemChangeRef.current?.(currentItem, currentIndex)

    // Re-seat `useTTS` on the survivor on BOTH paths. It has no
    // reset-on-content-change (`ensureChunks` no-ops while chunks exist) and
    // `pause()` retains its chunks by contract, so skipping this would leave a
    // paused reader's next Play speaking the section that was just removed.
    playbackRef.current?.stop()
    setError(null)

    // Only a reader that was already playing continues playing. Without this
    // gate an empty → populated queue would start speaking section 0 on its own.
    if (!wasActive) return
    void playbackRef.current?.play()
  }, [currentIndex, currentItem, currentKey, position.sectionKey, updatePosition])

  // Prebuffer ladder: warm the synthesis cache ahead of user intent so
  // play-from-here on any section starts from cache. Order: current section's
  // title + TLDR first (secures playback runway = "T1 buffered"), THEN every
  // loaded section's title, THEN every loaded section's TLDR. Restarts on voice
  // change, section-set change, or current-section change; idempotent (warm
  // requests hit the cache and skip). Non-current bodies are not prebuffered
  // here — they load on demand as playback approaches them.
  //
  // IDLE-ONLY: playback has absolute priority over warming. While audio is
  // running or waiting the wide tiers are skipped and the ladder warms only the
  // next section's first unit (the seam into auto-advance); the current
  // section's runway belongs to `useTTS`'s BUFFER_AHEAD. `isPlaying` /
  // `isBuffering` are the destructured values, NOT `playback` — its identity
  // changes on every progress tick, which would restart the ladder constantly.
  // Entering `isBuffering` therefore re-runs the effect, whose cleanup aborts
  // the warms already in flight.
  useEffect(() => {
    if (unitTextsBySection.length === 0) return

    const controller = new AbortController()
    const { signal } = controller
    const audioActive = isPlaying || isBuffering

    const run = async (): Promise<void> => {
      const all = unitTextsBySectionRef.current
      if (audioActive) {
        const nextFirst = all[currentIndexRef.current + 1]?.[0]
        if (nextFirst) await warmTier([nextFirst], voice, 1, signal)
        return
      }
      // T1: current section's title + TLDR.
      const current = all[currentIndexRef.current]
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
  }, [unitTextsBySection, voice, currentIndex, isPlaying, isBuffering])

  useEffect(() => {
    const pending = pendingStartRef.current
    if (pending?.sectionKey !== currentKey) return

    pendingStartRef.current = null
    void (pending.unitIndex > 0 ? playback.playFromUnit(pending.unitIndex) : playback.play())
  }, [currentKey, playback.play, playback.playFromUnit])

  const play = useCallback(() => {
    setError(null)
    const currentSectionKey = itemsRef.current[currentIndexRef.current]?.key ?? ''
    previewKeyRef.current = currentSectionKey
    setPreviewKey(currentSectionKey)
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

    // Resolve the eye's key against the CURRENT queue rather than trusting a
    // remembered index: earlier sections may have been removed since the last
    // press, and only the resolver knows where the eye's section sits now.
    const leaving = Math.max(
      resolvePositionIndex(currentItems, previewKeyRef.current, previousKeysRef.current),
      0
    )

    if (audioActive) {
      // Non-interrupting: playback keeps going. Advance the eye forward one
      // section, but anchor the section we're LEAVING at the top — its link stays
      // at the top and the next section's title appears just below it. Each Next
      // cascades down to the following boundary.
      if (leaving >= lastIndex) return // already at the last section
      const advancedItem = currentItems[leaving + 1]
      // Written synchronously, before the state update, so a second press in the
      // same tick cascades from here instead of repeating this one.
      previewKeyRef.current = advancedItem.key
      setPreviewKey(advancedItem.key)
      const leavingItem = currentItems[leaving]
      // Anchor the leaving section's source link at the top (not its heading), so
      // its link stays visible and the next section's title appears just below it.
      if (leavingItem) onItemChangeRef.current?.(leavingItem, leaving, { link: true })
      return
    }

    // Audio not active: move the start pointer to the next section (pressing Play
    // afterwards begins there) but anchor the section being LEFT by its source
    // link — the same forward-cascade framing as while playing. Use previewIndex
    // (the eye) here too, so a paused reader whose eye was cascaded ahead of the
    // playback position keeps advancing from the eye rather than jumping back.
    if (leaving >= lastIndex) return // already at the last section
    const nextIndex = leaving + 1
    const nextItem = currentItems[nextIndex]
    const leavingItem = currentItems[leaving]
    if (!nextItem) return

    previewKeyRef.current = nextItem.key
    setPreviewKey(nextItem.key)
    updatePosition(nextItem.key, 0)
    if (leavingItem) onItemChangeRef.current?.(leavingItem, leaving, { link: true })
  }, [updatePosition])

  const playFromHere = useCallback(
    (sectionIndex: number, unitIndex = 0) => {
      selectAndStart(sectionIndex, unitIndex, true)
    },
    [selectAndStart]
  )

  /**
   * Resolve an article line to its section + unit and start there.
   *
   * A unit that COVERS the line (`startLine <= line <= endLine`) wins: units can
   * share a `startLine` while spanning different ranges (the no-TLDR
   * first-sentence unit keeps its paragraph's start line, and its remainder is
   * merged with following paragraphs, widening only the remainder's `endLine`),
   * so the sharing unit that actually speaks the clicked line is the target.
   * Among covering units the greatest `startLine` wins, and the FIRST of those
   * on a tie, so a paragraph click starts at the paragraph's beginning rather
   * than mid-way through it.
   *
   * When no unit covers the line (a blank line between units, or a line past the
   * last unit) the target falls back to the unit with the greatest `startLine`
   * <= `line`, first on ties. A line before the first unit's `startLine` matches
   * nothing and is a no-op.
   */
  const playFromLine = useCallback(
    (sourceSlug: string, line: number) => {
      const currentItems = itemsRef.current
      const unitsBySectionValue = unitsBySectionRef.current
      let covering: { sectionIndex: number; unitIndex: number } | null = null
      let coveringLine = -1
      let fallback: { sectionIndex: number; unitIndex: number } | null = null
      let fallbackLine = -1

      for (let sectionIndex = 0; sectionIndex < currentItems.length; sectionIndex += 1) {
        if (currentItems[sectionIndex].sourceSlug !== sourceSlug) continue

        const units = unitsBySectionValue[sectionIndex] ?? []
        for (let unitIndex = 0; unitIndex < units.length; unitIndex += 1) {
          const { startLine, endLine } = units[unitIndex]
          if (startLine > line) continue

          // Strictly greater: ties keep the earlier unit.
          if (line <= endLine && startLine > coveringLine) {
            coveringLine = startLine
            covering = { sectionIndex, unitIndex }
          }
          if (startLine > fallbackLine) {
            fallbackLine = startLine
            fallback = { sectionIndex, unitIndex }
          }
        }
      }

      const target = covering ?? fallback
      if (!target) return
      // Pass the clicked line so the consumer scrolls to that exact paragraph,
      // not the section heading (which could be the article top).
      selectAndStart(target.sectionIndex, target.unitIndex, true, { line })
    },
    [selectAndStart]
  )

  const retry = useCallback(() => {
    setError(null)
    void playbackRef.current?.play()
  }, [])

  /**
   * Interrupting Media-session skip backwards. Restarts the current track past
   * `RESTART_THRESHOLD_SECONDS`, otherwise steps to the previous track.
   * Elapsed-in-section is read off the last committed playback: `playback`'s
   * identity churns every progress tick, so the ref always holds a fresh
   * `currentTime` without this callback depending on it.
   *
   * It goes through `playFromHere`, so from a PAUSED reader it does not merely
   * move the position — it starts speaking the target. That is the OS transport
   * contract: a skip on a lock screen is expected to play what it skipped to.
   */
  const previous = useCallback(() => {
    const currentItems = itemsRef.current
    if (currentItems.length === 0) return

    const target = resolvePreviousTrackIndex(
      currentItems,
      currentIndexRef.current,
      resolveTrackGranularity(currentItems),
      playbackRef.current?.currentTime ?? 0
    )
    playFromHere(target, 0)
  }, [playFromHere])

  /**
   * Interrupting Media-session skip forwards — NOT the in-app `next`, which is a
   * non-interrupting soft advance. At the end of the queue it does nothing,
   * leaving the current audio running.
   *
   * Deliberately internal: it is reachable only through the media-session
   * `nexttrack` handler below. `previous`/`canPrevious` ARE returned because the
   * in-app transport contract asks for them; nothing in the app drives a
   * skip-forward, so nothing exposes one. Same paused-reader caveat as
   * `previous`: it starts playback at the target.
   */
  const nextTrack = useCallback(() => {
    const currentItems = itemsRef.current
    if (currentItems.length === 0) return

    const target = resolveNextTrackIndex(
      currentItems,
      currentIndexRef.current,
      resolveTrackGranularity(currentItems)
    )
    if (target === null) return
    playFromHere(target, 0)
  }, [playFromHere])

  const canNext = Math.max(currentIndex, previewIndex) < items.length - 1
  // Is there anything to drive at all? This is what makes the OS controls appear.
  const hasQueue = items.length > 0
  // Only an empty queue has nothing to go back to: the first track restarts.
  // Equal to `hasQueue` by the skip-back rule, not by being the same question.
  const canPrevious = hasQueue

  const mediaTitle = currentItem ? (currentItem.sourceTitle ?? currentItem.title) : null
  const mediaArtist = currentItem?.title ?? null
  // Memoized on the primitives it is built from. `useMediaSession` keys its
  // effects on those primitives too, so a fresh object here would be inert —
  // this only avoids handing a new literal to the hook on every progress tick.
  const mediaMetadata = useMemo(
    () =>
      mediaTitle === null
        ? null
        : { title: mediaTitle, artist: mediaArtist ?? '', album: MEDIA_SESSION_ALBUM },
    [mediaTitle, mediaArtist]
  )

  const mediaHandlers = useMemo(
    () => ({ play, pause, nexttrack: nextTrack, previoustrack: previous }),
    [play, pause, nextTrack, previous]
  )

  useMediaSession({
    active: hasQueue,
    metadata: mediaMetadata,
    playbackState: isPlaying ? 'playing' : hasQueue ? 'paused' : 'none',
    handlers: mediaHandlers,
  })

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
    previous,
    canPrevious,
    playFrom: playFromHere,
    playFromHere,
    playFromLine,
    retry,
  }), [
    isPlaying, isBuffering, progress, currentTime, totalEstimatedTime,
    currentChunkIndex, totalChunks, playbackStop, playbackResume, currentIndex,
    currentItem, position, error, play, pause, next, canNext,
    previous, canPrevious, playFromHere, playFromLine, retry,
  ])
}

export default useContinuousReader
