// IndexedDB queue for offline newsletter subscriptions

interface QueuedSubscription {
  id: string
  email: string
  timestamp: number
}

const DB_NAME = 'motyl-pwa'
const STORE_NAME = 'newsletter-queue'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

export async function queueNewsletterSubscription(email: string): Promise<void> {
  const db = await openDB()
  const transaction = db.transaction([STORE_NAME], 'readwrite')
  const store = transaction.objectStore(STORE_NAME)

  const subscription: QueuedSubscription = {
    id: crypto.randomUUID(),
    email,
    timestamp: Date.now()
  }

  await store.add(subscription)

  // Register background sync
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready
    // @ts-ignore - sync is not in standard TS lib yet
    await registration.sync.register('sync-newsletter')
  }
}

export async function getQueuedSubscriptions(): Promise<QueuedSubscription[]> {
  const db = await openDB()
  const transaction = db.transaction([STORE_NAME], 'readonly')
  const store = transaction.objectStore(STORE_NAME)

  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function removeQueuedSubscription(id: string): Promise<void> {
  const db = await openDB()
  const transaction = db.transaction([STORE_NAME], 'readwrite')
  const store = transaction.objectStore(STORE_NAME)
  await store.delete(id)
}
