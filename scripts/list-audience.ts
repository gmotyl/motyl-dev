/**
 * List all contacts in the Resend Audience.
 *
 * Usage:
 *   tsx scripts/list-audience.ts
 *
 * Requires .env.local with:
 *   RESEND_API_KEY
 *   RESEND_AUDIENCE_ID
 */

import { config } from 'dotenv'
import path from 'node:path'

config({ path: path.join(process.cwd(), '.env') })
config({ path: path.join(process.cwd(), '.env.local'), override: true })

import { Resend } from 'resend'

async function main() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

  if (!RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY in environment')
  }
  if (!RESEND_AUDIENCE_ID) {
    throw new Error('Missing RESEND_AUDIENCE_ID in environment')
  }

  const resend = new Resend(RESEND_API_KEY)

  const response = await resend.contacts.list({ audienceId: RESEND_AUDIENCE_ID })

  if (response.error) {
    throw new Error(`Resend error: ${JSON.stringify(response.error)}`)
  }

  const contacts = response.data?.data ?? []

  if (contacts.length === 0) {
    console.log('No contacts found in audience.')
    return
  }

  console.log(`\nAudience contacts (${contacts.length}):\n`)

  for (const contact of contacts) {
    const name = [contact.first_name, contact.last_name].filter(Boolean).join(' ')
    const status = contact.unsubscribed ? ' [unsubscribed]' : ''
    console.log(`  ${contact.email}${name ? ` (${name})` : ''}${status}`)
  }

  const subscribed = contacts.filter((c) => !c.unsubscribed).length
  console.log(`\nTotal: ${contacts.length} | Subscribed: ${subscribed} | Unsubscribed: ${contacts.length - subscribed}`)
}

main().catch((err) => {
  console.error('Error:', err instanceof Error ? err.message : err)
  process.exit(1)
})
