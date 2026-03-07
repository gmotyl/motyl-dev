import Image from 'next/image'
import { CategoryIcon } from '@/components/category-icon'
import { type Content, ItemType } from '@/lib/types'
import { getOgImage } from '@/lib/og'

interface HeroImageProps {
  article: Content
}

export function HeroImage({ article }: HeroImageProps) {
  if (article.itemType === ItemType.News) {
    return (
      <div className="mb-8 rounded-lg overflow-hidden" style={{ aspectRatio: '16/5' }}>
        <CategoryIcon hashtags={article.hashtags} className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-lg overflow-hidden">
      <Image
        src={getOgImage(article)}
        alt={article.title}
        width={1200}
        height={630}
        className="w-full object-cover rounded-lg"
        priority
      />
    </div>
  )
}
