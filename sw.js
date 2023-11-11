// original template author: yuhi
// https://github.com/yuhixyz/yuhixyz.github.io/blob/master/sw-template.js

const workboxVersion = '5.1.3';

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({ prefix: "axyc" });

workbox.core.skipWaiting();

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([{"revision":"50a3680b54fdbfd4ddfd9a404030b3a0","url":"./css/meme.min.a8ad10ddf0f27104685b16b1e3f1329a9e941f957bc9086000faa8a73bf990f9.css"},{"revision":"5ebdc6fd7bea29688b90f23b795a3b43","url":"./fonts/glyph-correction.ttf"},{"revision":"12ce5c2c4380aafb8317470f8479cbfb","url":"./fonts/glyph-correction.woff"},{"revision":"8d2a4fd8cbf836428792bdd7f92af172","url":"./fonts/glyph-correction.woff2"},{"revision":"887075a85122a499c0a587e17beb3741","url":"./js/lazysizes.min.js"},{"revision":"99b4a5304f5be5428dc9f2b5b80c0fab","url":"./js/meme-custom.min.js"},{"revision":"c07df89acac7f65ef07e7940148e43db","url":"./js/meme.min.ebd490ba7ee49f7bfca05e2166bc6ff8d62b18ed7841be631cd257275e74a279.js"},{"revision":"053100cb84a50d2ae7f5492f7dd7f25e","url":"./manifest.json"},{"revision":"61f108a077c1154e477546981d89ff90","url":"./search.json"}]);

workbox.precaching.cleanupOutdatedCaches();

// Images
workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Fonts
//workbox.routing.registerRoute(
//    /\.(?:eot|ttf|woff|woff2)$/,
//    new workbox.strategies.CacheFirst({
//        cacheName: "fonts",
//        plugins: [
//            new workbox.expiration.ExpirationPlugin({
//                maxEntries: 1000,
//                maxAgeSeconds: 60 * 60 * 24 * 30
//            }),
//            new workbox.cacheableResponse.CacheableResponsePlugin({
//                statuses: [0, 200]
//            })
//        ]
//    })
//);
//
//// Google Fonts
//workbox.routing.registerRoute(
//    /^https:\/\/fonts\.googleapis\.com/,
//    new workbox.strategies.StaleWhileRevalidate({
//        cacheName: "google-fonts-stylesheets"
//    })
//);
//workbox.routing.registerRoute(
//    /^https:\/\/fonts\.gstatic\.com/,
//    new workbox.strategies.CacheFirst({
//        cacheName: 'google-fonts-webfonts',
//        plugins: [
//            new workbox.expiration.ExpirationPlugin({
//                maxEntries: 1000,
//                maxAgeSeconds: 60 * 60 * 24 * 30
//            }),
//            new workbox.cacheableResponse.CacheableResponsePlugin({
//                statuses: [0, 200]
//            })
//        ]
//    })
//);

// Static Libraries
workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net/,
    new workbox.strategies.CacheFirst({
        cacheName: "static-libs",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

workbox.googleAnalytics.initialize();

