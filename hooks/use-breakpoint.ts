"use client"

import * as React from "react"

export type Breakpoint = "mobile" | "tablet" | "desktop"

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>("desktop")

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.sm) {
        setBreakpoint("mobile")
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint("tablet")
      } else {
        setBreakpoint("desktop")
      }
    }

    updateBreakpoint()
    window.addEventListener("resize", updateBreakpoint)
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])

  return breakpoint
}

export function useIsMobileNav(): boolean {
  const breakpoint = useBreakpoint()
  return breakpoint === "mobile"
}
