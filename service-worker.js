const CACHE_NAME = "fede-portafolio-v1";
const ASSETS = [
  "/", // raíz
  "/index.html",
  "/styles/main.css",
  "/main/insert.js",
  "/img/logo-192.png",
  "/img/logo-512.png",
  "/img/perfil.png",
  "/img/sobreMi.png"
  // 👉 agrega aquí más archivos estáticos que quieras cachear (ej. íconos svg, proyectos, etc.)
];

// Instalar y guardar en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cacheando assets...");
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar versiones antiguas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  console.log("Service Worker activado");
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Devuelve lo cacheado o busca en red
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // fallback offline
        )
      );
    })
  );
});