import { describe, expect, it } from 'vitest'

import {
  extractPolishTtsCandidates,
  renderDictionaryProposal,
} from './extract-polish-tts-candidates'

const polishArticles = [
  {
    file: 'news/2026/polish-one.md',
    content: `---
title: "GPT 9.9 in frontmatter"
hashtags: "#pl #generated"
---

## Polish article

API i GPT 5.6 działają w React. GPT-5.6 jest nowszą wersją. OpenAI rozwija server-side narzędzia.
API wraca w kolejnym zdaniu.

[link](https://example.com/GPT-8.8) oraz \`MARKDOWNONLY\` nie powinny trafić do propozycji.
`,
  },
  {
    file: 'news/2026/english.md',
    content: `---
hashtags: "#en"
---

API GPT 8.8 English content.
`,
  },
]

describe('extractPolishTtsCandidates', () => {
  it('groups candidate acronyms and technical names from Polish News Articles', () => {
    const result = extractPolishTtsCandidates(polishArticles)

    expect(result.acronyms).toEqual(expect.arrayContaining([
      expect.objectContaining({ term: 'API', frequency: 2 }),
    ]))
    expect(result['model/version']).toEqual(expect.arrayContaining([
      expect.objectContaining({ term: 'GPT 5.6', frequency: 1 }),
      expect.objectContaining({ term: 'GPT-5.6', frequency: 1 }),
    ]))
    expect(result['technical-name']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ term: 'React' }),
        expect.objectContaining({ term: 'OpenAI' }),
      ])
    )
    expect(result.hyphenated).toEqual([
      expect.objectContaining({ term: 'server-side', frequency: 1 }),
    ])
  })

  it('excludes frontmatter URLs and Markdown-only tokens', () => {
    const result = extractPolishTtsCandidates(polishArticles)
    const terms = Object.values(result)
      .flat()
      .map((candidate) => candidate.term)

    expect(terms).not.toEqual(
      expect.arrayContaining(['GPT 9.9', 'GPT-8.8', 'MARKDOWNONLY'])
    )
  })

  it('renders frequency and an example source for every proposal entry', () => {
    const proposal = renderDictionaryProposal(
      extractPolishTtsCandidates(polishArticles)
    )

    expect(proposal).toContain('# Polish TTS dictionary proposal')
    expect(proposal).toContain('## Acronyms')
    expect(proposal).toContain('`API` — frequency: 2; source: `news/2026/polish-one.md`')
    expect(proposal).toContain('Pending human approval')
    expect(proposal).not.toContain('→')
  })
})
