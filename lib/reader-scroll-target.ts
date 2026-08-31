import { headingToId } from '@/lib/heading-slug'
import { stripMarkdown, type SpeechSection } from '@/lib/tts-speech'
import type { ScrollHint } from '@/hooks/use-continuous-reader'

/**
 * Resolve the DOM element the reader should scroll to the top for a section change.
 *
 * - `{ line }`  paragraph play → the clicked paragraph (its `[data-line]` button's
 *   wrapper), falling back to the section heading if not found.
 * - `{ link: true }`  Next → the section's source link box (`[data-section-link]` =
 *   the section heading id), so the link stays at the top and the next section's
 *   title appears just below it; falls back to the heading if the section has none.
 * - otherwise  the section heading.
 *
 * `article` is the `<article data-reader-article>` element for the section's source.
 */
export function resolveScrollTarget(
  article: HTMLElement | undefined,
  sections: readonly SpeechSection[],
  section: SpeechSection,
  index: number,
  scroll?: ScrollHint,
): HTMLElement | null | undefined {
  const title = stripMarkdown(section.title)

  if (scroll && 'line' in scroll && article) {
    const lineEl = article.querySelector<HTMLElement>(`[data-line="${CSS.escape(String(scroll.line))}"]`)
    const paragraph = lineEl?.parentElement ?? lineEl
    if (paragraph) return paragraph
  }

  const occurrence = sections
    .slice(0, index)
    .filter((candidate) => candidate.sourceSlug === section.sourceSlug)
    .filter((candidate) => stripMarkdown(candidate.title) === title).length
  const headings = Array.from(article?.querySelectorAll<HTMLElement>('h2') ?? [])
  // First occurrence carries the plain rehype-slug id; later duplicates get -1/-2
  // suffixes, so fall back to textContent matching for those.
  const heading =
    (occurrence === 0 ? headings.find((h) => h.id === headingToId(title)) : undefined) ??
    headings.filter((h) => stripMarkdown(h.textContent ?? '') === title)[occurrence]

  if (scroll && 'link' in scroll && heading?.id && article) {
    const links = article.querySelectorAll<HTMLElement>(
      `[data-section-link="${CSS.escape(heading.id)}"]`,
    )
    // The section's source "Link:" is emitted as the last element of its content,
    // so among a section's links it is always the last in DOM order. Any inline
    // body links precede it, hence `links.length - 1` is the source link.
    const linkEl = links[links.length - 1]
    if (linkEl) return linkEl
  }

  return heading
}
