import { describe, expect, it, vi, beforeEach } from 'vitest'
import { GET } from './route'

// Mock the articles library
vi.mock('@/lib/articles', () => ({
  getAllArticlesWithContent: vi.fn(),
  getAllHashtags: vi.fn(),
  getHashtagCounts: vi.fn(),
}))

describe('GET /api/articles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns all articles with hashtags and counts', async () => {
    const { getAllArticlesWithContent, getAllHashtags, getHashtagCounts } = await import('@/lib/articles')

    // Mock data
    const mockArticles = [
      {
        slug: 'test-article-1',
        title: 'Test Article 1',
        excerpt: 'First test article',
        publishedAt: '2025-12-09',
        content: '# Test Article 1\n\nContent here',
        hashtags: ['react', 'nextjs'],
      },
      {
        slug: 'test-article-2',
        title: 'Test Article 2',
        excerpt: 'Second test article',
        publishedAt: '2025-12-08',
        content: '# Test Article 2\n\nMore content',
        hashtags: ['typescript', 'react'],
      },
    ]

    const mockHashtags = ['react', 'nextjs', 'typescript']
    const mockHashtagCounts = {
      react: 2,
      nextjs: 1,
      typescript: 1,
    }

    vi.mocked(getAllArticlesWithContent).mockResolvedValue(mockArticles)
    vi.mocked(getAllHashtags).mockResolvedValue(mockHashtags)
    vi.mocked(getHashtagCounts).mockResolvedValue(mockHashtagCounts)

    // Call the API route
    const response = await GET()
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(200)
    expect(data).toHaveProperty('articles')
    expect(data).toHaveProperty('hashtags')
    expect(data).toHaveProperty('hashtagCounts')

    expect(data.articles).toHaveLength(2)
    expect(data.articles[0].slug).toBe('test-article-1')
    expect(data.articles[1].slug).toBe('test-article-2')

    expect(data.hashtags).toEqual(['react', 'nextjs', 'typescript'])
    expect(data.hashtagCounts).toEqual({
      react: 2,
      nextjs: 1,
      typescript: 1,
    })

    // Verify mocks were called
    expect(getAllArticlesWithContent).toHaveBeenCalledOnce()
    expect(getAllHashtags).toHaveBeenCalledOnce()
    expect(getHashtagCounts).toHaveBeenCalledOnce()
  })

  it('returns error when articles fetch fails', async () => {
    const { getAllArticlesWithContent } = await import('@/lib/articles')

    // Mock error
    vi.mocked(getAllArticlesWithContent).mockRejectedValue(new Error('File system error'))

    // Call the API route
    const response = await GET()
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error')
    expect(data.error).toBe('Failed to fetch articles')
  })

  it('returns empty arrays when no articles exist', async () => {
    const { getAllArticlesWithContent, getAllHashtags, getHashtagCounts } = await import('@/lib/articles')

    // Mock empty data
    vi.mocked(getAllArticlesWithContent).mockResolvedValue([])
    vi.mocked(getAllHashtags).mockResolvedValue([])
    vi.mocked(getHashtagCounts).mockResolvedValue({})

    // Call the API route
    const response = await GET()
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(200)
    expect(data.articles).toEqual([])
    expect(data.hashtags).toEqual([])
    expect(data.hashtagCounts).toEqual({})
  })

  it('includes all required article fields', async () => {
    const { getAllArticlesWithContent, getAllHashtags, getHashtagCounts } = await import('@/lib/articles')

    const mockArticle = {
      slug: 'complete-article',
      title: 'Complete Article',
      excerpt: 'Has all fields',
      publishedAt: '2025-12-09',
      content: '# Complete\n\nFull content',
      hashtags: ['test'],
    }

    vi.mocked(getAllArticlesWithContent).mockResolvedValue([mockArticle])
    vi.mocked(getAllHashtags).mockResolvedValue(['test'])
    vi.mocked(getHashtagCounts).mockResolvedValue({ test: 1 })

    const response = await GET()
    const data = await response.json()

    const article = data.articles[0]
    expect(article).toHaveProperty('slug')
    expect(article).toHaveProperty('title')
    expect(article).toHaveProperty('excerpt')
    expect(article).toHaveProperty('publishedAt')
    expect(article).toHaveProperty('content')
    expect(article).toHaveProperty('hashtags')
    expect(Array.isArray(article.hashtags)).toBe(true)
  })
})

