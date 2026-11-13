"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, CheckCircle } from "lucide-react"

import { queueNewsletterSubscription } from '@/lib/newsletter/queue'

interface NewsletterFormProps {
  articleSlug?: string
}

export default function NewsletterForm({ articleSlug }: NewsletterFormProps = {}) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, articleSlug }),
      })

      // The server answered, so this is never an offline case: handle 429
      // before the catch block can route it to the offline queue.
      if (response.status === 429) {
        toast({
          title: "Too many attempts — try again later",
          description: "Please wait a while before subscribing again.",
          variant: "destructive",
        })
        return
      }

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        toast({
          title: "Check your inbox",
          description: "We've sent you an email — click the confirmation link in it to complete your subscription.",
        })
        setEmail("")

        // Reset the success state after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false)
        }, 5000)
      } else {
        throw new Error(data.error || "Subscription failed")
      }
    } catch (error) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        await queueNewsletterSubscription(email)
        toast({
          title: "You're offline",
          description: "Subscription queued! Will sync when online.",
        })
        setEmail("")
      } else {
        toast({
          title: "Something went wrong.",
          description: "Please try again later or contact support if the problem persists.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="flex w-full max-w-sm items-center justify-center space-x-2 p-4 rounded-lg border border-primary/30 bg-gradient-purple-soft">
        <CheckCircle className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-primary">Check your inbox to confirm!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 bg-background/50 backdrop-blur-sm border-border/40 focus:border-primary/50 focus:ring-primary/20"
          required
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-purple hover:opacity-90 text-white shadow-lg hover:shadow-primary/30 transition-all duration-300 px-6"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Joining...</span>
          </div>
        ) : (
          "Join"
        )}
      </Button>
    </form>
  )
}
