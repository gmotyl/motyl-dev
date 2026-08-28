import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  MEDIA_SESSION_ARTWORK,
  useMediaSession,
  type MediaSessionHandlers,
  type UseMediaSessionOptions,
} from './use-media-session'

type ActionHandler = (() => void) | null

interface MediaSessionStub {
  metadata: unknown
  playbackState: string
  setActionHandler: (action: string, handler: ActionHandler) => void
}

let mediaSession: MediaSessionStub
let actionHandlers: Map<string, ActionHandler>

class MediaMetadataStub {
  title: string
  artist: string
  album: string
  artwork: unknown

  constructor(init: { title?: string; artist?: string; album?: string; artwork?: unknown }) {
    this.title = init.title ?? ''
    this.artist = init.artist ?? ''
    this.album = init.album ?? ''
    this.artwork = init.artwork ?? []
  }
}

const installMediaSession = () => {
  actionHandlers = new Map()
  mediaSession = {
    metadata: null,
    playbackState: 'none',
    setActionHandler: vi.fn((action: string, handler: ActionHandler) => {
      actionHandlers.set(action, handler)
    }),
  }

  Object.defineProperty(navigator, 'mediaSession', {
    value: mediaSession,
    configurable: true,
    writable: true,
  })
  vi.stubGlobal('MediaMetadata', MediaMetadataStub)
}

const removeMediaSession = () => {
  delete (navigator as unknown as Record<string, unknown>).mediaSession
  vi.unstubAllGlobals()
}

const fireAction = (action: string) => {
  const handler = actionHandlers.get(action)
  expect(handler).toBeTypeOf('function')
  handler?.()
}

const makeHandlers = (): MediaSessionHandlers => ({
  play: vi.fn(),
  pause: vi.fn(),
  nexttrack: vi.fn(),
  previoustrack: vi.fn(),
})

const baseOptions = (overrides: Partial<UseMediaSessionOptions> = {}): UseMediaSessionOptions => ({
  active: true,
  metadata: { title: 'Section 1', artist: 'Motyl.dev', album: 'Reader Article' },
  playbackState: 'playing',
  handlers: makeHandlers(),
  ...overrides,
})

describe('useMediaSession', () => {
  beforeEach(() => {
    installMediaSession()
  })

  afterEach(() => {
    removeMediaSession()
    vi.restoreAllMocks()
  })

  it('publishes metadata with the manifest artwork while active', () => {
    renderHook(() => useMediaSession(baseOptions()))

    const metadata = mediaSession.metadata as MediaMetadataStub
    expect(metadata).toBeInstanceOf(MediaMetadataStub)
    expect(metadata.title).toBe('Section 1')
    expect(metadata.artist).toBe('Motyl.dev')
    expect(metadata.album).toBe('Reader Article')
    expect(metadata.artwork).toEqual([
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ])
    expect(metadata.artwork).toEqual([...MEDIA_SESSION_ARTWORK])
  })

  it('registers play, pause, nexttrack and previoustrack handlers', () => {
    const handlers = makeHandlers()
    renderHook(() => useMediaSession(baseOptions({ handlers })))

    for (const action of ['play', 'pause', 'nexttrack', 'previoustrack']) {
      expect(actionHandlers.get(action)).toBeTypeOf('function')
    }

    fireAction('play')
    fireAction('pause')
    fireAction('nexttrack')
    fireAction('previoustrack')

    expect(handlers.play).toHaveBeenCalledTimes(1)
    expect(handlers.pause).toHaveBeenCalledTimes(1)
    expect(handlers.nexttrack).toHaveBeenCalledTimes(1)
    expect(handlers.previoustrack).toHaveBeenCalledTimes(1)
  })

  it('invokes the latest handler when an action fires after a re-render', () => {
    const staleHandlers = makeHandlers()
    const freshHandlers = makeHandlers()

    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions({ handlers: staleHandlers }) },
    )

    rerender(baseOptions({ handlers: freshHandlers }))

    fireAction('play')
    fireAction('nexttrack')

    expect(staleHandlers.play).not.toHaveBeenCalled()
    expect(staleHandlers.nexttrack).not.toHaveBeenCalled()
    expect(freshHandlers.play).toHaveBeenCalledTimes(1)
    expect(freshHandlers.nexttrack).toHaveBeenCalledTimes(1)
  })

  it('mirrors playbackState onto the media session', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions({ playbackState: 'playing' }) },
    )
    expect(mediaSession.playbackState).toBe('playing')

    rerender(baseOptions({ playbackState: 'paused' }))
    expect(mediaSession.playbackState).toBe('paused')

    rerender(baseOptions({ playbackState: 'none' }))
    expect(mediaSession.playbackState).toBe('none')
  })

  it('registers nothing while inactive', () => {
    renderHook(() => useMediaSession(baseOptions({ active: false })))

    expect(mediaSession.metadata).toBeNull()
    expect(mediaSession.setActionHandler).not.toHaveBeenCalled()
    expect(mediaSession.playbackState).toBe('none')
  })

  it('releases handlers and resets playbackState when it goes inactive', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions({ active: true }) },
    )
    expect(mediaSession.playbackState).toBe('playing')

    rerender(baseOptions({ active: false }))

    expect(actionHandlers.get('play')).toBeNull()
    expect(actionHandlers.get('pause')).toBeNull()
    expect(actionHandlers.get('nexttrack')).toBeNull()
    expect(actionHandlers.get('previoustrack')).toBeNull()
    expect(mediaSession.playbackState).toBe('none')
    expect(mediaSession.metadata).toBeNull()
  })

  it('releases handlers on unmount', () => {
    const { unmount } = renderHook(() => useMediaSession(baseOptions()))
    expect(actionHandlers.get('play')).toBeTypeOf('function')

    unmount()

    expect(actionHandlers.get('play')).toBeNull()
    expect(actionHandlers.get('pause')).toBeNull()
    expect(actionHandlers.get('nexttrack')).toBeNull()
    expect(actionHandlers.get('previoustrack')).toBeNull()
    expect(mediaSession.playbackState).toBe('none')
  })

  it('no-ops when the Media Session API is unavailable', () => {
    removeMediaSession()
    expect('mediaSession' in navigator).toBe(false)

    const { unmount } = renderHook(() => useMediaSession(baseOptions()))
    expect(() => unmount()).not.toThrow()
  })
})
