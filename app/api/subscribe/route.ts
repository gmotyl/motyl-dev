import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Store this email in your database
    // 2. Or send it to your newsletter service (Mailchimp, ConvertKit, etc.)

    console.log(`New subscriber: ${email}`)

    // Simulate a successful subscription
    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to Grzegorz Motyl's newsletter on Agentic AI",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
