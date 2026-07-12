// мінімальний сервіс-воркер: network-first (щоб гра ЗАВЖДИ свіжа), кеш — лише запасний варіант офлайн
const CACHE = 'wedgame-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
      return r;
    }).catch(() => caches.match(e.request))
  );
});
