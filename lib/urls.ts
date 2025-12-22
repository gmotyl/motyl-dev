import { Content, ItemType } from '@/lib/types'
import { ContentItemMetadata } from './articles'

export const getContentUrl = (item: Content | ContentItemMetadata, absolute?: boolean): string => {
  const BASE_URL = process.env.BASE_URL || 'https://motyl.dev'
  const { itemType, slug } = item
  const path = itemType === ItemType.Article ? `/articles/${slug}` : `/news/${slug}`

  return absolute ? `${BASE_URL}${path}` : path
}
