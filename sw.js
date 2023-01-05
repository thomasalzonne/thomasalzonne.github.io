const OFFLINE_URL = '/offline';
const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };

self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
        "/index.html",
        "/style.css",
        "/app.js",
      ])
    );
  });

  self.addEventListener("fetch", (e) => {
      e.respondWith(
        (async () => {
          const r = await caches.match(e.request);
          console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
          if (r) {
            return r;
          }
          const response = await fetch(e.request);
          const cache = await caches.open("v1");
          console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
          cache.put(e.request, response.clone());
          return response;
        })()
      );
  })
  