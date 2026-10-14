import { describe, expect, it } from 'vitest'

import golden from './sec-ms-gec.vectors.json'
import {
  SEC_MS_GEC_VERSION,
  createSecMsGecGenerator,
  generateSecMsGecV2,
  secMsGecTicks,
} from './sec-ms-gec'

describe('Sec-MS-GEC v2 token', () => {
  it('golden vectors come from the edge-tts 7.3.x reference', () => {
    expect(golden.reference).toMatch(/^edge-tts 7\.3\./)
    expect(golden.vectors.length).toBeGreaterThanOrEqual(8)
  })

  it.each(golden.vectors)('matches the Python reference at $unixSeconds', ({ unixSeconds, token }) => {
    expect(generateSecMsGecV2(unixSeconds)).toBe(token)
  })

  it('uses the same Sec-MS-GEC-Version as the reference', () => {
    expect(SEC_MS_GEC_VERSION).toBe(golden.secMsGecVersion)
  })

  it('is constant within a 5-minute window and changes across it', () => {
    const start = 1_791_936_000
    expect(generateSecMsGecV2(start + 299.9)).toBe(generateSecMsGecV2(start))
    expect(generateSecMsGecV2(start + 300)).not.toBe(generateSecMsGecV2(start))
    expect(secMsGecTicks(start + 1)).toBe('134364096000000000')
  })

  it('has the <16 hex>-<64 hex> shape', () => {
    expect(generateSecMsGecV2(1_800_000_000)).toMatch(/^[0-9A-F]{16}-[0-9A-F]{64}$/)
  })

  it('reads the injected clock on every call', () => {
    let now = 1_791_936_000
    const next = createSecMsGecGenerator(() => now)
    const first = next()
    now += 600
    expect(next()).not.toBe(first)
    expect(next()).toBe(generateSecMsGecV2(now))
  })
})
