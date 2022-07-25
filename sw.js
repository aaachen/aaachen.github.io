// original template author: yuhi
// https://github.com/yuhixyz/yuhixyz.github.io/blob/master/sw-template.js

const workboxVersion = '5.1.3';

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({ prefix: "axyc" });

workbox.core.skipWaiting();

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([{"revision":"ced7f8e30c9e9baa43fe843ae11fd5e1","url":"./css/meme.min.d6166d54a4d8484031e72df88c0dd4ff2fc4569a3fc8270902e76cd2f14f6ce4.css"},{"revision":"5ebdc6fd7bea29688b90f23b795a3b43","url":"./fonts/glyph-correction.ttf"},{"revision":"12ce5c2c4380aafb8317470f8479cbfb","url":"./fonts/glyph-correction.woff"},{"revision":"8d2a4fd8cbf836428792bdd7f92af172","url":"./fonts/glyph-correction.woff2"},{"revision":"887075a85122a499c0a587e17beb3741","url":"./js/lazysizes.min.js"},{"revision":"c827adbe0c0152a05f5ebbb9c79bca00","url":"./js/meme-custom.min.js"},{"revision":"403e91bd9125cf384f46badd9f3d893b","url":"./js/meme.min.627f58220f116b0a1bf29e841116b8ced93ef4d1c4a33e4a49c145fb284738a2.js"},{"revision":"053100cb84a50d2ae7f5492f7dd7f25e","url":"./manifest.json"},{"revision":"b184a287cc32ba8fd264bbfc258789af","url":"./search.json"}]);

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

