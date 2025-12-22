import { describe, it, expect } from 'vitest';
import { getContentUrl } from './urls';
import { ItemType } from './types';

describe('getContentUrl', () => {
  const article = {
    slug: 'test-article',
    itemType: ItemType.Article,
    content: '',
    excerpt: '',
    title: '',
    publishedAt: '',
    hashtags: '',
  };

  const news = {
    slug: 'test-news',
    itemType: ItemType.News,
    content: '',
    excerpt: '',
    title: '',
    publishedAt: '',
    hashtags: '',
  };

  it('should return the correct relative URL for an article', () => {
    expect(getContentUrl(article)).toBe('/articles/test-article');
  });

  it('should return the correct relative URL for a news item', () => {
    expect(getContentUrl(news)).toBe('/news/test-news');
  });

  it('should return the correct absolute URL for an article', () => {
    process.env.BASE_URL = 'https://motyl.dev';
    expect(getContentUrl(article, true)).toBe('https://motyl.dev/articles/test-article');
  });

  it('should return the correct absolute URL for a news item', () => {
    process.env.BASE_URL = 'https://motyl.dev';
    expect(getContentUrl(news, true)).toBe('https://motyl.dev/news/test-news');
  });
});
