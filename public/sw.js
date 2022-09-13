let cacheName = 'v3';

let cacheAssets = [
    '/offline.html',
    '/manifest.json'
]

self.addEventListener('install', (e) => {
    console.log('Service worker installd')
    //precache the offline page
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e => {
    console.log('Activated works')
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        caches.delete(cache)
                    }
                })
            )
        })
    )
})
self.addEventListener('fetch', e => {
    e.respondWith(
        //then you open the offline page
        fetch(e.request).catch(() => caches.match('offline.html'))
    )
})
