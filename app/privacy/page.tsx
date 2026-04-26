import Header from '@/components/header'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — motyl.dev',
  description: 'Privacy policy for motyl.dev — how we handle your data, cookies, and newsletter subscriptions.',
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16 prose prose-invert prose-sm max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: 26 April 2026</p>

          <h2>Who we are</h2>
          <p>
            motyl.dev is a personal tech content platform run by Grzegorz Motyl.
            This site curates frontend and AI trends, publishes original articles,
            and sends a weekly newsletter.
          </p>

          <h2>What data we collect</h2>

          <h3>Newsletter subscription</h3>
          <p>
            When you subscribe to the newsletter, we collect your <strong>email address</strong>.
            This is stored in Resend (our email service provider) and used solely to send you
            the weekly motyl.dev newsletter. You can unsubscribe at any time via the link in
            every email or by visiting <a href="/unsubscribe">/unsubscribe</a>.
          </p>

          <h3>Authentication</h3>
          <p>
            If you sign in (via GitHub), we store your name, email, and profile image
            to enable features like bookmarks and article view tracking. This data is
            stored in our PostgreSQL database on Vercel.
          </p>

          <h3>Analytics</h3>
          <p>
            We use <strong>Vercel Analytics</strong>, <strong>Vercel Speed Insights</strong>, and{' '}
            <strong>Cloudflare Web Analytics</strong> to understand how visitors use the site.
            These tools collect anonymized usage data (page views, performance metrics).
            They are only loaded if you opt in to the &ldquo;Analytics&rdquo; category in the
            cookie banner. No personal data is collected by these tools.
          </p>

          <h3>Granular consent</h3>
          <p>
            The cookie banner gives you separate toggles for <strong>Analytics</strong> and{' '}
            <strong>Advertising</strong>. You can accept one and reject the other.
            Strictly necessary items (auth session and your consent state itself) are always on.
            You can change your choice at any time via{' '}
            <strong>Cookie settings</strong> in the footer.
          </p>

          <h3>Cookies and storage</h3>
          <p>We use the following:</p>
          <ul>
            <li><strong>gdpr-consent</strong> — Stores your per-category consent preference (analytics, ads).</li>
            <li><strong>visitedArticles</strong> — Tracks which articles you have read (for visual indicators).</li>
            <li><strong>authjs.session-token</strong> — Authentication session (only if signed in).</li>
          </ul>

          <h3>Advertising</h3>
          <p>
            We may display ads from Google AdSense or other developer-focused ad networks
            on article and newsletter pages. These services may use cookies to serve relevant ads.
            Ad scripts are only loaded if you opt in to the &ldquo;Advertising&rdquo; category
            in the cookie banner.
          </p>

          <h2>How we use your data</h2>
          <ul>
            <li>Email address: to send the weekly newsletter</li>
            <li>Authentication data: to provide personalized features (bookmarks, read tracking)</li>
            <li>Analytics: to improve site content and performance</li>
          </ul>

          <h2>Your rights</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — Request a copy of your personal data</li>
            <li><strong>Rectification</strong> — Request correction of inaccurate data</li>
            <li><strong>Erasure</strong> — Request deletion of your data</li>
            <li><strong>Portability</strong> — Request your data in a machine-readable format</li>
            <li><strong>Withdraw consent</strong> — Unsubscribe from the newsletter or decline cookies at any time</li>
          </ul>
          <p>
            To exercise any of these rights, email <a href="mailto:greg@motyl.dev">greg@motyl.dev</a>.
          </p>

          <h2>Data retention</h2>
          <p>
            Newsletter email addresses are retained until you unsubscribe. Authentication data
            is retained while your account is active. Analytics data is anonymized and aggregated.
          </p>

          <h2>Third-party services</h2>
          <ul>
            <li><strong>Vercel</strong> — Hosting, analytics, speed insights</li>
            <li><strong>Resend</strong> — Email delivery</li>
            <li><strong>Google AdSense</strong> — Advertising (if applicable)</li>
            <li><strong>GitHub</strong> — Authentication provider</li>
          </ul>

          <h2>Contact</h2>
          <p>
            For privacy inquiries: <a href="mailto:greg@motyl.dev">greg@motyl.dev</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}