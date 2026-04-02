'use client'

import { useRef, useEffect, useCallback } from 'react'

interface UseFLIPOptions {
  duration?: number
  easing?: string
}

export function useFLIP<T, E extends HTMLElement = HTMLDivElement>(
  items: T[],
  { duration = 450, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }: UseFLIPOptions = {}
) {
  const listRef = useRef<E>(null)
  const prevPositions = useRef<Map<string, number>>(new Map())

  // Use document-relative Y so scrolling between snapshot and render doesn't distort delta
  const snapshot = useCallback(() => {
    if (!listRef.current) return
    const els = listRef.current.querySelectorAll('[data-flip-id]')
    const map = new Map<string, number>()
    els.forEach(el => {
      const id = el.getAttribute('data-flip-id')!
      map.set(id, el.getBoundingClientRect().top + window.scrollY)
    })
    prevPositions.current = map
  }, [])

  useEffect(() => {
    if (!listRef.current || prevPositions.current.size === 0) return

    const els = listRef.current.querySelectorAll('[data-flip-id]')
    const moves: Array<{ el: HTMLElement; delta: number }> = []

    els.forEach(el => {
      const id = el.getAttribute('data-flip-id')!
      const oldTop = prevPositions.current.get(id)
      if (oldTop === undefined) return

      const delta = oldTop - (el.getBoundingClientRect().top + window.scrollY)
      if (delta === 0) return

      moves.push({ el: el as HTMLElement, delta })
    })

    prevPositions.current = new Map()

    if (moves.length === 0) return

    // Invert: set all elements to their old positions before the next paint
    moves.forEach(({ el, delta }) => {
      el.style.transition = 'none'
      el.style.transform = `translateY(${delta}px)`
    })

    // Play: batch all transitions into a single double-rAF
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        moves.forEach(({ el }) => {
          el.style.transition = `transform ${duration}ms ${easing}`
          el.style.transform = ''
          el.addEventListener('transitionend', () => { el.style.transition = '' }, { once: true })
        })
      })
    })
  }, [items, duration, easing])

  return { listRef, snapshot }
}
