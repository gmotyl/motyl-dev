"use client"

import { Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

/**
 * Dev-only sign-in button that bypasses GitHub OAuth.
 * Only visible when NEXT_PUBLIC_DEV_AUTH_BYPASS=true
 *
 * To use locally:
 * 1. Add to .env.local: NEXT_PUBLIC_DEV_AUTH_BYPASS=true
 * 2. Add to .env.local: DEV_AUTH_BYPASS=true
 * 3. Restart dev server
 */
export function DevSignInButton() {
  // Only show in development with DEV_AUTH_BYPASS enabled
  if (process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS !== "true") {
    return null
  }

  const handleDevLogin = () => {
    signIn("dev-credentials", {
      email: "dev@localhost",
      callbackUrl: "/",
    })
  }

  return (
    <Button
      onClick={handleDevLogin}
      variant="outline"
      className="gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
    >
      <Bug className="h-4 w-4" />
      <span>Dev Login</span>
    </Button>
  )
}
