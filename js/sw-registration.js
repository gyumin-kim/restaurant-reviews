window.addEventListener('load', function(event) {
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/js/sw.js')
    .then(function(registration) {
        console.log('ServiceWorker registered', registration);
    })
    .catch(function(event) {
        console.log('Registration failed', event);
    });
}
});
