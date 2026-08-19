import { afterEach, describe, expect, it, vi } from 'vitest'
import { scrollHeadingIntoView } from './scroll-heading'

type ScrollTarget = Pick<HTMLElement, 'getBoundingClientRect'>

const makeEl = (top: number): ScrollTarget => ({
  getBoundingClientRect: () => ({ top }) as DOMRect,
})

describe('scrollHeadingIntoView', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('scrolls so the heading top lands at ratio*viewport (default 0.7)', () => {
    vi.stubGlobal('scrollY', 1000)
    vi.stubGlobal('innerHeight', 800)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    // rect.top = 300 → 1000 + 300 - 800*0.7 = 740
    scrollHeadingIntoView(makeEl(300) as unknown as HTMLElement)

    expect(scrollTo).toHaveBeenCalledWith({ top: 740, behavior: 'smooth' })
  })

  it('honours a custom ratio', () => {
    vi.stubGlobal('scrollY', 0)
    vi.stubGlobal('innerHeight', 1000)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    // rect.top = 900 → 0 + 900 - 1000*0.5 = 400
    scrollHeadingIntoView(makeEl(900) as unknown as HTMLElement, 0.5)

    expect(scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'smooth' })
  })

  it('clamps the computed top to >= 0', () => {
    vi.stubGlobal('scrollY', 0)
    vi.stubGlobal('innerHeight', 800)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    // rect.top = 100 → 0 + 100 - 800*0.7 = -460 → clamped to 0
    scrollHeadingIntoView(makeEl(100) as unknown as HTMLElement)

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('no-ops on null / undefined element', () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    scrollHeadingIntoView(null)
    scrollHeadingIntoView(undefined)

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
