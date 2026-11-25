// خدمة تخزين ملفات الواجهة فقط. الـAPI والدخول دايمًا من السيرفر.
const VERSION = 'warda-v4';
const SHELL = ['/', '/index.html', '/style.css', '/app.js', '/data.js', '/config.js', '/offline.html', '/manifest.webmanifest',
  '/vendor/katex.min.css', '/vendor/katex.min.js', '/vendor/auto-render.min.js', '/vendor/pdf.min.js', '/vendor/supabase.js', '/icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request).then(r => r || (e.request.mode === 'navigate' ? caches.match('/offline.html') : Response.error()))));
});
