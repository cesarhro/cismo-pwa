importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const cacheName = "cismo";

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    console.log("[Service Worker] Caching all: app shell and content");
    await cache.addAll([
      "abrigos.html",
      "cadastro-contatos.html",
      "contatos.html",
      "dicas.html",
      "index.html",
      "/assets/img/01d.png",
      "/assets/img/01n.png",
      "/assets/img/02d.png",
      "/assets/img/02n.png",
      "/assets/img/03d.png",
      "/assets/img/03n.png",
      "/assets/img/04d.png",
      "/assets/img/04n.png",
      "/assets/img/09d.png",
      "/assets/img/09n.png",
      "/assets/img/10d.png",
      "/assets/img/10n.png",
      "/assets/img/11d.png",
      "/assets/img/11n.png",
      "/assets/img/13d.png",
      "/assets/img/13n.png",
      "/assets/img/50d.png",
      "/assets/img/50n.png",
      "/assets/img/icons8-à-esquerda-dentro-de-um-círculo-100.png",
      "/assets/img/icons8-livro-de-endereço-2-100.png",
      "/assets/img/icons8-localização-100.png",
      "/assets/img/icons8-luz-acesa-100.png",
      "/assets/img/icons8-mais-100.png",
      "/assets/img/icons8-molhado-100.png",
      "/assets/img/icons8-página-inicial-100.png",
      "/assets/img/icons8-shelter-100.png",
      "/assets/img/icons8-usuário-de-gênero-neutro-100.png",
      "/assets/img/logo.png",
      "/assets/img/unknown.png",
      "/assets/icons/172.png",
      "/assets/icons/180.png",
      "/assets/icons/196.png",
      "/assets/icons/216.png",
      "/assets/icons/256.png",
      "/assets/icons/512.png",
      "/assets/icons/1024.png",
      "/assets/icons/appstore.png",
      "/assets/icons/playstore.png",
    ]);
  });
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
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

// This is the "Offline page" service worker

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const CACHE = "cismo";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "index.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })()
    );
  }
});
