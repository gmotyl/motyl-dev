"use client"

import { useSession, signOut, signIn } from "next-auth/react"
import Link from "next/link"
import {
  Bookmark,
  CheckCircle2,
  LogOut,
  Download,
  User,
  ChevronRight,
  Github,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useInstallPrompt } from "@/hooks/use-install-prompt"

interface MenuLinkProps {
  href: string
  icon: React.ElementType
  label: string
  description?: string
}

function MenuLink({ href, icon: Icon, label, description }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <span className="font-medium">{label}</span>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  )
}

interface MenuButtonProps {
  icon: React.ElementType
  label: string
  description?: string
  onClick: () => void
}

function MenuButton({ icon: Icon, label, description, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <span className="font-medium">{label}</span>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  )
}

export default function MePage() {
  const { data: session, status } = useSession()
  const { canInstall, handleInstallClick } = useInstallPrompt()

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8 px-4 max-w-lg mx-auto">
        {/* User Profile Section */}
        <section className="mb-8">
          {status === "loading" ? (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ) : session ? (
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || ""}
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-lg">{session.user?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto mb-4">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-bold text-lg mb-2">Welcome</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Sign in to access bookmarks and personalized features
              </p>
              <Button
                onClick={() => signIn("github")}
                className="w-full gap-2"
              >
                <Github className="h-4 w-4" />
                Sign In with GitHub
              </Button>
            </div>
          )}
        </section>

        {/* Navigation Links - Auth Required */}
        {session && (
          <section className="space-y-3 mb-8">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
              Your Content
            </h3>
            <div className="space-y-2">
              <MenuLink
                href="/bookmarks"
                icon={Bookmark}
                label="My Bookmarks"
                description="Saved external links from articles"
              />
              <MenuLink
                href="/visit-all"
                icon={CheckCircle2}
                label="Mark All as Read"
                description="Quickly browse through all articles"
              />
            </div>
          </section>
        )}

        {/* App Section */}
        {canInstall && (
          <section className="space-y-3 mb-8">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
              App
            </h3>
            <div className="space-y-2">
              <MenuButton
                icon={Download}
                label="Install App"
                description="Add to your home screen"
                onClick={handleInstallClick}
              />
            </div>
          </section>
        )}

        {/* Sign Out */}
        {session && (
          <section className="mt-8 pt-6 border-t border-border/40">
            <Button
              variant="outline"
              className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
