"use client"

import { Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

/**
 * Dev-only sign-in buttons that bypass GitHub OAuth.
 * Only visible when NEXT_PUBLIC_DEV_AUTH_BYPASS=true
 *
 * Renders two one-click logins:
 * - "Dev Login (Admin)"  → signs in as NEXT_PUBLIC_SUPERADMIN_EMAIL
 *                          (falls back to "superadmin@localhost" when unset).
 *                          To actually get superadmin, set NEXT_PUBLIC_SUPERADMIN_EMAIL
 *                          in .env.local to the SAME value as SUPERADMIN_EMAIL — the
 *                          session callback marks a user superadmin only when the email
 *                          matches SUPERADMIN_EMAIL.
 * - "Dev Login (User)"   → always signs in as the regular, non-superadmin
 *                          user "user@localhost".
 *
 * To use locally:
 * 1. Add to .env.local: NEXT_PUBLIC_DEV_AUTH_BYPASS=true
 * 2. Add to .env.local: DEV_AUTH_BYPASS=true
 * 3. (For the Admin button) Add to .env.local:
 *      NEXT_PUBLIC_SUPERADMIN_EMAIL=<same value as SUPERADMIN_EMAIL>
 * 4. Restart dev server
 */
export function DevSignInButton() {
  // Only show in development with DEV_AUTH_BYPASS enabled
  if (process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS !== "true") {
    return null
  }

  const SUPERADMIN_EMAIL =
    process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL ?? "superadmin@localhost"

  const handleAdminLogin = () => {
    signIn("dev-credentials", {
      email: SUPERADMIN_EMAIL,
      callbackUrl: "/",
    })
  }

  const handleUserLogin = () => {
    signIn("dev-credentials", {
      email: "user@localhost",
      callbackUrl: "/",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleAdminLogin}
        variant="outline"
        data-testid="dev-login-admin"
        aria-label="Dev Login (Admin)"
        className="gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
      >
        <Bug className="h-4 w-4" />
        <span>Dev Login (Admin)</span>
      </Button>
      <Button
        onClick={handleUserLogin}
        variant="outline"
        data-testid="dev-login-user"
        aria-label="Dev Login (User)"
        className="gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
      >
        <Bug className="h-4 w-4" />
        <span>Dev Login (User)</span>
      </Button>
    </div>
  )
}
