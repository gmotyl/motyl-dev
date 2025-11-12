'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, FileText, Github, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * BookmarksExport - Export bookmarks to markdown
 *
 * Features:
 * - Download as .md file
 * - Instructions for GitHub Gist
 * - Instructions for GitHub README
 * - Loading states
 */
export function BookmarksExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/bookmarks/export');

      if (!response.ok) {
        throw new Error('Failed to export bookmarks');
      }

      // Get the filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || 'bookmarks.md';

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Bookmarks exported successfully');
    } catch (error) {
      console.error('Error exporting bookmarks:', error);
      toast.error('Failed to export bookmarks');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Bookmarks
          </DialogTitle>
          <DialogDescription>
            Download your bookmarks as a markdown file or publish to GitHub
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Download Button */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Download Markdown File</h3>
            <p className="text-sm text-muted-foreground">
              Export your bookmarks as a markdown file organized by hashtags.
            </p>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download bookmarks.md
                </>
              )}
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Github className="h-4 w-4" />
              Publish to GitHub
            </h3>

            {/* GitHub Gist Instructions */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-medium">Option 1: GitHub Gist</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Download the markdown file using the button above</li>
                <li>Go to <a href="https://gist.github.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">gist.github.com</a></li>
                <li>Create a new gist and paste the content</li>
                <li>Name it "bookmarks.md" and set visibility</li>
                <li>Click "Create public gist" or "Create secret gist"</li>
              </ol>
              <div className="flex items-start gap-2 bg-muted/50 rounded-md p-3 text-xs">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Benefits of GitHub Gist:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Version control for your bookmarks</li>
                    <li>• Share with others or keep private</li>
                    <li>• Edit directly on GitHub</li>
                    <li>• Automatic syntax highlighting</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* GitHub Repository Instructions */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Option 2: Repository README</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Download the markdown file using the button above</li>
                <li>Copy the content to your repository's README.md</li>
                <li>Commit and push to GitHub</li>
                <li>Your bookmarks will be visible on your profile</li>
              </ol>
              <div className="flex items-start gap-2 bg-muted/50 rounded-md p-3 text-xs">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Pro tip:</p>
                  <p className="text-muted-foreground">
                    Create a repository named after your GitHub username to display
                    bookmarks on your profile page. For example, if your username is
                    "johndoe", create a repo called "johndoe".
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-sm mb-3">Export Format</h3>
            <div className="bg-muted/50 rounded-md p-4 text-xs font-mono space-y-1">
              <p className="text-muted-foreground"># My Bookmarks</p>
              <p className="text-muted-foreground">## #hashtag1</p>
              <p className="text-muted-foreground">- [Title](url) - Notes</p>
              <p className="text-muted-foreground">## #hashtag2</p>
              <p className="text-muted-foreground">- [Title](url)</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
