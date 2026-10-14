import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SEC_MS_GEC_VERSION, generateSecMsGecV2 } from '@/lib/tts/sec-ms-gec'

// Runs the REAL (patched) edge-tts-universal browser build against a stubbed
// WebSocket, so this covers the patch itself: the URL it builds and how it
// reacts to a refused handshake. No vi.mock of the library here.

type Behaviour = 'refuse' | 'serve'

class FakeWebSocket extends EventTarget {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSED = 3
  static behaviour: Behaviour = 'refuse'
  static opened: FakeWebSocket[] = []

  readyState = FakeWebSocket.CONNECTING
  url: string
  // The token the socket should have been given, computed when it was built.
  expectedToken: string
  sent: string[] = []
  onopen: ((event: Event) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: Event) => void) | null = null
  onclose: ((event: Event) => void) | null = null

  constructor(url: string) {
    super()
    this.url = url
    this.expectedToken = generateSecMsGecV2(Date.now() / 1000)
    FakeWebSocket.opened.push(this)
    setTimeout(() => (FakeWebSocket.behaviour === 'refuse' ? this.refuse() : this.open()), 0)
  }

  // What a browser does on an HTTP 403 upgrade response: error, then close,
  // and never open.
  private refuse(): void {
    this.readyState = FakeWebSocket.CLOSED
    this.fire('error', new Event('error'))
    this.fire('close', new Event('close'))
  }

  private open(): void {
    this.readyState = FakeWebSocket.OPEN
    this.fire('open', new Event('open'))
  }

  private fire(type: 'open' | 'error' | 'close' | 'message', event: Event): void {
    this.dispatchEvent(event)
    const handler = this[`on${type}`] as ((event: Event) => void) | null
    handler?.call(this, event)
  }

  send(data: string): void {
    this.sent.push(data)
    // After speech.config and the SSML request: one audio frame, turn.end.
    if (this.sent.length === 2) {
      setTimeout(() => {
        this.fire('message', new MessageEvent('message', { data: audioFrame([7, 8, 9]) }))
        this.fire(
          'message',
          new MessageEvent('message', { data: 'X-RequestId:x\r\nPath:turn.end\r\n\r\n{}' })
        )
      }, 0)
    }
  }

  close(): void {
    if (this.readyState === FakeWebSocket.CLOSED) return
    this.readyState = FakeWebSocket.CLOSED
    setTimeout(() => this.fire('close', new Event('close')), 0)
  }
}

function audioFrame(bytes: number[]): ArrayBuffer {
  const header = new TextEncoder().encode('Path:audio\r\nContent-Type:audio/mpeg\r\n')
  const frame = new Uint8Array(2 + header.length + bytes.length)
  frame[0] = header.length >> 8
  frame[1] = header.length & 0xff
  frame.set(header, 2)
  frame.set(bytes, 2 + header.length)
  return frame.buffer
}

type Client = typeof import('@/lib/tts/client')
let synthesizeSpeech: Client['synthesizeSpeech']

beforeEach(async () => {
  vi.resetModules()
  FakeWebSocket.opened = []
  vi.stubGlobal('WebSocket', FakeWebSocket)
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  synthesizeSpeech = (await import('@/lib/tts/client')).synthesizeSpeech
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('patched edge-tts-universal handshake', () => {
  it('connects with the Sec-MS-GEC v2 token and version', async () => {
    FakeWebSocket.behaviour = 'serve'
    const audio = await synthesizeSpeech('served text')

    expect(Array.from(new Uint8Array(audio))).toEqual([7, 8, 9])
    expect(FakeWebSocket.opened).toHaveLength(1)
    const socket = FakeWebSocket.opened[0]
    const params = new URL(socket.url).searchParams
    expect(params.get('Sec-MS-GEC')).toBe(socket.expectedToken)
    expect(params.get('Sec-MS-GEC')).toMatch(/^[0-9A-F]{16}-[0-9A-F]{64}$/)
    expect(params.get('Sec-MS-GEC-Version')).toBe(SEC_MS_GEC_VERSION)
    expect(SEC_MS_GEC_VERSION).toBe('2-143.0.3650.75')
    expect(params.get('ConnectionId')).toMatch(/^[0-9a-f]{32}$/)
  })

  it('a refused handshake (403) rejects at once instead of hanging', async () => {
    FakeWebSocket.behaviour = 'refuse'
    const started = Date.now()
    const outcome = await Promise.race([
      synthesizeSpeech('refused text').then(
        () => 'resolved',
        (error: Error) => error
      ),
      // Well under the client's 8 s first-byte deadline: the rejection must
      // come from the socket, not from the stall timer.
      new Promise((resolve) => setTimeout(() => resolve('hung'), 2000)),
    ])

    expect(outcome).toBeInstanceOf(Error)
    expect((outcome as Error).name).not.toBe('TTSStreamStallError')
    expect((outcome as Error).message).toContain('closed before it opened')
    expect(Date.now() - started).toBeLessThan(2000)
    // Not a transient stall, so no fresh-connection retry is spent on it.
    expect(FakeWebSocket.opened).toHaveLength(1)
  })
})
