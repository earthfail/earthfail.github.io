const VERSION = "v2";
const CACHE_NAME = `jc-${VERSION}`;


const APP_STATIC_RESOURCES = [
    "./",
    "./index.html",
    "./desc.png",
    "./icon.svg",
    "./app.js",
];


self.addEventListener("install", (event) => {
    event.waitUntil(
	(async () => {
	    const cache = await caches.open(CACHE_NAME);
	    cache.addAll(APP_STATIC_RESOURCES);
	})(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
	(async () => {
	    const names = await caches.keys();
	    await Promise.all(
		names.map((name) => {
		    if (name !== CACHE_NAME) {
			return caches.delete(name);
		    }
		    return undefined;
		}),
	    );
	    await clients.claim();
	})(),
    );
});

self.addEventListener("controllerchange", (event) => {
    console.log(`sw version ${VERSION} lost control`);
});


self.addEventListener("fetch", (event) => {
  // when seeking an HTML page
  if (event.request.mode === "navigate") {
    // Return to the index.html page
    event.respondWith(caches.match("./"));
    return;
  }
    
  // For every other request type
  event.respondWith(
    (async () => {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(event.request.url);
	// console.log(`response ${cachedResponse}`);
      if (cachedResponse) {
          // Return the cached response if it's available.
        return cachedResponse;
      }
      // Respond with a HTTP 404 response status.
	return new Response(null, { status: 404 });
	// return fetch(event.request);
    })(),
  );
});


