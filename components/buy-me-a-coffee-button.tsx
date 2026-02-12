'use client'

import { useEffect, useRef } from 'react'

export function BuyMeACoffeeButton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return

    const loadScript = () => {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
      script.type = 'text/javascript'
      script.async = true

      const attributes = {
        'data-name': 'bmc-button',
        'data-slug': 'motyl.dev',
        'data-color': '#BD5FFF',
        'data-emoji': '',
        'data-font': 'Cookie',
        'data-text': 'Buy me a coffee',
        'data-outline-color': '#000000',
        'data-font-color': '#ffffff',
        'data-coffee-color': '#FFDD00',
      }

      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value)
      })

      script.onerror = () => {
        console.error('Failed to load Buy Me A Coffee script')
      }

      document.body.appendChild(script)
      scriptLoaded.current = true
    }

    loadScript()

    return () => {
      const existingScript = document.querySelector('script[data-name="bmc-button"]')
      if (existingScript) {
        existingScript.remove()
        scriptLoaded.current = false
      }
    }
  }, [])

  return <div ref={containerRef} className="my-8 flex justify-center" />
}
