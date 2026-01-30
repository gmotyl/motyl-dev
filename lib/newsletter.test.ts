import { describe, expect, it } from 'vitest'
import { extractTldr, extractKeyTakeaways } from './newsletter'

describe('extractTldr', () => {
  it('should extract TLDR from bold format (**TLDR:**)', () => {
    const content = `Some intro text.

**TLDR:** This is the summary of the article.

**Key takeaways:**
- Point one
`
    expect(extractTldr(content)).toBe('This is the summary of the article.')
  })

  it('should extract TLDR from heading format (### TLDR:)', () => {
    const content = `Some intro text.

### TLDR:

This is a heading-style TLDR summary.

## Next Section
`
    expect(extractTldr(content)).toBe('This is a heading-style TLDR summary.')
  })

  it('should extract TLDR from ## TLDR heading format', () => {
    const content = `Some intro text.

## TLDR

Multi-line TLDR content
that spans multiple lines.

## Another Section
`
    expect(extractTldr(content)).toBe('Multi-line TLDR content\nthat spans multiple lines.')
  })

  it('should return null when no TLDR section exists', () => {
    const content = `# Article Title

This is just regular content without any TLDR section.

## Conclusion
The end.
`
    expect(extractTldr(content)).toBeNull()
  })

  it('should return null for empty content', () => {
    expect(extractTldr('')).toBeNull()
  })

  it('should handle TLDR followed by horizontal rule', () => {
    const content = `**TLDR:** Quick summary here.

---

More content below.
`
    expect(extractTldr(content)).toBe('Quick summary here.')
  })

  it('should handle case-insensitive TLDR matching', () => {
    const content = `**tldr:** lowercase tldr works too.

## Next
`
    expect(extractTldr(content)).toBe('lowercase tldr works too.')
  })

  it('should extract multi-line TLDR content', () => {
    const content = `**TLDR:** First line of summary.
Second line continues here.
Third line ends it.

**Key takeaways:**
`
    expect(extractTldr(content)).toBe(
      'First line of summary.\nSecond line continues here.\nThird line ends it.'
    )
  })

  it('should not match TLDR in the middle of other text', () => {
    const content = `This article mentions TLDR: but not as a section.

## Real Section
Content here.
`
    expect(extractTldr(content)).toBeNull()
  })
})

describe('extractKeyTakeaways', () => {
  it('should extract key takeaways from bold format with dash bullets', () => {
    const content = `**TLDR:** Summary.

**Key takeaways:**
- First takeaway point
- Second takeaway point
- Third takeaway point

## Next Section
`
    expect(extractKeyTakeaways(content)).toEqual([
      'First takeaway point',
      'Second takeaway point',
      'Third takeaway point',
    ])
  })

  it('should extract key takeaways from bold format with asterisk bullets', () => {
    const content = `**Key takeaways:**
* Point using asterisk
* Another asterisk point

---
`
    expect(extractKeyTakeaways(content)).toEqual([
      'Point using asterisk',
      'Another asterisk point',
    ])
  })

  it('should extract key takeaways from heading format (## Key Takeaways)', () => {
    const content = `## Key Takeaways

- Heading style takeaway one
- Heading style takeaway two

## Conclusion
`
    expect(extractKeyTakeaways(content)).toEqual([
      'Heading style takeaway one',
      'Heading style takeaway two',
    ])
  })

  it('should handle ## Key Points variation', () => {
    const content = `## Key Points

- This is a key point
- Another key point

**Next:**
`
    expect(extractKeyTakeaways(content)).toEqual([
      'This is a key point',
      'Another key point',
    ])
  })

  it('should handle ## Key Insights variation', () => {
    const content = `## Key Insights

- Insight one
- Insight two

## End
`
    expect(extractKeyTakeaways(content)).toEqual(['Insight one', 'Insight two'])
  })

  it('should return null when no key takeaways section exists', () => {
    const content = `# Article

Just regular content here.

## Conclusion
The end.
`
    expect(extractKeyTakeaways(content)).toBeNull()
  })

  it('should return null for empty content', () => {
    expect(extractKeyTakeaways('')).toBeNull()
  })

  it('should filter out empty lines between bullets', () => {
    const content = `**Key takeaways:**
- First point

- Second point after blank line

## Next
`
    expect(extractKeyTakeaways(content)).toEqual(['First point', 'Second point after blank line'])
  })

  it('should handle case-insensitive matching', () => {
    const content = `**key takeaways:**
- Works with lowercase

## End
`
    expect(extractKeyTakeaways(content)).toEqual(['Works with lowercase'])
  })

  it('should return null when bullets section is empty', () => {
    const content = `**Key takeaways:**

## Next Section
`
    expect(extractKeyTakeaways(content)).toBeNull()
  })

  it('should handle mixed bullet styles', () => {
    const content = `**Key takeaways:**
- Dash bullet
* Asterisk bullet
- Another dash

## End
`
    expect(extractKeyTakeaways(content)).toEqual([
      'Dash bullet',
      'Asterisk bullet',
      'Another dash',
    ])
  })

  it('should trim whitespace from takeaway items', () => {
    const content = `**Key takeaways:**
-    Lots of leading spaces
-  Some spaces

## End
`
    expect(extractKeyTakeaways(content)).toEqual([
      'Lots of leading spaces',
      'Some spaces',
    ])
  })
})
