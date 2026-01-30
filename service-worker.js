/* eslint-disable no-restricted-globals */

// 🛡️ STRICT ISOLATION: Self-destruct if not on approved domain
const ALLOWED_DOMAINS = ['v1.shubhampatra.dev', 'localhost', '127.0.0.1'];
if (!ALLOWED_DOMAINS.includes(self.location.hostname)) {
  console.warn('[ServiceWorker] ⛔ Illegal domain detected. Unregistering immediately.');
  self.registration.unregister();
}

// 📦 CACHE CONFIGURATION
// Use a generic name. We rely on filename hashing for versioning, not this string.
const CACHE_NAME = 'nyxfolio-v1-cache';
const RUNTIME_CACHE = 'nyxfolio-v1-runtime';

// 🛑 EXCLUSIONS
// Never cache these (API requests, etc.)
const NON_CACHEABLE_PATTERNS = [
  '/api/',
  '/socket.io/',
  'sockjs-node',
  'hot-update' // Dev mode HMR
];

// ✅ PRECACHE ASSETS
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/logo-icon-192.png',
  '/favicon-dark.svg'
];

// 🚀 INSTALL: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      // Force activation for faster updates
      return self.skipWaiting();
    })
  );
});

// 🧹 ACTIVATE: Clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 📡 FETCH: The core strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Ignore non-GET requests and cross-origin (unless critical assets)
  if (event.request.method !== 'GET' || !url.protocol.startsWith('http')) return;

  // 2. Ignore exclusions (API, sockets)
  if (NON_CACHEABLE_PATTERNS.some(pattern => url.pathname.includes(pattern))) {
    return;
  }

  // 3. STRATEGY: Stale-While-Revalidate for HTML (Network First effectively for index.html)
  // We want index.html to be fresh so it points to new hashed JS/CSS files.
  if (event.request.mode === 'navigate' || url.pathname === '/index.html' || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Offline fallback
          return caches.match(event.request).then((cachedResp) => {
            return cachedResp || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // 4. STRATEGY: Cache First for Hashed Assets (JS/CSS/Images)
  // Files with hashes like main.87ee8143.css never change content, only name.
  if (
    url.pathname.startsWith('/static/') ||
    url.pathname.match(/\.[0-9a-f]{8}\./) // Matches hash pattern
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            // Only cache valid responses
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 5. STRATEGY: Stale-While-Revalidate for everything else
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        return caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(err => console.log('Network fetch failed', err));

      return cachedResponse || fetchPromise;
    })
  );
});

// 🔄 SKIP WAITING message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
