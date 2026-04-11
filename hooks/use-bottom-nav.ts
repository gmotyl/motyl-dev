"use client"

import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"

export interface NavItemConfig {
  href: string
  icon: LucideIcon
  label: string
  /** Custom active matcher. Defaults to prefix match (exact for "/"). */
  match?: (pathname: string) => boolean
  badge?: number | string
}

export function useBottomNav(items: NavItemConfig[]) {
  const pathname = usePathname()

  const isItemActive = (item: NavItemConfig): boolean => {
    if (item.match) return item.match(pathname)
    const basePath = item.href.split("?")[0]
    return basePath === "/" ? pathname === "/" : pathname.startsWith(basePath)
  }

  const activeIndex = items.findIndex(isItemActive)

  return { activeIndex, isItemActive }
}
