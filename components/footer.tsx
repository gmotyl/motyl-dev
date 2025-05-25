import { Code, Github, MailCheck, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8 backdrop-blur-sm bg-background/80">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Code className="h-5 w-5 text-primary" />
          <span>Grzegorz Motyl</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Grzegorz Motyl. Raising the bar of professional software development.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
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
