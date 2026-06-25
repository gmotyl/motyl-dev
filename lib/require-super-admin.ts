import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

/**
 * Server guard for SuperAdmin-only pages.
 * Logged-out → sign-in (returns to callbackPath after auth).
 * Logged-in but not SuperAdmin → home.
 */
export async function requireSuperAdmin(callbackPath: string): Promise<void> {
  const session = await auth()
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackPath)}`)
  }
  if (!session.user?.isSuperAdmin) {
    redirect('/')
  }
}
