// Network-first PWA Service Worker v=1792777140
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(name) { return caches.delete(name); }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});
self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('MaterialIcons') !== -1 || e.request.url.indexOf('FontManifest') !== -1) {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }));
    return;
  }
  e.respondWith(fetch(e.request));
});
