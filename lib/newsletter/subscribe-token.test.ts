// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import crypto from 'node:crypto'
import {
  createSubscribeToken,
  verifySubscribeToken,
  SUBSCRIBE_TOKEN_TTL_MS,
} from './subscribe-token'

const NOW = 1_800_000_000_000

// Flips one character of a base64url string to a different valid one.
function flipChar(value: string, index: number): string {
  const replacement = value[index] === 'A' ? 'B' : 'A'
  return value.slice(0, index) + replacement + value.slice(index + 1)
}

describe('subscribe token', () => {
  beforeEach(() => {
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'test-secret')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('round-trips email and articleSlug', () => {
    const token = createSubscribeToken('reader@example.com', 'my-article', NOW)
    expect(verifySubscribeToken(token, NOW + 1000)).toEqual({
      email: 'reader@example.com',
      articleSlug: 'my-article',
      exp: NOW + SUBSCRIBE_TOKEN_TTL_MS,
    })

    const noSlug = createSubscribeToken('reader@example.com', undefined, NOW)
    const payload = verifySubscribeToken(noSlug, NOW)
    expect(payload?.email).toBe('reader@example.com')
    expect(payload?.articleSlug).toBeUndefined()
  })

  it('rejects a tampered payload', () => {
    const token = createSubscribeToken('reader@example.com', 'my-article', NOW)
    const [payloadPart, signature] = token.split('.')
    for (let i = 0; i < payloadPart.length; i++) {
      expect(verifySubscribeToken(`${flipChar(payloadPart, i)}.${signature}`, NOW)).toBeNull()
    }

    // A validly encoded but different payload with the original signature.
    const forged = Buffer.from(
      JSON.stringify({ e: 'attacker@example.com', exp: NOW + SUBSCRIBE_TOKEN_TTL_MS }),
    ).toString('base64url')
    expect(verifySubscribeToken(`${forged}.${signature}`, NOW)).toBeNull()
  })

  it('rejects a tampered signature', () => {
    const token = createSubscribeToken('reader@example.com', 'my-article', NOW)
    const [payloadPart, signature] = token.split('.')
    for (let i = 0; i < signature.length; i++) {
      expect(verifySubscribeToken(`${payloadPart}.${flipChar(signature, i)}`, NOW)).toBeNull()
    }
  })

  it('rejects an expired token', () => {
    const token = createSubscribeToken('reader@example.com', undefined, NOW)
    expect(verifySubscribeToken(token, NOW + SUBSCRIBE_TOKEN_TTL_MS)).not.toBeNull()
    expect(verifySubscribeToken(token, NOW + SUBSCRIBE_TOKEN_TTL_MS + 1)).toBeNull()
  })

  it('returns null for malformed tokens', () => {
    const timingSafeEqual = vi.spyOn(crypto, 'timingSafeEqual')
    const token = createSubscribeToken('reader@example.com', undefined, NOW)
    const [payloadPart, signature] = token.split('.')
    const sign = (part: string) =>
      crypto.createHmac('sha256', 'test-secret').update(part).digest('base64url')
    const notJson = Buffer.from('not json').toString('base64url')
    const noEmail = Buffer.from(JSON.stringify({ exp: NOW + 1000 })).toString('base64url')

    const malformed = [
      '',
      'no-dot-at-all',
      '.',
      `${payloadPart}.`,
      `.${signature}`,
      `${payloadPart}.${signature}.extra`,
      `${payloadPart}.${signature.slice(0, 10)}`, // shorter signature
      `${payloadPart}.${signature}AAAA`, // longer signature
      `!!!.${signature}`, // not base64url
      `${notJson}.${sign(notJson)}`, // valid signature over non-JSON
      `${noEmail}.${sign(noEmail)}`, // valid signature, missing email
    ]
    for (const value of malformed) {
      expect(() => verifySubscribeToken(value, NOW)).not.toThrow()
      expect(verifySubscribeToken(value, NOW)).toBeNull()
    }

    // Never compares buffers of different lengths (that would throw).
    expect(timingSafeEqual).toHaveBeenCalled()
    for (const [a, b] of timingSafeEqual.mock.calls) {
      expect((a as Buffer).length).toBe((b as Buffer).length)
    }
  })

  it('throws when the secret is missing', () => {
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', '')
    expect(() => createSubscribeToken('reader@example.com', undefined, NOW)).toThrow()
  })
})
