import { NextResponse } from "next/server"
import { Resend } from "resend"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://motyl.dev'

function getArticleUrl(articleSlug?: string): string | null {
  return articleSlug ? `${SITE_URL}/articles/${articleSlug}` : null
}

export async function POST(request: Request) {
  try {
    const { email, articleSlug } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Send notification email to Greg
    try {
      await sendNotificationEmail(email, articleSlug)
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Continue with subscription even if email fails
    }

    // In a real application, you would also:
    // 1. Store this email in your database
    // 2. Send it to your newsletter service (Mailchimp, ConvertKit, etc.)
    // 3. Send a welcome email to the subscriber

    console.log(`New subscriber: ${email}${articleSlug ? ` from article: ${articleSlug}` : ''}`)

    // Simulate a successful subscription
    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to Grzegorz Motyl's newsletter!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function sendNotificationEmail(subscriberEmail: string, articleSlug?: string) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.log("RESEND_API_KEY not found, logging email notification instead:")
    logEmailNotification(subscriberEmail, articleSlug)
    return
  }

  try {
    const resend = new Resend(apiKey)

    // Send to your verified email address (gmotyl@gmail.com) since domain isn't verified yet
    const articleUrl = getArticleUrl(articleSlug)
    const sourceText = articleSlug ? `Article: <a href="${articleUrl}" style="color: #0066cc; text-decoration: none;">${articleSlug}</a>` : 'Frontend Newsletter Landing Page'

    const { data, error } = await resend.emails.send({
      from: "Newsletter <onboarding@resend.dev>",
      to: ["gmotyl@gmail.com"], // Changed to your verified email address
      subject: "Greg, there is new newsletter subscriber!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; text-align: center;">🎉 New Newsletter Subscriber!</h1>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
            <h2 style="color: #333; margin-top: 0;">Subscriber Details</h2>
            <p style="color: #666; font-size: 16px; margin: 10px 0;">
              <strong>Email:</strong> ${subscriberEmail}
            </p>
            <p style="color: #666; font-size: 16px; margin: 10px 0;">
              <strong>Subscribed at:</strong> ${new Date().toLocaleString()}
            </p>
            <p style="color: #666; font-size: 16px; margin: 10px 0;">
              <strong>Source:</strong> ${sourceText}
            </p>
            ${articleUrl ? `<p style="color: #666; font-size: 16px; margin: 10px 0;"><strong>Article URL:</strong> <a href="${articleUrl}" style="color: #0066cc; text-decoration: none;">${articleUrl}</a></p>` : ''}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 8px;">
            <p style="color: #0066cc; margin: 0; font-size: 14px;">
              💡 <strong>Next steps:</strong> 
              <br>1. Consider sending a welcome email to ${subscriberEmail}
              <br>2. Add them to your newsletter platform
              <br>3. Verify motyl.dev domain in Resend to use greg@motyl.dev
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #888; font-size: 12px;">
            <p>This notification was sent from your Frontend Newsletter website.</p>
          </div>
        </div>
      `,
      text: `
New Newsletter Subscriber!

Email: ${subscriberEmail}
Subscribed at: ${new Date().toLocaleString()}
Source: ${articleSlug ? `Article: ${articleSlug}` : 'Frontend Newsletter Landing Page'}
${articleUrl ? `Article URL: ${articleUrl}` : ''}

Note: Email sent to gmotyl@gmail.com (verified address). To send to greg@motyl.dev, please verify the motyl.dev domain in Resend.

Next steps:
1. Consider sending a welcome email to ${subscriberEmail}
2. Add them to your newsletter platform
3. Verify motyl.dev domain in Resend to use greg@motyl.dev
      `,
    })

    if (error) {
      console.error("Resend API Error:", error)
      logEmailNotification(subscriberEmail, articleSlug)
      throw new Error(`Email service error: ${error.message}`)
    }

    console.log("Notification email sent successfully to gmotyl@gmail.com:", data)
    return data
  } catch (error) {
    console.error("Error sending email:", error)
    logEmailNotification(subscriberEmail, articleSlug)
    throw error
  }
}

function logEmailNotification(subscriberEmail: string, articleSlug?: string) {
  const articleUrl = getArticleUrl(articleSlug)
  console.log("📧 EMAIL NOTIFICATION (Logged due to service issue):")
  console.log("=".repeat(50))
  console.log(`To: gmotyl@gmail.com (verified address)`)
  console.log(`Subject: Greg, there is new newsletter subscriber!`)
  console.log(`New Subscriber: ${subscriberEmail}`)
  console.log(`Timestamp: ${new Date().toLocaleString()}`)
  console.log(`Source: ${articleSlug ? `Article: ${articleSlug}` : 'Frontend Newsletter Landing Page'}`)
  if (articleUrl) {
    console.log(`Article URL: ${articleUrl}`)
  }
  console.log(`Note: To send to greg@motyl.dev, verify motyl.dev domain in Resend`)
  console.log("=".repeat(50))
}
