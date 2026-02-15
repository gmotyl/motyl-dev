'use client'

import { useState, useMemo, useCallback } from 'react'
import { ArticleSectionToggle } from '@/components/article-section-toggle'
import { MarkdownWithCTA } from '@/components/markdown-with-cta'
import { ShareAIButton } from '@/components/share-ai-button'
import { TTSPlayer } from '@/components/tts-player'
import { filterHiddenSections, type SectionType } from '@/lib/section-filter'
import { ItemType } from '@/lib/types'

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

// Detect language from hashtags
const detectLanguageFromHashtags = (hashtags: string[] = []): string => {
  const languageMap: Record<string, string> = {
    pl: 'pl-PL-MarekNeural',
    en: 'en-GB-RyanNeural',
    es: 'es-ES-ElviraNeural',
    fr: 'fr-FR-DeniseNeural',
    de: 'de-DE-KatjaNeural',
    it: 'it-IT-ElsaNeural',
    pt: 'pt-PT-RaquelNeural',
    ru: 'ru-RU-SvetlanaNeural',
    ja: 'ja-JP-NanamiNeural',
    zh: 'zh-CN-XiaoxiaoNeural',
    ko: 'ko-KR-SunHiNeural',
  }

  for (const hashtag of hashtags) {
    const lang = hashtag.toLowerCase()
    if (languageMap[lang]) {
      return languageMap[lang]
    }
  }

  // Default to English (British male voice)
  return 'en-GB-RyanNeural'
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
