// Service Worker for motyl.dev PWA
// Version 2.0.0
//
// Bump CACHE_VERSION on any caching-behaviour change: activate() deletes
// every motyl-* cache from older versions, so stale HTML/assets cached by
// a previous SW cannot outlive a deploy of this file.

const CACHE_VERSION = 'motyl-v2.1.1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const ARTICLE_CACHE = `${CACHE_VERSION}-articles`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/articles',
  '/offline',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - precache static assets.
// Precache failures must not reject the install: a single 404 in addAll()
// fails the whole install, leaving the previous SW active forever (this is
// how a renamed manifest.json froze v1 on devices for months).
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) =>
        Promise.allSettled(PRECACHE_ASSETS.map((asset) => cache.add(asset)))
          .then((results) => {
            results.forEach((r, i) => {
              if (r.status === 'rejected') {
                console.warn('[SW] Precache failed (skipped):', PRECACHE_ASSETS[i], r.reason);
              }
            });
          })
      )
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('motyl-') && cacheName !== STATIC_CACHE && cacheName !== RUNTIME_CACHE && cacheName !== ARTICLE_CACHE && cacheName !== IMAGE_CACHE;
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// True for hostnames served by a local dev server, where the SW must never
// serve cached assets. Matches localhost + *.localhost, loopback/any-bind IPs,
// and RFC1918 private-LAN ranges (10/8, 172.16-31/12, 192.168/16, 169.254/16).
function isDevHost(hostname) {
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) return true;
  if (hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '::1') return true;
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  return false;
}

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Dev hosts: bypass the SW entirely. Cache-first on /_next/ hashed chunks
  // silently serves stale JS after every rebuild, masking code changes and
  // breaking HMR — the source of repeated "the fix isn't showing" bugs.
  // Returning without respondWith lets the browser fetch normally, so the
  // running dev server is always the source of truth. Covers localhost and its
  // subdomains (e.g. api.localhost), the loopback/any-bind IPs, and private-LAN
  // addresses (so testing on a phone over the LAN also gets fresh JS).
  if (isDevHost(url.hostname)) {
    return;
  }

  // API requests - Network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
    return;
  }

  // Articles - Cache first, fallback to network
  if (url.pathname.startsWith('/articles/') && !url.pathname.includes('/api/')) {
    event.respondWith(cacheFirstStrategy(request, ARTICLE_CACHE));
    return;
  }

  // Images - Cache first, fallback to network
  if (request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE, 50)); // Max 50 images
    return;
  }

  // Static assets (_next, fonts, etc.) - Cache first
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    return;
  }

  // Default - Network first with cache fallback
  event.respondWith(networkFirstStrategy(request, RUNTIME_CACHE));
});

// Caching Strategies

async function cacheFirstStrategy(request, cacheName, maxEntries = null) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // console.log('[SW] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      // Manage cache size if maxEntries specified
      if (maxEntries) {
        const keys = await cache.keys();
        if (keys.length >= maxEntries) {
          await cache.delete(keys[0]); // Delete oldest
        }
      }

      cache.put(request, response.clone());
      // console.log('[SW] Cached new resource:', request.url);
    }

    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', request.url, error);

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }

    throw error;
  }
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      // console.log('[SW] Updated cache from network:', request.url);
    }

    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }

    throw error;
  }
}

// Background Sync for newsletter subscriptions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-newsletter') {
    event.waitUntil(syncNewsletterSubscriptions());
  }
});

async function syncNewsletterSubscriptions() {
  // Retrieve queued subscriptions from IndexedDB (implement in Phase 3)
  console.log('[SW] Background sync: newsletter subscriptions');
  // TODO: Implement queue processing
}
