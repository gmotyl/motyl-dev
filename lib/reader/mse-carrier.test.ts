import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  READER_LOG_FLAG,
  clearReaderLog,
  readReaderLog,
  type ReaderLogEntry,
  type ReaderLogEventType,
} from '@/lib/reader/diagnostic-log'
import { createMseCarrier, isMseAudioSupported } from '@/lib/reader/mse-carrier'

/**
 * jsdom has no MediaSource, no SourceBuffer and no TimeRanges, so the whole MSE
 * surface is faked here.
 *
 * The fake is deliberately STRICT where the real DOM is strict: `appendBuffer`
 * throws `InvalidStateError` when called while `updating` is true, exactly as a
 * real SourceBuffer does. That single line is what makes the serialisation
 * tests bite — an implementation that appends without waiting for `updateend`
 * fails here instead of quietly passing against a permissive fake.
 */
function fakeTimeRanges(ranges: ReadonlyArray<readonly [number, number]>): TimeRanges {
  const guard = (index: number) => {
    if (!Number.isInteger(index) || index < 0 || index >= ranges.length) {
      throw new DOMException(`Index ${index} is out of range`, 'IndexSizeError')
    }
  }
  return {
    get length() {
      return ranges.length
    },
    start: (index: number) => {
      guard(index)
      return ranges[index][0]
    },
    end: (index: number) => {
      guard(index)
      return ranges[index][1]
    },
  } as TimeRanges
}

class FakeSourceBuffer extends EventTarget {
  updating = false
  timestampOffset = 0
  buffered: TimeRanges = fakeTimeRanges([])
  /** Byte lengths reaching the buffer, in the order they arrived. */
  readonly accepted: number[] = []
  /** When set, the next `appendBuffer` call throws this instead of accepting. */
  throwOnNextAppend: unknown = null

  appendBuffer = vi.fn((data: BufferSource) => {
    if (this.updating) {
      throw new DOMException('appendBuffer called while updating', 'InvalidStateError')
    }
    if (this.throwOnNextAppend !== null) {
      const error = this.throwOnNextAppend
      this.throwOnNextAppend = null
      throw error
    }
    this.accepted.push(data.byteLength)
    this.updating = true
  })

  /** What the browser does asynchronously once an append has been ingested. */
  finishAppend(): void {
    this.updating = false
    this.dispatchEvent(new Event('updateend'))
  }
}

class FakeMediaSource extends EventTarget {
  static isTypeSupported = vi.fn((_type: string) => true)

  readyState: 'closed' | 'open' | 'ended' = 'closed'
  readonly sourceBuffer = new FakeSourceBuffer()
  addSourceBuffer = vi.fn((_type: string) => {
    if (this.readyState !== 'open') {
      throw new DOMException('addSourceBuffer before sourceopen', 'InvalidStateError')
    }
    return this.sourceBuffer as unknown as SourceBuffer
  })
  endOfStream = vi.fn(() => {
    this.readyState = 'ended'
  })

  /** What the element does once the object URL is attached. */
  open(): void {
    this.readyState = 'open'
    this.dispatchEvent(new Event('sourceopen'))
  }

  constructor() {
    super()
    created.push(this)
  }
}

let created: FakeMediaSource[] = []

const OBJECT_URL = 'blob:mse-carrier-test'
const createObjectURL = vi.fn(() => OBJECT_URL)
const revokeObjectURL = vi.fn()
const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL

/** Lets every queued microtask (and the macrotask behind it) run. */
const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 0))

const bytes = (length: number) => new ArrayBuffer(length)

const entriesOfType = (type: ReaderLogEventType): ReaderLogEntry[] =>
  readReaderLog().filter((entry) => entry.type === type)

/** Stubs MediaSource, opens the source, and hands back carrier + fakes. */
function openCarrier() {
  const carrier = createMseCarrier()
  const mediaSource = created[created.length - 1]
  mediaSource.open()
  return { carrier, mediaSource, sourceBuffer: mediaSource.sourceBuffer }
}

beforeEach(() => {
  created = []
  FakeMediaSource.isTypeSupported.mockClear().mockReturnValue(true)
  createObjectURL.mockClear()
  revokeObjectURL.mockClear()
  URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL
  URL.revokeObjectURL = revokeObjectURL as unknown as typeof URL.revokeObjectURL
  vi.stubGlobal('MediaSource', FakeMediaSource)
  window.localStorage.clear()
  // The log is flag-gated like every other reader event; without this the
  // append assertions would pass vacuously against an empty buffer.
  window.localStorage.setItem(READER_LOG_FLAG, '1')
  clearReaderLog()
})

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  window.localStorage.clear()
  clearReaderLog()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('isMseAudioSupported', () => {
  it('reports MSE unsupported when audio/mpeg is rejected', () => {
    FakeMediaSource.isTypeSupported.mockReturnValue(false)

    expect(isMseAudioSupported()).toBe(false)
    expect(FakeMediaSource.isTypeSupported).toHaveBeenCalledWith('audio/mpeg')
  })

  it('reports MSE unsupported when MediaSource is absent', () => {
    // The positive case is asserted FIRST, against the same call: a function
    // that simply returns false would satisfy the absence assertion alone.
    expect(isMseAudioSupported()).toBe(true)

    vi.stubGlobal('MediaSource', undefined)

    expect(() => isMseAudioSupported()).not.toThrow()
    expect(isMseAudioSupported()).toBe(false)
  })

  it('reports MSE supported when audio/mpeg is accepted', () => {
    expect(isMseAudioSupported()).toBe(true)
    expect(FakeMediaSource.isTypeSupported).toHaveBeenCalledWith('audio/mpeg')
  })
})

describe('createMseCarrier', () => {
  it('waits for updateend before appending the next fragment', async () => {
    const { carrier, sourceBuffer } = openCarrier()

    const first = carrier.append(0, bytes(4), 20)
    const second = carrier.append(1, bytes(8), 20)
    await settle()

    // The second append must still be waiting: the buffer is mid-update.
    expect(sourceBuffer.appendBuffer).toHaveBeenCalledTimes(1)
    expect(sourceBuffer.updating).toBe(true)
    expect(sourceBuffer.accepted).toEqual([4])

    sourceBuffer.finishAppend()
    await first
    await settle()

    expect(sourceBuffer.appendBuffer).toHaveBeenCalledTimes(2)
    expect(sourceBuffer.accepted).toEqual([4, 8])

    sourceBuffer.finishAppend()
    await expect(second).resolves.toBeUndefined()
  })

  it('appends queued fragments in request order', async () => {
    const { carrier, sourceBuffer } = openCarrier()

    // Requested back to back, byte lengths chosen so the order is legible.
    const pending = [carrier.append(0, bytes(1), 20), carrier.append(1, bytes(2), 20), carrier.append(2, bytes(3), 20)]

    for (let step = 0; step < 3; step += 1) {
      await settle()
      sourceBuffer.finishAppend()
    }
    await Promise.all(pending)

    expect(sourceBuffer.accepted).toEqual([1, 2, 3])
  })

  it('queues appends requested before sourceopen', async () => {
    // createMseCarrier() returns before the element has attached the object
    // URL, so the client may append immediately. Nothing may reach the buffer
    // until `sourceopen` has produced one.
    const carrier = createMseCarrier()
    const mediaSource = created[created.length - 1]
    const { sourceBuffer } = mediaSource

    const pending = carrier.append(0, bytes(16), 20)
    await settle()

    expect(mediaSource.addSourceBuffer).not.toHaveBeenCalled()
    expect(sourceBuffer.appendBuffer).not.toHaveBeenCalled()

    mediaSource.open()
    await settle()

    expect(mediaSource.addSourceBuffer).toHaveBeenCalledWith('audio/mpeg')
    expect(sourceBuffer.accepted).toEqual([16])

    sourceBuffer.finishAppend()
    await expect(pending).resolves.toBeUndefined()
  })

  it('rejects and records append-failed when appendBuffer throws', async () => {
    const { carrier, sourceBuffer } = openCarrier()
    sourceBuffer.throwOnNextAppend = new DOMException('buffer full', 'QuotaExceededError')

    await expect(carrier.append(5, bytes(32), 20)).rejects.toMatchObject({
      name: 'QuotaExceededError',
    })

    const failures = entriesOfType('append-failed')
    expect(failures).toHaveLength(1)
    // The error's IDENTITY — name and message — not a bare `.message`.
    expect(failures[0].detail).toContain('QuotaExceededError')
    expect(failures[0].detail).toContain('buffer full')
    expect(failures[0].detail).toContain('5')
    expect(entriesOfType('append')).toHaveLength(0)
  })

  it('stops the queue after a failed append', async () => {
    const { carrier, sourceBuffer } = openCarrier()
    sourceBuffer.throwOnNextAppend = new DOMException('buffer full', 'QuotaExceededError')

    const first = carrier.append(0, bytes(4), 20)
    const second = carrier.append(1, bytes(8), 20)

    await expect(first).rejects.toBeInstanceOf(DOMException)
    await expect(second).rejects.toBeTruthy()
    await settle()

    // The refused append is the only one that ever reached the buffer, and
    // nothing was accepted into a buffer whose state is now unknown.
    expect(sourceBuffer.appendBuffer).toHaveBeenCalledTimes(1)
    expect(sourceBuffer.accepted).toEqual([])
    // Both fragments are named in the log: the one that failed, and the one
    // that was dropped because of it. Neither disappears silently.
    const failures = entriesOfType('append-failed')
    expect(failures).toHaveLength(2)
    expect(failures[1].detail).toContain('1')
    expect(failures[1].detail).toContain('QuotaExceededError')
    expect(entriesOfType('append')).toHaveLength(0)
  })

  it('records a successful append with index and byte length', async () => {
    const { carrier, sourceBuffer } = openCarrier()

    const pending = carrier.append(3, bytes(256), 20)
    await settle()
    sourceBuffer.finishAppend()
    await pending

    const appends = entriesOfType('append')
    expect(appends).toHaveLength(1)
    expect(appends[0].detail).toContain('3')
    expect(appends[0].detail).toContain('256')
    expect(entriesOfType('append-failed')).toHaveLength(0)
  })

  it('reports the seams over the buffered ranges and the appended durations', async () => {
    const { carrier, sourceBuffer } = openCarrier()

    const first = carrier.append(0, bytes(4), 20)
    await settle()
    sourceBuffer.finishAppend()
    await first
    const second = carrier.append(1, bytes(4), 19)
    await settle()
    sourceBuffer.buffered = fakeTimeRanges([[0, 38.5]])
    sourceBuffer.finishAppend()
    await second

    const report = carrier.report()
    expect(report.contiguous).toBe(true)
    expect(report.ranges).toEqual([[0, 38.5]])
    expect(report.expectedDuration).toBeCloseTo(39, 6)
    expect(report.drift).toBeCloseTo(-0.5, 6)
  })

  it('reports an empty seam report before anything is appended', () => {
    const carrier = createMseCarrier()
    const mediaSource = created[created.length - 1]
    mediaSource.sourceBuffer.buffered = fakeTimeRanges([[1, 4]])

    // No source buffer exists yet, so there is nothing to read.
    const before = carrier.report()
    expect(before.contiguous).toBe(false)
    expect(before.ranges).toEqual([])
    expect(before.bufferedDuration).toBe(0)
    expect(before.expectedDuration).toBe(0)

    // ...and the empty report is not hard-coded: once the source opens, the
    // same call reads the buffer's live ranges.
    mediaSource.open()
    expect(carrier.report().ranges).toEqual([[1, 4]])
  })

  it('revokes the object URL on dispose', () => {
    const carrier = createMseCarrier()
    const mediaSource = created[created.length - 1]

    expect(createObjectURL).toHaveBeenCalledWith(mediaSource)
    expect(carrier.src).toBe(OBJECT_URL)

    carrier.dispose()

    expect(revokeObjectURL).toHaveBeenCalledWith(OBJECT_URL)
  })

  it('rejects appends still queued when the carrier is disposed', async () => {
    // Never attached to an element, so `sourceopen` never fires. A queued
    // append must not hang forever once the carrier is gone.
    const carrier = createMseCarrier()
    const pending = carrier.append(0, bytes(4), 20)

    carrier.dispose()

    await expect(pending).rejects.toBeTruthy()
  })
})
