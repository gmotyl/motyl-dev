"use client"

import { useState } from "react"
import { RotateCcw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

/** Pure client-side equivalent of lib/trends.ts getCurrentWeek() */
function getClientCurrentWeek(): string {
  const date = new Date()
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -3 : 4)
  const thursday = new Date(date.getFullYear(), date.getMonth(), diff)
  const year = thursday.getFullYear()
  const jan4 = new Date(year, 0, 4)
  const jan4Day = jan4.getDay()
  const jan4Diff = jan4.getDate() - jan4Day + (jan4Day === 0 ? -3 : 4)
  const weekOneThursday = new Date(year, 0, jan4Diff)
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weekNum =
    Math.floor(
      (thursday.getTime() - weekOneThursday.getTime()) / msPerWeek
    ) + 1
  return `${year}-w${String(weekNum).padStart(2, "0")}`
}

type ResetState = "idle" | "loading" | "success" | "error"

export function TrendsResetPanel() {
  const currentWeek = getClientCurrentWeek()
  const [state, setState] = useState<ResetState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  async function handleReset() {
    setState("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/trends/reset", { method: "POST" })
      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error ?? "Unexpected error")
        setState("error")
        return
      }

      setState("success")
    } catch {
      setErrorMessage("Network error — could not reach server")
      setState("error")
    }
  }

  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <p className="font-medium text-sm">Reset Weekly Votes</p>
          <p className="text-sm text-muted-foreground">
            Current week: <span className="font-mono">{currentWeek}</span>
          </p>
        </div>
      </div>

      {state === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400 bg-green-500/10 rounded px-3 py-2">
          Weekly votes for <span className="font-mono">{currentWeek}</span> were
          archived and reset successfully.
        </p>
      )}

      {state === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 rounded px-3 py-2">
          Reset failed: {errorMessage}
        </p>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className="w-full gap-2"
            disabled={state === "loading" || state === "success"}
          >
            <RotateCcw className="h-4 w-4" />
            {state === "loading" ? "Resetting…" : "Reset Weekly Votes"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset weekly votes?</AlertDialogTitle>
            <AlertDialogDescription>
              This will archive current week{" "}
              <span className="font-mono font-medium">{currentWeek}</span> votes
              and reset the counter. Archived votes remain accessible in the
              trends archive. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, reset votes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
