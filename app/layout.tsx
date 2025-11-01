import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased relative">
        <div className="absolute inset-0 bg-butterfly-pattern opacity-5 pointer-events-none z-0"></div>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: 'Motyl.dev - Tech News & Insights',
    template: '%s | Motyl.dev',
  },
  description: 'Stay up to date with the latest tech news, development insights, and industry trends. Covering JavaScript, AI, web development, and more.',
  keywords: ['tech news', 'web development', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'AI', 'programming', 'software engineering'],
  authors: [{ name: 'Motyl.dev' }],
  creator: 'Motyl.dev',
  publisher: 'Motyl.dev',
  metadataBase: new URL('https://motyl.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://motyl.dev',
    siteName: 'Motyl.dev',
    title: 'Motyl.dev - Tech News & Insights',
    description: 'Stay up to date with the latest tech news, development insights, and industry trends.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motyl.dev - Tech News & Insights',
    description: 'Stay up to date with the latest tech news, development insights, and industry trends.',
    creator: '@motyldev',
    site: '@motyldev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here when ready
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
  },
};
