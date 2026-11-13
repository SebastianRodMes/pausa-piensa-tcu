// Genera dist/sw.js con la lista de archivos para que la herramienta funcione sin conexión
// después de abrirla una vez con internet.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
const dist = 'dist';
const archivos = [];
(function rec(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) rec(p);
    else if (!n.endsWith('.map') && n !== 'sw.js' && !/\.woff$/.test(n) && !/(cyrillic|greek|vietnamese|latin-ext)/.test(n)) archivos.push('/' + relative(dist, p).split(sep).join('/'));
  }
})(dist);
const urls = archivos.map((u) => u.replace(/index\.html$/, ''));
const version = 'v' + Date.now();
const sw = `const CACHE='pausa-${version}';const URLS=${JSON.stringify(urls)};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match(u.pathname.endsWith('/')?u.pathname:u.pathname+'/'))))});`;
writeFileSync(join(dist, 'sw.js'), sw);
console.log(`sw.js: ${urls.length} archivos en caché`);
