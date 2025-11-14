"use client"

import Link from "next/link"
import { Code, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession } from "next-auth/react"
import { UserMenu } from "@/components/user-menu"
import { SignInButton } from "@/components/sign-in-button"

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Code className="h-6 w-6 text-primary" />
        <Link href="/">Grzegorz Motyl</Link>
      </div>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
        <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
          About Me
        </Link>
        <Link href="/#newsletter" className="text-sm font-medium hover:text-primary transition-colors">
          Newsletter
        </Link>
        <Link
          href={session ? "/articles?unseen=true" : "/articles"}
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Articles
        </Link>
        {session && (
          <Link href="/visit-all" className="text-sm font-medium hover:text-primary transition-colors">
            Visit All
          </Link>
        )}
        {status === "loading" ? (
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        ) : session ? (
          <UserMenu user={session.user} />
        ) : (
          <SignInButton />
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild className="md:hidden ml-auto">
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
            <Link
              href={session ? "/articles?unseen=true" : "/articles"}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Articles
            </Link>
            {session && (
              <>
                <Link href="/bookmarks" className="text-sm font-medium hover:text-primary transition-colors">
                  My Bookmarks
                </Link>
                <Link href="/visit-all" className="text-sm font-medium hover:text-primary transition-colors">
                  Visit All
                </Link>
              </>
            )}
            <div className="pt-4 border-t">
              {status === "loading" ? (
                <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
              ) : session ? (
                <div className="flex items-center gap-3">
                  <UserMenu user={session.user} />
                  <span className="text-sm">{session.user.name}</span>
                </div>
              ) : (
                <SignInButton />
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
