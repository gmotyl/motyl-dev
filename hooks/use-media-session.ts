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
 * `navigator.mediaSession` is a global singleton, so only an active instance touches it:
 * an inactive instance writes nothing at all, and every write an active instance makes
 * is undone by that same instance's own cleanup.
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

  const title = metadata?.title ?? null
  const artist = metadata?.artist ?? null
  const album = metadata?.album ?? null

  // Owns the action handlers and nothing else. Keyed on `active` alone so the
  // four registrations survive re-renders; new handler identities reach the
  // browser through the ref.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return

    for (const action of ACTIONS) {
      setActionHandler(session, action, () => handlersRef.current[action]())
    }

    return () => {
      for (const action of ACTIONS) {
        setActionHandler(session, action, null)
      }
    }
  }, [active])

  // Owns the metadata. Clearing lives in this effect's cleanup so only the
  // instance that published metadata ever clears it.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return

    if (title !== null && typeof MediaMetadata !== 'undefined') {
      session.metadata = new MediaMetadata({
        title,
        artist: artist ?? '',
        album: album ?? '',
        artwork: [...MEDIA_SESSION_ARTWORK],
      })
    }

    return () => {
      session.metadata = null
    }
  }, [active, title, artist, album])

  // Owns playbackState, including resetting it on teardown.
  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return

    session.playbackState = playbackState

    return () => {
      session.playbackState = 'none'
    }
  }, [active, playbackState])
}
