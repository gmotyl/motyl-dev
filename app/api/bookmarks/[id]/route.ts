import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { removeBookmark, updateBookmark } from '@/lib/bookmarks';

/**
 * DELETE /api/bookmarks/[id]
 * Removes a bookmark by ID
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    // Remove bookmark (verifies ownership internally)
    await removeBookmark(id);

    return NextResponse.json({
      success: true,
      message: 'Bookmark removed successfully'
    });
  } catch (error) {
    console.error('Error deleting bookmark:', error);

    // Handle "not found" or "unauthorized" errors
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Bookmark not found' },
          { status: 404 }
        );
      }
      if (error.message.includes('not authorized')) {
        return NextResponse.json(
          { error: 'Not authorized to delete this bookmark' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookmarks/[id]
 * Updates a bookmark's hashtags and/or notes
 *
 * Request body:
 * {
 *   hashtags?: string[]
 *   notes?: string
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { hashtags, notes } = body;

    // At least one field must be provided
    if (hashtags === undefined && notes === undefined) {
      return NextResponse.json(
        { error: 'At least one field (hashtags or notes) must be provided' },
        { status: 400 }
      );
    }

    // Validate hashtags if provided
    if (hashtags !== undefined && !Array.isArray(hashtags)) {
      return NextResponse.json(
        { error: 'Hashtags must be an array' },
        { status: 400 }
      );
    }

    // Validate notes if provided
    if (notes !== undefined && typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Notes must be a string' },
        { status: 400 }
      );
    }

    // Update bookmark (verifies ownership internally)
    const updatedBookmark = await updateBookmark(id, {
      hashtags,
      notes
    });

    return NextResponse.json({
      success: true,
      bookmark: updatedBookmark,
      message: 'Bookmark updated successfully'
    });
  } catch (error) {
    console.error('Error updating bookmark:', error);

    // Handle "not found" or "unauthorized" errors
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Bookmark not found' },
          { status: 404 }
        );
      }
      if (error.message.includes('not authorized')) {
        return NextResponse.json(
          { error: 'Not authorized to update this bookmark' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update bookmark' },
      { status: 500 }
    );
  }
}
