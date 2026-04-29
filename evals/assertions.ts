export interface AssertionResult {
  pass: boolean;
  name: string;
  message?: string;
}

function getBody(content: string): string {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return match ? match[1] : content;
}

function getFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

export function assertHasFrontmatter(content: string): AssertionResult {
  const pass = /^---\r?\n[\s\S]*?\r?\n---/.test(content);
  return { name: 'Has valid frontmatter', pass, message: pass ? undefined : 'No --- frontmatter block found' };
}

export function assertHasTitle(content: string): AssertionResult {
  const fm = getFrontmatter(content);
  const pass = !!fm.title && fm.title.length > 0;
  return { name: 'title present and non-empty', pass, message: pass ? undefined : `title missing or empty, got: "${fm.title}"` };
}

export function assertHasExcerpt(content: string): AssertionResult {
  const fm = getFrontmatter(content);
  const pass = !!fm.excerpt && fm.excerpt.length > 0;
  return { name: 'excerpt present and non-empty', pass, message: pass ? undefined : 'excerpt missing or empty' };
}

export function assertPublishedAt(content: string): AssertionResult {
  const fm = getFrontmatter(content);
  const value = fm.publishedAt?.trim();
  const pass = !!value && /^\d{4}-\d{2}-\d{2}$/.test(value);
  return { name: 'publishedAt is YYYY-MM-DD', pass, message: pass ? undefined : `publishedAt invalid: "${value}"` };
}

export function assertSlugFormat(content: string): AssertionResult {
  const fm = getFrontmatter(content);
  const value = fm.slug?.trim();
  const pass = !!value && /^[a-z0-9-]+$/.test(value);
  return { name: 'slug is URL-safe', pass, message: pass ? undefined : `slug invalid: "${value}"` };
}

export function assertHasHashtags(content: string): AssertionResult {
  const fm = getFrontmatter(content);
  const pass = !!fm.hashtags && fm.hashtags.length > 0;
  return { name: 'hashtags present', pass, message: pass ? undefined : 'hashtags field missing or empty' };
}

export function assertGeneratedHashtag(content: string): AssertionResult {
  const fm = getFrontmatter(content);
  // Accept both space-separated string and JSON array formats
  const raw = fm.hashtags ?? '';
  const pass = raw.includes('#generated');
  return { name: '#generated in hashtags', pass, message: pass ? undefined : `#generated not found in: "${raw}"` };
}

export function assertHasArticleHeadings(content: string): AssertionResult {
  const body = getBody(content);
  const pass = /^## /m.test(body);
  return { name: 'Has ## article headings', pass, message: pass ? undefined : 'No ## headings found in body' };
}

export function assertHasTldr(content: string): AssertionResult {
  const body = getBody(content);
  const pass = /\*\*TLDR:\*\*/i.test(body) || /^## TLDR/im.test(body);
  return { name: 'Has TLDR section', pass, message: pass ? undefined : 'TLDR section not found (neither **TLDR:** nor ## TLDR)' };
}

export function assertHasKeyTakeaways(content: string): AssertionResult {
  const body = getBody(content);
  const pass = /\*\*Key takeaways:\*\*/i.test(body) || /^## Key takeaways/im.test(body);
  return { name: 'Has Key takeaways section', pass, message: pass ? undefined : 'Key takeaways section not found' };
}

export function assertHasWhyDoICare(content: string): AssertionResult {
  const body = getBody(content);
  const pass = /\*\*Why do I care:\*\*/i.test(body) || /^## Why do I care/im.test(body);
  return { name: 'Has Why do I care section', pass, message: pass ? undefined : 'Why do I care section not found' };
}

export function assertNoEmDash(content: string): AssertionResult {
  const body = getBody(content);
  const pass = !body.includes('—');
  return { name: 'No em dash (—)', pass, message: pass ? undefined : 'Em dash found in body' };
}

export function assertNoPersonaName(content: string, personaName: string): AssertionResult {
  const body = getBody(content);
  const pass = !body.toLowerCase().includes(personaName.toLowerCase());
  return { name: `Narrator persona not mentioned`, pass, message: pass ? undefined : `"${personaName}" found in body` };
}

export function assertNoCoAuthoredBy(content: string): AssertionResult {
  const pass = !content.includes('Co-Authored-By');
  return { name: 'No Co-Authored-By', pass, message: pass ? undefined : 'Co-Authored-By found in content' };
}

export function assertNoGeneratedWith(content: string): AssertionResult {
  const pass = !/generated with/i.test(content);
  return { name: 'No "Generated with" text', pass, message: pass ? undefined : '"Generated with" found in content' };
}

const BANNED_WORDS = ['additionally', 'crucial', 'delve', 'landscape', 'pivotal', 'showcase', 'testament', 'vibrant', 'foster', 'enhance'];

export function assertNoAiVocabulary(content: string): AssertionResult {
  const body = getBody(content);
  const found = BANNED_WORDS.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(body));
  const pass = found.length === 0;
  return { name: 'No banned AI vocabulary', pass, message: pass ? undefined : `Banned words found: ${found.join(', ')}` };
}

export function assertNoCodeBlocks(content: string): AssertionResult {
  const body = getBody(content);
  const pass = !body.includes('```');
  return { name: 'No fenced code blocks', pass, message: pass ? undefined : 'Fenced code block (```) found in body' };
}

export function assertFixtureKeyword(content: string): AssertionResult {
  const body = getBody(content);
  const keywords = ['Turbopack', 'React 19'];
  const found = keywords.some(k => body.includes(k));
  return { name: 'Fixture keyword present (Turbopack or React 19)', pass: found, message: found ? undefined : `None of [${keywords.join(', ')}] found — content may be hallucinated` };
}

export function runAllAssertions(content: string, personaName = 'Sherlock Holmes'): AssertionResult[] {
  return [
    assertHasFrontmatter(content),
    assertHasTitle(content),
    assertHasExcerpt(content),
    assertPublishedAt(content),
    assertSlugFormat(content),
    assertHasHashtags(content),
    assertGeneratedHashtag(content),
    assertHasArticleHeadings(content),
    assertHasTldr(content),
    assertHasKeyTakeaways(content),
    assertHasWhyDoICare(content),
    assertNoEmDash(content),
    assertNoPersonaName(content, personaName),
    assertNoCoAuthoredBy(content),
    assertNoGeneratedWith(content),
    assertNoAiVocabulary(content),
    assertNoCodeBlocks(content),
    assertFixtureKeyword(content),
  ];
}
