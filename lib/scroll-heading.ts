// Measures the sticky page header so an anchored heading clears it. Falls back to
// 64 when no <header> is present (SSR / tests). `gap` is breathing room below it.
function measureHeaderOffset(gap = 12): number {
  const header = typeof document !== 'undefined' ? document.querySelector('header') : null
  return (header?.getBoundingClientRect().height ?? 64) + gap
}

// Scrolls the window so `el`'s top sits just below the sticky page header, so the
// section becomes the top of the screen and its content flows downward. Pass an
// explicit `offset` to override the measured header height. Guarded for SSR /
// missing element.
export function scrollHeadingIntoView(el: HTMLElement | null | undefined, offset?: number): void {
  if (!el || typeof window === 'undefined') return
  const topOffset = offset ?? measureHeaderOffset()
  const top = window.scrollY + el.getBoundingClientRect().top - topOffset
  // Respect prefers-reduced-motion: users who opted out get an instant jump
  // instead of the smooth-scroll animation.
  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' })
}
