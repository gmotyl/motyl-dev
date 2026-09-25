'use client'

import { useEffect, useInsertionEffect, useRef } from 'react'

import { logReaderEvent } from '@/lib/reader/diagnostic-log'

export interface MediaSessionMetadataInput {
  title: string
  artist: string
  album: string
}

/**
 * A position state as the Media Session API takes it: seconds into the current
 * TRACK, the track's length, and the rate it is being played at. What counts as
 * a track is the caller's business, as with `metadata`.
 */
export interface MediaSessionPosition {
  position: number
  duration: number
  playbackRate: number
}

export interface MediaSessionHandlers {
  play: () => void
  pause: () => void
  nexttrack: () => void
  previoustrack: () => void
}

export interface UseMediaSessionOptions {
  /** When false the hook registers nothing and releases anything it registered. */
  active: boolean
  metadata: MediaSessionMetadataInput | null
  playbackState: 'playing' | 'paused' | 'none'
  /**
   * Where the caller is inside the current track, ASKED FOR once per commit —
   * a function rather than a value because the answer is read off a live
   * media element, and it has to be read after the rest of the commit has
   * settled rather than during the render that will cause it. Answering null
   * means "no track to be in", which clears the position state. Pass null for a
   * caller that publishes no position at all — it reads as the same state, and
   * clears the same way.
   */
  readPosition: (() => MediaSessionPosition | null) | null
  handlers: MediaSessionHandlers
}

/** Artwork is fixed, taken from the PWA manifest. */
export const MEDIA_SESSION_ARTWORK: ReadonlyArray<{ src: string; sizes: string; type: string }> = [
  { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
  { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
]

const ACTIONS = ['play', 'pause', 'nexttrack', 'previoustrack'] as const

type Action = (typeof ACTIONS)[number]

/**
 * How often a position write with an UNCHANGED duration leaves a log line.
 *
 * The log is a 200-entry ring and the position is published at ~4 Hz while
 * playing, so one line per write would evict the session's start in under a
 * minute and one per second inside three. Five seconds is the heartbeat's
 * period, so the two read as one cadence. The clear, and any write whose
 * duration changed, are logged whatever the clock says: those are the writes
 * a fragile head unit can choke on, and the ones a car log has to show last.
 */
const POSITION_LOG_INTERVAL_MS = 5000

/** Titles and artists are logged clipped: the line is read on a phone. */
const DETAIL_CLIP = 60
const clip = (value: string): string =>
  value.length > DETAIL_CLIP ? `${value.slice(0, DETAIL_CLIP - 1)}…` : value

const describePosition = (state: MediaSessionPosition): string =>
  `position=${state.position.toFixed(3)} duration=${state.duration.toFixed(3)} rate=${state.playbackRate}`

/**
 * Identity of the instance that wrote to the global last. Several instances of a
 * reader can be mounted at once, so ownership can move between them across commits;
 * a former owner tearing down later must not undo the current owner's writes.
 */
let owner: object | null = null

/** The API is absent on older browsers and in jsdom; every access has to be guarded. */
const getMediaSession = (): MediaSession | null => {
  if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return null
  return navigator.mediaSession ?? null
}

/**
 * Whether a state can be handed to `setPositionState` at all.
 *
 * It throws a `TypeError` on a negative or NaN duration, on a position outside
 * `[0, duration]` and on a rate of 0 — and a throw out of the media session is
 * worse than publishing nothing, because the only thing it can break is the
 * playback it was meant to describe. So every field is checked here and a state
 * that fails is simply not published; the previous one stays standing, which is
 * a moment stale rather than wrong.
 *
 * The rate is held to more than the API asks: the spec rejects only 0, and a
 * negative rate is legal there (reverse playback). Every caller in this app
 * already normalises its rate to a positive one, so a negative one arriving
 * here means the reader is confused — and a confused rate handed to a car head
 * unit over AVRCP is the class of input this hook exists not to send.
 */
const isPublishablePosition = (
  position: number,
  duration: number,
  playbackRate: number
): boolean =>
  Number.isFinite(duration) &&
  duration >= 0 &&
  Number.isFinite(position) &&
  position >= 0 &&
  position <= duration &&
  Number.isFinite(playbackRate) &&
  playbackRate > 0

/**
 * `setPositionState` exists only on newer browsers, so every call is
 * feature-detected — and wrapped anyway: Chromium validates the state on its
 * own side and a version that disagrees with the checks above must cost a
 * position report, never the reading session.
 */
const writePositionState = (session: MediaSession, state?: MediaSessionPosition): void => {
  if (typeof session.setPositionState !== 'function') return
  try {
    if (state === undefined) session.setPositionState()
    else session.setPositionState(state)
  } catch {
    // A media-session failure must never break playback.
  }
}

/** Whether the browser took the registration — the log names only those it did. */
const setActionHandler = (
  session: MediaSession,
  action: Action,
  handler: (() => void) | null,
): boolean => {
  try {
    session.setActionHandler(action, handler)
    return true
  } catch {
    // Unsupported actions reject; the rest must still register.
    return false
  }
}

/** Registers (or clears) every action and returns the ones the browser accepted. */
const setActionHandlers = (
  session: MediaSession,
  handlerFor: (action: Action) => (() => void) | null,
): Action[] => {
  const accepted: Action[] = []
  for (const action of ACTIONS) {
    if (setActionHandler(session, action, handlerFor(action))) accepted.push(action)
  }
  return accepted
}

/**
 * Thin wrapper over the Media Session API. Knows nothing about what is being read.
 * `navigator.mediaSession` is a global singleton, so only an active instance touches
 * it: an inactive instance writes nothing at all, an active instance claims ownership
 * on every write, and a cleanup only releases what its own instance still owns.
 */
export function useMediaSession({
  active,
  metadata,
  playbackState,
  readPosition,
  handlers,
}: UseMediaSessionOptions): void {
  // Registered callbacks read through the ref so the browser always calls the
  // latest closure without re-registering four action handlers every render.
  // Written in an insertion effect rather than during render: a render that
  // concurrent React discards must not publish its handlers.
  const handlersRef = useRef(handlers)
  useInsertionEffect(() => {
    handlersRef.current = handlers
  })

  // Stable per-instance identity used as the ownership token for the global.
  const token = useRef({}).current

  const title = metadata?.title ?? null
  const artist = metadata?.artist ?? null
  const album = metadata?.album ?? null

  // Asked for through the ref, like the action handlers: the publisher below
  // runs once per commit and must reach the latest reader without being
  // re-keyed on a function identity that changes every render.
  const readPositionRef = useRef(readPosition)
  useInsertionEffect(() => {
    readPositionRef.current = readPosition
  })

  /**
   * The last state actually written, so an unchanged position costs nothing.
   *
   * `undefined` is "nothing written yet" and `null` is "written as cleared" —
   * they are different, because the clear must happen once and only once.
   * Chromium forwards every call to the browser process, and the publisher
   * below is the most frequent writer this hook has.
   */
  const publishedRef = useRef<MediaSessionPosition | null | undefined>(undefined)

  /** When, and at what duration, the last position line was logged (see the throttle). */
  const lastPositionLogRef = useRef<{ at: number; duration: number } | null>(null)

  // The instance's claim on the session, as the log sees it: one line when it
  // takes the global and one when it lets go, so every write below can be
  // read against the instance that made it. First, so the claim precedes the
  // writes it explains. Through the same guard as the writes: a former owner
  // letting go of a session it no longer holds is not an event.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token
    logReaderEvent('mediasession-active', 'on')

    return () => {
      if (owner !== token) return
      logReaderEvent('mediasession-active', 'off')
    }
  }, [active, token])

  // Owns the action handlers and nothing else. Keyed on `active` alone so the
  // four registrations survive re-renders; new handler identities reach the
  // browser through the ref.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    const registered = setActionHandlers(session, (action) => () => handlersRef.current[action]())
    logReaderEvent('mediasession-handlers', `set ${registered.join(',')}`)

    return () => {
      if (owner !== token) return
      const cleared = setActionHandlers(session, () => null)
      logReaderEvent('mediasession-handlers', `clear ${cleared.join(',')}`)
    }
  }, [active, token])

  // Publishes metadata. Keyed on the primitives and deliberately without a cleanup:
  // a section change must produce a single write, never `null` then the new value —
  // Chromium forwards each setter call to the browser process and `metadata = null`
  // collapses the Android media notification.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    // Without the constructor there is nothing to publish and nothing to clear.
    if (typeof MediaMetadata === 'undefined') return
    owner = token

    // Logged ABOVE the write, like every write here: if the write is the one
    // the head unit dies on, the line that names it has to be in the log.
    logReaderEvent(
      'mediasession-metadata',
      title !== null ? `title="${clip(title)}" artist="${clip(artist ?? '')}"` : 'cleared'
    )
    session.metadata =
      title !== null
        ? new MediaMetadata({
            title,
            artist: artist ?? '',
            album: album ?? '',
            artwork: [...MEDIA_SESSION_ARTWORK],
          })
        : null
  }, [active, title, artist, album, token])

  // Releases metadata on deactivate/unmount only, so publishing never churns null.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    return () => {
      if (owner !== token) return
      logReaderEvent('mediasession-metadata', 'cleared (release)')
      session.metadata = null
    }
  }, [active, token])

  // Owns playbackState, including resetting it on teardown.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    logReaderEvent('mediasession-playbackstate', playbackState)
    session.playbackState = playbackState

    return () => {
      if (owner !== token) return
      logReaderEvent('mediasession-playbackstate', 'none (release)')
      session.playbackState = 'none'
    }
  }, [active, playbackState, token])

  /**
   * Publishes the position state, through the same ownership guard as
   * everything else here — `navigator.mediaSession` is a singleton and this
   * hook is the only place in the app that writes to it.
   *
   * WITHOUT A DEPENDENCY ARRAY, deliberately. The position is read from a live
   * media element, so there is no value to key on: this has to ask once per
   * commit, and it has to ask AFTER the commit rather than during the render,
   * because a reader that released its timeline in an effect of its own has
   * only done so by the time effects run. (Reading it in the render that
   * ordered the release published the position of a timeline that no longer
   * existed — a stopped reader left its section sitting on the lock screen.)
   *
   * Also without a cleanup, for the reason the metadata effect has none:
   * clearing between two updates would blink the scrubber that a car and a lock
   * screen both render. Release is the next effect's job.
   */
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    // A caller with no reader at all and a reader answering null are the same
    // state — nobody is maintaining a position any more — so they go down the
    // same branch below. Keeping them apart would let a caller that drops its
    // reader leave the position it last published standing.
    const read = readPositionRef.current
    let next: MediaSessionPosition | null = null
    if (read !== null) {
      try {
        next = read()
      } catch {
        // The reader is asked once per commit off a live media element; one
        // that throws costs a position report, never the reading session. The
        // last good state stays standing, as a rejected one does.
        return
      }
    }

    // No position: the caller holds no track to be in — stopped, released, or
    // on a carrier whose element already describes itself. Clear, so a finished
    // section does not leave its position standing.
    if (next === null) {
      const published = publishedRef.current
      // Nothing of ours is standing, so there is nothing to take back:
      // `undefined` is "never published" — the first commit of a reader that
      // starts with nothing, and every commit after a release resets it — and
      // `null` is "already cleared". Only a position that actually reached the
      // browser is worth the call, which is IPC that ends up as AVRCP traffic
      // to the head unit this hook is trying to keep calm.
      if (published === undefined || published === null) return
      publishedRef.current = null
      lastPositionLogRef.current = null
      logReaderEvent('mediasession-position', 'clear')
      writePositionState(session)
      return
    }

    // A state the API would reject leaves the last good one standing: a moment
    // stale beats a `TypeError` thrown at the reader that published it.
    if (!isPublishablePosition(next.position, next.duration, next.playbackRate)) return

    const published = publishedRef.current
    if (
      published != null &&
      published.position === next.position &&
      published.duration === next.duration &&
      published.playbackRate === next.playbackRate
    ) {
      return
    }

    publishedRef.current = next
    // The throttle is a number compare, so a write that logs nothing costs
    // nothing; the line is only built for the one that does.
    const now = Date.now()
    const last = lastPositionLogRef.current
    if (
      last === null ||
      last.duration !== next.duration ||
      now - last.at >= POSITION_LOG_INTERVAL_MS
    ) {
      lastPositionLogRef.current = { at: now, duration: next.duration }
      logReaderEvent('mediasession-position', describePosition(next))
    }
    writePositionState(session, next)
  })

  // Releases the position state on deactivate/unmount only, so publishing never
  // churns a clear in between.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    return () => {
      publishedRef.current = undefined
      lastPositionLogRef.current = null
      if (owner !== token) return
      logReaderEvent('mediasession-position', 'clear (release)')
      writePositionState(session)
    }
  }, [active, token])
}
