import NextAuth, { type DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      githubId?: string
    } & DefaultSession["user"]
  }
}

// Dev-only credentials provider for local testing
const devCredentialsProvider = Credentials({
  id: "dev-credentials",
  name: "Dev Login",
  credentials: {
    email: { label: "Email", type: "email" },
  },
  async authorize(credentials) {
    // Only allow in development with DEV_AUTH_BYPASS=true
    if (process.env.NODE_ENV !== "development" || process.env.DEV_AUTH_BYPASS !== "true") {
      return null
    }

    // Return a mock user for local testing
    return {
      id: "dev-user-123",
      name: "Dev User",
      email: credentials?.email as string || "dev@localhost",
      image: null,
      githubId: "dev-123",
    }
  },
})

// Build providers array
const providers = [
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url,
        githubId: profile.id.toString(),
      }
    },
  }),
]

// Add dev credentials provider only in development
if (process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "true") {
  providers.push(devCredentialsProvider as any)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    // Use JWT strategy when dev credentials are enabled (no database adapter for credentials)
    strategy: process.env.DEV_AUTH_BYPASS === "true" ? "jwt" : "database",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.githubId = (user as any).githubId
      }
      return token
    },
    async session({ session, user, token }) {
      if (session.user) {
        // Handle both JWT (dev) and database (prod) sessions
        if (token) {
          session.user.id = token.id as string
          session.user.githubId = token.githubId as string
        } else if (user) {
          session.user.id = user.id
          session.user.githubId = (user as any).githubId
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/",
  },
})
