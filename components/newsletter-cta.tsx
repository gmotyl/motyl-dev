import NewsletterForm from '@/components/newsletter-form'

interface NewsletterCTAProps {
  title?: string
  description?: string
  articleSlug?: string
}

const DEFAULT_TITLE = 'Stay Updated with Fresh Insights'
const DEFAULT_DESCRIPTION =
  'Get the latest tech news, architecture patterns, and software craftsmanship tips delivered to your inbox. Join hundreds of developers who stay ahead of the curve.'

export function NewsletterCTA({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  articleSlug,
}: NewsletterCTAProps) {
  return (
    <section className="my-12 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-3 text-foreground">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="flex justify-center">
          <NewsletterForm articleSlug={articleSlug} />
        </div>
      </div>
    </section>
  )
}
