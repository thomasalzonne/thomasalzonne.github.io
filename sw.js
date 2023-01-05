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

  self.addEventListener("fetch", (event) => {
    if (event.request.mode === 'navigate') {
        console.log('horsligne')
        return event.respondWith(
          fetch(event.request).catch(() => caches.match(OFFLINE_URL))
        );
      }
      
  })
  