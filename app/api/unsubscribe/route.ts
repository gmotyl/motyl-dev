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

    // Fetch all contacts to find the one with this email (handle pagination)
    let allContacts: any[] = []
    let page = 1
    const limit = 100 // Max per page

    while (true) {
      // Bypass TypeScript type checking for pagination
      const listMethod: any = resend.contacts.list
      const result: any = await listMethod.bind(resend.contacts)({ audienceId, page, limit })
      const contacts = result.data?.data || []
      if (contacts.length === 0) {
        break
      }
      allContacts = allContacts.concat(contacts)
      page++
      // Stop if we've reached the last page (based on total pages or no more contacts)
      const totalPages = result.data?.meta?.totalPages
      if (totalPages && page > totalPages) {
        break
      }
    }

    const contact = allContacts.find((c: any) => c.email.toLowerCase() === email.toLowerCase())

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