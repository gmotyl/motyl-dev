import type React from 'react'
import Script from 'next/script'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from '@/components/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/next'

import { ServiceWorkerRegister } from '@/app/components/service-worker-register'
import { InstallPrompt } from '@/components/install-prompt'
import { UpdateNotification } from '@/components/update-notification'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased relative">
        <div className="absolute inset-0 bg-butterfly-pattern opacity-5 pointer-events-none z-0"></div>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5937972178718571`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Analytics />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <ServiceWorkerRegister />
            <InstallPrompt />
            <UpdateNotification />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#8B5CF6' },
    { media: '(prefers-color-scheme: light)', color: '#A855F7' },
  ],
}

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Motyl.dev',
    startupImage: ['/icons/icon-512x512.png'],
  },
  formatDetection: {
    telephone: false,
  },

  title: {
    default: 'Motyl.dev - Tech News & Insights',
    template: '%s | Motyl.dev',
  },
  description:
    'Stay up to date with the latest tech news, development insights, and industry trends. Covering JavaScript, AI, web development, and more.',
  keywords: [
    'tech news',
    'web development',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'AI',
    'programming',
    'software engineering',
  ],
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
    description:
      'Stay up to date with the latest tech news, development insights, and industry trends.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motyl.dev - Tech News & Insights',
    description:
      'Stay up to date with the latest tech news, development insights, and industry trends.',
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
    google: 'Kqg71gyKXIEQobhFAvea9Ewnuvt9so3gDuK_70QOmak',
    // yandex: 'your-yandex-verification-token',
  },
}
