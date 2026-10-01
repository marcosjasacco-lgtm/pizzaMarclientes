const CACHE='pizzamar-clientes-v9';
const ASSETS=['./','./index.html','./pm-api.js','./manifest.json','./assets/super-especial.jpg','./assets/muzza.jpg','./assets/napolitana.jpg','./assets/jamon-morron.jpg','./assets/fugazzeta.jpg','./assets/caprese.jpg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
