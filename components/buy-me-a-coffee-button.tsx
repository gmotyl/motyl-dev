'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    bmcButton?: {
      render: () => void
    }
  }
}

export function BuyMeACoffeeButton() {
  useEffect(() => {
    const loadBMCButton = () => {
      // Check if script already exists
      if (document.querySelector('script[data-name="bmc-button"]')) {
        return
      }

      const script = document.createElement('script')
      script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
      script.setAttribute('data-name', 'bmc-button')
      script.setAttribute('data-slug', 'motyl.dev')
      script.setAttribute('data-color', '#BD5FFF')
      script.setAttribute('data-emoji', '')
      script.setAttribute('data-font', 'Cookie')
      script.setAttribute('data-text', 'Buy me a coffee')
      script.setAttribute('data-outline-color', '#000000')
      script.setAttribute('data-font-color', '#ffffff')
      script.setAttribute('data-coffee-color', '#FFDD00')

      script.onload = () => {
        if (window.bmcButton) {
          window.bmcButton.render()
        }
      }

      script.onerror = () => {
        console.error('Failed to load Buy Me A Coffee button')
      }

      document.body.appendChild(script)
    }

    loadBMCButton()
  }, [])

  return <div className="my-8 flex justify-center" id="bmc-button-container" />
}
