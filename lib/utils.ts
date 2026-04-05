import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a YYYY-MM-DD date string using Temporal API (timezone-safe).
 * Falls back to manual parsing if Temporal is unavailable.
 */
export function formatDate(dateStr: string): string {
  try {
    // Temporal.PlainDate has no timezone — no hydration mismatch
    if (typeof Temporal !== 'undefined' && Temporal.PlainDate) {
      const d = Temporal.PlainDate.from(dateStr)
      return d.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
  } catch {
    // fall through to manual parsing
  }

  // Fallback: parse YYYY-MM-DD manually — no Date object, no timezone shift
  const [year, month, day] = dateStr.split('-')
  if (year && month && day) {
    return `${day}.${month}.${year}`
  }

  return dateStr
}
