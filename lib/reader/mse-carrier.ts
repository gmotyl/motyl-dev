/**
 * A MediaSource carrier for the audio spike: one element, one `src`, many
 * appends.
 *
 * The reader's current carrier swaps `element.src` per fragment, and the
 * moment between two sources is when a backgrounded phone revokes the audio
 * exemption. MSE removes that moment — the element holds ONE object URL for
 * the whole run and every later fragment arrives as an append.
 *
 * Two properties this module exists to guarantee:
 *
 * 1. APPENDS ARE SERIALISED. `appendBuffer` throws `InvalidStateError` if it is
 *    called while `sourceBuffer.updating` is true. In progressive mode appends
 *    land while audio plays, so overlap is the normal case, not an edge case.
 *    Every append goes through one queue that waits for `updateend`.
 *
 * 2. NOTHING FAILS SILENTLY. The bug this whole spike chases was silence with
 *    `isPlaying` still true — an error that reached a handler and vanished. A
 *    refused append here rejects its promise AND lands in the diagnostic log
 *    AND stops the queue, because once a buffer has refused data its contents
 *    are no longer known and appending more would produce audio nobody can
 *    reason about.
 */

import { describeError, detailFor, logReaderEvent } from '@/lib/reader/diagnostic-log'
import { buildSeamReport, type SeamReport } from '@/lib/reader/seam-report'

/**
 * The fragments are MP3 — the same bytes `synthesizeSpeech` already hands the
 * element today. The codec string stays bare (no `codecs=` parameter) because
 * `audio/mpeg` admits no codec variants.
 */
const MSE_AUDIO_MIME_TYPE = 'audio/mpeg'

export interface MseCarrier {
  /** Object URL to assign to the element's src, once. */
  readonly src: string
  /** Queues an append; resolves when the buffer has accepted it. */
  append(index: number, data: ArrayBuffer, duration: number): Promise<void>
  /** Seam report over everything appended so far. */
  report(): SeamReport
  /**
   * Revokes the object URL, rejects every queued append, and — if the source is
   * open and idle — calls `endOfStream()`.
   *
   * It does NOT detach the carrier from the element: nothing here touches the
   * element, which this module never sees. The caller must clear `element.src`
   * itself once the URL is revoked (Task 5's `stop()` already does).
   */
  dispose(): void
}

/**
 * A stand-in for `sourceBuffer.buffered` before a source buffer exists.
 *
 * `report()` is callable at any time — the spike page renders the verdict
 * continuously — and before `sourceopen` there is nothing to read. Throwing on
 * indexed access keeps it honest: it behaves like a real empty `TimeRanges`
 * rather than quietly answering 0 for `start(0)`.
 */
const EMPTY_TIME_RANGES = {
  length: 0,
  start: (index: number) => {
    throw new DOMException(`Index ${index} is out of range`, 'IndexSizeError')
  },
  end: (index: number) => {
    throw new DOMException(`Index ${index} is out of range`, 'IndexSizeError')
  },
} as TimeRanges

/**
 * Whether this browser can carry our MP3 fragments through MediaSource.
 *
 * Returns false rather than throwing on every failure mode, including
 * `MediaSource` being absent entirely (older iOS Safari on the phone, and jsdom
 * in tests) — the caller's job is to pick a carrier, not to handle an exception.
 */
export function isMseAudioSupported(): boolean {
  try {
    if (typeof MediaSource === 'undefined' || MediaSource === null) return false
    if (typeof MediaSource.isTypeSupported !== 'function') return false
    return MediaSource.isTypeSupported(MSE_AUDIO_MIME_TYPE)
  } catch {
    return false
  }
}

interface QueuedAppend {
  index: number
  data: ArrayBuffer
  duration: number
  resolve: () => void
  reject: (error: unknown) => void
}

/** A pending `updateend`, with a way to stop listening if the append never began. */
interface UpdateWatch {
  promise: Promise<void>
  cancel: () => void
}

/**
 * Creates the MediaSource and its object URL.
 *
 * Assumes `isMseAudioSupported()` — the caller chooses the carrier, and
 * constructing a `MediaSource` where there is none would throw here.
 */
export function createMseCarrier(): MseCarrier {
  const mediaSource = new MediaSource()
  const src = URL.createObjectURL(mediaSource)

  /** Durations of the fragments that were actually ACCEPTED, for the seam report. */
  const durations: number[] = []
  const queue: QueuedAppend[] = []

  let sourceBuffer: SourceBuffer | null = null
  let draining = false
  let disposed = false
  /**
   * Set once by the first failure, and never cleared. Its presence is what
   * stops the queue: every later append is refused with the same cause rather
   * than landing in a buffer whose state is no longer known.
   */
  let failure: { error: unknown } | null = null

  let resolveOpen!: (buffer: SourceBuffer) => void
  let rejectOpen!: (error: unknown) => void
  /**
   * `addSourceBuffer` is only legal once `readyState === 'open'`, which happens
   * on `sourceopen` — and that only fires after the object URL is attached to
   * an element. The spike's client calls `createMseCarrier()` and `append()` in
   * quick succession, so appends requested before that are QUEUED here and
   * flushed when the source opens. Nothing is dropped and nothing races: the
   * drain loop awaits this promise before it touches a buffer.
   */
  const opened = new Promise<SourceBuffer>((resolve, reject) => {
    resolveOpen = resolve
    rejectOpen = reject
  })
  // Nobody may ever await `opened` (a carrier created and disposed without an
  // append), and an unobserved rejection must not surface as a global error.
  void opened.catch(() => {})

  const handleSourceOpen = () => {
    try {
      const buffer = mediaSource.addSourceBuffer(MSE_AUDIO_MIME_TYPE)
      /**
       * `timestampOffset` is DELIBERATELY left at its default of 0.
       *
       * Consecutive independently-encoded MP3s drift: each carries its own
       * encoder delay and padding, so the buffered duration will not match the
       * sum of the fragments' own durations. Correcting that here would be
       * correcting the very thing this bench was built to measure — the seam
       * report would then quantify our arithmetic instead of the encoder's
       * behaviour, and a contiguous buffer would prove nothing about whether
       * MP3 fragments actually fuse.
       *
       * So the drift is left in and `report()` quantifies it. If the seam
       * report shows gapped ranges, the correction belongs in the REAL carrier
       * (a separate change), sized from the drift this bench measured.
       */
      sourceBuffer = buffer
      resolveOpen(buffer)
    } catch (error) {
      // A refused source buffer fails every queued append, through the same
      // path as a refused append: rejected, logged, queue stopped.
      rejectOpen(error)
    }
  }
  mediaSource.addEventListener('sourceopen', handleSourceOpen, { once: true })

  /**
   * Resolves on `updateend`, rejects on the buffer's `error` event.
   *
   * Listeners are attached BEFORE `appendBuffer` is called, so a synchronous
   * implementation cannot slip the event past us; `cancel()` detaches them
   * again when the append threw and no event will ever come.
   */
  const watchUpdate = (buffer: SourceBuffer): UpdateWatch => {
    let settled = false
    let finish: () => void = () => {}

    const promise = new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        settled = true
        buffer.removeEventListener('updateend', onUpdateEnd)
        buffer.removeEventListener('error', onError)
      }
      const onUpdateEnd = () => {
        if (settled) return
        cleanup()
        resolve()
      }
      const onError = () => {
        if (settled) return
        cleanup()
        const error = new Error('SourceBuffer reported an error while appending')
        error.name = 'SourceBufferError'
        reject(error)
      }
      finish = () => {
        if (settled) return
        cleanup()
        resolve()
      }
      buffer.addEventListener('updateend', onUpdateEnd)
      buffer.addEventListener('error', onError)
    })

    return { promise, cancel: () => finish() }
  }

  /** Waits out an update already in flight before the next `appendBuffer`. */
  const whenIdle = (buffer: SourceBuffer): Promise<void> =>
    buffer.updating ? watchUpdate(buffer).promise : Promise.resolve()

  /**
   * The single consumer. One job at a time, start to `updateend`, so
   * `appendBuffer` is never called while the buffer is updating.
   */
  async function drain(): Promise<void> {
    if (draining) return
    draining = true
    try {
      while (queue.length > 0) {
        const job = queue[0]

        if (failure !== null) {
          queue.shift()
          // The fragment never reached the buffer — say so, naming the cause,
          // rather than letting it disappear between a rejection and a log.
          logReaderEvent(
            'append-failed',
            detailFor(job.index, `skipped after ${describeError(failure.error)}`),
          )
          job.reject(failure.error)
          continue
        }

        try {
          const buffer = await opened
          await whenIdle(buffer)

          // `dispose()` may have landed while we waited; re-check before touching
          // a buffer the caller has finished with.
          if (failure !== null) continue

          const watch = watchUpdate(buffer)
          try {
            buffer.appendBuffer(job.data)
          } catch (error) {
            watch.cancel()
            throw error
          }
          await watch.promise

          queue.shift()
          durations.push(job.duration)
          logReaderEvent('append', detailFor(job.index, `${job.data.byteLength} bytes`))
          job.resolve()
        } catch (error) {
          queue.shift()
          failure ??= { error }
          logReaderEvent('append-failed', detailFor(job.index, describeError(error)))
          job.reject(error)
        }
      }
    } finally {
      draining = false
    }
  }

  const append = (index: number, data: ArrayBuffer, duration: number): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      queue.push({ index, data, duration, resolve, reject })
      void drain()
    })

  const report = (): SeamReport =>
    buildSeamReport(sourceBuffer?.buffered ?? EMPTY_TIME_RANGES, durations)

  const dispose = (): void => {
    if (disposed) return
    disposed = true

    const reason = new Error('MSE carrier disposed')
    reason.name = 'CarrierDisposedError'
    failure ??= { error: reason }

    mediaSource.removeEventListener('sourceopen', handleSourceOpen)
    // If the source never opened, a queued append would otherwise wait on
    // `opened` forever — the silent hang this module refuses to ship.
    rejectOpen(reason)

    try {
      if (mediaSource.readyState === 'open' && sourceBuffer?.updating !== true) {
        // Tell the element no more data is coming; without it a hidden element
        // sits in `waiting` indefinitely.
        mediaSource.endOfStream()
      }
    } catch {
      // endOfStream is best effort: a buffer mid-update or an already-ended
      // source throws, and neither is worth propagating out of dispose().
    }

    try {
      URL.revokeObjectURL(src)
    } catch {
      // Revoking twice, or in an environment without object URLs, must not
      // prevent the rest of the teardown.
    }

    // Flush anything still queued so no caller is left holding a promise that
    // will never settle.
    void drain()
  }

  return { src, append, report, dispose }
}
