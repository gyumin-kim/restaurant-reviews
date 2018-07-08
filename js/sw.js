let staticCacheName = 'restaurants-static-v2';
let urlsToCache = [
	'/',
	'/index.html',
  '/restaurant.html',
	'/css/styles.css',
	'/css/styles-desktop.css',
  '/js/dbhelper.js',
  '/js/main.js',
	'/js/restaurant_info.js',
	'/js/sw-registration.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
]

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	)
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
			Promise.all(cacheNames.map(function(cacheName) {
				if (cacheName !== staticCacheName) {
					return caches.delete(cacheName);
				}
			}))
		})
  )
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response)	return response;
        return fetch(event.request);
      })
    );
  }
});
// self.addEventListener("install", event => {
//   event.waitUntil(
//     caches
//       .open(staticCacheName)
//       .then(cache => cache.addAll(urlsToCache))
//       // .then(self.skipWaiting())
//   );
// });

// self.addEventListener("activate", event => {
//   event.waitUntil(
//     caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
//       if (cache !== staticCacheName) {
//         console.log("[ServiceWorker] removing cached files from ", cache);
//         return caches.delete(cache);
//       }
//     })))
//   )
// })

// self.addEventListener("fetch", event => {
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then(response => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//     );
//   }
// });