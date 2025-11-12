"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      variant="outline"
      className="gap-2"
    >
      <Github className="h-4 w-4" />
      <span>Sign In</span>
    </Button>
  )
}
