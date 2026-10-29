import {readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const list=await readdir('dist/assets');const files=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png',...list.map(x=>'./assets/'+x)];
const version=createHash('sha256').update(JSON.stringify(files)).digest('hex').slice(0,12);
await writeFile('dist/sw.js',`const CACHE='gloomroot-${version}';const FILES=${JSON.stringify(files)};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gloomroot-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreVary:true}).then(c=>c||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())))});`);

