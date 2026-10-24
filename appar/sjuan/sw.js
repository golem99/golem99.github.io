// Gör att spelet fungerar utan täckning när det väl laddats en gång.
// Höj versionen vid varje ändring så att telefonerna hämtar det nya.
const C = "tabellresan-v17";
const FILES = [
"./",
"index.html",
"manifest.webmanifest",
"icon-192.png",
"icon-512.png",
"apple-touch-icon.png",
"img/bus.webp",
"img/sticker-kristinestad.webp",
"img/sticker-trophy.webp",
"img/avatars/bunny.webp",
"img/avatars/cloud.webp",
"img/avatars/cupcake-kitten.webp",
"img/avatars/dolphin.webp",
"img/avatars/donut-puppy.webp",
"img/avatars/dragon.webp",
"img/avatars/elephant.webp",
"img/avatars/fairy-squirrel.webp",
"img/avatars/fox.webp",
"img/avatars/hamster.webp",
"img/avatars/hedgehog.webp",
"img/avatars/icecream-bear.webp",
"img/avatars/kitten.webp",
"img/avatars/koala.webp",
"img/avatars/ladybug.webp",
"img/avatars/moon.webp",
"img/avatars/owl.webp",
"img/avatars/panda.webp",
"img/avatars/pegasus.webp",
"img/avatars/penguin.webp",
"img/avatars/planet.webp",
"img/avatars/puppy.webp",
"img/avatars/seahorse.webp",
"img/avatars/star.webp",
"img/avatars/strawberry-bunny.webp",
"img/avatars/turtle.webp",
"img/avatars/unicorn.webp"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))));
  self.clients.claim();
});
// Nätet först (så att nya versioner syns), cachen om det inte finns täckning.
// Bilder som inte finns än (t.ex. nya klistermärken) sparas inte.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Låtarna strömmas direkt (spolning och högtalare behöver nätet).
  if (e.request.url.includes("/songs/")) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
