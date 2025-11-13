# Article Views Synchronization - Implementation Complete

## Overview

Successfully implemented synchronized "Unseen" articles tracking that works for both anonymous and logged-in users. The system transparently migrates localStorage data to the database when users log in.

## ✅ What Was Implemented

### 1. Database Schema
- **New Model**: `ArticleView` with fields:
  - `id`: Unique identifier
  - `articleSlug`: The article's slug
  - `userId`: Reference to the user
  - `viewedAt`: Timestamp of when viewed
- **Indexes**: Optimized for fast queries on userId and articleSlug
- **Unique Constraint**: Prevents duplicate views (userId + articleSlug)
- **Cascade Delete**: Views are deleted when user is deleted

### 2. Server Functions ([lib/article-views.ts](lib/article-views.ts))
- `markArticleAsViewed(slug)` - Create/update view record
- `getUserViewedArticles()` - Get all viewed slugs for current user
- `isArticleViewed(slug)` - Check if specific article viewed
- `clearViewHistory()` - Delete all user's view records
- `getViewedCount()` - Count viewed articles
- `syncLocalStorageToDatabase(slugs[])` - Migration helper for login

### 3. API Endpoints

#### POST /api/articles/[slug]/view
- Marks an article as viewed for the logged-in user
- Returns: `{ success: true, data: ArticleView }`
- Auth: Required

#### GET /api/articles/views
- Returns all viewed article slugs for the current user
- Returns: `{ success: true, data: string[] }`
- Auth: Optional (returns empty array if not logged in)

#### POST /api/articles/views/sync
- Syncs article slugs from localStorage to database
- Request body: `{ slugs: string[] }`
- Returns: `{ success: true, count: number }`
- Auth: Required

#### DELETE /api/articles/views
- Clears all view history for the current user
- Returns: `{ success: true, count: number }`
- Auth: Required

### 4. Smart Sync Hook ([hooks/use-visited-articles.ts](hooks/use-visited-articles.ts))

#### Features:
- **Session Detection**: Uses `useSession()` from next-auth
- **Dual Storage Strategy**:
  - Anonymous users → localStorage
  - Logged-in users → Database via API
- **Auto-Sync on Login**:
  - Detects session change from unauthenticated → authenticated
  - Reads localStorage visited articles
  - Syncs to database via `/api/articles/views/sync`
  - Clears localStorage after successful sync
  - Reloads from database to get merged data
- **Optimistic Updates**: UI updates immediately, API calls happen in background
- **Error Handling**: Graceful fallback to localStorage on failures

#### Hook API:
```typescript
const { markAsVisited, isVisited, visitedArticles, isLoading } = useVisitedArticles()
```

## 🔄 How It Works

### Flow 1: Anonymous User
1. User reads articles → Stored in localStorage
2. Visual feedback via CSS (dimmed articles)
3. UNSEEN filter works with localStorage data
4. Data persists until browser clear

### Flow 2: User Logs In (First Time)
1. User logs in → Session detected
2. Hook reads localStorage: `['article-1', 'article-2', 'article-3']`
3. Calls sync API with localStorage data
4. Database now has: `['article-1', 'article-2', 'article-3']`
5. localStorage cleared
6. State updated from database

### Flow 3: Logged-In User Reads Articles
1. User clicks article → `markAsVisited()` called
2. UI updates immediately (optimistic)
3. API call: `POST /api/articles/[slug]/view`
4. Database updated in background

### Flow 4: User Logs Out & Back In
1. User logs out → Falls back to localStorage
2. User reads more articles → localStorage: `['article-4', 'article-5']`
3. User logs in again → Sync triggered
4. Syncs `['article-4', 'article-5']` to database
5. Database now has: `['article-1', 'article-2', 'article-3', 'article-4', 'article-5']`
6. localStorage cleared again

### Flow 5: Cross-Device Sync
1. User logs in on Device A → Sees visited articles
2. User logs in on Device B → Sees same visited articles
3. User reads article on Device B → Synced to database
4. User returns to Device A → Refreshes, sees new article as visited

## 🧪 Testing Guide

### Test 1: Anonymous User Flow
1. Open browser (not logged in)
2. Go to `/articles`
3. Click on an article
4. Return to `/articles`
5. **Expected**: Article should be dimmed (has `.visited-article` class)
6. Click "UNSEEN" filter
7. **Expected**: Visited article should disappear from list
8. Open DevTools → Application → Local Storage
9. **Expected**: See `visitedArticles` key with array of slugs

### Test 2: Login Sync Flow
1. As anonymous user, visit 2-3 articles
2. Verify localStorage has the slugs
3. Log in (use GitHub OAuth)
4. Open browser console
5. **Expected**: See log message: "User logged in - syncing localStorage to database..."
6. **Expected**: See log message: "✅ Synced X articles to database"
7. Check DevTools → Local Storage
8. **Expected**: `visitedArticles` key should be gone
9. Open browser console and run:
   ```javascript
   fetch('/api/articles/views').then(r => r.json()).then(console.log)
   ```
10. **Expected**: See array with your viewed article slugs

### Test 3: Logged-In User Flow
1. As logged-in user, go to `/articles`
2. Click on a new article (one you haven't visited)
3. Open Network tab in DevTools
4. **Expected**: See POST request to `/api/articles/[slug]/view`
5. Refresh the page
6. **Expected**: Article still appears as visited (dimmed)

### Test 4: Cross-Device Sync
1. Log in on Browser 1
2. Visit 2-3 articles
3. Open Browser 2 (or incognito window)
4. Log in with same GitHub account
5. Go to `/articles`
6. **Expected**: Articles visited on Browser 1 appear as visited (dimmed) on Browser 2

### Test 5: Logout/Login Cycle
1. As logged-in user, note which articles are visited
2. Log out
3. Visit 1-2 new articles (localStorage used)
4. Check localStorage
5. **Expected**: See new articles in localStorage
6. Log in again
7. **Expected**: Console shows sync message
8. Refresh page
9. **Expected**: Both old (from database) and new (from localStorage) articles appear as visited

### Test 6: UNSEEN Filter Works in Both Modes
1. **Anonymous**: Visit articles → Click UNSEEN → Verify filtering works
2. **Logged-in**: Visit articles → Click UNSEEN → Verify filtering works

## 📁 Files Created/Modified

### New Files (7):
1. [lib/article-views.ts](lib/article-views.ts) - Server functions
2. [app/api/articles/[slug]/view/route.ts](app/api/articles/[slug]/view/route.ts) - Mark viewed endpoint
3. [app/api/articles/views/route.ts](app/api/articles/views/route.ts) - GET/DELETE endpoints
4. [app/api/articles/views/sync/route.ts](app/api/articles/views/sync/route.ts) - Sync endpoint
5. `ARTICLE_VIEWS_SYNC.md` - This documentation

### Modified Files (2):
1. [prisma/schema.prisma](prisma/schema.prisma) - Added ArticleView model
2. [hooks/use-visited-articles.ts](hooks/use-visited-articles.ts) - Added sync logic

### Database Changes:
- New table: `ArticleView`
- Migration: `prisma db push` (already executed)

## 🎯 Key Features

### ✅ Backward Compatible
- Anonymous users experience no change
- Existing localStorage data automatically migrated on login
- No breaking changes to article pages

### ✅ Transparent Migration
- User doesn't need to do anything
- Happens automatically on login
- No data loss during migration

### ✅ Performance Optimized
- Optimistic updates (UI responds immediately)
- API calls happen in background
- Database queries use indexes
- Unique constraint prevents duplicates

### ✅ Error Handling
- Graceful fallback to localStorage on API failures
- Console logging for debugging
- Doesn't block UI on errors

### ✅ Privacy & Control
- Users can clear history via DELETE endpoint
- Views are tied to user account
- Cascade delete when user is deleted

## 🔮 Future Enhancements (Optional)

### 1. User Profile Page
Add to [app/profile/page.tsx](app/profile/page.tsx):
```typescript
import { getViewedCount, clearViewHistory } from '@/lib/article-views'

// Show count: "You've read 42 articles"
// Add "Clear History" button
```

### 2. Reading Stats
```typescript
// Track reading time, most viewed topics, etc.
// Add fields to ArticleView: readingTimeSeconds, deviceType
```

### 3. "Read Later" Feature
```typescript
// Similar to bookmarks but for unread articles
// New model: ArticleReadLater
```

### 4. Global Analytics (Admin)
```typescript
// Most viewed articles across all users
// Popular topics, reading trends
```

### 5. Export Reading History
```typescript
// Similar to bookmark export
// Generate markdown list of all viewed articles
```

## 🐛 Troubleshooting

### Issue: Sync not triggering on login
- Check browser console for logs
- Verify `useSession()` is working (check session object)
- Ensure localStorage has `visitedArticles` key before login

### Issue: Articles not dimming after visit
- Check if `.visited-article` CSS class is applied
- Verify `markAsVisited()` is being called (console.log)
- Check if slug matches exactly

### Issue: Database not updating
- Check API endpoint responses in Network tab
- Verify authentication is working (`POST /api/articles/[slug]/view` should return 401 if not logged in)
- Check Prisma Client is generated: `npx prisma generate`

### Issue: LocalStorage not clearing after sync
- Check sync API response (should return count > 0)
- Verify sync completed successfully (check console logs)
- May need to manually clear if sync failed: `localStorage.removeItem('visitedArticles')`

## 📊 Database Schema Reference

```prisma
model ArticleView {
  id          String   @id @default(cuid())
  articleSlug String
  userId      String
  viewedAt    DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, articleSlug])
  @@index([userId])
  @@index([articleSlug])
}

model User {
  // ... existing fields
  articleViews  ArticleView[]
}
```

## 🚀 Deployment Notes

### Environment Variables
No new environment variables needed! Uses existing:
- `POSTGRES_PRISMA_URL` - Already configured
- `GITHUB_CLIENT_ID` - Already configured
- `GITHUB_CLIENT_SECRET` - Already configured
- `NEXTAUTH_SECRET` - Already configured

### Vercel Deployment
1. Push changes to main branch
2. Vercel will automatically:
   - Run `prisma generate` (via postinstall script)
   - Build Next.js app
   - Deploy to production
3. Database schema already synced (we ran `prisma db push`)

### Manual Deployment Steps (if needed)
```bash
git add .
git commit -m "feat: Add synchronized article views for logged-in users"
git push origin main
```

## 📝 API Usage Examples

### Mark article as viewed (client-side)
```typescript
const response = await fetch(`/api/articles/${slug}/view`, {
  method: 'POST',
})
const data = await response.json()
console.log(data) // { success: true, data: { id, articleSlug, userId, viewedAt } }
```

### Get all viewed articles
```typescript
const response = await fetch('/api/articles/views')
const data = await response.json()
console.log(data) // { success: true, data: ['slug1', 'slug2', ...] }
```

### Sync localStorage to database
```typescript
const localSlugs = JSON.parse(localStorage.getItem('visitedArticles') || '[]')
const response = await fetch('/api/articles/views/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ slugs: localSlugs }),
})
const data = await response.json()
console.log(data) // { success: true, count: 5 }
```

### Clear view history
```typescript
const response = await fetch('/api/articles/views', {
  method: 'DELETE',
})
const data = await response.json()
console.log(data) // { success: true, count: 42 }
```

## ✨ Summary

This implementation provides a seamless experience for users whether they're logged in or not. The system automatically handles migration from localStorage to database, ensuring that users never lose their reading history. The architecture is scalable, performant, and follows Next.js best practices.

**Status**: ✅ Complete and ready for production!
