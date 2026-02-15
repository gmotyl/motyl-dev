'use client'

import { useState, useMemo, useCallback } from 'react'
import { ArticleSectionToggle } from '@/components/article-section-toggle'
import { MarkdownWithCTA } from '@/components/markdown-with-cta'
import { ShareAIButton } from '@/components/share-ai-button'
import { TTSPlayer } from '@/components/tts-player'
import { filterHiddenSections, type SectionType } from '@/lib/section-filter'
import { ItemType } from '@/lib/types'
import { detectLanguageFromHashtags } from '@/lib/tts'

interface ArticleWrapperProps {
  article: {
    slug: string
    content: string
    title: string
    itemType: ItemType
    hashtags?: string[]
  }
  translatePrompt: string
}

export function ArticleWrapper({ article, translatePrompt }: ArticleWrapperProps) {
  const isNews = article.itemType === ItemType.News
  const [hiddenSections, setHiddenSections] = useState<Set<SectionType>>(
    isNews ? new Set(['summary', 'keyTakeaways', 'tradeoffs']) : new Set()
  )

  const filteredContent = useMemo(() => {
    return isNews ? filterHiddenSections(article.content, hiddenSections) : article.content
  }, [article.content, hiddenSections, isNews])

  const handleToggleChange = useCallback((newHidden: Set<SectionType>) => {
    setHiddenSections(newHidden)
  }, [])

  // Detect voice from hashtags
  const voice = detectLanguageFromHashtags(article.hashtags)

  return (
    <>
      {isNews && <ArticleSectionToggle onChange={handleToggleChange} />}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <ShareAIButton
          prompt={translatePrompt}
          articleSlug={article.slug}
          articleContent={filteredContent}
          buttonLabel="AI Review"
          shareTitle="Review article with AI"
          successMessage="Shared successfully! Now send the message and tap Read Aloud"
          desktopSuccessMessage="Copied! Open ChatGPT or Gemini, paste, and use Read Aloud"
        />

        <TTSPlayer content={filteredContent} title={article.title} voice={voice} compact />
      </div>

      <MarkdownWithCTA
        content={filteredContent}
        itemType={article.itemType}
        articleSlug={article.slug}
      />
    </>
  )
}
