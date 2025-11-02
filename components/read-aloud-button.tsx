'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function ReadAloudButton() {
  const [isReading, setIsReading] = useState(false)
  const [isEdge, setIsEdge] = useState(false)

  useEffect(() => {
    // Detect if browser is Edge
    const userAgent = navigator.userAgent.toLowerCase()
    setIsEdge(userAgent.includes('edg/'))
  }, [])

  const handleReadAloud = () => {
    // For Edge browser, try to use native Read Aloud via keyboard shortcut simulation
    // Edge Read Aloud is triggered by Ctrl+Shift+U
    if ('speechSynthesis' in window) {
      if (isReading) {
        // Stop reading
        window.speechSynthesis.cancel()
        setIsReading(false)
      } else {
        // Start reading - use Web Speech API
        const article = document.querySelector('article')
        if (!article) return

        // Get article title
        const title = article.querySelector('h1')?.innerText || ''

        // Get article content, excluding hashtags
        // We'll select the prose container which has the actual content
        const contentElement = article.querySelector('.prose')
        const content = contentElement?.innerText || ''

        // Combine title and content, skip hashtags
        const textContent = `${title}. ${content}`

        // Split into manageable chunks (Edge has character limits)
        const utterance = new SpeechSynthesisUtterance(textContent)

        // Set Polish language if available
        utterance.lang = 'pl-PL'
        utterance.rate = 1.0
        utterance.pitch = 1.0

        utterance.onend = () => {
          setIsReading(false)
        }

        utterance.onerror = () => {
          setIsReading(false)
        }

        window.speechSynthesis.speak(utterance)
        setIsReading(true)
      }
    }
  }

  if (!isEdge && typeof window !== 'undefined' && !('speechSynthesis' in window)) {
    return null // Don't show button if speech synthesis not supported
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handleReadAloud}
        variant={isReading ? "destructive" : "outline"}
        size="sm"
        className="gap-2"
        title={isReading ? "Stop reading" : "Read article aloud"}
      >
        {isReading ? (
          <>
            <VolumeX className="h-4 w-4" />
            Stop Reading
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4" />
            Read Aloud
          </>
        )}
      </Button>
      {isEdge && (
        <span className="text-xs text-muted-foreground">
          Tip: Press Ctrl+Shift+U for native Edge Read Aloud
        </span>
      )}
    </div>
  )
}
