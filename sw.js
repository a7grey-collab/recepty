/* Рецепты на каждый день — service worker v21. Always the newest version online, last saved version offline. Alex Grey · IT Solutions · https://t.me/a7grey */
const CACHE = 'recepty-v21';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png']).catch(() => {}))); });
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-store' }).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request.mode === 'navigate' ? './' : e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request.mode === 'navigate' ? './' : e.request).then((r) => r || caches.match('./'))));
});
