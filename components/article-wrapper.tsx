'use client'

import { useCallback, useMemo } from 'react'
import { ArticleSectionToggle } from '@/components/article-section-toggle'
import { ReaderControlBar } from '@/components/reader-control-bar'
import { MarkdownContent } from '@/components/markdown-content'
import { MarkdownWithCTA } from '@/components/markdown-with-cta'
import { ShareAIButton } from '@/components/share-ai-button'
import { TTSPlayer } from '@/components/tts-player'
import { useContinuousReader } from '@/hooks/use-continuous-reader'
import { filterHiddenSections, type SectionType } from '@/lib/section-filter'
import { ItemType } from '@/lib/types'
import { getContentCategory } from '@/lib/og'
import { prepareSpeechSections, stripMarkdown, type SpeechSection } from '@/lib/tts-speech'
import { headingToId } from '@/lib/heading-slug'
import { detectLanguageFromHashtags } from '@/lib/tts'
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
  const { hiddenSections, toggleSection, isHydrated } = useSectionVisibility()

  const filteredContent = useMemo(() => {
    return isNews ? filterHiddenSections(article.content, hiddenSections) : article.content
  }, [article.content, hiddenSections, isNews])

  const voice = detectLanguageFromHashtags(article.hashtags)

  const speechSections = useMemo(
    () => isNews
      ? prepareSpeechSections([{ slug: article.slug, title: article.title, content: filteredContent }])
      : [],
    [article.slug, article.title, filteredContent, isNews]
  )

  const scrollToSection = useCallback((section: SpeechSection, index: number) => {
    const title = stripMarkdown(section.title)
    const occurrence = speechSections
      .slice(0, index)
      .filter((candidate) => stripMarkdown(candidate.title) === title).length
    const headings = Array.from(document.querySelectorAll<HTMLElement>('.prose h2'))
    // First occurrence carries the plain rehype-slug id; later duplicates get -1/-2
    // suffixes, so fall back to textContent matching for those.
    const target = (occurrence === 0
      ? headings.find((heading) => heading.id === headingToId(title))
      : undefined)
      ?? headings.filter((heading) => stripMarkdown(heading.textContent ?? '') === title)[occurrence]
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [speechSections])

  const reader = useContinuousReader(speechSections, { onItemChange: scrollToSection })

  // Section-stable: only changes on section advance / play / pause, NOT on the
  // ~60fps progress ticks, so passing it to the memoized MarkdownContent below
  // does not reintroduce 60fps re-renders.
  const readingActive = reader.isPlaying || reader.isBuffering || (reader.progress > 0 && reader.progress < 100)
  const activeSectionIndex = readingActive ? reader.currentIndex : null

  // Stable identity so the memoized MarkdownContent is not re-rendered by the
  // reader's ~60fps progress ticks. Only re-created when playback wiring, the
  // section set, or the active section actually changes.
  const markdownReader = useMemo(
    () => ({
      onPlayFromHere: reader.playFromHere,
      getSectionIndex: (heading: string) => {
        const index = speechSections.findIndex(
          (section) => stripMarkdown(section.title) === stripMarkdown(heading)
        )
        return index < 0 ? null : index
      },
      currentSectionIndex: activeSectionIndex,
    }),
    [reader.playFromHere, speechSections, activeSectionIndex]
  )

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

        {!isNews && (
          <TTSPlayer content={filteredContent} title={article.title} voice={voice} compact />
        )}
      </div>

      {isNews && (
        <ReaderControlBar
          markReadDisabled
          canPlay={speechSections.length > 0}
          canNext={reader.canNext}
          isPlaying={reader.isPlaying}
          isBuffering={reader.isBuffering}
          onPlayPause={() => (reader.isPlaying ? reader.pause() : reader.play())}
          onNext={reader.next}
          onMarkRead={() => undefined}
        />
      )}

      {isNews ? (
        <MarkdownContent
          content={filteredContent}
          itemType={article.itemType}
          category={getContentCategory(article.hashtags ?? [])}
          patternName={article.sourcePattern}
          reader={markdownReader}
        />
      ) : (
        <MarkdownWithCTA
          content={filteredContent}
          itemType={article.itemType}
          articleSlug={article.slug}
          category={getContentCategory(article.hashtags ?? [])}
          patternName={article.sourcePattern}
        />
      )}
    </>
  )
}
