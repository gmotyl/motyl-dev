"use client"

import { Home, Newspaper, BookOpen, User } from "lucide-react"
import { useBottomNav, type NavItemConfig } from "@/hooks/use-bottom-nav"
import { BottomNavItem } from "./bottom-nav-item"

const navItems: NavItemConfig[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/news?unseen=true", icon: Newspaper, label: "News" },
  { href: "/articles", icon: BookOpen, label: "Blog" },
  { href: "/me", icon: User, label: "Me" },
]

export function BottomNav() {
  const { activeIndex, isItemActive } = useBottomNav(navItems)
  const tabCount = navItems.length

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
          isActive={isItemActive(item)}
          badge={item.badge}
        />
      ))}
    </nav>
  )
}
