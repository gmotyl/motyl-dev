import Link from "next/link"
import { Code, Github, MailCheck } from "lucide-react"
import { CookieSettingsLink } from "@/components/cookie-settings-link"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8 backdrop-blur-sm bg-background/80">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <Link href="/about" className="flex items-center gap-2 font-semibold hover:text-primary transition-colors">
          <Code className="h-5 w-5 text-primary" />
          <span>Grzegorz Motyl</span>
        </Link>
<p className="text-center text-sm text-muted-foreground md:text-left">
  &copy; {new Date().getFullYear()} Grzegorz Motyl. Raising the bar of professional software development.
</p>
<div className="flex items-center gap-3 text-xs text-muted-foreground">
  <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
  <span>·</span>
  <CookieSettingsLink />
  <span>·</span>
  <Link href="/unsubscribe" className="hover:text-primary transition-colors">Unsubscribe</Link>
</div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gmotyl/motyl-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://bsky.app/profile/gmotyl.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
            </svg>
            <span className="sr-only">Bluesky</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <MailCheck className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
