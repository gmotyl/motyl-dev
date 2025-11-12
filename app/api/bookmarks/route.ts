import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserBookmarks, addBookmark } from '@/lib/bookmarks';

/**
 * GET /api/bookmarks
 * Returns all bookmarks for the authenticated user
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const bookmarks = await getUserBookmarks();

    return NextResponse.json({
      success: true,
      bookmarks,
      count: bookmarks.length
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookmarks
 * Creates a new bookmark
 *
 * Request body:
 * {
 *   url: string (required)
 *   title: string (required)
 *   hashtags?: string[]
 *   notes?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { url, title, hashtags = [], notes = '' } = body;

    // Validation
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Validate hashtags array
    if (hashtags && !Array.isArray(hashtags)) {
      return NextResponse.json(
        { error: 'Hashtags must be an array' },
        { status: 400 }
      );
    }

    // Create bookmark
    const bookmark = await addBookmark({
      url,
      title,
      hashtags,
      notes
    });

    return NextResponse.json({
      success: true,
      bookmark,
      message: 'Bookmark added successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating bookmark:', error);

    // Handle duplicate bookmark error
    if (error instanceof Error && error.message.includes('already bookmarked')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 } // Conflict
      );
    }

    return NextResponse.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
}
