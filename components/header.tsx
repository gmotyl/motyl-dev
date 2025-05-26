import type React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header className={cn("bg-background border-b", className)} {...props}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" aria-hidden="true" />
          <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Documentation
          </Link>
          <Link href="/examples" className="hover:text-primary transition-colors">
            Examples
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild className="ml-auto">
            <Button variant="ghost" size="sm" className="md:hidden">
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
              <SheetDescription>Explore our site and discover what we have to offer.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link href="/examples" className="text-sm font-medium hover:text-primary transition-colors">
                Examples
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
