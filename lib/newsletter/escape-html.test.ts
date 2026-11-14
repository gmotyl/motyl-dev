import { describe, it, expect } from 'vitest'
import { escapeHtml } from './escape-html'

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<b>&"'`)).toBe('&lt;b&gt;&amp;&quot;&#39;')
  })

  it('leaves plain text unchanged', () => {
    expect(escapeHtml('reader@example.com my-article-slug')).toBe(
      'reader@example.com my-article-slug',
    )
  })
})
