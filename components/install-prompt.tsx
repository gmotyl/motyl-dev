"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useInstallPrompt } from "@/hooks/use-install-prompt"

export function InstallPrompt() {
  const { canInstall, handleInstallClick } = useInstallPrompt()

  if (!canInstall) {
    return null
  }

  return (
    <Button
      onClick={handleInstallClick}
      size="sm"
      variant="outline"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      <span className="hidden md:inline">Install App</span>
    </Button>
  )
}
