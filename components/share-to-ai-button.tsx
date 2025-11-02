'use client'

import { Share2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface ShareToAIButtonProps {
  content: string
}

export function ShareToAIButton({ content }: ShareToAIButtonProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    setIsMobile(mobile)
  }, [])

  // Clean content: remove markdown, excessive whitespace
  const cleanContent = (text: string): string => {
    return text
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/`{1,3}/g, '') // Remove code blocks
      .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
      .trim()
  }

  // Format the magic prompt
  const formatPrompt = (): string => {
    const cleaned = cleanContent(content)
    return `Rewrite this information back to me without changing anything: ${cleaned}`
  }

  const handleShare = async () => {
    const prompt = formatPrompt()

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Read article with AI',
          text: prompt,
        })
        toast.success('Shared successfully! Now send the message and tap Read Aloud 🔊')
      } catch (err) {
        // User cancelled or error occurred
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Share failed:', err)
          // Fallback to clipboard
          await handleCopy(prompt)
        }
      }
    } else {
      // Fallback to clipboard for desktop
      await handleCopy(prompt)
    }
  }

  const handleCopy = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast.success(
        'Copied! Open ChatGPT or Gemini, paste, and use Read Aloud 🔊',
        {
          duration: 6000,
        }
      )
    } catch (err) {
      console.error('Copy failed:', err)
      toast.error('Failed to copy. Please try again.')
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="gap-2"
      title={
        isMobile
          ? 'Share article to ChatGPT/Gemini for high-quality TTS'
          : 'Copy article for ChatGPT/Gemini TTS'
      }
    >
      {isMobile ? (
        <>
          <Share2 className="h-4 w-4" />
          Read with AI
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy for AI
        </>
      )}
    </Button>
  )
}
