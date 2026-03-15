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

import { render } from '@react-email/components'
import * as React from 'react'
import { Resend } from 'resend'
import NewsletterEmail from '../emails/newsletter.js'
import { parseFrontmatter } from '../lib/newsletter-issues.js'
import { buildEmailMarkdownRenderer } from '../lib/email-markdown.js'

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
  const image = (data.image as string | undefined) ?? 'https://img.motyl.dev/greg-stanczyk.jpg'
  const subject = `motyl.dev Weekly #${issueNumber} — ${weekLabel}`

  // --- Render markdown to HTML ---
  const md = buildEmailMarkdownRenderer()
  const htmlContent = md.render(content)

  // --- Render React Email template to HTML ---
  const props = { issueNumber, weekLabel, htmlContent, image }
  const emailHtml = await render(
    React.createElement(NewsletterEmail, props),
  )
  const emailText = await render(
    React.createElement(NewsletterEmail, props),
    { plainText: true },
  )

  // --- Send ---
  const resend = new Resend(RESEND_API_KEY)
  const FROM = 'Greg from motyl.dev <greg@motyl.dev>'

  if (sendFlag) {
    console.log(`Sending newsletter #${issueNumber} to Audience ${RESEND_AUDIENCE_ID}…`)

    const response = await resend.broadcasts.create({
      audienceId: RESEND_AUDIENCE_ID!,
      from: FROM,
      subject,
      html: emailHtml,
      text: emailText,
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
      text: emailText,
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
