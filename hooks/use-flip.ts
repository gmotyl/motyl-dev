'use client'

import { useRef, useEffect } from 'react'

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

  const snapshot = () => {
    if (!listRef.current) return
    const els = listRef.current.querySelectorAll('[data-flip-id]')
    const map = new Map<string, number>()
    els.forEach(el => {
      const id = el.getAttribute('data-flip-id')!
      map.set(id, el.getBoundingClientRect().top)
    })
    prevPositions.current = map
  }

  useEffect(() => {
    if (!listRef.current || prevPositions.current.size === 0) return

    const els = listRef.current.querySelectorAll('[data-flip-id]')
    els.forEach(el => {
      const id = el.getAttribute('data-flip-id')!
      const oldTop = prevPositions.current.get(id)
      if (oldTop === undefined) return

      const delta = oldTop - el.getBoundingClientRect().top
      if (delta === 0) return

      const htmlEl = el as HTMLElement
      htmlEl.style.transform = `translateY(${delta}px)`
      htmlEl.style.transition = 'none'

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          htmlEl.style.transform = ''
          htmlEl.style.transition = `transform ${duration}ms ${easing}`
        })
      })
    })

    prevPositions.current = new Map()
  }, [items, duration, easing])

  return { listRef, snapshot }
}
