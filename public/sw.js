const CACHE_NAME = 'hcu-landmarklens-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // Vite assets will be hashed, so we usually let workbox handle it 
  // but for a simple vanilla setup we can just cache the main entry.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
