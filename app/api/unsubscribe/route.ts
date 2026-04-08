import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const resend = new Resend(apiKey)

    // List contacts to find the one with this email
    const contacts = await resend.contacts.list({ audienceId })
    const contact = contacts.data?.data?.find(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    )

    if (!contact) {
      // Don't reveal whether email exists — always show success
      return NextResponse.json({ success: true })
    }

    await resend.contacts.remove({ audienceId, id: contact.id })

    console.log(`Unsubscribed: ${email}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}