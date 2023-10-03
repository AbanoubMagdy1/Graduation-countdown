const cacheName = 'sw-cache-v1';

const filesToCache = [
    '/',
    'style.css',
    'script.js',
    'graduationPhoto.jpg',
]

self.addEventListener('install', function(event) {
    event.waitUntil( async function() {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
    })
})

self.addEventListener('fetch', async function(event) {
    event.respondWith( 
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    )
})

self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon,
        image: data.image,
    }
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    )
})