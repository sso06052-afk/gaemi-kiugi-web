// MS 스토어용 웹 버전의 오프라인 캐시. 처음 연 뒤에는 인터넷 없이도 열려요(코스피 날씨만 빠져요).
const CACHE = 'gk-mvq90pkf';
const FILES = ["./","./assets/index-BZQyDUpt.js","./assets/index-RyLHj8Gb.css","./g11.woff2","./g11b.woff2","./galmuri-OFL.txt","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
