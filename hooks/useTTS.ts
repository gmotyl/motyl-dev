'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { detectLanguageFromContent } from '@/lib/tts/voice-map'
import { splitIntoChunks } from '@/lib/tts/chunks'
import { synthesizeSpeech } from '@/lib/tts/client'
import { describeError, detailFor, logReaderEvent } from '@/lib/reader/diagnostic-log'
import type { Carrier } from '@/lib/reader/carrier'
import { createSrcSwapCarrier } from '@/lib/reader/src-swap-carrier'
import { isMseAudioSupported } from '@/lib/reader/mse-carrier'
import { createMsePlaybackCarrier } from '@/lib/reader/mse-playback-carrier'
import { createBoundaryTracker, type BoundaryTracker } from '@/lib/reader/boundary-tracker'
import type { UnitTimeline } from '@/lib/reader/unit-timeline'

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
   * Fired on EVERY progress tick during playback with the 0–100 progress
   * percent — that is every animation frame while the page is visible (~60Hz)
   * AND every element `timeupdate` (~4Hz, and the only one that survives a
   * hidden page). Deliberately unthrottled, which is the ONLY thing separating
   * it from the `progress` state: that one is latched to whole-percent changes,
   * so a caller needing sub-percent resolution has to come through here.
   *
   * Nothing in this repo passes one today (`use-continuous-reader` and
   * `tts-player` are the only two call sites, and neither does) — it is an
   * extension point, not a load-bearing input. Keep any handler cheap anyway; it
   * runs ~60×/second while the screen is on.
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
  // Whether this element has already been poked inside a user gesture (see
  // `unlockElementForGesture`). Once true it stays true for the element's whole
  // life — WebKit's per-element unlock does not expire.
  const elementUnlockedRef = useRef(false)
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
  // Consecutive unreadable units within the current play session — synthesis
  // that never produced bytes, or bytes the element refused. Reset when a unit
  // actually plays to its end (and at the start of a play session), NOT when
  // synthesis merely resolves. Bounds the auto-skip below: a systemic outage
  // (no network, edge-tts fully down, a decoder that rejects everything) must
  // still surface as a stop + onError instead of racing silently through every
  // remaining chunk.
  const consecutiveFailuresRef = useRef(0)
  // The element's `timeupdate` handler is attached once, at element creation,
  // so it has to reach the CURRENT progress emitter — whose identity changes
  // with `onProgress` — instead of closing over the one that existed at mount.
  const emitProgressRef = useRef<() => void>(() => {})
  // Where a refused start is reported, for the same reason as the progress
  // emitter above: the carrier is created once, at mount, so its callback has
  // to reach the CURRENT unit's handler — the one that still holds this call's
  // generation and abort signal — instead of the one that existed at mount.
  const reportStartRef = useRef<(index: number, started: Promise<void> | undefined) => void>(
    () => {}
  )
  // The `timeupdate`-driven unit advance, reached through a ref for the same
  // reason as the progress emitter: the listener is attached once, at element
  // creation, and the handler it has to reach carries the CURRENT session.
  const advanceUnitsRef = useRef<() => void>(() => {})
  /**
   * The generation and abort signal of the play session now running, or null
   * between sessions.
   *
   * The advance above is driven by an element listener rather than by a call
   * chain, so it cannot close over either — and without them it could not tell
   * a live crossing from one arriving after the user pressed pause.
   */
  const sessionRef = useRef<{ generation: number; signal: AbortSignal } | null>(null)

  // Buffer cache: pre-fetched MP3 bytes keyed by chunk index. An entry is
  // dropped once the carrier holds the unit — the carrier then owns the audio.
  const bufferCacheRef = useRef<Map<number, ArrayBuffer>>(new Map())
  // Track in-flight fetches to avoid duplicate requests
  const fetchingRef = useRef<Set<number>>(new Set())

  // THE carrier: what actually gets a unit's audio out of the element. Created
  // once per hook instance and never swapped, so the element it holds — and the
  // OS media session hanging off it — survive every content change.
  const carrierRef = useRef<Carrier | null>(null)
  const getCarrier = useCallback((): Carrier => {
    if (!carrierRef.current) {
      // Chosen ONCE, on the first use (the mount effect), and never revisited:
      // the element and the OS media session hanging off it outlive every
      // content change, and a carrier swapped underneath them would take both
      // with it. iPhone Safari has no MediaSource at all, so the src-swap
      // branch is a live path on real devices rather than a legacy one.
      carrierRef.current = isMseAudioSupported()
        ? createMsePlaybackCarrier()
        : createSrcSwapCarrier({
            // The prefetch depth IS the retention window: a unit is prepared
            // BUFFER_AHEAD ahead of the playhead and released once the playhead
            // is past it.
            retainAhead: BUFFER_AHEAD,
            onStarted: (index, started) => reportStartRef.current(index, started),
          })
    }
    return carrierRef.current
  }, [])

  /**
   * Whether the carrier already holds unit `index`, i.e. whether its audio is
   * prepared and a seek to it would play something.
   *
   * `timeline()` is the interface's only view of what a carrier holds, so this
   * is the carrier-agnostic form of the `objectUrls.has(index)` check this hook
   * used to make directly — and it stays true across a strategy that has no
   * object URLs at all.
   */
  const carrierHasUnit = useCallback(
    (index: number): boolean => getCarrier().timeline().startOf(index) !== null,
    [getCarrier]
  )

  /**
   * A view onto whichever timeline the carrier holds RIGHT NOW.
   *
   * Both carriers REPLACE their timeline object rather than mutating one — the
   * src-swap carrier on every `seekToUnit` (its prune rebuilds it), the MSE one
   * on every teardown — so anything that cached the object returned once would
   * keep answering from a timeline nothing appends to any more. `carrierHasUnit`
   * above is safe because it re-fetches per call; this is the same discipline
   * for the one consumer that has to be handed a timeline instead of asking for
   * one, the boundary tracker.
   */
  const liveTimelineRef = useRef<UnitTimeline | null>(null)
  const getLiveTimeline = useCallback((): UnitTimeline => {
    if (!liveTimelineRef.current) {
      liveTimelineRef.current = {
        push: (index, duration) => getCarrier().timeline().push(index, duration),
        unitAt: (time) => getCarrier().timeline().unitAt(time),
        startOf: (index) => getCarrier().timeline().startOf(index),
        end: () => getCarrier().timeline().end(),
        dropBefore: (time) => getCarrier().timeline().dropBefore(time),
        oldest: () => getCarrier().timeline().oldest(),
      }
    }
    return liveTimelineRef.current
  }, [getCarrier])

  /**
   * Turns the element's clock into unit completions — the MSE path's
   * replacement for the per-unit `ended` the src-swap carrier gets for free.
   * Created once, over the live view above, so it survives every rebuild.
   */
  const boundaryTrackerRef = useRef<BoundaryTracker | null>(null)
  const getBoundaryTracker = useCallback((): BoundaryTracker => {
    if (!boundaryTrackerRef.current) {
      boundaryTrackerRef.current = createBoundaryTracker(getLiveTimeline())
    }
    return boundaryTrackerRef.current
  }, [getLiveTimeline])

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
      // The authoritative progress clock. requestAnimationFrame is frozen while
      // the page is hidden, so this (~4Hz) is the only thing that keeps the
      // `progress` / `currentTime` STATE moving with the screen off — the whole
      // scenario this change exists for. Concretely: the reader's media-session
      // `previoustrack` handler picks restart-vs-previous-track from
      // `playback.currentTime` (RESTART_THRESHOLD_SECONDS in
      // lib/reader/media-session-tracks), and a lock-screen or headset button
      // press is by definition a hidden-page event — with rAF alone that
      // decision would be made from a minutes-stale elapsed value, and the bar
      // would jump on return. Attached once for the element's whole life — no
      // per-unit add/remove — so a src swap can never drop it mid-article.
      // Advance FIRST, emit second: on one continuous timeline this very tick
      // may be the one that crossed a unit boundary, and the emitter has to
      // measure against the unit the crossing moved to.
      element.addEventListener('timeupdate', () => {
        advanceUnitsRef.current()
        emitProgressRef.current()
      })
      document.body.appendChild(element)
      audioElementRef.current = element
      elementUnlockedRef.current = false
      // The carrier plays through THIS element, and only ever this one.
      getCarrier().attach(element)
    }
    return audioElementRef.current
  }, [getCarrier])

  /**
   * Spend the user gesture on the element, synchronously, before anything is
   * awaited.
   *
   * WebKit (iOS Safari, and every iOS browser, since they all use it) gates
   * `play()` on the *gesture task itself*: only a call made synchronously inside
   * the handler — or a later call on an element that call already unlocked —
   * is allowed. Our real per-unit `play()` happens after
   * `await fetchUnitAudio(...)`, which is a different task, so without this poke
   * the very first unit would reject with `NotAllowedError` and the spec's
   * "Apple browsers are no longer carved out" would be a lie.
   *
   * Chrome for Android does NOT need this: its gate is *sticky* user activation,
   * which persists for the document's lifetime, so the `ended`-driven chain,
   * media-session `nexttrack` and resume-after-pause all pass on their own.
   *
   * The element has no source at this point, so nothing becomes audible; the
   * immediate `pause()` keeps it that way if the engine did start something. The
   * returned promise rejects here as a matter of course (`NotSupportedError` for
   * the empty element, `AbortError` for the pause that interrupts it) and that
   * rejection is deliberately swallowed — it is NOT the refused start that
   * `playChunk` reports through `onError`.
   */
  const unlockElementForGesture = useCallback((element: HTMLAudioElement) => {
    if (elementUnlockedRef.current) return
    elementUnlockedRef.current = true
    try {
      const attempt = element.play?.()
      // Swallow BEFORE pausing, not after: `pause()` is exactly what the `catch`
      // below is here for (older engines throw synchronously), and a throw
      // between the two statements would leave the `play()` promise — which
      // rejects as a matter of course here — with no handler at all, surfacing as
      // an unhandledrejection.
      void attempt?.catch?.(() => {})
      element.pause?.()
    } catch {
      // Older engines throw synchronously instead of rejecting; either way an
      // unlock that fails must never surface to the user.
    }
  }, [])

  /**
   * Hand a unit's MP3 to the carrier. Called as soon as the audio lands
   * (prefetch) so the swap at `ended` costs no network round-trip and, on the
   * src-swap carrier, is a local assignment.
   *
   * The duration is 0 — "unmeasurable". Nothing here decodes the media, and a
   * duration derived from byte length and a nominal bitrate would make every
   * later position report a bitrate assumption. The src-swap carrier does not
   * need one: each unit starts its element over at 0 and the element's own
   * `duration` is what progress reads.
   *
   * `continueTimeline` is always true: an append during a session extends what
   * the carrier holds. Starting over is `rebuild()`, which the hook asks for
   * explicitly.
   */
  const prepareUnit = useCallback(
    async (index: number, data: ArrayBuffer): Promise<void> => {
      await getCarrier().appendUnits([{ index, data, duration: 0 }], {
        continueTimeline: true,
      })
      // The carrier owns the audio now; holding the bytes too would double the
      // retained audio for the whole buffered window.
      bufferCacheRef.current.delete(index)
    },
    [getCarrier]
  )

  /**
   * Detach the current unit's `ended` / `error` handlers.
   *
   * Called wherever the unit in the element is abandoned (pause, stop, give-up,
   * completion). Both handlers do check the generation and abort signal, but a
   * *structural* detach is what actually makes a late event harmless: an `ended`
   * that was already queued when the user hit pause would otherwise still run
   * `completedChars += charCounts[index]` and silently inflate progress for the
   * rest of the session. A handler that cannot run at all cannot be broken by a
   * later refactor of those guards either.
   */
  const detachUnitHandlers = useCallback(() => {
    const element = audioElementRef.current
    if (!element) return
    element.onended = null
    element.onerror = null
  }, [])

  /**
   * Drop everything the carrier holds — every unit's audio with it.
   *
   * Called wherever the session ends (completion, the give-up path, `stop()`),
   * because nothing a session prepared may outlive it: a Read All News run that
   * kept one unit's audio per paragraph would retain the whole article's.
   * Releasing a unit the playhead has merely passed is the carrier's own job,
   * at the swap.
   */
  const rebuildCarrier = useCallback(() => {
    getCarrier().rebuild()
    // The timeline the tracker was seated on is gone with it. A seat carried
    // across the rebuild would compare a dead span's index against a fresh
    // one — same index, different timeline — and swallow the first unit's
    // completion of the next session. The fresh timeline is empty, so this
    // leaves the tracker unseated and the first tick re-seats it.
    getBoundaryTracker().reseat(0)
  }, [getBoundaryTracker, getCarrier])

  // Synthesize a single chunk. The bytes go to the carrier as-is: nothing here
  // decodes them, which is what keeps the synthesis cache's shared ArrayBuffer
  // usable for a replay (see the carrier's wrap).
  const fetchUnitAudio = useCallback(
    async (text: string, signal: AbortSignal): Promise<ArrayBuffer> => {
      const detectedVoice = voiceRef.current || detectLanguage(content)

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

      const arrayBuffer = await synthesizeSpeech(text, { voice: detectedVoice })

      if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

      // The synthesis cache (lib/tts/client) hands the SAME ArrayBuffer instance
      // to every caller for a given voice+text, so this buffer is shared and
      // must stay intact. The carrier wraps it in a Blob, which COPIES —
      // unlike the old Web Audio decode step, which detached its input and
      // forced a slice(0) dance before every replay.
      return arrayBuffer
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
          carrierHasUnit(i) ||
          bufferCacheRef.current.has(i) ||
          fetchingRef.current.has(i)
        ) continue

        fetchingRef.current.add(i)

        fetchUnitAudio(chunksRef.current[i], signal)
          .then((data) => {
            fetchingRef.current.delete(i)
            if (generation !== requestGenerationRef.current || signal.aborted) return
            // Give the unit to the carrier now, not at the swap: `ended` must
            // only have to ask for a seek.
            return prepareUnit(i, data)
          })
          .catch((err) => {
            fetchingRef.current.delete(i)
            if ((err as Error).name !== 'AbortError') {
              console.warn(`[TTS] Buffer fetch failed for chunk ${i}:`, err)
            }
          })
      }
    },
    [carrierHasUnit, fetchUnitAudio, prepareUnit]
  )

  /**
   * THE progress emitter — the single source of truth both clocks go through.
   *
   * Progress has two clocks (see the change's design.md):
   *   - `timeupdate` (~4Hz) is the AUTHORITATIVE one, because it keeps firing
   *     while the page is hidden. That is the whole point of this change: phone
   *     screen off, reader playing in the background. rAF stops there, so
   *     without this clock `progress` and `currentTime` would freeze for the
   *     entire hidden stretch and jump on return — and the reader's
   *     media-session `previoustrack` handler, which reads `currentTime` to
   *     choose restart-vs-previous-track, would answer a lock-screen press from
   *     a stale value. (The prebuffer ladder is NOT a consumer: it is keyed on
   *     `isPlaying`/`isBuffering`, not on progress.)
   *   - `requestAnimationFrame` is cosmetic: it does not tick while hidden, and
   *     exists only to move the reader bar smoothly between timeupdates.
   *
   * Both read the SAME `element.currentTime` through this one function; if the
   * percentage maths were duplicated per clock they would drift apart.
   */
  const emitProgress = useCallback(() => {
    const element = audioElementRef.current
    // Also the "stop emitting" gate: after pause/stop/completion the element
    // keeps its `timeupdate` listener attached, but this guard makes it inert.
    if (!isPlayingRef.current || !element) return

    // Only the unit the element is ACTUALLY loaded with may be measured. Between
    // `ended` for unit N and the `src` swap inside `playChunk(N+1)` there is a
    // gap — as long as N+1's synthesis takes — where `completedChars` has already
    // absorbed unit N and `currentChunkIndexRef` already points at N+1, while the
    // element still holds unit N's exhausted media (`currentTime === duration`).
    // Reading that reports "unit N+1 is 100% played", so progress spikes to the
    // end of N+1 and then falls back the instant the swap rewinds the element.
    // Progress must never go backwards, so the gap emits nothing at all.
    if (loadedUnitIndexRef.current !== currentChunkIndexRef.current) return

    let chunkProgress: number
    if (getCarrier().kind === 'mse') {
      // One continuous timeline: the element's clock is ABSOLUTE and its
      // `duration` is the whole buffer, so a unit's own progress can only be
      // measured against that unit's span.
      const span = getLiveTimeline().unitAt(element.currentTime)
      // Null is a gap, dropped media, or a playhead past the last append; a
      // span belonging to a DIFFERENT unit means the playhead has crossed a
      // boundary the tracker has not reported yet. Both are the same "do not
      // measure" case as the loaded-unit guard above — progress read against a
      // span this unit does not own is the spike-then-fall this emitter exists
      // to prevent. (A zero-length span never wins a `unitAt` lookup at all, so
      // the guarded division below cannot be reached with one; the fallback is
      // there because the division must not depend on that being true.)
      if (span === null || span.index !== currentChunkIndexRef.current) return
      chunkProgress =
        span.duration > 0
          ? Math.min((element.currentTime - span.start) / span.duration, 1)
          : 0
    } else {
      // duration is NaN until the element has metadata, and the element rewinds
      // to 0 on every src swap — so an unknown duration reads as "just started"
      // rather than poisoning the percentage with NaN.
      const duration = element.duration
      chunkProgress =
        Number.isFinite(duration) && duration > 0
          ? Math.min(element.currentTime / duration, 1)
          : 0
    }

    const completedChars = completedCharsRef.current
    const currentChunkChars = charCountsRef.current[currentChunkIndexRef.current] || 0
    const currentProgress = completedChars + currentChunkChars * chunkProgress
    const totalProgress = (currentProgress / totalCharsRef.current) * 100

    const clamped = Math.min(totalProgress, 100)
    // Callers see EVERY tick: this is the hook's only unthrottled view of
    // progress, deliberately outside the whole-percent latch guarding setState
    // below.
    onProgress?.(clamped)

    // Only re-render (setState) when the rounded percent actually changes,
    // cutting progress-driven re-renders from ~60/sec to ~1 per 1%. This keeps
    // the backdrop-blur reader bar from re-rendering at 60fps (hover flicker).
    // The latch lives here, shared by both clocks, so a timeupdate and a frame
    // landing on the same percent cost exactly one re-render between them.
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
  }, [getCarrier, getLiveTimeline, onProgress])

  emitProgressRef.current = emitProgress

  // The cosmetic clock: emit, then re-arm. Self-rescheduling stops on its own
  // as soon as playback does, and pause()/stop()/completion additionally cancel
  // the frame already in flight.
  const runProgressFrame = useCallback(() => {
    if (!isPlayingRef.current || !audioElementRef.current) return
    emitProgress()
    animationFrameRef.current = requestAnimationFrame(runProgressFrame)
  }, [emitProgress])

  // Play a single chunk
  const playChunk = useCallback(
    async (index: number, offset: number, generation: number, signal: AbortSignal) => {
      // ABOVE the entry guard, like every other call in this file: the one
      // thing the device log has to be able to say is "the chain reached here",
      // and a call that recorded only after passing the guard could not say it.
      // Read into a boolean first so the entry can be written before the guard
      // is applied and can carry `suppressed` — `||` still short-circuits and
      // both refs are read at the same moment, so playback is untouched.
      //
      // The detail is `index/total`, not a bare index, because the completion
      // path below enters this function once more with `index ===
      // chunksRef.current.length`. `unit-start 6/6` reads as "past the last
      // unit" (the article finished); `unit-start 6/12` is a real next unit —
      // and a real next unit with no `play-called` after it is precisely the
      // screen-off death this instrument is hunting. A bare index made those
      // two outcomes produce an identical log tail. `chunksRef.current` is the
      // live list (`stop()` clears it, `ensureChunks()` fills it), so the count
      // is this call's, not a stale capture.
      const entryRejected = generation !== requestGenerationRef.current || signal.aborted
      logReaderEvent('unit-start', `${index}/${chunksRef.current.length}`, {
        suppressed: entryRejected,
      })

      if (entryRejected) return

      if (index >= chunksRef.current.length) {
        // All chunks played
        isPlayingRef.current = false
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        detachUnitHandlers()
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
        rebuildCarrier()
        return
      }

      const element = getAudioElement()
      const carrier = getCarrier()

      /**
       * End the session on an unrecoverable failure. There is exactly one output
       * path now, so anything that reaches here would otherwise be silence with
       * `isPlaying` still true — the failure mode this change exists to prevent.
       *
       * The animation-frame handle is cancelled AND nulled: `runProgressFrame`
       * early-returns without clearing it, so a stale handle left here would make
       * the next `play()` skip re-arming the loop
       * (`if (!animationFrameRef.current)`). The `timeupdate` clock would carry
       * on, so progress would not die outright — but the smooth clock would be
       * gone for the rest of the session and the reader bar would lurch forward
       * ~4×/second instead of gliding.
       *
       * The detail goes through `describeError`, not `error.message`. The
       * parameter is typed `Error`, but the only caller that originates a
       * failure is the `play()` rejection handler, which casts (`error as
       * Error`) whatever the promise rejected with — a promise may reject with
       * anything, and a DOMException subclass or a plain object can carry no
       * message at all. Reading `.message` there leaves the one line that says
       * the reader gave up with no detail, on exactly the failure path the
       * device test exists to capture; `describeError` keeps the NAME, which is
       * the diagnostically useful half.
       */
      const stopWithError = (error: Error) => {
        logReaderEvent('stop-with-error', describeError(error))
        isPlayingRef.current = false
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
        detachUnitHandlers()
        invalidatePendingRequests()
        setState((prev) => ({ ...prev, isPlaying: false, isBuffering: false }))
        onError?.(error)
      }

      /**
       * A unit can fail two ways — synthesis never produced bytes, or the element
       * refused the bytes it was handed (`error`: undecodable MP3, dead object
       * URL). Both mean "this unit is unreadable", so both get the same
       * treatment: drop it, count its characters complete so progress does not
       * stall on it, and continue — bounded by the same streak counter, so a
       * systemic outage still stops loudly instead of racing silently through
       * the rest of the article.
       */
      const failUnit = (failedIndex: number, error: Error) => {
        // The index leads the detail, `: ` separates it from anything free-form
        // (see `detailFor`): which unit was dropped is the first thing the log
        // is read for. The remainder goes through `describeError` for the same
        // reason as `stopWithError`: the `fetchUnitAudio` catch hands this the
        // original rejection under an `error as Error` cast, so a rejection
        // without a message would otherwise reduce the line to a bare index.
        logReaderEvent('synthesis-failed', detailFor(failedIndex, describeError(error)))
        consecutiveFailuresRef.current += 1

        // The unit is abandoned, so the element is no longer carrying anything
        // this hook counts as loaded. Its audio is released by the carrier the
        // moment the next unit is sought — and on the give-up path below, where
        // there is no next unit, by the rebuild.
        if (loadedUnitIndexRef.current === failedIndex) {
          loadedUnitIndexRef.current = null
        }

        if (consecutiveFailuresRef.current > MAX_CONSECUTIVE_CHUNK_FAILURES) {
          // Too many units in a row were unreadable: systemic (no network,
          // edge-tts down, a decoder that rejects everything) rather than one bad
          // paragraph. The session ends here, so the whole buffered window of
          // prepared audio goes with it.
          rebuildCarrier()
          loadedUnitIndexRef.current = null
          stopWithError(error)
          return
        }

        // A single unreadable unit must not strand playback waiting for the user
        // to press Play again.
        completedCharsRef.current += charCountsRef.current[failedIndex] || 0
        void playChunk(failedIndex + 1, 0, generation, signal)
      }

      currentChunkIndexRef.current = index

      // Eagerly start buffering upcoming chunks
      fillBuffer(index + 1, generation, signal)

      // Resuming the unit the element already holds: keep its source (a src
      // assignment rewinds) and just seek back to where pause() left off.
      //
      // On the MSE carrier there is no offset to come back to — the element
      // keeps its own `currentTime` across a pause on one continuous timeline —
      // so what makes this a resume is ONLY that the element is already
      // positioned inside this unit. A natural unit advance arrives here the
      // same way, which is exactly what keeps it free of a seek: the playhead
      // walked into the span on its own and re-pointing it could only rewind.
      const resuming =
        loadedUnitIndexRef.current === index &&
        carrierHasUnit(index) &&
        (carrier.kind === 'mse' || offset > 0)

      if (!resuming) {
        // The previous unit is abandoned the moment this branch commits to a new
        // one — and it stays abandoned across the `await` below, which can be
        // arbitrarily long when this unit is not buffered yet. Without a detach
        // here the OLD unit's `onended`/`onerror` stay live for that whole
        // window, and every one of their guards (generation, abort signal,
        // `isPlaying`) still passes: a stray element `error` would run
        // `failUnit(previous)` a SECOND time, double-counting that unit's
        // characters into `completedChars` for the rest of the session and
        // issuing a duplicate `playChunk` for this index. This is the case
        // `detachUnitHandlers` exists to make structurally impossible. The
        // resuming branch deliberately skips it: there the element keeps its
        // `src` and position, and the handlers below are simply re-pointed at
        // the same unit.
        detachUnitHandlers()

        if (!carrierHasUnit(index)) {
          let data = bufferCacheRef.current.get(index)

          if (!data) {
            // Not buffered yet — fetch inline and show buffering state
            setState((prev) => ({ ...prev, isBuffering: true }))

            try {
              data = await fetchUnitAudio(chunksRef.current[index], signal)
            } catch (error) {
              if (
                generation !== requestGenerationRef.current ||
                signal.aborted ||
                (error as Error).name === 'AbortError'
              ) return
              console.warn(`[TTS] Chunk ${index} failed:`, error)

              // Synthesis stalled even after lib/tts-client's own retry.
              failUnit(index, error as Error)
              return
            }
          }

          try {
            await prepareUnit(index, data)
          } catch (error) {
            // The src-swap carrier cannot refuse a unit; the MSE one can — a
            // SourceBuffer that rejects an append poisons its own queue, and
            // `appendUnits` rejects to say so. Without this catch that refusal
            // escapes as an unhandled rejection (nothing awaits `playChunk`)
            // and the unit is never counted against the failure streak, so a
            // buffer refusing everything would leave the reader silent with
            // `isPlaying` still true — the exact failure this change exists to
            // remove. It is a unit failure of the same kind as synthesis never
            // producing bytes, and is treated as one.
            if (
              generation !== requestGenerationRef.current ||
              signal.aborted ||
              (error as Error).name === 'AbortError'
            ) return
            console.warn(`[TTS] Chunk ${index} could not be prepared:`, error)
            failUnit(index, error as Error)
            return
          }
        }

        if (
          generation !== requestGenerationRef.current ||
          signal.aborted ||
          !isPlayingRef.current
        ) return // Stopped while fetching

        setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))

        // The unit the element will carry from here on. The carrier is asked
        // for it below, once this unit's handlers are in place — it releases
        // the units the playhead has left behind as part of the same swap.
        loadedUnitIndexRef.current = index
      } else {
        setState((prev) => ({ ...prev, isBuffering: false, currentChunkIndex: index }))
        // Only the src-swap path has an offset to restore — see `resuming`. On
        // the MSE carrier the element's position is already the right one, and
        // writing 0 over it would rewind the whole timeline.
        if (offset > 0) element.currentTime = offset
      }

      /**
       * The shared early-return guard of all three handlers below, evaluated
       * ONCE so the log can be written before it is applied.
       *
       * Reading it into a boolean changes nothing about playback — `||` still
       * short-circuits and every ref is read at the same moment — but it is what
       * lets the entry go in ABOVE the guard and carry `suppressed`. Logged
       * below the guard instead, a suppressed event would leave no trace at all,
       * and on a device that is byte-for-byte identical to a page that never
       * resumed executing — the exact ambiguity this instrument exists to
       * remove.
       */
      const guardRejects = () =>
        !isPlayingRef.current ||
        generation !== requestGenerationRef.current ||
        signal.aborted

      element.onended = () => {
        const suppressed = guardRejects()
        logReaderEvent('unit-ended', detailFor(index), { suppressed })
        if (suppressed) return
        // A unit that played all the way through is the only real proof the
        // pipeline is healthy, so THAT is what clears the failure streak.
        // Synthesis merely resolving is not proof: an element `error` means the
        // bytes were unusable, and resetting the streak on those would let a
        // systemic decode failure skip every unit in the article without ever
        // reaching MAX_CONSECUTIVE_CHUNK_FAILURES.
        consecutiveFailuresRef.current = 0
        completedCharsRef.current += charCountsRef.current[index] || 0
        void playChunk(index + 1, 0, generation, signal)
      }

      // The element could not use the media it was handed. With the Web Audio
      // carrier gone there is nothing to retry on, so this is a unit failure of
      // exactly the same kind as a synthesis failure.
      element.onerror = () => {
        const suppressed = guardRejects()
        logReaderEvent('element-error', detailFor(index), { suppressed })
        if (suppressed) return
        detachUnitHandlers()
        const mediaError = element.error
        failUnit(
          index,
          new Error(
            `[TTS] Media element failed on unit ${index}` +
              (mediaError?.message ? `: ${mediaError.message}` : '')
          )
        )
      }

      // A refused start is the one thing that must never be swallowed: there is
      // no second output path, so silence with `isPlaying` left true is the only
      // other outcome. (The gesture-unlock poke in play() is a separate call and
      // swallows its own, expected, rejection.)
      //
      // It reads the same whether the carrier started the element (a new unit)
      // or this call did (a mid-unit resume, where re-seeking would reassign the
      // source and rewind), so both go through one reporter.
      const reportStart = (startedIndex: number, started: Promise<void> | undefined) => {
        void started?.catch?.((error: unknown) => {
          const suppressed = guardRejects()
          logReaderEvent('play-rejected', detailFor(startedIndex, describeError(error)), {
            suppressed,
          })
          if (suppressed) return
          console.warn(`[TTS] Element refused to play unit ${startedIndex}:`, error)
          stopWithError(error as Error)
        })
      }
      reportStartRef.current = reportStart

      logReaderEvent('play-called', detailFor(index))
      if (carrier.kind === 'mse') {
        // One continuous timeline, so a unit is a POSITION and this call has at
        // most two things to do — and on a natural advance, neither.
        //
        // The element is re-pointed only when the playhead is not already
        // inside this unit (a session start, or a "play from here" jump), and
        // it is STARTED only when it is not already running. Every `src`
        // assignment and every `play()` is a boundary at which a backgrounded
        // phone can revoke the page's media status, and having none of them per
        // unit is the whole reason this carrier exists.
        if (!resuming) {
          carrier.seekToUnit(index)
          // The seek MOVED the playhead; nothing was read on the way. Re-seat
          // so the next tick does not report every span between the old
          // position and the new one as completed.
          getBoundaryTracker().reseat(element.currentTime)
        }
        if (element.paused) reportStart(index, element.play?.())
      } else if (resuming) {
        reportStart(index, element.play?.())
      } else {
        // THE unit swap: the carrier points the element at unit `index`,
        // releases what is behind the playhead, and starts it.
        carrier.seekToUnit(index)
      }

      // Only the smooth-bar clock needs starting here; `timeupdate` is already
      // wired to the element and starts emitting on its own once it plays.
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(runProgressFrame)
      }
    },
    [
      carrierHasUnit,
      detachUnitHandlers,
      fetchUnitAudio,
      fillBuffer,
      getAudioElement,
      getBoundaryTracker,
      getCarrier,
      invalidatePendingRequests,
      onComplete,
      onError,
      prepareUnit,
      rebuildCarrier,
      runProgressFrame,
    ]
  )

  /**
   * THE unit advance on the MSE carrier.
   *
   * One continuous timeline has no `ended` at a seam, so "unit N has been read"
   * can only be observed by the playhead crossing out of N's span. `timeupdate`
   * is the clock to observe it on — it is driven by the media pipeline, which a
   * backgrounded page keeps running long after rAF and timers are throttled —
   * and the boundary tracker turns a tick into completions, several at once
   * when a throttled page skipped ticks entirely.
   *
   * The bookkeeping is the same `onended` does on the src-swap path. What comes
   * after it is not: `playChunk` is entered for the new unit with the element
   * ALREADY carrying it, so that call neither seeks nor starts anything — it
   * only re-points the handlers, refills the buffer and moves the state.
   */
  const advanceUnits = useCallback(() => {
    if (getCarrier().kind !== 'mse') return

    const element = audioElementRef.current
    const session = sessionRef.current
    // The same three-legged guard the element handlers apply, for the same
    // reason: a tick delivered after a pause or a superseded session must not
    // count a unit complete.
    if (!isPlayingRef.current || !element || session === null) return
    if (session.generation !== requestGenerationRef.current || session.signal.aborted) return

    const completed = getBoundaryTracker().advance(element.currentTime)
    if (completed.length === 0) return

    for (const finished of completed) {
      logReaderEvent('unit-ended', detailFor(finished))
      // A unit read all the way through is the only real proof the pipeline is
      // healthy — the same reason `onended` clears the streak on the other path.
      consecutiveFailuresRef.current = 0
      completedCharsRef.current += charCountsRef.current[finished] || 0
    }

    const next = completed[completed.length - 1] + 1
    // The element is already carrying it: the playhead walked in on its own.
    // Saying so here is what makes the `playChunk` below a resume rather than a
    // jump, and therefore what keeps the advance free of a seek.
    loadedUnitIndexRef.current = next
    void playChunk(next, 0, session.generation, session.signal)
  }, [getBoundaryTracker, getCarrier, playChunk])

  advanceUnitsRef.current = advanceUnits

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

    // FIRST, and before any await: this call may be running inside the user's
    // tap, and on WebKit that is the only moment the element can be unlocked.
    unlockElementForGesture(getAudioElement())

    ensureChunks()

    voiceRef.current = voice || null
    isPlayingRef.current = true
    lastEmittedPctRef.current = -1
    // A new play session starts with a clean failure streak: whatever went wrong
    // before was already surfaced (or skipped past), and a user pressing Play
    // again deserves the same tolerance as the first time.
    consecutiveFailuresRef.current = 0
    const generation = requestGenerationRef.current + 1
    requestGenerationRef.current = generation
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    const signal = abortController.signal
    // What the `timeupdate`-driven advance judges a crossing against; it has no
    // call chain of its own to carry them.
    sessionRef.current = { generation, signal }

    setState((prev) => ({ ...prev, isPlaying: true, isBuffering: true }))

    // Pre-buffer: fetch the first few chunks before starting playback
    const startIdx = currentChunkIndexRef.current
    const preBufferEnd = Math.min(startIdx + BUFFER_AHEAD, chunksRef.current.length)

    // Fetch first chunk (must have it to start playing)
    if (
      pauseOffsetRef.current === 0 &&
      !carrierHasUnit(startIdx) &&
      !bufferCacheRef.current.has(startIdx)
    ) {
      try {
        const data = await fetchUnitAudio(chunksRef.current[startIdx], signal)
        if (generation !== requestGenerationRef.current || signal.aborted) return
        await prepareUnit(startIdx, data)
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
        !carrierHasUnit(i) &&
        !bufferCacheRef.current.has(i) &&
        !fetchingRef.current.has(i)
      ) {
        fetchingRef.current.add(i)
        fetchUnitAudio(chunksRef.current[i], signal)
          .then((data) => {
            fetchingRef.current.delete(i)
            if (generation !== requestGenerationRef.current || signal.aborted) return
            return prepareUnit(i, data)
          })
          .catch(() => { fetchingRef.current.delete(i) })
      }
    }

    setState((prev) => ({ ...prev, isBuffering: false }))

    const offset = pauseOffsetRef.current
    pauseOffsetRef.current = 0
    void playChunk(startIdx, offset, generation, signal)
  }, [
    carrierHasUnit,
    ensureChunks,
    fetchUnitAudio,
    getAudioElement,
    invalidatePendingRequests,
    onError,
    playChunk,
    prepareUnit,
    unlockElementForGesture,
    voice,
  ])

  /**
   * End the current play session — with or without stopping the ELEMENT.
   *
   * `pause()` is this with the element paused, and that is the only form the
   * src-swap path ever uses. An interrupting skip on the MSE carrier is the
   * other form: one continuous timeline makes the jump a seek, and pausing
   * first would only force a second `play()` at the far end of it — the exact
   * boundary this carrier exists to remove.
   */
  const interrupt = useCallback(
    (pauseElement: boolean) => {
      isPlayingRef.current = false
      invalidatePendingRequests()
      sessionRef.current = null

      const element = audioElementRef.current
      if (element) {
        if (getCarrier().kind === 'mse') {
          // No offset, deliberately. On one continuous timeline the element
          // keeps its own `currentTime` across a pause, so `play()` resumes
          // exactly where it stopped; an offset could only be restored by a
          // seek, and a seek is the one thing a resume here must not do.
          pauseOffsetRef.current = 0
        } else {
          // The element keeps its currentTime across a pause; remember it anyway
          // so play() can seek back explicitly even if something else moved the
          // playhead in between. It has to: the next `src` assignment rewinds
          // the element to 0.
          const duration = element.duration
          const elapsed = Number.isFinite(element.currentTime) ? element.currentTime : 0
          pauseOffsetRef.current =
            Number.isFinite(duration) && duration > 0 ? Math.min(elapsed, duration) : elapsed
        }
        // Detach BEFORE pausing: an `ended` already queued for this unit would
        // otherwise still run and count the unit complete, inflating progress by
        // a whole unit's characters for the rest of the session. play()
        // re-attaches handlers for whichever unit it resumes.
        detachUnitHandlers()
        if (pauseElement) element.pause?.()
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      setState((prev) => ({ ...prev, isPlaying: false }))
    },
    [detachUnitHandlers, getCarrier, invalidatePendingRequests]
  )

  // Pause
  const pause = useCallback(() => {
    interrupt(true)
  }, [interrupt])

  /**
   * Interrupting skip ("play from here"): abort whatever is playing and start at
   * `unitIndex` of the current content. Progress is seeded from the units BEFORE
   * `unitIndex`, so it reflects the skipped audio instead of restarting at 0.
   */
  const playFromUnit = useCallback(
    async (unitIndex: number) => {
      // Aborts in-flight synthesis and ends the session. The mid-unit offset it
      // records belongs to the OLD unit, so it is dropped below.
      //
      // On the MSE carrier the element is deliberately left RUNNING: the jump
      // is a seek on one continuous timeline, and a pause here could only be
      // undone by a second `play()` at the other end of it.
      interrupt(getCarrier().kind !== 'mse')

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
    [ensureChunks, getCarrier, interrupt, play]
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

    detachUnitHandlers()
    const element = audioElementRef.current
    if (element) {
      // The audio below is about to die, so the element must not keep reading
      // it. Dropping the source is this path's own business — the carrier
      // leaves it alone, because completion rebuilds too and the finished unit
      // is still loaded there.
      element.removeAttribute('src')
    }
    rebuildCarrier()

    setState({
      isPlaying: false,
      isBuffering: false,
      progress: 0,
      currentTime: 0,
      totalEstimatedTime: 0,
      currentChunkIndex: 0,
      totalChunks: 0,
    })
  }, [detachUnitHandlers, pause, rebuildCarrier])

  // Exactly one <audio> element per hook instance, created on mount and torn
  // down (with every unit the carrier ever prepared) on unmount.
  useEffect(() => {
    const element = getAudioElement()
    const carrier = getCarrier()
    return () => {
      stop()
      detachUnitHandlers()
      element.pause?.()
      element.removeAttribute('src')
      element.remove()
      audioElementRef.current = null
      carrier.dispose()
    }
  }, [detachUnitHandlers, getAudioElement, getCarrier, stop])

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
