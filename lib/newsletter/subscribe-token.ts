import crypto from 'node:crypto'

export const SUBSCRIBE_TOKEN_TTL_MS = 48 * 60 * 60 * 1000

export type SubscribeTokenPayload = { email: string; articleSlug?: string; exp: number }

// Wire payload uses short keys to keep the confirmation link compact.
type WirePayload = { e: string; s?: string; exp: number }

const BASE64URL = /^[A-Za-z0-9_-]+$/

function getSecret(): string | undefined {
  return process.env.NEWSLETTER_TOKEN_SECRET || undefined
}

function sign(secret: string, payloadPart: string): Buffer {
  return crypto.createHmac('sha256', secret).update(payloadPart).digest()
}

// Token = base64url(JSON {e, s?, exp}) + "." + base64url(HMAC-SHA256(secret, payloadPart)).
export function createSubscribeToken(
  email: string,
  articleSlug: string | undefined,
  now: number = Date.now(),
): string {
  const secret = getSecret()
  if (!secret) throw new Error('NEWSLETTER_TOKEN_SECRET is not set')

  const wire: WirePayload = { e: email, exp: now + SUBSCRIBE_TOKEN_TTL_MS }
  if (articleSlug) wire.s = articleSlug

  const payloadPart = Buffer.from(JSON.stringify(wire)).toString('base64url')
  const signaturePart = sign(secret, payloadPart).toString('base64url')
  return `${payloadPart}.${signaturePart}`
}

// Returns the payload for an authentic, unexpired token; null otherwise. Never throws.
export function verifySubscribeToken(
  token: string,
  now: number = Date.now(),
): SubscribeTokenPayload | null {
  try {
    const secret = getSecret()
    if (!secret || typeof token !== 'string') return null

    const parts = token.split('.')
    if (parts.length !== 2) return null
    const [payloadPart, signaturePart] = parts
    if (!BASE64URL.test(payloadPart) || !BASE64URL.test(signaturePart)) return null

    const expected = sign(secret, payloadPart)
    const actual = Buffer.from(signaturePart, 'base64url')
    // timingSafeEqual throws on unequal lengths, so check length first.
    if (actual.length !== expected.length) return null
    if (!crypto.timingSafeEqual(actual, expected)) return null
    // Reject non-canonical encodings that decode to the same bytes.
    if (actual.toString('base64url') !== signaturePart) return null

    const wire = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8')) as unknown
    if (!wire || typeof wire !== 'object') return null
    const { e, s, exp } = wire as Partial<WirePayload>
    if (typeof e !== 'string' || !e) return null
    if (typeof exp !== 'number' || !Number.isFinite(exp)) return null
    if (s !== undefined && typeof s !== 'string') return null
    if (now > exp) return null

    return s === undefined ? { email: e, exp } : { email: e, articleSlug: s, exp }
  } catch {
    return null
  }
}
