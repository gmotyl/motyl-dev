'use client'

import { Share2, Copy, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ShareLinkButtonProps {
  url: string
  title?: string
  summaryPrompt: string
}

const DEFAULT_OUTPUT_LANGUAGE = 'Polish'
const STORAGE_KEY_LANGUAGE = 'share-link-output-language'

export function ShareLinkButton({ url, title, summaryPrompt }: ShareLinkButtonProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [outputLanguage, setOutputLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE)
  const [editLanguage, setEditLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    setIsMobile(mobile)

    // Load custom settings from localStorage
    const savedLanguage = localStorage.getItem(STORAGE_KEY_LANGUAGE)

    if (savedLanguage) {
      setOutputLanguage(savedLanguage)
      setEditLanguage(savedLanguage)
    }
  }, [])

  // Format the prompt using SUMMARY_PROMPT.md template
  const formatPrompt = (): string => {
    // Replace placeholders in the summary prompt template
    const filledPrompt = summaryPrompt
      .replace(/{OUTPUT_LANGUAGE}/g, outputLanguage)
      .replace(/{ARTICLE_URL}/g, url)

    return filledPrompt
  }

  const handleSaveSettings = () => {
    localStorage.setItem(STORAGE_KEY_LANGUAGE, editLanguage)
    setOutputLanguage(editLanguage)
    setIsOpen(false)
    toast.success('Settings saved!')
  }

  const handleResetSettings = () => {
    setEditLanguage(DEFAULT_OUTPUT_LANGUAGE)
    localStorage.removeItem(STORAGE_KEY_LANGUAGE)
    setOutputLanguage(DEFAULT_OUTPUT_LANGUAGE)
    toast.success('Settings reset to default')
  }

  const handleShare = async () => {
    const prompt = formatPrompt()

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Summarize linked article with AI',
          text: prompt,
        })
        toast.success('Shared successfully! Send the message to AI for summary 🔊')
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
      toast.success('Copied! Paste in ChatGPT/Gemini to fetch and summarize this link 🔊', {
        duration: 6000,
      })
    } catch (err) {
      console.error('Copy failed:', err)
      toast.error('Failed to copy. Please try again.')
    }
  }

  return (
    <div className="flex gap-1 my-1">
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="gap-2"
        title={
          isMobile
            ? 'Share this link to ChatGPT/Gemini for AI summary'
            : 'Copy this link for ChatGPT/Gemini to fetch and summarize'
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

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2" title="Customize output language">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start" side="top">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Output Language</Label>
              <Input
                id="language"
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.target.value)}
                placeholder={DEFAULT_OUTPUT_LANGUAGE}
              />
              <p className="text-xs text-muted-foreground">Language for the AI content rewrite</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveSettings} size="sm" className="flex-1">
                Save
              </Button>
              <Button onClick={handleResetSettings} size="sm" variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
