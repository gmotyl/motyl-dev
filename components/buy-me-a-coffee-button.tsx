'use client'

import { ItemType } from '@/lib/types'

interface BuyMeACoffeeButtonProps {
  itemType?: ItemType
}

export function BuyMeACoffeeButton({ itemType }: BuyMeACoffeeButtonProps) {
  const isNews = itemType === ItemType.News
  const ctaText = isNews
    ? '☕ Knowledge costs tokens, fuel me'
    : '☕ Buy me a coffee'
  const subtitle = isNews
    ? 'Help me keep the content flowing'
    : 'Support the effort to maintain this site'

  return (
    <div className="my-8 flex justify-center">
      <a
        href="https://www.buymeacoffee.com/motyl.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex flex-col items-center gap-2 px-6 py-4 rounded-lg text-white font-medium transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #BD5FFF 0%, #9d3dff 100%)',
          boxShadow: '0 4px 15px rgba(189, 95, 255, 0.3)',
        }}
      >
        <span>{ctaText}</span>
        <span className="text-xs opacity-90 group-hover:opacity-100">{subtitle}</span>
      </a>
    </div>
  )
}
