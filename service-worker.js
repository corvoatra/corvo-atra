const CACHE = 'corvo-atra-v1';
const BASE = '/corvo-atra/';
const SHELL = [BASE, BASE + 'index.html', BASE + 'obras.html', BASE + 'autor.html', BASE + 'blog/', BASE + 'contato.html', BASE + 'site-desktop.css', BASE + 'assets/imagens/logo-corvo-perfil.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => Promise.allSettled(SHELL.map(url => cache.add(url)))));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))), self.clients.claim()]));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).pathname.startsWith(BASE)) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || (event.request.mode === 'navigate' ? caches.match(BASE) : Response.error()))));
});
