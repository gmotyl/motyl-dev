"use client"

import { usePathname } from "next/navigation"
import { Home, Newspaper, BookOpen, User } from "lucide-react"
import { BottomNavItem } from "./bottom-nav-item"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/news?unseen=true", icon: Newspaper, label: "News" },
  { href: "/articles", icon: BookOpen, label: "Blog" },
  { href: "/me", icon: User, label: "Me" },
]

export function BottomNav() {
  const pathname = usePathname()

  const getActiveIndex = () => {
    if (pathname === "/") return 0
    if (pathname.startsWith("/news")) return 1
    if (pathname.startsWith("/articles")) return 2
    if (pathname === "/me") return 3
    return -1
  }

  const activeIndex = getActiveIndex()
  const tabCount = navItems.length

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/news")) return pathname.startsWith("/news")
    if (href.startsWith("/articles")) return pathname.startsWith("/articles")
    if (href === "/me") return pathname === "/me"
    return false
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden h-16 border-t border-border/40 backdrop-blur-sm bg-background/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Sliding indicator — single element that moves between tabs */}
      {activeIndex >= 0 && (
        <div
          className="absolute top-0 h-0.5 w-8 rounded-full bg-primary pointer-events-none"
          style={{
            left: `calc(${(activeIndex / tabCount) * 100 + 100 / tabCount / 2}% - 16px)`,
            transition: "left 280ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      )}
      {navItems.map((item) => (
        <BottomNavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.href)}
        />
      ))}
    </nav>
  )
}
