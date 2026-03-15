/**
 * Send newsletter via Resend.
 *
 * Usage:
 *   tsx scripts/send-newsletter.ts <issue-number>          # preview to SUPERADMIN_EMAIL
 *   tsx scripts/send-newsletter.ts <issue-number> --send   # broadcast to Audience
 *
 * Requires .env.local with:
 *   RESEND_API_KEY
 *   RESEND_AUDIENCE_ID
 *   SUPERADMIN_EMAIL
 */

import { config } from 'dotenv'
import path from 'node:path'
import fs from 'node:fs/promises'

// Load env files in Next.js order: .env first, then .env.local overrides
config({ path: path.join(process.cwd(), '.env') })
config({ path: path.join(process.cwd(), '.env.local'), override: true })

import MarkdownIt from 'markdown-it'
import { render } from '@react-email/components'
import * as React from 'react'
import { Resend } from 'resend'
import yaml from 'js-yaml'
import NewsletterEmail from '../emails/newsletter.js'

// ---------------------------------------------------------------------------
// Inline-styled markdown renderer (email clients ignore <style> tags)
// ---------------------------------------------------------------------------

function buildMarkdownRenderer(): MarkdownIt {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

  // Override default rules with inline styles
  const defaultRules = { ...md.renderer.rules }

  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    token.attrSet(
      'style',
      'color: #8B5CF6; text-decoration: none; font-weight: 600;',
    )
    return defaultRules.link_open
      ? defaultRules.link_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.heading_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    const tag = token.tag // h1, h2, h3, …

    if (tag === 'h1') {
      token.attrSet(
        'style',
        'font-size: 24px; font-weight: bold; color: #111827; margin-top: 32px; margin-bottom: 8px;',
      )
    } else if (tag === 'h2') {
      token.attrSet(
        'style',
        'font-size: 20px; font-weight: bold; color: #111827; margin-top: 28px; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb;',
      )
    } else if (tag === 'h3') {
      token.attrSet(
        'style',
        'font-size: 16px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 4px;',
      )
    }

    return defaultRules.heading_open
      ? defaultRules.heading_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.paragraph_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    token.attrSet(
      'style',
      'font-size: 15px; line-height: 1.6; color: #374151; margin-top: 0; margin-bottom: 12px;',
    )
    return defaultRules.paragraph_open
      ? defaultRules.paragraph_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.blockquote_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    token.attrSet(
      'style',
      'border-left: 3px solid #8B5CF6; margin: 16px 0; padding: 8px 16px; font-style: italic; color: #6b7280;',
    )
    return defaultRules.blockquote_open
      ? defaultRules.blockquote_open(tokens, idx, options, _env, self)
      : self.renderToken(tokens, idx, options)
  }

  return md
}

// ---------------------------------------------------------------------------
// Frontmatter parsing (mirrors lib/newsletter-issues.ts)
// ---------------------------------------------------------------------------

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!fmMatch) return { data: {}, content: raw }
  const data = (yaml.load(fmMatch[1]) as Record<string, unknown>) ?? {}
  return { data, content: fmMatch[2] }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2)
  const sendFlag = args.includes('--send')
  const issueArg = args.find((a) => !a.startsWith('-'))

  if (!issueArg) {
    console.error('Usage: tsx scripts/send-newsletter.ts <issue-number> [--send]')
    console.error('  No --send flag: preview email sent to SUPERADMIN_EMAIL')
    console.error('  --send flag:    broadcast to Resend Audience')
    process.exit(1)
  }

  const issueNumber = parseInt(issueArg, 10)
  if (isNaN(issueNumber) || issueNumber < 1) {
    console.error(`Invalid issue number: ${issueArg}`)
    process.exit(1)
  }

  // --- Env vars ---
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
  const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL

  if (!RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY in environment')
  }
  if (sendFlag && !RESEND_AUDIENCE_ID) {
    throw new Error('Missing RESEND_AUDIENCE_ID in environment (required for --send)')
  }
  if (!sendFlag && !SUPERADMIN_EMAIL) {
    throw new Error('Missing SUPERADMIN_EMAIL in environment (required for preview)')
  }

  // --- Read markdown file ---
  const mdPath = path.join(process.cwd(), 'content', 'trends', `motyl-dev-${issueNumber}.md`)
  let raw: string
  try {
    raw = await fs.readFile(mdPath, 'utf8')
  } catch {
    throw new Error(`Newsletter file not found: ${mdPath}`)
  }

  const { data, content } = parseFrontmatter(raw)

  const weekLabel = (data.weekLabel as string | undefined) ?? `Issue #${issueNumber}`
  const subject = `motyl.dev Weekly #${issueNumber} — ${weekLabel}`

  // --- Render markdown to HTML ---
  const md = buildMarkdownRenderer()
  const htmlContent = md.render(content)

  // --- Render React Email template to HTML ---
  const emailHtml = await render(
    React.createElement(NewsletterEmail, { issueNumber, weekLabel, htmlContent }),
  )

  // --- Send ---
  const resend = new Resend(RESEND_API_KEY)
  const FROM = 'Greg from motyl.dev <onboarding@resend.dev>'

  if (sendFlag) {
    console.log(`Sending newsletter #${issueNumber} to Audience ${RESEND_AUDIENCE_ID}…`)

    const response = await resend.broadcasts.create({
      audienceId: RESEND_AUDIENCE_ID!,
      from: FROM,
      subject,
      html: emailHtml,
    })

    if (response.error) {
      throw new Error(`Resend broadcast error: ${JSON.stringify(response.error)}`)
    }

    console.log(`Broadcast created:`, response.data)

    // Trigger send
    if (response.data?.id) {
      const sendResponse = await resend.broadcasts.send(response.data.id)
      if (sendResponse.error) {
        throw new Error(`Resend broadcast send error: ${JSON.stringify(sendResponse.error)}`)
      }
      console.log(`Broadcast sent:`, sendResponse.data)
    }
  } else {
    const previewSubject = `[PREVIEW] ${subject}`
    console.log(`Sending preview of newsletter #${issueNumber} to ${SUPERADMIN_EMAIL}…`)

    const response = await resend.emails.send({
      from: FROM,
      to: SUPERADMIN_EMAIL!,
      subject: previewSubject,
      html: emailHtml,
    })

    if (response.error) {
      throw new Error(`Resend email error: ${JSON.stringify(response.error)}`)
    }

    console.log(`Preview sent! Email ID: ${response.data?.id}`)
  }
}

main().catch((err) => {
  console.error('Error:', err instanceof Error ? err.message : err)
  process.exit(1)
})
