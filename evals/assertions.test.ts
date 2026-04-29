import { describe, it, expect } from 'vitest';
import {
  assertHasFrontmatter, assertHasTitle, assertHasExcerpt, assertPublishedAt,
  assertSlugFormat, assertHasHashtags, assertGeneratedHashtag, assertHasArticleHeadings,
  assertHasTldr, assertHasKeyTakeaways, assertHasWhyDoICare, assertNoEmDash,
  assertNoPersonaName, assertNoCoAuthoredBy, assertNoGeneratedWith,
  assertNoAiVocabulary, assertNoCodeBlocks, assertFixtureKeyword,
  runAllAssertions,
} from './assertions';

const VALID_ARTICLE = `---
title: "Turbopack and React 19: This Week in Frontend"
excerpt: "Turbopack hits stable while React 19 ships its compiler."
publishedAt: "2026-04-29"
slug: "turbopack-react-19-frontend-week"
hashtags: "#jsweekly #javascript #generated #en"
source_pattern: "JavaScript Weekly"
---

## Turbopack reaches stable: what changed in build performance

**TLDR:** Turbopack has reached stable release with 10x faster builds compared to Webpack on large codebases.

**Summary:** The Vercel team has shipped Turbopack as the default bundler in Next.js 15 production builds. The key architectural change was treating the module graph as a persistent data structure rather than rebuilding from scratch on each change.

**Key takeaways:**
- Cold start times drop from 7 seconds to 700ms on 50,000-module projects
- Webpack migration is supported via a compatibility layer

**Why do I care:** This matters for teams running large Next.js codebases in CI.

**Link:** [Turbopack reaches stable](https://example-eval.dev/turbopack-build-performance)

## React 19 compiler internals: how auto-memoization works

**TLDR:** The React 19 compiler auto-inserts useMemo and useCallback by tracking value identity.

**Summary:** The compiler performs static analysis to wrap stable values in memo boundaries.

**Key takeaways:**
- Opt-in per file via a build directive
- Works with both Babel and SWC

**Why do I care:** Auto-memoization fixes a class of performance bugs that required manual auditing.

**Link:** [React 19 compiler internals](https://example-eval.dev/react-19-compiler-internals)
`;

describe('assertHasFrontmatter', () => {
  it('passes for valid frontmatter', () => {
    expect(assertHasFrontmatter(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when no frontmatter', () => {
    expect(assertHasFrontmatter('No frontmatter here').pass).toBe(false);
  });
});

describe('assertHasTitle', () => {
  it('passes when title present', () => {
    expect(assertHasTitle(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when title missing', () => {
    const bad = VALID_ARTICLE.replace('title: "Turbopack and React 19: This Week in Frontend"', '');
    expect(assertHasTitle(bad).pass).toBe(false);
  });
});

describe('assertHasExcerpt', () => {
  it('passes when excerpt present', () => {
    expect(assertHasExcerpt(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when excerpt missing', () => {
    const bad = VALID_ARTICLE.replace(/excerpt:.*\n/, '');
    expect(assertHasExcerpt(bad).pass).toBe(false);
  });
});

describe('assertPublishedAt', () => {
  it('passes for YYYY-MM-DD', () => {
    expect(assertPublishedAt(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails for wrong format', () => {
    const bad = VALID_ARTICLE.replace('publishedAt: "2026-04-29"', 'publishedAt: "29/04/2026"');
    expect(assertPublishedAt(bad).pass).toBe(false);
  });
});

describe('assertSlugFormat', () => {
  it('passes for valid slug', () => {
    expect(assertSlugFormat(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when slug has spaces', () => {
    const bad = VALID_ARTICLE.replace('slug: "turbopack-react-19-frontend-week"', 'slug: "turbopack react 19"');
    expect(assertSlugFormat(bad).pass).toBe(false);
  });
  it('fails when slug has uppercase', () => {
    const bad = VALID_ARTICLE.replace('slug: "turbopack-react-19-frontend-week"', 'slug: "Turbopack-React-19"');
    expect(assertSlugFormat(bad).pass).toBe(false);
  });
});

describe('assertHasHashtags', () => {
  it('passes when hashtags present', () => {
    expect(assertHasHashtags(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when hashtags missing', () => {
    const bad = VALID_ARTICLE.replace(/hashtags:.*\n/, '');
    expect(assertHasHashtags(bad).pass).toBe(false);
  });
});

describe('assertGeneratedHashtag', () => {
  it('passes when #generated present', () => {
    expect(assertGeneratedHashtag(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when #generated missing', () => {
    const bad = VALID_ARTICLE.replace('#generated', '#notgenerated');
    expect(assertGeneratedHashtag(bad).pass).toBe(false);
  });
});

describe('assertHasArticleHeadings', () => {
  it('passes when ## heading present', () => {
    expect(assertHasArticleHeadings(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when no ## heading in body', () => {
    const bad = VALID_ARTICLE.replace(/^## .*/gm, '### demoted');
    expect(assertHasArticleHeadings(bad).pass).toBe(false);
  });
});

describe('assertHasTldr', () => {
  it('passes when **TLDR:** present', () => {
    expect(assertHasTldr(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when **TLDR:** missing', () => {
    const bad = VALID_ARTICLE.replace(/\*\*TLDR:\*\*/g, 'Summary:');
    expect(assertHasTldr(bad).pass).toBe(false);
  });
});

describe('assertHasKeyTakeaways', () => {
  it('passes when **Key takeaways:** present', () => {
    expect(assertHasKeyTakeaways(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when **Key takeaways:** missing', () => {
    const bad = VALID_ARTICLE.replace(/\*\*Key takeaways:\*\*/g, '**Lessons:**');
    expect(assertHasKeyTakeaways(bad).pass).toBe(false);
  });
});

describe('assertHasWhyDoICare', () => {
  it('passes when **Why do I care:** present', () => {
    expect(assertHasWhyDoICare(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when **Why do I care:** missing', () => {
    const bad = VALID_ARTICLE.replace(/\*\*Why do I care:\*\*/g, '**Opinion:**');
    expect(assertHasWhyDoICare(bad).pass).toBe(false);
  });
});

describe('assertNoEmDash', () => {
  it('passes when no em dash', () => {
    expect(assertNoEmDash(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when em dash present in body', () => {
    const bad = VALID_ARTICLE + '\nThis is — bad.';
    expect(assertNoEmDash(bad).pass).toBe(false);
  });
});

describe('assertNoPersonaName', () => {
  it('passes when persona name absent', () => {
    expect(assertNoPersonaName(VALID_ARTICLE, 'Sherlock Holmes').pass).toBe(true);
  });
  it('fails when persona name present in body', () => {
    const bad = VALID_ARTICLE + '\nSherlock Holmes here, and I think this is fascinating.';
    expect(assertNoPersonaName(bad, 'Sherlock Holmes').pass).toBe(false);
  });
});

describe('assertNoCoAuthoredBy', () => {
  it('passes when not present', () => {
    expect(assertNoCoAuthoredBy(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when Co-Authored-By present', () => {
    expect(assertNoCoAuthoredBy(VALID_ARTICLE + '\nCo-Authored-By: Claude').pass).toBe(false);
  });
});

describe('assertNoGeneratedWith', () => {
  it('passes when not present', () => {
    expect(assertNoGeneratedWith(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when "generated with" present', () => {
    expect(assertNoGeneratedWith(VALID_ARTICLE + '\nGenerated with Claude Code').pass).toBe(false);
  });
});

describe('assertNoAiVocabulary', () => {
  it('passes for clean prose', () => {
    expect(assertNoAiVocabulary(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when banned word present', () => {
    const bad = VALID_ARTICLE + '\nThis is crucial to understand.';
    expect(assertNoAiVocabulary(bad).pass).toBe(false);
  });
  it('detects multiple banned words', () => {
    const bad = VALID_ARTICLE + '\nAdditionally, this pivotal change will enhance our workflow.';
    const result = assertNoAiVocabulary(bad);
    expect(result.pass).toBe(false);
    expect(result.message).toContain('additionally');
  });
});

describe('assertNoCodeBlocks', () => {
  it('passes when no code blocks', () => {
    expect(assertNoCodeBlocks(VALID_ARTICLE).pass).toBe(true);
  });
  it('fails when fenced code block present', () => {
    const bad = VALID_ARTICLE + '\n```js\nconsole.log("hi")\n```';
    expect(assertNoCodeBlocks(bad).pass).toBe(false);
  });
});

describe('assertFixtureKeyword', () => {
  it('passes when Turbopack present', () => {
    expect(assertFixtureKeyword(VALID_ARTICLE).pass).toBe(true);
  });
  it('passes when React 19 present', () => {
    const withReact = VALID_ARTICLE.replace('Turbopack', 'React 19');
    expect(assertFixtureKeyword(withReact).pass).toBe(true);
  });
  it('fails when neither keyword present', () => {
    const bad = VALID_ARTICLE.replace(/Turbopack/g, 'FastBundler').replace(/React 19/g, 'SomeLib');
    expect(assertFixtureKeyword(bad).pass).toBe(false);
  });
});

describe('runAllAssertions', () => {
  it('returns 18 results', () => {
    const results = runAllAssertions(VALID_ARTICLE);
    expect(results).toHaveLength(18);
  });
  it('all pass for valid article', () => {
    const results = runAllAssertions(VALID_ARTICLE);
    const failed = results.filter(r => !r.pass);
    expect(failed).toEqual([]);
  });
});
