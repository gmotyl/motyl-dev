'use client'

import { useEffect, useRef } from 'react'

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
 * `navigator.mediaSession` is a global singleton, so only an active instance touches it.
 */
export function useMediaSession({
  active,
  metadata,
  playbackState,
  handlers,
}: UseMediaSessionOptions): void {
  // Registered callbacks read through the ref so the browser always calls the
  // latest closure without re-registering four action handlers every render.
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  const title = metadata?.title ?? null
  const artist = metadata?.artist ?? null
  const album = metadata?.album ?? null

  useEffect(() => {
    const session = getMediaSession()
    if (!session) return

    if (!active) return

    for (const action of ACTIONS) {
      setActionHandler(session, action, () => handlersRef.current[action]())
    }

    return () => {
      for (const action of ACTIONS) {
        setActionHandler(session, action, null)
      }
      session.playbackState = 'none'
    }
  }, [active])

  useEffect(() => {
    const session = getMediaSession()
    if (!session) return

    if (!active || title === null || typeof MediaMetadata === 'undefined') {
      session.metadata = null
      return
    }

    session.metadata = new MediaMetadata({
      title,
      artist: artist ?? '',
      album: album ?? '',
      artwork: [...MEDIA_SESSION_ARTWORK],
    })
  }, [active, title, artist, album])

  useEffect(() => {
    const session = getMediaSession()
    if (!session || !active) return

    session.playbackState = playbackState
  }, [active, playbackState])
}
