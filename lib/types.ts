export const ItemType = {
  Article: 'article',
  News: 'news',
} as const;

export type ItemType = (typeof ItemType)[keyof typeof ItemType];

export interface Content {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  hashtags: string[];
  itemType: ItemType;
  content: string;
  [key: string]: any;
}

export interface ExternalLink {
  url: string
  title: string
  order: number
}