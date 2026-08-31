import { afterEach, describe, expect, it, vi } from 'vitest'
import { scrollHeadingIntoView } from './scroll-heading'

type ScrollTarget = Pick<HTMLElement, 'getBoundingClientRect'>

const makeEl = (top: number): ScrollTarget => ({
  getBoundingClientRect: () => ({ top }) as DOMRect,
})

const stubHeader = (height: number) => {
  vi.spyOn(document, 'querySelector').mockImplementation((selector: string) =>
    selector === 'header'
      ? ({ getBoundingClientRect: () => ({ height }) as DOMRect } as unknown as Element)
      : null
  )
}

describe('scrollHeadingIntoView', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('anchors the heading just below the measured sticky header (height + 12 gap)', () => {
    vi.stubGlobal('scrollY', 1000)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    stubHeader(56)

    // rect.top = 300 → 1000 + 300 - (56 + 12) = 1232
    scrollHeadingIntoView(makeEl(300) as unknown as HTMLElement)

    expect(scrollTo).toHaveBeenCalledWith({ top: 1232, behavior: 'smooth' })
  })

  it('falls back to a 64px offset (+12 gap) when there is no header', () => {
    vi.stubGlobal('scrollY', 0)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    vi.spyOn(document, 'querySelector').mockReturnValue(null)

    // rect.top = 900 → 0 + 900 - (64 + 12) = 824
    scrollHeadingIntoView(makeEl(900) as unknown as HTMLElement)

    expect(scrollTo).toHaveBeenCalledWith({ top: 824, behavior: 'smooth' })
  })

  it('honours an explicit offset, ignoring the header measurement', () => {
    vi.stubGlobal('scrollY', 0)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    stubHeader(999) // must be ignored

    // rect.top = 900 → 0 + 900 - 100 = 800
    scrollHeadingIntoView(makeEl(900) as unknown as HTMLElement, 100)

    expect(scrollTo).toHaveBeenCalledWith({ top: 800, behavior: 'smooth' })
  })

  it('clamps the computed top to >= 0', () => {
    vi.stubGlobal('scrollY', 0)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    stubHeader(56)

    // rect.top = 10 → 0 + 10 - 68 = -58 → clamped to 0
    scrollHeadingIntoView(makeEl(10) as unknown as HTMLElement)

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('jumps instantly when prefers-reduced-motion is set', () => {
    vi.stubGlobal('scrollY', 0)
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    stubHeader(56)

    scrollHeadingIntoView(makeEl(900) as unknown as HTMLElement)

    expect(scrollTo).toHaveBeenCalledWith({ top: 832, behavior: 'auto' })
  })

  it('no-ops on null / undefined element', () => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)

    scrollHeadingIntoView(null)
    scrollHeadingIntoView(undefined)

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
