'use client'

import { useEffect } from 'react'

import type { ReaderLogEventType } from '@/lib/reader/diagnostic-log'
import { logReaderEvent } from '@/lib/reader/diagnostic-log'

/**
 * Default heartbeat period. Five seconds is short enough to place a stall
 * within one fragment and long enough not to become the noise it is measuring.
 */
const DEFAULT_HEARTBEAT_MS = 5000

/** Element events that currently produce no entry at all, and their log types. */
const ELEMENT_EVENTS: ReadonlyArray<readonly [string, ReaderLogEventType]> = [
  ['pause', 'media-pause'],
  ['stalled', 'media-stalled'],
  ['waiting', 'media-waiting'],
  ['suspend', 'media-suspend'],
]

/** The current `navigator.mediaSession.playbackState`, or null where there is none. */
function readPlaybackState(): string | null {
  if (typeof navigator === 'undefined') return null
  const session = (navigator as Navigator & { mediaSession?: MediaSession }).mediaSession
  if (!session) return null
  return session.playbackState ?? null
}

/**
 * Records the element's silent failures, the media-session state and a
 * proof-of-life heartbeat into the reader diagnostic log.
 *
 * These are the four blind spots the first device run exposed. A stall that
 * produces no entry is indistinguishable from a page that stopped running,
 * which is the exact ambiguity this instrument exists to remove: with the
 * heartbeat, silence in the log means the page died; without it, silence means
 * nothing at all.
 *
 * The hook holds no React state and never re-renders its host — it only writes
 * into the module-level buffer. It also does NOT check the enable flag: the
 * store returns early when the log is disabled, and a second gate here would
 * only be a second place to get wrong.
 *
 * ## How a `playbackState` transition is detected
 *
 * `playbackState` is a plain property with no change event, so it is POLLED —
 * on every interval tick, and additionally right after each element event
 * handled above (the moments a state change is most likely to accompany).
 *
 * What that can see: any transition that is still in effect at the next sample,
 * whoever caused it — the app's own writes and, crucially, a browser-side
 * teardown of the media session, which a property descriptor could not observe
 * at all. The interval runs whether or not the element is playing, so a session
 * revoked while paused is caught too.
 *
 * What it cannot see: the moment of the change — the resolution equals the
 * heartbeat interval, so a recorded transition happened at some point in the
 * preceding `heartbeatMs` — and any transition that reverts before the next
 * sample (e.g. `playing` → `paused` → `playing` inside one period) leaves no
 * trace whatsoever.
 */
export function usePlaybackDiagnostics(
  element: HTMLAudioElement | null,
  options?: { heartbeatMs?: number },
): void {
  const heartbeatMs = options?.heartbeatMs ?? DEFAULT_HEARTBEAT_MS

  useEffect(() => {
    // SSR / non-DOM environments, and a host that has no element yet.
    if (typeof document === 'undefined') return
    if (!element) return

    // Baseline taken at attach time, so the first recorded entry is a real
    // transition rather than a restatement of the state we started from.
    let lastState = readPlaybackState()

    const samplePlaybackState = () => {
      const state = readPlaybackState()
      if (state === lastState) return
      lastState = state
      logReaderEvent('mediasession-state', String(state))
    }

    const registrations = ELEMENT_EVENTS.map(([domEvent, logType]) => {
      const handler = () => {
        logReaderEvent(logType)
        samplePlaybackState()
      }
      element.addEventListener(domEvent, handler)
      return [domEvent, handler] as const
    })

    const timer = setInterval(() => {
      // Only a playing element is alive; a heartbeat while paused would report
      // proof of life the audio is not actually giving.
      if (!element.paused) {
        logReaderEvent('heartbeat', `currentTime=${element.currentTime.toFixed(3)}`)
      }
      samplePlaybackState()
    }, heartbeatMs)

    return () => {
      clearInterval(timer)
      for (const [domEvent, handler] of registrations) {
        element.removeEventListener(domEvent, handler)
      }
    }
  }, [element, heartbeatMs])
}
