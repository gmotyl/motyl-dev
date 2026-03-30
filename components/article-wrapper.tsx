'use client'

import { useMemo } from 'react'
import { ArticleSectionToggle } from '@/components/article-section-toggle'
import { MarkdownWithCTA } from '@/components/markdown-with-cta'
import { ShareAIButton } from '@/components/share-ai-button'
import { TTSPlayer } from '@/components/tts-player'
import { filterHiddenSections, type SectionType } from '@/lib/section-filter'
import { ItemType } from '@/lib/types'
import { detectLanguageFromHashtags } from '@/lib/tts'
import { getContentCategory } from '@/lib/og'
import { useSectionVisibility } from '@/hooks/use-section-visibility'

interface ArticleWrapperProps {
  article: {
    slug: string
    content: string
    title: string
    itemType: ItemType
    hashtags?: string[]
    sourcePattern?: string
  }
  translatePrompt: string
}

export function ArticleWrapper({ article, translatePrompt }: ArticleWrapperProps) {
  const isNews = article.itemType === ItemType.News
  const { hiddenSections, toggleSection, isHydrated } = useSectionVisibility(
    isNews ? ['summary', 'keyTakeaways', 'tradeoffs'] : []
  )

  const filteredContent = useMemo(() => {
    return isNews ? filterHiddenSections(article.content, hiddenSections) : article.content
  }, [article.content, hiddenSections, isNews])

  const voice = detectLanguageFromHashtags(article.hashtags)

  return (
    <>
      {isNews && isHydrated && (
        <ArticleSectionToggle hiddenSections={hiddenSections} onToggle={toggleSection} />
      )}

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
        category={getContentCategory(article.hashtags ?? [])}
        patternName={article.sourcePattern}
      />
    </>
  )
}
