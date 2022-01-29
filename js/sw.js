var CACHE_NAME = 'staticV6';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                // Páginas
                './',
                // Adicionar as páginas que deseja armazenar no cache aqui
                './pages/pagina1.html',
                './pages/pagina2.html',
                // CSS
                '../css/materialize.min.css',
                '../css/materialize.css',
                '../css/style.css',
                '../css/materialdesignicons.css',
                // Fontes
                '../fonts/materialdesignicons-webfont.woff2?v=2.1.19',
                '../fonts/roboto/Roboto-Light.woff2',
                '../fonts/roboto/Roboto-Regular.woff2',
                '../fonts/roboto/Roboto-Medium.woff2',
                '../fonts/roboto/Roboto-Medium.woff',
                // js
                '../js/jquery-3.2.1.min.js',
                '../js/route.js',
                '../js/init.js',
                '../js/script.js',
                '../js/materialize.min.js',
                // Imagens
                '../assets/images/foto_teste.jpg',
                '../assets/images/foto_teste2.jpg',
                '../assets/images/logo.png',
                '../assets/images/favicons.ico',
                //
                '/manifest.json',
             ]);
        })
    );
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});