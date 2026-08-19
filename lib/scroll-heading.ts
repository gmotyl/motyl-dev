// Scrolls the window so `el`'s top sits at `ratio` of the viewport height
// (e.g. 0.7 = lower third), keeping the preceding content visible above.
// Guarded for SSR / missing element.
export function scrollHeadingIntoView(el: HTMLElement | null | undefined, ratio = 0.7): void {
  if (!el || typeof window === 'undefined') return
  const top = window.scrollY + el.getBoundingClientRect().top - window.innerHeight * ratio
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
