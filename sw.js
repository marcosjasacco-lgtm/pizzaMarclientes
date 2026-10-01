const CACHE='pizzamar-clientes-v12';
const ASSETS=['./','./index.html','./pm-api.js','./manifest.json','./assets/super-especial.jpg','./assets/muzza.jpg','./assets/napolitana.jpg','./assets/jamon-morron.jpg','./assets/fugazzeta.jpg','./assets/caprese.jpg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('pizzamar-clientes-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method!=='GET'||url.origin!==self.location.origin)return;
  if(e.request.mode==='navigate'||url.pathname.endsWith('/pm-api.js')){
    e.respondWith(fetch(e.request,{cache:'no-cache'}).then(async r=>{
      if(r.ok){const c=await caches.open(CACHE);await c.put(e.request,r.clone());}return r;
    }).catch(async()=>{
      const c=await caches.open(CACHE);
      const r=await c.match(e.request)||await c.match(e.request.mode==='navigate'?'./index.html':'./pm-api.js');
      return r||Response.error();
    }));return;
  }
  e.respondWith(caches.open(CACHE).then(async c=>await c.match(e.request)||fetch(e.request)));
});
