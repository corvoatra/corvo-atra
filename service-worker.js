// Corvo Atra: worker sem cache e sem interceptação de navegação.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('corvo-atra-')).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
