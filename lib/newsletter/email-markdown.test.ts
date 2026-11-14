import { describe, it, expect } from 'vitest'
import { wrapInEmailShell } from './email-markdown'

describe('wrapInEmailShell', () => {
  it('email shell footer has no form-based unsubscribe link', () => {
    const html = wrapInEmailShell('x')

    expect(html).not.toContain('motyl.dev/unsubscribe')
    // Remaining footer links stay, with no dangling separator before the first one.
    expect(html).toContain('https://motyl.dev/privacy')
    expect(html).toMatch(/<p[^>]*>\s*<a href="https:\/\/motyl\.dev\/privacy"/)
  })
})
