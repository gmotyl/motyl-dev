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
import type { UnitSpan, UnitTimeline } from '@/lib/reader/unit-timeline'

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
  /**
   * Whether the content this render carries CONTINUES the timeline the carrier
   * already holds instead of starting a new one — i.e. whether the section that
   * just finished is handing off to this one.
   *
   * Only the MSE carrier has a timeline to extend, and only a handoff may
   * extend it. A new `MediaSource` is a `src` assignment, and a `src`
   * assignment is the moment a backgrounded phone revokes the page's media
   * exemption; per-unit boundaries are gone by construction on that carrier, so
   * a timeline rebuilt per SECTION would simply move the failure from every
   * ~18 s to every ~2 min — rarer and harder to reproduce, not safer.
   *
   * The reader therefore sets it ONLY where the section boundary is not a user
   * action: its own auto-advance. Play-from-here, stop, a voice change and a
   * queue re-seat after mark-as-read or DOM eviction all leave it false, and
   * every one of those is a tap taken with the screen on, where a boundary
   * costs nothing.
   *
   * It is read at ONE moment — the end of the commit in which the hook decided
   * to release the carrier (see `flushCarrierRelease`). That is what makes a
   * `setState` inside the caller's `onComplete` early enough to be seen: it
   * lands in the same batch as the hook's own completion state, so the release
   * reads this commit's answer rather than the previous render's.
   */
  continueTimeline?: boolean
  onComplete?: () => void
  onError?: (error: Error) => void
}

/**
 * Where the reader is inside the CURRENT SECTION, in the shape
 * `MediaSession.setPositionState` takes.
 *
 * Section-relative, because a track is a section: that is what the metadata
 * names and what `nexttrack` steps between. The element's own clock is not an
 * answer to this question on the MSE carrier — it runs for the whole reading
 * session — and neither is its `duration`, which is NaN there for as long as
 * nothing assigns `MediaSource.duration`.
 */
export interface MediaPositionSnapshot {
  /** Seconds into the current section. */
  position: number
  /** The current section's length as far as it has been appended. */
  duration: number
  playbackRate: number
}

/**
 * The position arithmetic, kept apart from the hook because a wrong answer here
 * is not a wrong number on a screen — it is a `TypeError` out of
 * `setPositionState`.
 *
 * That call throws on a duration that is negative or NaN, on a position outside
 * `[0, duration]` and on a rate of 0, so the two clamps below are the contract
 * rather than cosmetics:
 *
 *  - POSITION is clamped at 0. During a handoff the new section is current
 *    before its first unit has been appended, so its start is the buffer's end
 *    and the playhead is still a fraction behind it.
 *  - DURATION is never shorter than the position. `timeline.end()` is the last
 *    APPEND, while the playhead runs to the last decoded frame and on a stall
 *    sits past it.
 *
 * And nothing non-finite is answered at all: `element.currentTime` is NaN
 * before metadata, and an unmeasurable span would make the timeline's end
 * infinite. There is no safe number to substitute for either, so the caller is
 * told there is no answer.
 */
export function sectionRelativePosition(
  elapsedSeconds: number,
  sectionStart: number,
  timelineEnd: number,
  playbackRate: number
): MediaPositionSnapshot | null {
  if (
    !Number.isFinite(elapsedSeconds) ||
    !Number.isFinite(sectionStart) ||
    !Number.isFinite(timelineEnd)
  ) {
    return null
  }

  const position = Math.max(elapsedSeconds - sectionStart, 0)

  return {
    position,
    duration: Math.max(timelineEnd - sectionStart, position),
    // A paused reader keeps its rate — `playbackState` is what says paused —
    // so anything the API would reject falls back to the normal one rather
    // than to 0.
    playbackRate: Number.isFinite(playbackRate) && playbackRate > 0 ? playbackRate : 1,
  }
}

export interface TTSPlayback extends TTSState {
  play: () => Promise<void>
  /** Abort current audio and start at `unitIndex` of the current content. */
  playFromUnit: (unitIndex: number) => Promise<void>
  pause: () => void
  stop: () => void
  resume: () => Promise<void>
  readMediaPosition: () => MediaPositionSnapshot | null
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
 * A promise settled from outside — what a caller holds while its unit waits
 * its turn in the MSE carrier's append queue (see `appendCursorRef`). Settled
 * by the drain that appends the unit, or by the reset that gives it up.
 */
type Deferred = {
  promise: Promise<void>
  resolve: () => void
  reject: (error: unknown) => void
}
const createDeferred = (): Deferred => {
  let resolve!: () => void
  let reject!: (error: unknown) => void
  const promise = new Promise<void>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

// How close to the end of the appended media counts as the playhead having
// reached it — the MSE path's replacement for the exactness of `ended`.
//
// A `MediaSource` that has not been told `endOfStream()` never fires `ended`,
// and it deliberately is not told: a section handoff extends the SAME timeline
// with more appends, and an ended MediaSource accepts none. So the element
// simply runs out of media and stalls, and the last position it reports is the
// last decoded frame's — a frame short of the buffer's end rather than exactly
// on it (an MP3 frame is ~26 ms). Requiring equality would leave every article
// hanging a frame from its end forever.
//
// A tenth of a second is several frames longer than that shortfall and orders
// of magnitude shorter than any real unit, so nothing but a playhead that has
// actually consumed the last unit can be inside it.
//
// THE TRADE-OFF, accepted knowingly: a final unit shorter than the tolerance is
// booked complete without having been heard. The loss is bounded at the
// tolerance itself — 0.1 s of audio for the whole article, once, at its very
// end — because the window only ever opens against the LAST unit on the
// timeline. Tightening it would buy that tenth of a second back at the price of
// hanging every article whose decodable media ends a frame short of the
// buffer's own end, which is the failure this constant exists to remove.
const END_OF_CONTENT_TOLERANCE_SECONDS = 0.1

export function useTTS(content: string, options: UseTTSOptions = {}) {
  const { voice, units, continueTimeline, onProgress, onComplete, onError } = options

  // Latest units, read inside play() without adding array-identity churn to its
  // deps (the caller passes a fresh array per render).
  const unitsRef = useRef<string[] | undefined>(units)
  unitsRef.current = units
  // The caller's handoff declaration, read from outside a render — see the
  // option's own comment for why it is read at exactly one moment.
  const continueTimelineRef = useRef(false)
  continueTimelineRef.current = continueTimeline === true

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
  /**
   * What this hook's unit 0 is called on the CARRIER's timeline.
   *
   * A timeline that survives a section handoff outlives the chunk list that
   * started it, and both sections number their units from 0 — so the carrier
   * would be handed unit 0 twice. It keys its appends by index and deduplicates
   * them, and `UnitTimeline.startOf` answers with the FIRST span carrying an
   * index, so the collision is not a near miss: the new section's audio would
   * be dropped on the floor and every seek to it would land in the old
   * section's media. Worse, `reachedEndOfContent` would find every unit of the
   * new section "already on the timeline" with the playhead sitting at its end,
   * and complete the article the instant the handoff began.
   *
   * So carrier indices are ABSOLUTE across a continued timeline and this is
   * where the two numberings meet. It is 0 for every timeline that starts
   * fresh, which is every timeline the src-swap carrier ever has and every one
   * the MSE carrier has outside a handoff — so with no handoff in sight nothing
   * in this file changes meaning.
   */
  const unitIndexBaseRef = useRef(0)
  /** The first carrier index no section has claimed yet. */
  const nextUnitIndexRef = useRef(0)
  /**
   * Whether the carrier currently holds a timeline this hook has appended to.
   *
   * It is the `continueTimeline` the CARRIER is told (see `prepareUnit`), which
   * is a different question from the option of the same name: that one is the
   * caller's declaration about the next section, this one is the hook's own
   * record of what the carrier is holding right now.
   */
  const timelineLiveRef = useRef(false)
  const toCarrierIndex = useCallback(
    (index: number): number => index + unitIndexBaseRef.current,
    []
  )
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
    (index: number): boolean =>
      getCarrier().timeline().startOf(toCarrierIndex(index)) !== null,
    [getCarrier, toCarrierIndex]
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
      // It also translates between the two numberings (see `unitIndexBaseRef`),
      // which is what keeps the boundary tracker, the progress emitter and the
      // end-of-content question written in the hook's OWN unit indices across a
      // continued timeline. A span belonging to a previous section translates to
      // a negative index — never the current unit, which is exactly what those
      // three already treat as "not mine, do not measure".
      const local = (span: UnitSpan | null): UnitSpan | null =>
        span === null ? null : { ...span, index: span.index - unitIndexBaseRef.current }

      liveTimelineRef.current = {
        push: (index, duration) =>
          local(getCarrier().timeline().push(toCarrierIndex(index), duration)) as UnitSpan,
        unitAt: (time) => local(getCarrier().timeline().unitAt(time)),
        startOf: (index) => getCarrier().timeline().startOf(toCarrierIndex(index)),
        end: () => getCarrier().timeline().end(),
        dropBefore: (time) => getCarrier().timeline().dropBefore(time),
        oldest: () => local(getCarrier().timeline().oldest()),
      }
    }
    return liveTimelineRef.current
  }, [getCarrier, toCarrierIndex])

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
   * `continueTimeline` says whether a timeline is already LIVE. It used to be
   * hardcoded true, which left the hook with no way to say "start one" at all —
   * every restart leaned on `rebuild()` having already opened an empty source,
   * so the flag described nothing. Now the first append after a release starts
   * the timeline and every append after it extends the same one, which is the
   * carrier's own gate on when a `MediaSource` may be created. An append that
   * extends across a section boundary is not a special case here: it is simply
   * an append onto a timeline nobody released.
   */
  const appendNow = useCallback(
    async (index: number, data: ArrayBuffer): Promise<void> => {
      await getCarrier().appendUnits(
        [{ index: toCarrierIndex(index), data, duration: 0 }],
        { continueTimeline: timelineLiveRef.current }
      )
      timelineLiveRef.current = true
      // The carrier owns the audio now; holding the bytes too would double the
      // retained audio for the whole buffered window.
      bufferCacheRef.current.delete(index)
    },
    [getCarrier, toCarrierIndex]
  )

  /**
   * The next index the MSE carrier is waiting to be handed.
   *
   * On that carrier APPEND ORDER IS AUDIO ORDER: the MPEG byte stream's
   * timestamps continue from wherever the previous append ended and
   * `timestampOffset` stays 0, so whatever the buffer receives second is heard
   * second — whichever unit it is. Synthesis resolves in whatever order the
   * bytes come back, and the Read All News device log showed exactly that:
   * paragraph 3 appended before paragraph 2, and read before it. So a resolved
   * unit waits in `bufferCacheRef` until every index below it has been dealt
   * with, and this cursor is where the wait is measured from. The src-swap
   * carrier keys units by index and never reads it.
   *
   * The cursor waits only for a unit that is still ON ITS WAY. A unit whose
   * synthesis or append failed is not, and it is skipped (see
   * `abandonPendingAppend`) rather than waited for: with the playhead parked
   * at the end of the buffer no crossing could ever reach `playChunk`, which
   * is the only thing that retries a unit — so waiting would have parked the
   * whole rest of the article behind a unit nothing was fetching. The retry
   * lands where it lands; a unit heard out of place is the price of a unit
   * that failed once, not of every unit that follows it.
   */
  const appendCursorRef = useRef(0)
  /** Indices the cursor walks over without waiting: their unit is not coming. */
  const skippedAppendsRef = useRef<Set<number>>(new Set())
  /** Whoever is waiting for a queued unit's own append to settle, by index. */
  const appendWaitersRef = useRef<Map<number, Deferred>>(new Map())
  const drainingRef = useRef(false)

  /**
   * Append, in index order, every queued unit the cursor has reached.
   *
   * One drain at a time: a loop that is mid-append picks up whatever lands in
   * the cache meanwhile on its next pass, and a second loop would race it for
   * the same index. The cursor is re-read on every pass because a seek moves it
   * underneath a running append; an append that finishes after the move must
   * not advance it from where the seek put it.
   */
  const drainAppendQueue = useCallback(async (): Promise<void> => {
    if (drainingRef.current) return
    drainingRef.current = true
    try {
      for (;;) {
        const index = appendCursorRef.current
        // Nothing to wait for: the carrier holds it already (a resume walks
        // the cursor back over the units the session appended before the
        // pause), or its unit is not coming.
        if (carrierHasUnit(index) || skippedAppendsRef.current.delete(index)) {
          appendCursorRef.current = index + 1
          continue
        }

        const data = bufferCacheRef.current.get(index)
        if (data === undefined) return

        const waiter = appendWaitersRef.current.get(index)
        try {
          await appendNow(index, data)
        } catch (error) {
          // The buffer refused it. Whoever queued it is told — a `playChunk`
          // counts the failure, a prefetch only warns — and every one of them
          // gives the unit up through `abandonPendingAppend`, which is what
          // moves the cursor on and drains again. Not here: the cursor has one
          // rule for a unit that is not coming, not one per way of failing.
          bufferCacheRef.current.delete(index)
          appendWaitersRef.current.delete(index)
          waiter?.reject(error)
          return
        }
        appendWaitersRef.current.delete(index)
        if (appendCursorRef.current === index) appendCursorRef.current = index + 1
        waiter?.resolve()
      }
    } finally {
      drainingRef.current = false
    }
  }, [appendNow, carrierHasUnit])

  /**
   * Stop waiting for `index`: its synthesis or append failed, so nothing is
   * bringing it. The units queued behind it are drained at once.
   */
  const abandonPendingAppend = useCallback(
    (index: number) => {
      if (getCarrier().kind !== 'mse') return
      skippedAppendsRef.current.add(index)
      void drainAppendQueue()
    },
    [drainAppendQueue, getCarrier]
  )

  /**
   * Forget every queued unit and start the cursor over at 0 — the session is
   * over and nothing it fetched may outlive it. Whoever was waiting for an
   * append is told it was abandoned, with the same `AbortError` an interrupted
   * synthesis produces, so every catch in this file treats it the same way.
   */
  const resetAppendQueue = useCallback(() => {
    appendCursorRef.current = 0
    skippedAppendsRef.current.clear()
    bufferCacheRef.current.clear()
    const waiters = Array.from(appendWaitersRef.current.values())
    appendWaitersRef.current.clear()
    for (const waiter of waiters) waiter.reject(new DOMException('Aborted', 'AbortError'))
  }, [])

  const prepareUnit = useCallback(
    (index: number, data: ArrayBuffer): Promise<void> => {
      // The src-swap carrier keys its units by index: order is irrelevant there
      // and a unit goes straight in, as it always has.
      if (getCarrier().kind !== 'mse') return appendNow(index, data)

      // Below the cursor every index has been dealt with, so this is a retry of
      // a unit the session already walked over (or one the carrier evicted).
      // Nothing is queued behind it and it goes in where it lands.
      if (index < appendCursorRef.current) return appendNow(index, data)

      // A retry of a unit that was given up on: it IS coming after all.
      skippedAppendsRef.current.delete(index)
      bufferCacheRef.current.set(index, data)
      let waiter = appendWaitersRef.current.get(index)
      if (waiter === undefined) {
        waiter = createDeferred()
        appendWaitersRef.current.set(index, waiter)
      }
      void drainAppendQueue()
      return waiter.promise
    },
    [appendNow, drainAppendQueue, getCarrier]
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
    // Nothing is on the timeline now, so the next append STARTS one rather than
    // extending it — and a section that arrives afterwards numbers its units
    // from the carrier's own 0 again.
    timelineLiveRef.current = false
    // Nor is anything queued for it: a unit held back for the timeline that
    // just died belongs to the session that died with it.
    resetAppendQueue()
    // The timeline the tracker was seated on is gone with it. A seat carried
    // across the rebuild would compare a dead span's index against a fresh
    // one — same index, different timeline — and swallow the first unit's
    // completion of the next session. The fresh timeline is empty, so this
    // leaves the tracker unseated and the first tick re-seats it.
    getBoundaryTracker().reseat(0)
  }, [getBoundaryTracker, getCarrier, resetAppendQueue])

  /**
   * A release the hook has decided on but has not carried out yet.
   *
   * `clearSource` is `stop()`'s extra: it drops the element's source as well,
   * which completion deliberately does not (the finished unit is still loaded
   * there with handlers this hook has not detached).
   */
  const pendingReleaseRef = useRef<{ clearSource: boolean } | null>(null)

  /**
   * Decide to drop everything the carrier holds — at the END of this commit.
   *
   * The delay is the whole mechanism, and it is a ONE-COMMIT delay, not a
   * timer. Completion and `stop()` both happen while the caller's `onComplete`
   * is still on the stack, which is BEFORE the caller can tell us whether the
   * section that just ended is handing off to another one: that answer is a
   * `setState` in the caller, and it lands in the same batch as this hook's own
   * completion state. So the decision is taken now and the ACT is taken once
   * that batch has committed, when `continueTimeline` is this commit's answer
   * rather than the previous render's.
   *
   * Nothing may append in between — `flushCarrierRelease` is called at the top
   * of `ensureChunks`, so a start that follows a release synchronously (the
   * queue re-seat does exactly that: `stop()` then `play()` in one block) still
   * rebuilds before the first unit lands.
   */
  const releaseCarrier = useCallback((clearSource: boolean) => {
    pendingReleaseRef.current = {
      clearSource: clearSource || pendingReleaseRef.current?.clearSource === true,
    }
  }, [])

  /**
   * Carry out a pending release, unless the caller has claimed the timeline.
   *
   * The carrier kind is part of the question, not a shortcut. A unit on the
   * src-swap carrier IS a file and there is no timeline to extend, so a handoff
   * there is exactly what it always was and skipping the release would leave a
   * Read All News run holding every section's object URLs for the life of the
   * page. `continueTimeline` changes nothing on that carrier, which is a
   * property of this function rather than of the flag.
   */
  const flushCarrierRelease = useCallback(() => {
    const pending = pendingReleaseRef.current
    if (pending === null) return
    pendingReleaseRef.current = null

    if (continueTimelineRef.current && getCarrier().kind === 'mse') return

    // Ordered as `stop()` used to order it: the audio under the element is
    // about to die, so the element must stop reading it first.
    if (pending.clearSource) audioElementRef.current?.removeAttribute('src')
    rebuildCarrier()
  }, [getCarrier, rebuildCarrier])

  // The backstop, and the only path a release has when nothing plays next: a
  // finished article must not keep its audio alive waiting for a start that
  // never comes. No dependency array on purpose — it is a ref check, and the
  // commit that matters is whichever one carries the caller's answer.
  useEffect(() => {
    flushCarrierRelease()
  })

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
              // The unit is not coming; the ones queued behind it must not
              // wait for it. `playChunk` retries it in its turn and counts a
              // second failure there.
              abandonPendingAppend(i)
            }
          })
      }
    },
    [abandonPendingAppend, carrierHasUnit, fetchUnitAudio, prepareUnit]
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
        resetAppendQueue()
        fetchingRef.current.clear()
        // The last unit is consumed: nothing may outlive the article — unless
        // the caller's `onComplete`, which has just run, is handing this
        // timeline to the next section. That answer arrives with this commit,
        // so the release is decided here and taken there.
        releaseCarrier(false)
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
        // Nor may it strand the units queued behind it on the MSE carrier: the
        // next unit's append is what the cursor was waiting on this one for.
        abandonPendingAppend(failedIndex)
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

      // A unit's completion, on the carrier that HAS one per unit.
      //
      // There is no `ended` at a seam inside one MSE buffer — `advanceUnits`
      // reads the crossing off the clock instead — so on that carrier this
      // handler is not merely unreachable, it is a SECOND counter for the same
      // event. An `ended` that did arrive there (a truncated append, a source
      // ended by a future caller) would add the unit's characters on top of the
      // crossing's and issue a duplicate `playChunk` for the next unit; today
      // only the progress span-guard hides it. So the MSE path detaches the
      // handler rather than resting on it never firing.
      element.onended =
        carrier.kind === 'mse'
          ? null
          : () => {
              const suppressed = guardRejects()
              logReaderEvent('unit-ended', detailFor(index), { suppressed })
              if (suppressed) return
              // A unit that played all the way through is the only real proof
              // the pipeline is healthy, so THAT is what clears the failure
              // streak. Synthesis merely resolving is not proof: an element
              // `error` means the bytes were unusable, and resetting the streak
              // on those would let a systemic decode failure skip every unit in
              // the article without ever reaching
              // MAX_CONSECUTIVE_CHUNK_FAILURES.
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
          carrier.seekToUnit(toCarrierIndex(index))
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
        carrier.seekToUnit(toCarrierIndex(index))
      }

      // Only the smooth-bar clock needs starting here; `timeupdate` is already
      // wired to the element and starts emitting on its own once it plays.
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(runProgressFrame)
      }
    },
    [
      abandonPendingAppend,
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
      releaseCarrier,
      resetAppendQueue,
      runProgressFrame,
      toCarrierIndex,
    ]
  )

  /**
   * Whether the playhead has read the article out — the MSE path's replacement
   * for the `ended` the src-swap path gets from the element.
   *
   * There is no `ended` here and there deliberately will not be one:
   * `endOfStream()` would close the `MediaSource`, and a section handoff
   * extends the SAME timeline with more appends, which an ended source refuses.
   * The end of the CONTENT is therefore a question only the hook can answer,
   * because only the hook knows whether more units are coming. It asks two
   * independent ones:
   *
   * 1. IS EVERY UNIT STILL AHEAD OF ME ON THE TIMELINE? Not "is the timeline
   *    finished" — it never is, it only stops growing for a while. So the
   *    question is asked about the CHUNK LIST instead: every index from the one
   *    being read through the last one must have media. That is what separates
   *    the article ending from the ordinary mid-article stall where the
   *    pipeline outran the appender and the playhead is parked at the buffer's
   *    end waiting for the next unit to synthesise. It is asked over a RANGE,
   *    not just about the last index, because prefetch is parallel and resolves
   *    in whatever order the bytes come back: the buffer can hold the final
   *    unit while an earlier one is still in flight, and finishing there would
   *    drop a unit nobody read. The range starts at the current unit rather
   *    than at 0 so that a retention trim, which evicts only media far behind
   *    the playhead, cannot make a finished article look unfinished.
   *
   * 2. HAS THE PLAYHEAD CONSUMED EVERYTHING APPENDED? `end()` is the buffer's
   *    own absolute end (the spans telescope onto it and a retention trim
   *    cannot rewind it), so this is a fact about the playhead, not a claim
   *    that nothing more will ever be appended.
   *
   * That is what makes it race-free and what makes it compose with a timeline
   * that keeps growing. Mid-article the first question is false while units are
   * still arriving; across a section handoff the chunk list is replaced, the
   * new section's units are not on the timeline yet, and `end()` starts moving
   * again — so the answer goes back to false on its own without anything here
   * assuming the timeline ever stops.
   *
   * The loop is bounded in practice as well as in principle: it only runs at a
   * buffer stall, and the buffer never holds more than `BUFFER_AHEAD` units
   * beyond the one being read, so either the last index is within a few of the
   * current one or the very first lookup answers null.
   */
  const reachedEndOfContent = useCallback(
    (currentTime: number): boolean => {
      const lastIndex = chunksRef.current.length - 1
      if (lastIndex < 0) return false

      const timeline = getLiveTimeline()
      for (let index = currentChunkIndexRef.current; index <= lastIndex; index += 1) {
        if (timeline.startOf(index) === null) return false
      }

      return currentTime >= timeline.end() - END_OF_CONTENT_TOLERANCE_SECONDS
    },
    [getLiveTimeline]
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
    if (element === null) return

    const session = sessionRef.current
    // The same guard the element handlers apply, leg for leg, and for the same
    // reason: a tick delivered after a pause or a superseded session must not
    // count a unit complete. The window is real rather than theoretical —
    // `playFromUnit` calls `interrupt()` and deliberately leaves the element
    // RUNNING, so ticks keep arriving until the next session is seated.
    //
    // The fifth leg is `emitProgress`'s, for the identical reason: only the
    // unit the element is ACTUALLY loaded with may be measured, and only its
    // boundaries may be counted. The four session legs do NOT cover that case.
    // `playFromUnit` ends the session, seeds `completedChars` from the units
    // before its target, clears `loadedUnitIndex` and then starts a NEW,
    // perfectly valid session — which sits in `playChunk`'s synthesis `await`
    // with the element still running at the OLD position and the boundary
    // tracker still seated on the old unit. Every session leg passes there, so
    // a crossing in that window is booked against the new session: its unit's
    // characters are added on top of the seed and counted twice for the rest of
    // the article, and `playChunk` is entered for a unit nobody asked for.
    // `playChunk` closes the window itself — it sets `loadedUnitIndex` and
    // reseats the tracker in the same synchronous block as the seek — so this
    // leg is exactly "the element is not yet where the hook is".
    //
    // Read into a boolean, like `playChunk`'s own entry guard, so the log can
    // be written before the guard is applied.
    const suppressed =
      !isPlayingRef.current ||
      session === null ||
      session.generation !== requestGenerationRef.current ||
      session.signal.aborted ||
      loadedUnitIndexRef.current !== currentChunkIndexRef.current

    if (suppressed) {
      // Recorded ABOVE the guard's effect, matching every other entry in this
      // file: a crossing dropped here is otherwise byte-for-byte identical, in
      // the log, to a page that never resumed executing — the exact ambiguity
      // the instrument was built to remove.
      //
      // The tracker is deliberately NOT consulted: `advance` moves the seat,
      // and consuming the very crossing the guard is refusing would lose it for
      // the session that resumes. The timeline is peeked at instead — a
      // read-only question — so the entry is written on the ticks that WOULD
      // have reported something and on no others.
      //
      // BOTH things this tick would have done, not just the crossing: past the
      // last append `unitAt` answers null, which is the END of the article —
      // the one moment the instrument most needs to see, because a reader that
      // stops there is indistinguishable in the log from a page that never
      // resumed executing unless the suppressed tick leaves a trace of its own.
      // `reachedEndOfContent` is read-only too, so asking it here consumes
      // nothing either.
      const span = getLiveTimeline().unitAt(element.currentTime)
      const wouldHaveReported =
        (span !== null && span.index !== currentChunkIndexRef.current) ||
        reachedEndOfContent(element.currentTime)
      if (wouldHaveReported) {
        logReaderEvent('unit-ended', detailFor(currentChunkIndexRef.current), {
          suppressed: true,
        })
      }
      return
    }

    const completed = getBoundaryTracker().advance(element.currentTime)

    if (completed.length > 0) {
      for (const finished of completed) {
        logReaderEvent('unit-ended', detailFor(finished), { suppressed: false })
        // A unit read all the way through is the only real proof the pipeline
        // is healthy — the same reason `onended` clears the streak on the other
        // path.
        consecutiveFailuresRef.current = 0
        completedCharsRef.current += charCountsRef.current[finished] || 0
      }

      // The LAST completion, not the first. The tracker returns several indices
      // precisely because a hidden page skips ticks, so one tick can land whole
      // units later — and entering `playChunk` for a unit the playhead has
      // already left would make that call a "resume" of a span nothing is
      // reading, with the progress span-guard then suppressing every emission
      // for the rest of the article.
      const next = completed[completed.length - 1] + 1
      // The element is already carrying it: the playhead walked in on its own.
      // Saying so here is what makes the `playChunk` below a resume rather than
      // a jump, and therefore what keeps the advance free of a seek.
      loadedUnitIndexRef.current = next
      void playChunk(next, 0, session.generation, session.signal)
      // NO return: a tick that crossed a boundary can ALSO be the tick that ran
      // out of article. "Crossed" and "reached the end" are not exclusive — a
      // crossing puts the playhead strictly before `end()`, but the question
      // below is whether it is within END_OF_CONTENT_TOLERANCE_SECONDS of it,
      // and a tick landing in the FINAL unit's last tenth of a second answers
      // both yes. Returning here left that tick booking its crossings and
      // nothing else, so the article hung with `isPlaying` true a fraction of a
      // second from its end — and it needs the tick that enters the last unit
      // to be the last tick the element delivers, which is exactly the skipped
      // tick this whole path exists to survive, and is near-certain when the
      // final unit is shorter than the gap between ticks.
    }

    // Either the playhead is still inside the unit it was in, or it has run off
    // the end of everything appended, or the crossing above landed it in the
    // last unit's final moments.
    if (!reachedEndOfContent(element.currentTime)) return

    // The tail the tracker will never report: `unitAt` past the final append
    // returns null and the seat is KEPT, so the pipeline outrunning the
    // appender mid-article is not mistaken for a completion — which also means
    // the last unit's own crossing never arrives. It is booked here instead,
    // exactly as `onended` books it on the other path. Everything from the
    // current unit to the last, not just the last: the same throttled page that
    // makes a crossing several units wide can skip the whole tail of an article
    // in one tick, and `reachedEndOfContent` has already established that every
    // one of them had media.
    //
    // `currentChunkIndexRef` is the right lower bound on BOTH ways in, and on
    // the fall-through it is already the unit after the last crossing: nothing
    // in `playChunk` awaits before `currentChunkIndexRef.current = index`, so
    // that assignment has run by the time the synchronous `void` call above
    // returns. The units the crossing booked are therefore strictly below this
    // bound and cannot be booked a second time here. (Were the crossing's
    // `next` already past the last unit, `playChunk` completed the article on
    // the spot — and its rebuild empties the timeline, so `reachedEndOfContent`
    // answered false above and this loop was never reached at all.)
    for (
      let finished = currentChunkIndexRef.current;
      finished < chunksRef.current.length;
      finished += 1
    ) {
      logReaderEvent('unit-ended', detailFor(finished), { suppressed: false })
      completedCharsRef.current += charCountsRef.current[finished] || 0
    }
    consecutiveFailuresRef.current = 0

    // The one entry into the completion branch on this carrier. It runs
    // synchronously — no `await` precedes it — so `isPlaying` is already false
    // and the generation already bumped by the time this tick returns, and the
    // guard above rejects every later tick. The rebuild it performs empties the
    // timeline too, so `reachedEndOfContent` cannot answer true a second time
    // either.
    void playChunk(chunksRef.current.length, 0, session.generation, session.signal)
  }, [getBoundaryTracker, getCarrier, getLiveTimeline, playChunk, reachedEndOfContent])

  advanceUnitsRef.current = advanceUnits

  // Initialize chunks on first play or after completion reset. Prefer pre-split
  // speech units (title → TLDR → body) when the caller supplies them; otherwise
  // fall back to length-based chunking of the raw content. No-op once
  // initialized — `stop()` clears the list.
  const ensureChunks = useCallback(() => {
    // Before anything is appended, never after: the queue re-seat path calls
    // `stop()` and `play()` in one synchronous block, so a release still owed
    // has to be settled here or the first unit of the new section would land on
    // the timeline the rebuild is about to throw away.
    flushCarrierRelease()

    if (chunksRef.current.length > 0) return

    // A section numbers its units from 0; the CARRIER numbers them from
    // wherever the timeline it is continuing left off. Continuing needs both
    // halves to be true: the caller has to have declared the handoff AND a
    // timeline has to have survived it — after a release there is nothing to
    // extend and the numbering starts over with the buffer.
    const continuing = continueTimelineRef.current && timelineLiveRef.current
    unitIndexBaseRef.current = continuing ? nextUnitIndexRef.current : 0

    const providedUnits = unitsRef.current
    chunksRef.current =
      providedUnits && providedUnits.length > 0
        ? providedUnits
        : splitIntoChunks(content)
    nextUnitIndexRef.current = unitIndexBaseRef.current + chunksRef.current.length
    charCountsRef.current = chunksRef.current.map((c) => c.length)
    totalCharsRef.current = charCountsRef.current.reduce((a, b) => a + b, 0)

    const estimatedSeconds = totalCharsRef.current / 15
    setState((prev) => ({
      ...prev,
      totalChunks: chunksRef.current.length,
      totalEstimatedTime: estimatedSeconds,
    }))
  }, [content, flushCarrierRelease])

  /**
   * Where the OS should be told the reader is — section-relative, or nothing.
   *
   * Only the MSE carrier needs this. There, a section is a stretch of one
   * continuous timeline that survives handoffs, so the element's clock says
   * "41 minutes" on a track the OS was just told is new, against a duration of
   * NaN; a car head unit forwards that over AVRCP and fragile implementations
   * wedge on it. The src-swap carrier is left exactly as it was: one unit per
   * `src`, so the element already describes the media it is playing and Chrome
   * derives a coherent position from it on its own.
   *
   * `startOf(0)` is this section's first unit in the hook's own numbering,
   * which `getLiveTimeline` translates to the carrier's absolute one — so this
   * is the section start whatever the timeline was continued from. It is null
   * for the moment between a handoff and the new section's first append, and
   * `end()` is where that append will land, which is where the section starts.
   * The playhead is still a hair behind it, so that window publishes a track
   * at 0 s of 0 s rather than the previous section's minutes.
   *
   * Null means "no track to be in": the src-swap carrier, an element that does
   * not exist yet, or a timeline the reader has released (stop, teardown) —
   * the last of which is what clears a stale position off the lock screen.
   */
  const readMediaPosition = useCallback((): MediaPositionSnapshot | null => {
    const element = audioElementRef.current
    if (element === null) return null
    if (getCarrier().kind !== 'mse') return null
    // Nothing has been appended to this timeline, or it has been released: an
    // empty timeline maps no media, and "0 s of 0 s" on a track nothing is
    // playing is a scrubber that lies.
    if (!timelineLiveRef.current) return null

    const timeline = getLiveTimeline()
    const sectionStart = timeline.startOf(0) ?? timeline.end()

    return sectionRelativePosition(
      element.currentTime,
      sectionStart,
      timeline.end(),
      element.playbackRate
    )
  }, [getCarrier, getLiveTimeline])

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
    // The timeline is read on from here, so this is where the MSE carrier's
    // append cursor waits from: a seek must not wait for the units it skipped,
    // a fresh section must not wait for the previous one's count, and a resume
    // simply walks back over what the carrier already holds. Every unit gets
    // its retry with the new session, so nothing stays given up on either.
    appendCursorRef.current = startIdx
    skippedAppendsRef.current.clear()

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
          .catch((err) => {
            fetchingRef.current.delete(i)
            // As in `fillBuffer`: the unit is not coming, so the ones queued
            // behind it are not to wait for it.
            if ((err as Error).name !== 'AbortError') abandonPendingAppend(i)
          })
      }
    }

    setState((prev) => ({ ...prev, isBuffering: false }))

    const offset = pauseOffsetRef.current
    pauseOffsetRef.current = 0
    void playChunk(startIdx, offset, generation, signal)
  }, [
    abandonPendingAppend,
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
    resetAppendQueue()
    fetchingRef.current.clear()
    lastEmittedPctRef.current = -1
    consecutiveFailuresRef.current = 0

    detachUnitHandlers()
    // The audio is about to die and the element must not keep reading it, so
    // this path drops the source as well — the carrier leaves it alone, because
    // completion releases too and the finished unit is still loaded there.
    //
    // Both happen at the end of this commit rather than here, and for one
    // reason: the reader reaches `stop()` from inside its own `onComplete`, on
    // its way to the next section, and that single call is the one that may not
    // tear the timeline down. Every other caller — the Stop button, a
    // play-from-here jump, a queue re-seat — has its answer committed by then
    // too, and gets the rebuild it always got.
    releaseCarrier(true)

    setState({
      isPlaying: false,
      isBuffering: false,
      progress: 0,
      currentTime: 0,
      totalEstimatedTime: 0,
      currentChunkIndex: 0,
      totalChunks: 0,
    })
  }, [detachUnitHandlers, pause, releaseCarrier, resetAppendQueue])

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
    readMediaPosition,
  }

  return playback
}

export default useTTS
