import type { SectionType } from './articles'

export type { SectionType }

const SECTION_PATTERNS: Record<SectionType, RegExp> = {
  tldr: /\*\*TLDR:\*\*[\s\S]*?(?=\n\n)/gi,
  summary: /\*\*Summary:\*\*[\s\S]*?(?=\n\n)/gi,
  keyTakeaways: /\*\*Key takeaways:\*\*[\s\S]*?(?=\n\n)/gi,
  tradeoffs: /\*\*Tradeoffs:\*\*[\s\S]*?(?=\n\n)/gi,
}

export function filterHiddenSections(content: string, hiddenTypes: Set<SectionType>): string {
  let filtered = content
  for (const type of hiddenTypes) {
    filtered = filtered.replace(SECTION_PATTERNS[type], '')
  }
  return filtered
}
