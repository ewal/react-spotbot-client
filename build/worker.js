console.log("SW startup");

importScripts('/sw_cache_polyfill.js');

var CACHE_NAME = 'react-spotblot-client-v2',
    appUrl = ['dist.entry.js'];


self.addEventListener('install', function(event) {
  console.log("SW installed");

  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(appUrl);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("SW fetch");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
