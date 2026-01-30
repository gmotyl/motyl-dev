import { describe, expect, it, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from './route'

// Mock the auth module
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

// Mock the newsletter module
vi.mock('@/lib/newsletter', () => ({
  extractArticleContent: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { extractArticleContent } from '@/lib/newsletter'

const mockAuth = vi.mocked(auth)
const mockExtractArticleContent = vi.mocked(extractArticleContent)

function createRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'))
}

describe('GET /api/newsletter/content', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mockAuth.mockResolvedValue(null)

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 when session has no user', async () => {
      mockAuth.mockResolvedValue({ user: undefined } as any)

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 when user has no id', async () => {
      mockAuth.mockResolvedValue({
        user: { email: 'test@example.com' },
      } as any)

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('authorization (superadmin check)', () => {
    it('should return 403 when user is not a superadmin', async () => {
      mockAuth.mockResolvedValue({
        user: { id: 'user-123', email: 'regular@example.com', isSuperAdmin: false },
      } as any)

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Forbidden')
    })

    it('should return 403 when isSuperAdmin is undefined', async () => {
      mockAuth.mockResolvedValue({
        user: { id: 'user-123', email: 'regular@example.com' },
      } as any)

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Forbidden')
    })

    it('should allow access when user is a superadmin', async () => {
      mockAuth.mockResolvedValue({
        user: { id: 'admin-123', email: 'admin@example.com', isSuperAdmin: true },
      } as any)
      mockExtractArticleContent.mockResolvedValue([
        { slug: 'test-article', title: 'Test', tldr: 'Summary', keyTakeaways: ['Point 1'] },
      ])

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.extracts).toHaveLength(1)
    })
  })

  describe('input validation', () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({
        user: { id: 'admin-123', email: 'admin@example.com', isSuperAdmin: true },
      } as any)
    })

    it('should return 400 when slugs parameter is missing', async () => {
      const request = createRequest('/api/newsletter/content')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('slugs parameter required')
    })

    it('should return 400 when slugs parameter is empty', async () => {
      const request = createRequest('/api/newsletter/content?slugs=')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      // Empty string is falsy, so it hits the first check
      expect(data.error).toBe('slugs parameter required')
    })

    it('should return 400 when slugs contains only commas', async () => {
      const request = createRequest('/api/newsletter/content?slugs=,,,')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('At least one slug required')
    })
  })

  describe('successful requests', () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue({
        user: { id: 'admin-123', email: 'admin@example.com', isSuperAdmin: true },
      } as any)
    })

    it('should extract content for a single slug', async () => {
      mockExtractArticleContent.mockResolvedValue([
        { slug: 'article-1', title: 'Article 1', tldr: 'Summary 1', keyTakeaways: ['Point A'] },
      ])

      const request = createRequest('/api/newsletter/content?slugs=article-1')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockExtractArticleContent).toHaveBeenCalledWith(['article-1'])
    })

    it('should extract content for multiple slugs', async () => {
      mockExtractArticleContent.mockResolvedValue([
        { slug: 'article-1', title: 'Article 1', tldr: 'Summary 1', keyTakeaways: ['Point A'] },
        { slug: 'article-2', title: 'Article 2', tldr: 'Summary 2', keyTakeaways: ['Point B'] },
      ])

      const request = createRequest('/api/newsletter/content?slugs=article-1,article-2')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.extracts).toHaveLength(2)
      expect(mockExtractArticleContent).toHaveBeenCalledWith(['article-1', 'article-2'])
    })

    it('should filter out empty slugs from comma-separated list', async () => {
      mockExtractArticleContent.mockResolvedValue([
        { slug: 'article-1', title: 'Article 1', tldr: null, keyTakeaways: null },
      ])

      const request = createRequest('/api/newsletter/content?slugs=article-1,,')
      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(mockExtractArticleContent).toHaveBeenCalledWith(['article-1'])
    })
  })

  describe('error handling', () => {
    it('should return 500 when extractArticleContent throws', async () => {
      mockAuth.mockResolvedValue({
        user: { id: 'admin-123', email: 'admin@example.com', isSuperAdmin: true },
      } as any)
      mockExtractArticleContent.mockRejectedValue(new Error('Database error'))

      const request = createRequest('/api/newsletter/content?slugs=test-article')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to extract content')
    })
  })
})
