import MarkdownIt from 'markdown-it'

const PURPLE = '#8B5CF6'

/**
 * Markdown renderer with inline styles for email clients.
 * Email clients ignore <style> tags, so every element needs inline styles.
 */
export function buildEmailMarkdownRenderer(): MarkdownIt {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

  const defaultRules = { ...md.renderer.rules }

  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    tokens[idx].attrSet('style', `color: ${PURPLE}; text-decoration: none; font-weight: 600;`)
    return defaultRules.link_open
      ? defaultRules.link_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.heading_open = (tokens, idx, options, _env, self) => {
    const tag = tokens[idx].tag
    const styles: Record<string, string> = {
      h1: 'font-size: 24px; font-weight: bold; color: #111827; margin-top: 32px; margin-bottom: 8px;',
      h2: 'font-size: 20px; font-weight: bold; color: #111827; margin-top: 28px; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb;',
      h3: 'font-size: 16px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 4px;',
    }
    if (styles[tag]) tokens[idx].attrSet('style', styles[tag])
    return defaultRules.heading_open
      ? defaultRules.heading_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.paragraph_open = (tokens, idx, options, _env, self) => {
    tokens[idx].attrSet('style', 'font-size: 15px; line-height: 1.6; color: #374151; margin-top: 0; margin-bottom: 12px;')
    return defaultRules.paragraph_open
      ? defaultRules.paragraph_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.blockquote_open = (tokens, idx, options, _env, self) => {
    tokens[idx].attrSet('style', `border-left: 3px solid ${PURPLE}; margin: 16px 0; padding: 8px 16px; font-style: italic; color: #6b7280;`)
    return defaultRules.blockquote_open
      ? defaultRules.blockquote_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  return md
}

/**
 * Wraps rendered HTML content in the motyl.dev branded email shell.
 */
export function wrapInEmailShell(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 32px 16px;">
    <div style="background-color: ${PURPLE}; height: 4px; border-radius: 2px; margin-bottom: 24px;"></div>
    <div style="margin-bottom: 32px;">
      <div style="font-size: 24px; font-weight: bold; color: ${PURPLE}; margin: 0;">motyl.dev Weekly</div>
    </div>
    ${bodyHtml}
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    <div style="text-align: center;">
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        <a href="https://motyl.dev/unsubscribe" style="color: ${PURPLE}; text-decoration: none;">Unsubscribe</a>
        &nbsp;&middot;&nbsp;
        <a href="https://motyl.dev/privacy" style="color: ${PURPLE}; text-decoration: none;">Privacy</a>
        &nbsp;&middot;&nbsp;
        <a href="https://motyl.dev" style="color: ${PURPLE}; text-decoration: none;">motyl.dev</a>
      </p>
    </div>
  </div>
</body>
</html>`
}
