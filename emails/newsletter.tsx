import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Tailwind,
} from '@react-email/components'
import * as React from 'react'

interface NewsletterEmailProps {
  issueNumber: number
  weekLabel: string
  htmlContent: string
}

export default function NewsletterEmail({
  issueNumber = 1,
  weekLabel = 'Week 1',
  htmlContent = '<p>Newsletter content goes here.</p>',
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>motyl.dev Weekly #{issueNumber} — {weekLabel}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-[600px] px-4 py-8">
            {/* Purple accent bar */}
            <Section className="mb-6">
              <div style={{ backgroundColor: '#8B5CF6', height: '4px', borderRadius: '2px' }} />
            </Section>

            {/* Header */}
            <Section className="mb-8">
              <Text
                className="m-0 text-3xl font-bold"
                style={{ color: '#8B5CF6' }}
              >
                motyl.dev Weekly
              </Text>
              <Text className="m-0 mt-1 text-sm text-gray-500">
                Issue #{issueNumber} · {weekLabel}
              </Text>
            </Section>

            {/* Body — pre-rendered HTML from markdown-it */}
            <Section className="mb-8">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Footer */}
            <Section>
              <Text className="text-xs text-gray-400 text-center m-0">
                You're receiving this because you subscribed to motyl.dev Weekly.
              </Text>
              <Text className="text-xs text-gray-400 text-center mt-2 m-0">
                <Link
                  href="{{{RESEND_UNSUBSCRIBE_URL}}}"
                  style={{ color: '#8B5CF6', textDecoration: 'none' }}
                >
                  Unsubscribe
                </Link>
                {' · '}
                <Link
                  href="https://motyl.dev"
                  style={{ color: '#8B5CF6', textDecoration: 'none' }}
                >
                  motyl.dev
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
