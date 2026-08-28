'use client'

import { useEffect, useInsertionEffect, useRef } from 'react'

export interface MediaSessionMetadataInput {
  title: string
  artist: string
  album: string
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

const setActionHandler = (
  session: MediaSession,
  action: Action,
  handler: (() => void) | null,
) => {
  try {
    session.setActionHandler(action, handler)
  } catch {
    // Unsupported actions reject; the rest must still register.
  }
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

  // Owns the action handlers and nothing else. Keyed on `active` alone so the
  // four registrations survive re-renders; new handler identities reach the
  // browser through the ref.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    for (const action of ACTIONS) {
      setActionHandler(session, action, () => handlersRef.current[action]())
    }

    return () => {
      if (owner !== token) return
      for (const action of ACTIONS) {
        setActionHandler(session, action, null)
      }
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
      session.metadata = null
    }
  }, [active, token])

  // Owns playbackState, including resetting it on teardown.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return
    owner = token

    session.playbackState = playbackState

    return () => {
      if (owner !== token) return
      session.playbackState = 'none'
    }
  }, [active, playbackState, token])
}
