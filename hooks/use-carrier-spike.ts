'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { describeError, logReaderEvent } from '@/lib/reader/diagnostic-log'
import { createMseCarrier, isMseAudioSupported, type MseCarrier } from '@/lib/reader/mse-carrier'
import type { SeamReport } from '@/lib/reader/seam-report'
import { SPIKE_FRAGMENTS } from '@/lib/reader/spike-fragments'
import { synthesizeSpeech } from '@/lib/tts/client'

import { usePlaybackDiagnostics } from './use-playback-diagnostics'

/**
 * Drives one `<audio>` element through the three carrier modes the spike
 * compares.
 *
 * ## The property this hook exists to preserve
 *
 * In BOTH MSE modes, `element.play()` is called exactly once — on the user
 * gesture — and `element.src` is assigned exactly once, before the first
 * append. That is the entire hypothesis: the OS is believed to revoke the
 * page's media status at the moment the element is left holding no media, which
 * is what a `src` swap creates. So there is deliberately NO retry, NO second
 * `play()` after a stall, and NO re-assignment anywhere in this file. A
 * reasonable-looking nudge would destroy the experiment while appearing to
 * work, and would do it silently; the tests next door enforce the absence.
 *
 * ## How each mode loops
 *
 * The run repeats indefinitely, because the measurement is boundaries survived
 * over time. "Loop" means something different per mode, and in neither MSE mode
 * does it mean a new `MediaSource` — that would reintroduce the boundary the
 * mode exists to remove:
 *
 * - `src-swap` — fragment index wraps 7 → 0 and the element gets a new `src`
 *   and its own `play()`, exactly as the reader does today. This is the control
 *   and its boundary is the thing being measured.
 * - `mse-progressive` — the fragments are simply appended AGAIN, onto the same
 *   `SourceBuffer`, along one ever-growing timeline: 0..7, 0..7, 0..7. Nothing
 *   is recreated and nothing is seeked; playback walks straight through the
 *   repeat. The log names the fragment by index, so a second `append 0` is a
 *   real repeat.
 * - `mse-upfront` — the eight fragments are ALL appended before `play()`, and
 *   nothing may be appended afterwards, because "no appends while hidden" is
 *   precisely what this mode isolates from `mse-progressive`. Its loop is
 *   therefore a SEEK back to the start of the one buffer when playback reaches
 *   the end of it. No new source, no new `play()`, no new `src` — but also no
 *   new data, which is the honest limit of the mode: a ten-minute upfront run
 *   is the same 160 s of audio played back about four times.
 *
 * ## Buffer growth in `mse-progressive`
 *
 * Nothing is evicted. A ten-minute run appends roughly thirty ~20 s fragments;
 * if a browser's SourceBuffer quota is reached, `appendBuffer` throws
 * `QuotaExceededError`, which the carrier already turns into `append-failed`
 * and a stopped queue rather than silence. Eviction via `SourceBuffer.remove()`
 * belongs in the real carrier, sized from what this bench measures.
 */

/** The eight fragments are fixed Polish prose; the bench must not guess at the voice. */
const SPIKE_VOICE = 'pl-PL-MarekNeural'

const AUDIO_MIME_TYPE = 'audio/mpeg'

/**
 * Fragments kept buffered ahead of the one playing, in `mse-progressive`.
 *
 * Deliberately the same number as `useTTS`'s `BUFFER_AHEAD`: the point of the
 * progressive mode is to reproduce the reader's own runway, so a result about
 * this bench is a result about the reader.
 */
export const MSE_PLAY_RUNWAY = 3

/**
 * How close to the end of the buffer counts as "reached the end", for the
 * `mse-upfront` seek-back. `timeupdate` fires about four times a second, so a
 * quarter-second window is crossed by at least one sample; the audio is ~160 s
 * long, so it cannot fire early.
 */
const LOOP_SEEK_EPSILON_SECONDS = 0.25

/** Ceiling on how many fragments one `timeupdate` may append; see `topUp`. */
const MAX_APPENDS_PER_TICK = MSE_PLAY_RUNWAY

/** Give up on a fragment's duration probe rather than hanging the run. */
const DURATION_PROBE_TIMEOUT_MS = 10_000

export type SpikeMode = 'src-swap' | 'mse-upfront' | 'mse-progressive'

export interface CarrierSpike {
  mode: SpikeMode
  setMode(mode: SpikeMode): void
  isRunning: boolean
  /** Null until a run has appended something. */
  seam: SeamReport | null
  mseSupported: boolean
  /** Resolves once playback has been started; the run then continues on events. */
  start(): Promise<void>
  stop(): void
}

/** What has been appended so far, and where each append starts on the buffer's timeline. */
interface AppendState {
  /** Total appends, across repeats — NOT a fragment index. */
  count: number
  /** `starts[n]` is the timeline position of the nth append. */
  starts: number[]
  /** Sum of the appended durations. */
  total: number
}

const freshAppendState = (): AppendState => ({ count: 0, starts: [], total: 0 })

/** Index into `starts` of the append currently playing at `time`. */
const appendPlayingAt = (starts: readonly number[], time: number): number => {
  let playing = 0
  for (let index = 0; index < starts.length; index += 1) {
    if (starts[index] <= time) playing = index
  }
  return playing
}

export function useCarrierSpike(): CarrierSpike {
  const [mode, setModeState] = useState<SpikeMode>('src-swap')
  const [isRunning, setIsRunning] = useState(false)
  const [seam, setSeam] = useState<SeamReport | null>(null)
  const [mseSupported, setMseSupported] = useState(false)

  /**
   * The element is created ONCE, lazily, and never replaced: a lazy `useState`
   * initialiser runs on the first render and is never set again, so it costs no
   * re-render while still being visible to `usePlaybackDiagnostics`'s effect.
   * `null` on the server, where there is no `Audio`.
   */
  const [element] = useState<HTMLAudioElement | null>(() =>
    typeof Audio === 'undefined' ? null : new Audio(),
  )

  /**
   * Bumped by every `stop()` and every `start()`. Every async continuation
   * checks it before touching the element, so a run that was stopped mid-await
   * cannot append into, or play, the run that replaced it.
   */
  const runIdRef = useRef(0)
  const runningRef = useRef(false)
  const carrierRef = useRef<MseCarrier | null>(null)
  const appendsRef = useRef<AppendState>(freshAppendState())
  /** Bounds of the one buffer, for the `mse-upfront` seek-back. */
  const loopRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 })
  /** True while a top-up is in flight, so overlapping `timeupdate`s do not double-append. */
  const toppingUpRef = useRef(false)
  /** The `src-swap` fragment currently in the element. */
  const swapIndexRef = useRef(0)
  /** The object URL the element currently holds, in `src-swap`. */
  const swapUrlRef = useRef<string | null>(null)
  /** Detaches whatever listeners the current run attached. */
  const detachRef = useRef<(() => void) | null>(null)
  /** Synthesized MP3 per fragment, and its measured duration. */
  const dataRef = useRef(new Map<number, ArrayBuffer>())
  const durationRef = useRef(new Map<number, number>())

  usePlaybackDiagnostics(element)

  // Read on the client only: on the server `MediaSource` is absent and a lazy
  // initialiser would render `false` into the HTML and `true` after hydration.
  useEffect(() => {
    setMseSupported(isMseAudioSupported())
  }, [])

  const synthesize = useCallback(async (index: number): Promise<ArrayBuffer> => {
    const cached = dataRef.current.get(index)
    if (cached) return cached
    const data = await synthesizeSpeech(SPIKE_FRAGMENTS[index].text, { voice: SPIKE_VOICE })
    dataRef.current.set(index, data)
    return data
  }, [])

  /**
   * A fragment's real duration, read off the decoded media.
   *
   * There is no honest way to know how long an MP3 plays for without decoding
   * it: the byte length divided by a nominal bitrate would make the seam
   * report's `drift` measure our bitrate assumption instead of the encoder's
   * delay and padding, which is the whole point of the number. So a throwaway
   * element loads the same bytes and reports `duration` on `loadedmetadata`.
   *
   * The probe element is never played and never given a media session, so it
   * takes no part in the thing under test. It is a second element, though, and
   * in `mse-progressive` one is constructed while the run is playing; if a
   * device result ever looks like it turned on the probe, this is the line to
   * suspect.
   *
   * An unmeasurable fragment contributes 0 and says so, rather than inventing a
   * number: `expectedDuration` then under-counts and `drift` reads high, with a
   * `reader-error` in the same log explaining why.
   */
  const measureDuration = useCallback(async (index: number, data: ArrayBuffer): Promise<number> => {
    const cached = durationRef.current.get(index)
    if (cached !== undefined) return cached

    let measured = 0
    if (typeof Audio !== 'undefined' && typeof URL?.createObjectURL === 'function') {
      const url = URL.createObjectURL(new Blob([data], { type: AUDIO_MIME_TYPE }))
      const probe = new Audio()
      probe.preload = 'metadata'
      try {
        measured = await new Promise<number>((resolve) => {
          let done = false
          const finish = (value: number) => {
            if (done) return
            done = true
            clearTimeout(timer)
            probe.removeEventListener('loadedmetadata', onLoaded)
            probe.removeEventListener('error', onError)
            resolve(value)
          }
          const onLoaded = () => finish(probe.duration)
          const onError = () => finish(Number.NaN)
          const timer = setTimeout(() => finish(Number.NaN), DURATION_PROBE_TIMEOUT_MS)
          probe.addEventListener('loadedmetadata', onLoaded)
          probe.addEventListener('error', onError)
          probe.src = url
        })
      } finally {
        probe.src = ''
        URL.revokeObjectURL(url)
      }
    }

    if (!Number.isFinite(measured) || measured <= 0) {
      logReaderEvent('reader-error', `${index}: duration unmeasurable, counted as 0`)
      measured = 0
    }
    durationRef.current.set(index, measured)
    return measured
  }, [])

  const stop = useCallback(() => {
    runIdRef.current += 1
    runningRef.current = false

    detachRef.current?.()
    detachRef.current = null

    if (element) {
      element.pause()
      // `MseCarrier.dispose()` revokes the object URL but does NOT detach the
      // element, despite what its doc comment says. Clearing here — before the
      // carrier goes — is what stops the next run's load() from reaching for a
      // dangling blob: URL.
      element.src = ''
      element.load()
    }

    carrierRef.current?.dispose()
    carrierRef.current = null

    if (swapUrlRef.current) {
      URL.revokeObjectURL(swapUrlRef.current)
      swapUrlRef.current = null
    }

    appendsRef.current = freshAppendState()
    loopRef.current = { start: 0, end: 0 }
    toppingUpRef.current = false
    setIsRunning(false)
  }, [element])

  /** Appends the next fragment of the endless 0..7 sequence. False once the run is gone. */
  const appendNext = useCallback(
    async (runId: number, carrier: MseCarrier): Promise<boolean> => {
      const state = appendsRef.current
      const index = state.count % SPIKE_FRAGMENTS.length
      const data = await synthesize(index)
      if (runIdRef.current !== runId) return false
      const duration = await measureDuration(index, data)
      if (runIdRef.current !== runId) return false

      await carrier.append(index, data, duration)
      if (runIdRef.current !== runId) return false

      state.starts.push(state.total)
      state.total += duration
      state.count += 1
      return true
    },
    [measureDuration, synthesize],
  )

  /**
   * Keeps `MSE_PLAY_RUNWAY` fragments buffered ahead of the one playing.
   *
   * Driven by `timeupdate` rather than a timer on purpose: `timeupdate` comes
   * out of the media pipeline, which a backgrounded page still runs, while
   * `setInterval` is exactly what a hidden tab throttles — and a throttled
   * runway would confound the thing this mode measures.
   *
   * `MAX_APPENDS_PER_TICK` bounds one tick. It matters when every duration came
   * back unmeasurable: all the starts are then 0, the runway can never be
   * satisfied, and an unbounded loop would append the whole catalogue in one
   * tick.
   */
  const topUp = useCallback(
    (runId: number, carrier: MseCarrier, media: HTMLAudioElement) => {
      if (toppingUpRef.current) return
      toppingUpRef.current = true
      void (async () => {
        try {
          for (let appended = 0; appended < MAX_APPENDS_PER_TICK; appended += 1) {
            if (runIdRef.current !== runId) return
            const state = appendsRef.current
            const playing = appendPlayingAt(state.starts, media.currentTime)
            if (state.count - playing >= MSE_PLAY_RUNWAY) break
            if (!(await appendNext(runId, carrier))) return
          }
          if (runIdRef.current !== runId) return
          // The carrier's queue is empty here — every append above was awaited
          // and the next one is only queued by a later `timeupdate` — so the
          // source buffer is idle and `buffered` is the settled truth.
          setSeam(carrier.report())
        } finally {
          toppingUpRef.current = false
        }
      })()
    },
    [appendNext],
  )

  /** `src-swap`: one blob URL and one `play()` per fragment, as the reader does today. */
  const playSwapFragment = useCallback(
    async (runId: number, index: number, media: HTMLAudioElement) => {
      const data = await synthesize(index)
      if (runIdRef.current !== runId) return

      const url = URL.createObjectURL(new Blob([data], { type: AUDIO_MIME_TYPE }))
      const previous = swapUrlRef.current
      swapUrlRef.current = url
      swapIndexRef.current = index

      logReaderEvent('unit-start', String(index))
      media.src = url
      await media.play()
      logReaderEvent('play-called', String(index))

      // Revoked only after the swap, so the URL released is never the one the
      // element is reading.
      if (previous) URL.revokeObjectURL(previous)
    },
    [synthesize],
  )

  const startSrcSwap = useCallback(
    async (runId: number, media: HTMLAudioElement) => {
      const onEnded = () => {
        if (runIdRef.current !== runId) return
        logReaderEvent('unit-ended', String(swapIndexRef.current))
        const next = (swapIndexRef.current + 1) % SPIKE_FRAGMENTS.length
        void playSwapFragment(runId, next, media)
      }
      media.addEventListener('ended', onEnded)
      detachRef.current = () => media.removeEventListener('ended', onEnded)

      await playSwapFragment(runId, 0, media)
    },
    [playSwapFragment],
  )

  const startMse = useCallback(
    async (runId: number, media: HTMLAudioElement, selected: SpikeMode) => {
      const carrier = createMseCarrier()
      carrierRef.current = carrier
      appendsRef.current = freshAppendState()

      // The one and only assignment of this run. It comes first because
      // `sourceopen` — and therefore `addSourceBuffer` — only happens once the
      // MediaSource is attached to an element.
      media.src = carrier.src

      const upfront = selected === 'mse-upfront'
      const before = upfront ? SPIKE_FRAGMENTS.length : MSE_PLAY_RUNWAY
      for (let appended = 0; appended < before; appended += 1) {
        if (!(await appendNext(runId, carrier))) return
      }

      const report = carrier.report()
      setSeam(report)

      if (upfront) {
        const ranges = report.ranges
        loopRef.current =
          ranges.length > 0
            ? { start: ranges[0][0], end: ranges[ranges.length - 1][1] }
            : { start: 0, end: appendsRef.current.total }
      }

      const onTimeUpdate = () => {
        if (runIdRef.current !== runId) return
        if (upfront) {
          const { start, end } = loopRef.current
          if (end > start && media.currentTime >= end - LOOP_SEEK_EPSILON_SECONDS) {
            // A seek inside the SAME buffer: no new source, no new `src`, no
            // second `play()`.
            media.currentTime = start
            logReaderEvent('section-advance', 'loop: seek to buffer start')
          }
          return
        }
        topUp(runId, carrier, media)
      }
      media.addEventListener('timeupdate', onTimeUpdate)
      detachRef.current = () => media.removeEventListener('timeupdate', onTimeUpdate)

      await media.play()
      logReaderEvent('play-called', selected)
    },
    [appendNext, topUp],
  )

  const start = useCallback(async () => {
    if (runningRef.current) return
    if (!element) return

    logReaderEvent('spike-mode', mode)

    // Refused up front rather than partway: a mode that appends four fragments
    // and then discovers it cannot append is a worse result than no result.
    // `isMseAudioSupported()` is re-read here rather than trusting the state,
    // which is one render behind on the very first gesture.
    if (mode !== 'src-swap' && !isMseAudioSupported()) {
      logReaderEvent('reader-error', `${mode} refused: MediaSource cannot carry ${AUDIO_MIME_TYPE}`)
      return
    }

    const runId = runIdRef.current + 1
    runIdRef.current = runId
    runningRef.current = true
    setIsRunning(true)
    setSeam(null)
    swapIndexRef.current = 0

    try {
      if (mode === 'src-swap') await startSrcSwap(runId, element)
      else await startMse(runId, element, mode)
    } catch (error) {
      logReaderEvent('stop-with-error', `${mode}: ${describeError(error)}`)
      stop()
    }
  }, [element, mode, startMse, startSrcSwap, stop])

  /**
   * Switching carriers mid-run would leave the log describing a run that no
   * longer exists, so the running one is ended first. The MSE loops do NOT go
   * through here — they stay inside the one buffer.
   */
  const setMode = useCallback(
    (next: SpikeMode) => {
      if (runningRef.current) stop()
      setModeState(next)
    },
    [stop],
  )

  // Leaving the page must not leave an element playing or a MediaSource open.
  useEffect(() => () => stop(), [stop])

  return { mode, setMode, isRunning, seam, mseSupported, start, stop }
}
