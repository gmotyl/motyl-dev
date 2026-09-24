import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createSrcSwapCarrier } from '@/lib/reader/src-swap-carrier'

/**
 * The element is a RECORDING fake rather than a jsdom `<audio>`.
 *
 * Every test here is about what the carrier does *to* the element, and the one
 * criterion that is easy to fake green — "appending touches the element not at
 * all" — can only be asserted against something that records every touch. A
 * real element would answer "src is still empty" for an implementation that
 * called `load()` or `pause()` on the way past.
 */
interface RecordingElement {
  node: HTMLAudioElement
  /** Every interaction the carrier had with the element, in order. */
  touches: string[]
}

const createRecordingElement = (): RecordingElement => {
  const touches: string[] = []
  let src = ''
  const node = {
    get src() {
      return src
    },
    set src(value: string) {
      src = value
      touches.push(`src=${value}`)
    },
    play: vi.fn(() => {
      touches.push('play')
      return Promise.resolve()
    }),
    pause: vi.fn(() => {
      touches.push('pause')
    }),
    load: vi.fn(() => {
      touches.push('load')
    }),
    removeAttribute: vi.fn((name: string) => {
      touches.push(`removeAttribute(${name})`)
    }),
  }
  return { node: node as unknown as HTMLAudioElement, touches }
}

let createdUrls: string[] = []
let revokedUrls: string[] = []
/** Every blob handed to `URL.createObjectURL`, in creation order. */
let wrappedBlobs: Blob[] = []

const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL

/** A prepared unit with recognisable bytes, so a mixed-up index is visible. */
const unit = (index: number) => ({
  index,
  data: new Uint8Array([index, index, index]).buffer,
  duration: 0,
})

beforeEach(() => {
  createdUrls = []
  revokedUrls = []
  wrappedBlobs = []
  URL.createObjectURL = vi.fn((blob: Blob) => {
    wrappedBlobs.push(blob)
    const url = `blob:mock/${createdUrls.length}`
    createdUrls.push(url)
    return url
  }) as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = vi.fn((url: string) => {
    revokedUrls.push(url)
  }) as unknown as typeof URL.revokeObjectURL
})

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  vi.clearAllMocks()
})

describe('src-swap carrier', () => {
  it('assigns src and starts playback when seeking to a unit', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 3 })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    carrier.seekToUnit(1)

    // The unit's OWN url, and the start after it: a seek that played before
    // assigning would start the unit that was already loaded.
    expect(element.touches).toEqual([`src=${createdUrls[1]}`, 'play'])
    expect(element.node.src).toBe(createdUrls[1])
  })

  it('accepts appended units without touching the element', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 3 })
    carrier.attach(element.node)

    const first = unit(0)
    const second = unit(1)
    await expect(
      carrier.appendUnits([first, second], { continueTimeline: false })
    ).resolves.toBeUndefined()

    // Nothing was assigned, started, paused or loaded.
    expect(element.touches).toEqual([])

    // The positive control — the units really were recorded, and the recording
    // is what a later seek reads. Without this the test passes against a
    // carrier that drops every unit on the floor.
    expect(createdUrls).toHaveLength(2)
    carrier.seekToUnit(0)
    expect(element.node.src).toBe(createdUrls[0])
    expect(carrier.timeline().startOf(1)).not.toBeNull()

    // The bytes are wrapped, MP3-typed, and COPIED — the cached synthesis
    // ArrayBuffer is handed to every caller, so a wrap that detached it would
    // bring the decodeAudioData hazard back through the carrier.
    expect(wrappedBlobs[0].type).toBe('audio/mpeg')
    expect(first.data.byteLength).toBe(3)
    expect(second.data.byteLength).toBe(3)
  })

  it('revokes every object URL it created on dispose', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 3 })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0), unit(1), unit(2)], { continueTimeline: false })
    expect(createdUrls).toHaveLength(3)

    carrier.dispose()

    // Every URL, and nothing left behind: a long Read All News session that
    // leaks one URL per unit retains the whole article's audio.
    expect([...revokedUrls].sort()).toEqual([...createdUrls].sort())
    expect(carrier.timeline().startOf(0)).toBeNull()
  })

  it('reports its kind as src-swap', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 3 })

    expect(carrier.kind).toBe('src-swap')

    // And it means it. The kind is how the reader tells the two strategies
    // apart, so it is only worth anything if the carrier behind it really does
    // advance by assigning a source — the one thing the MSE kind promises
    // never to do.
    carrier.attach(element.node)
    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    carrier.seekToUnit(0)
    expect(element.touches).toContain(`src=${createdUrls[0]}`)
  })

  it('reuses the url a unit already has instead of creating a second one', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 3 })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    // The prefetch path appends a unit that the play path may append again;
    // a second url for the same unit would leak the first one.
    await carrier.appendUnits([unit(0)], { continueTimeline: true })

    expect(createdUrls).toHaveLength(1)
    carrier.seekToUnit(0)
    expect(element.node.src).toBe(createdUrls[0])
  })

  it('revokes the units outside the retention window when it seeks', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 1 })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0), unit(1), unit(2)], { continueTimeline: false })
    carrier.seekToUnit(1)

    // [1, 1 + retainAhead] survives; the consumed unit behind the playhead does
    // not. Revoking the unit the element is now reading would pull the media
    // out from under it.
    expect(revokedUrls).toEqual([createdUrls[0]])
    expect(carrier.timeline().startOf(0)).toBeNull()
    expect(carrier.timeline().startOf(1)).not.toBeNull()
    expect(carrier.timeline().startOf(2)).not.toBeNull()
  })

  it('revokes every url on rebuild and leaves the element source alone', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 3 })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0), unit(1)], { continueTimeline: false })
    carrier.seekToUnit(0)
    element.touches.length = 0

    carrier.rebuild()

    expect([...revokedUrls].sort()).toEqual([...createdUrls].sort())
    expect(carrier.timeline().startOf(0)).toBeNull()
    // Clearing the source belongs to the caller: the completion path rebuilds
    // with the finished unit still loaded, and a source dropped there would
    // fire `emptied`/`error` at handlers the hook has not detached yet.
    expect(element.touches).toEqual([])
    expect(element.node.src).toBe(createdUrls[0])
  })

  it('reports a refused start instead of swallowing it', async () => {
    const element = createRecordingElement()
    const refusal = new DOMException('play() was not allowed', 'NotAllowedError')
    element.node.play = vi.fn(() => Promise.reject(refusal)) as HTMLAudioElement['play']
    const started = vi.fn()
    const carrier = createSrcSwapCarrier({ retainAhead: 3, onStarted: started })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0)], { continueTimeline: false })
    carrier.seekToUnit(0)

    // There is no second output path, so a refusal the carrier kept to itself
    // would be silence with the reader still showing "playing".
    expect(started).toHaveBeenCalledTimes(1)
    expect(started.mock.calls[0][0]).toBe(0)
    await expect(started.mock.calls[0][1]).rejects.toBe(refusal)
  })

  it('revokes the dropped url only AFTER the element is pointed at the new unit', async () => {
    const element = createRecordingElement()
    /**
     * Revokes and element touches share ONE ordered log.
     *
     * Kept in separate arrays, a revoke can only be checked for "it happened",
     * never for "it happened after the assignment" — and jsdom is perfectly
     * happy to keep a revoked URL sitting in `src`, so the ordering the carrier
     * calls load-bearing is exactly the property a browser-shaped assertion
     * cannot see. Pruning first would pull the media out from under an element
     * that had not yet been re-pointed.
     */
    URL.revokeObjectURL = vi.fn((url: string) => {
      revokedUrls.push(url)
      element.touches.push(`revoke=${url}`)
    }) as unknown as typeof URL.revokeObjectURL

    const carrier = createSrcSwapCarrier({ retainAhead: 1 })
    carrier.attach(element.node)

    await carrier.appendUnits([unit(0), unit(1), unit(2)], { continueTimeline: false })
    element.touches.length = 0

    carrier.seekToUnit(1)

    // Assign, then prune, then start — in that order and no other.
    expect(element.touches).toEqual([
      `src=${createdUrls[1]}`,
      `revoke=${createdUrls[0]}`,
      'play',
    ])
  })

  it('retains exactly [index, index + retainAhead] and drops everything else', async () => {
    const element = createRecordingElement()
    const carrier = createSrcSwapCarrier({ retainAhead: 2 })
    carrier.attach(element.node)

    await carrier.appendUnits(
      [unit(0), unit(1), unit(2), unit(3), unit(4), unit(5)],
      { continueTimeline: false }
    )
    carrier.seekToUnit(2)

    // The window is closed at BOTH ends. A window that is too short revokes a
    // unit the prefetcher has just warmed (the next swap re-synthesises it); one
    // that is too long retains audio nobody will play, which over a Read All
    // News run is the whole article.
    const held = [0, 1, 2, 3, 4, 5].filter((i) => carrier.timeline().startOf(i) !== null)
    expect(held).toEqual([2, 3, 4])
    expect([...revokedUrls].sort()).toEqual(
      [createdUrls[0], createdUrls[1], createdUrls[5]].sort()
    )
  })
})
