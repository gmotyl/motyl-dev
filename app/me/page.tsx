"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  BarChart3,
  BookMarked,
  CheckCheck,
  ExternalLink,
  Eye,
  Loader2,
  LogOut,
  Shield,
  TrendingUp,
  User as UserIcon,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"

function getInitials(name: string | null | undefined): string {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function MePage() {
  const { data: session, status } = useSession()
  const [userStats, setUserStats] = useState<{
    totalUsers: number
    recentUsers: number
  } | null>(null)

  const isSuperAdmin = (session?.user as any)?.isSuperAdmin ?? false

  useEffect(() => {
    if (isSuperAdmin) {
      fetch("/api/users/stats")
        .then((res) => res.json())
        .then((data) => setUserStats(data))
        .catch(console.error)
    }
  }, [isSuperAdmin])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-8">
            <span className="text-primary bg-gradient-purple bg-clip-text text-transparent">
              My Account
            </span>
          </h1>

          {/* User Profile Section */}
          <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {status === "loading" ? (
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                </div>
              ) : session ? (
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/30">
                    <AvatarImage src={session.user?.image ?? undefined} />
                    <AvatarFallback className="bg-gradient-purple text-white text-lg font-bold">
                      {getInitials(session.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl">{session.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                    {isSuperAdmin && (
                      <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-primary">
                        <Shield className="h-3 w-3" />
                        Super Admin
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto border-primary/30 hover:bg-primary/10"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Welcome!</h3>
                  <p className="text-muted-foreground mb-4">
                    Sign in to access your personalized dashboard
                  </p>
                  <Button
                    className="bg-gradient-purple hover:opacity-90 text-white"
                    onClick={() => signIn("github")}
                  >
                    Sign In with GitHub
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Your Content Section */}
          {session && (
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Link href="/bookmarks">
                <Card className="border-accent/20 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 h-full cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <BookMarked className="h-5 w-5" />
                      My Bookmarks
                    </CardTitle>
                    <CardDescription>Browse your saved links</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}

          {/* Admin Section */}
          {isSuperAdmin && (
            <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Admin
                </CardTitle>
                <CardDescription>Superadmin tools and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/admin/stats">
                    <Card className="border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
                          <BarChart3 className="h-5 w-5" />
                          Statistics
                        </CardTitle>
                        <CardDescription>
                          User registrations, pattern stats & trends
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {userStats ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{userStats.totalUsers} users</span>
                            <span className="text-green-500">
                              (+{userStats.recentUsers} this month)
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading stats...
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* App Section */}
          <Card className="border-highlight/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-highlight">
                <TrendingUp className="h-5 w-5" />
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Link href="/">
                  <Button variant="outline" size="sm" className="border-highlight/30 hover:bg-highlight/10">
                    <Eye className="h-4 w-4 mr-1" />
                    Trending
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button variant="outline" size="sm" className="border-highlight/30 hover:bg-highlight/10">
                    <BookMarked className="h-4 w-4 mr-1" />
                    Articles
                  </Button>
                </Link>
                <Link href="/newsletter">
                  <Button variant="outline" size="sm" className="border-highlight/30 hover:bg-highlight/10">
                    Newsletter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MePage
