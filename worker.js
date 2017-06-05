"use strict";
const CACHE_NAME = 'ua-web-challenge-xi-semifinal-v1-secretCat123';
const cacheURLs = [];
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(cacheURLs)));
});
// when update needed
// self.addEventListener('activate', (event: any) => {
// 	const cacheWhitelist: any = [];
//
// 	event.waitUntil(
// 		caches.keys().then((cacheNames: string[]) => {
// 			return Promise.all(
// 				cacheNames.map((cacheName) => {
// 					if (cacheWhitelist.indexOf(cacheName) === -1) {
// 						return caches.delete(cacheName);
// 					}
//
// 					return true;
// 				})
// 			);
// 		})
// 	);
// });
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then((response) => {
        if (response) {
            return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
            .then((response) => {
            if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
                return response;
            }
            let clone = response.clone();
            caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, clone));
            return response;
        });
    }));
});
