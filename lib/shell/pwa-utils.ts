export function isPWA(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://')
}

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isAndroid(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

export function canInstallPWA(): boolean {
  if (typeof window === 'undefined') return false
  return 'BeforeInstallPromptEvent' in window
}

export function isOnline(): boolean {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

// Track PWA installation
export function trackPWAInstall() {
  if (isPWA()) {
    localStorage.setItem('pwa-installed', 'true')
    localStorage.setItem('pwa-installed-date', new Date().toISOString())
  }
}

// Check if PWA was previously installed
export function wasPreviouslyInstalled(): boolean {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem('pwa-installed') === 'true'
}
