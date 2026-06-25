export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Blog', href: '/articles' },
  { label: 'News', href: '/news?unseen=true', superAdminOnly: true },
  { label: 'About', href: '/about' },
] as const

export function getVisibleNavLinks(isSuperAdmin: boolean) {
  return NAV_LINKS.filter((link) => {
    const isSuperAdminLink = 'superAdminOnly' in link && link.superAdminOnly
    if (isSuperAdminLink && !isSuperAdmin) {
      return false
    }
    return true
  })
}
