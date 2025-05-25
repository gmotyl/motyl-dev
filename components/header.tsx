import Link from "next/link"
import { Code, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Code className="h-6 w-6 text-primary" />
        <Link href="/">Grzegorz Motyl</Link>
      </div>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
          About Me
        </Link>
        <Link href="/#newsletter" className="text-sm font-medium hover:text-primary transition-colors">
          Newsletter
        </Link>
        <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
          Articles
        </Link>
      </nav>
      <div className="ml-auto md:ml-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Admin</Link>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild className="md:hidden ml-2">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Me
            </Link>
            <Link href="/#newsletter" className="text-sm font-medium hover:text-primary transition-colors">
              Newsletter
            </Link>
            <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
              Articles
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
