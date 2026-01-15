"use client"

import Link from "next/link"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavItemProps {
  href: string
  icon: LucideIcon
  label: string
  isActive: boolean
  badge?: number | string
}

export function BottomNavItem({
  href,
  icon: Icon,
  label,
  isActive,
  badge,
}: BottomNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex-1 flex flex-col items-center justify-center py-2 px-1 relative",
        "transition-colors duration-200",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isActive && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
      )}
      <div className="relative">
        <Icon className={cn("h-6 w-6", isActive && "text-primary")} />
        {badge && (
          <span className="absolute -top-1 -right-2 h-4 min-w-4 px-1 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span
        className={cn("text-xs mt-1", isActive ? "font-medium" : "font-normal")}
      >
        {label}
      </span>
    </Link>
  )
}
