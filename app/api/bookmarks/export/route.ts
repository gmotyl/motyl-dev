import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { exportToMarkdown } from '@/lib/bookmarks';

/**
 * GET /api/bookmarks/export
 * Exports all bookmarks as a markdown file
 * Returns a downloadable .md file grouped by hashtags
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

    // Generate markdown content
    const markdownContent = await exportToMarkdown();

    // Create filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `bookmarks-${timestamp}.md`;

    // Return as downloadable file
    return new NextResponse(markdownContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error exporting bookmarks:', error);
    return NextResponse.json(
      { error: 'Failed to export bookmarks' },
      { status: 500 }
    );
  }
}
