"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeEditor from "@/components/code-editor"
import { generateSlug, db } from "@/lib/db"

type ArticleData = {
  id?: string
  title: string
  content: string
  excerpt: string
  slug?: string
}

export default function ArticleEditor({ article }: { article?: ArticleData }) {
  const [title, setTitle] = useState(article?.title || "")
  const [content, setContent] = useState(article?.content || "")
  const [excerpt, setExcerpt] = useState(article?.excerpt || "")
  const [isLoading, setIsLoading] = useState(false)
  const [previewTab, setPreviewTab] = useState("edit")
  const { toast } = useToast()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const slug = article?.slug || generateSlug(title)

      if (article) {
        // Update existing article
        await db.article.update({
          where: { id: article.id },
          data: {
            title,
            content,
            excerpt,
            slug,
          },
        })
        toast({
          title: "Article updated",
          description: "Your article has been updated",
        })
      } else {
        // Create new article
        await db.article.create({
          data: {
            title,
            content,
            excerpt,
            slug,
          },
        })
        toast({
          title: "Article created",
          description: "Your article has been published",
        })
      }

      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle code insertion
  function insertCodeBlock() {
    const codeTemplate =
      "\n```typescript\n// Your code here\nconst example = () => {\n  console.log('Hello world');\n};\n```\n"
    setContent((prev) => prev + codeTemplate)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
            required
            className="bg-background/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief description of the article"
            required
            className="h-24 bg-background/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="content">Content</Label>
            <Button type="button" variant="outline" size="sm" onClick={insertCodeBlock}>
              Insert Code Block
            </Button>
          </div>

          <Tabs value={previewTab} onValueChange={setPreviewTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <CodeEditor
                value={content}
                onChange={setContent}
                language="markdown"
                placeholder="Write your article content here..."
                className="min-h-[400px] font-mono"
              />
            </TabsContent>
            <TabsContent value="preview">
              <Card className="p-4 min-h-[400px] prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : article ? "Update Article" : "Publish Article"}
        </Button>
      </div>
    </form>
  )
}

// Simple markdown renderer for preview
// In a real app, you would use a proper markdown library
function renderMarkdown(markdown: string): string {
  // This is a very basic implementation
  // Replace code blocks with syntax highlighted versions
  const html = markdown
    .replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-muted p-4 rounded-md overflow-x-auto"><code class="language-$1">$2</code></pre>',
    )
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/#{6}\s+(.+)/g, "<h6>$1</h6>")
    .replace(/#{5}\s+(.+)/g, "<h5>$1</h5>")
    .replace(/#{4}\s+(.+)/g, "<h4>$1</h4>")
    .replace(/#{3}\s+(.+)/g, "<h3>$1</h3>")
    .replace(/#{2}\s+(.+)/g, "<h2>$1</h2>")
    .replace(/#{1}\s+(.+)/g, "<h1>1</h1>")
    .replace(/\n/g, "<br />")

  return html
}
