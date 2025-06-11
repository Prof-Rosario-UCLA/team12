const CACHE_NAME = 'pantry-pal-v1';
const urlsToCache = [
    '/',
    '/index.html',
];

self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching App Shell');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'POST') {
        event.respondWith(fetch(event.request));
        return;
    }
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    function(response) {
                        if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    }
                ).catch(function() {
                    if (event.request.mode === 'navigate') {
                        // return caches.match('/offline.html');
                    }
                    console.log('Service Worker: Fetch failed, returning offline fallback.');
                    return new Response(JSON.stringify({ message: "You are offline." }), {
                        headers: { 'Content-Type': 'application/json' },
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 