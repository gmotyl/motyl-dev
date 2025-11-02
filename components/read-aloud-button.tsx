'use client'

import { Volume2, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface ReadAloudButtonProps {
  hashtags?: string[]
}

export function ReadAloudButton({ hashtags = [] }: ReadAloudButtonProps) {
  const [isReading, setIsReading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isEdge, setIsEdge] = useState(false)

  useEffect(() => {
    // Detect if browser is Edge
    const userAgent = navigator.userAgent.toLowerCase()
    setIsEdge(userAgent.includes('edg/'))

    // Preload voices on mobile browsers
    if ('speechSynthesis' in window) {
      // This triggers voice loading on mobile
      const voices = window.speechSynthesis.getVoices()

      // Some mobile browsers need this event to load voices
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          window.speechSynthesis.getVoices()
        }, { once: true })
      }
    }
  }, [])

  const detectLanguageFromHashtags = (hashtags: string[]): string => {
    // Language mapping: hashtag -> BCP 47 language code
    const languageMap: Record<string, string> = {
      pl: 'pl-PL',
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      it: 'it-IT',
      pt: 'pt-PT',
      ru: 'ru-RU',
      ja: 'ja-JP',
      zh: 'zh-CN',
      ko: 'ko-KR',
      ar: 'ar-SA',
      hi: 'hi-IN',
      nl: 'nl-NL',
      sv: 'sv-SE',
      no: 'no-NO',
      da: 'da-DK',
      fi: 'fi-FI',
      tr: 'tr-TR',
      cs: 'cs-CZ',
      uk: 'uk-UA',
    }

    // Check if any hashtag matches a language code
    for (const hashtag of hashtags) {
      const lang = hashtag.toLowerCase()
      if (languageMap[lang]) {
        return languageMap[lang]
      }
    }

    // Default to Polish (most common on motyl.dev)
    return 'pl-PL'
  }

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      // If currently reading and not paused, pause it
      if (isReading && !isPaused) {
        window.speechSynthesis.pause()
        setIsPaused(true)
        return
      }

      // If paused, resume
      if (isPaused) {
        window.speechSynthesis.resume()
        setIsPaused(false)
        return
      }

      // Otherwise, start new reading
      const article = document.querySelector('article')
      if (!article) return

      // Get article title (use textContent for TypeScript compatibility)
      const titleElement = article.querySelector('h1')
      const title = titleElement?.textContent || ''

      // Get article content, excluding hashtags
      // We'll select the prose container which has the actual content
      const contentElement = article.querySelector('.prose')
      const content = contentElement?.textContent || ''

      // Combine title and content
      const textContent = `${title}. ${content}`

      // Detect language from hashtags prop
      const language = detectLanguageFromHashtags(hashtags)

      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(textContent)
      utterance.lang = language
      utterance.rate = 1.0
      utterance.pitch = 1.0

      // Try to select appropriate voice for the detected language
      const voices = window.speechSynthesis.getVoices()
      const matchingVoice = voices.find(voice => voice.lang === language) ||
                           voices.find(voice => voice.lang.startsWith(language.split('-')[0]))

      if (matchingVoice) {
        utterance.voice = matchingVoice
      }

      utterance.onend = () => {
        setIsReading(false)
        setIsPaused(false)
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setIsReading(false)
        setIsPaused(false)
      }

      utterance.onpause = () => {
        setIsPaused(true)
      }

      utterance.onresume = () => {
        setIsPaused(false)
      }

      // Cancel any previous speech and start new one
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
      setIsReading(true)
      setIsPaused(false)
    }
  }

  if (!isEdge && typeof window !== 'undefined' && !('speechSynthesis' in window)) {
    return null // Don't show button if speech synthesis not supported
  }

  return (
    <div className="hidden md:flex items-center gap-4">
      <Button
        onClick={handleReadAloud}
        variant={isReading && !isPaused ? 'default' : 'outline'}
        size="sm"
        className="gap-2"
        title={
          isPaused
            ? 'Resume reading'
            : isReading
            ? 'Pause reading'
            : 'Read article aloud'
        }
      >
        {isPaused ? (
          <>
            <Play className="h-4 w-4" />
            Resume
          </>
        ) : isReading ? (
          <>
            <Pause className="h-4 w-4" />
            Pause
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4" />
            Read Aloud
          </>
        )}
      </Button>
      {isEdge && !isReading && (
        <span className="text-xs text-muted-foreground">
          Tip: Press Ctrl+Shift+U for native Edge Read Aloud
        </span>
      )}
    </div>
  )
}
