self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Background System Agent connected.');
    // Start tracking in the background as soon as the service worker wakes up
    startBackgroundFetch();
});

function startBackgroundFetch() {
    setInterval(async () => {
        // Retrieve target from IndexedDB or simple state if active
        // Note: Browsers may throttle intervals in sleeping service workers.
        // For 100% permanent off-site tracking, a backend Cron job is normally used,
        // but this loop handles background execution while the browser instance stays alive.
        try {
            // We fetch the configuration we broadcasted from the main page
            const cache = await caches.open('alert-config');
            const response = await cache.match('config.json');
            if (!response) return;

            const config = await response.json();
            let freshPrice = 0;

            if (config.pair === "BTC-USD") {
                let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
                let data = await res.json();
                freshPrice = data.bitcoin.usd;
            } else if (config.pair === "ETH-EUR") {
                let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur`);
                let data = await res.json();
                freshPrice = data.ethereum.eur;
            } else if (config.pair === "SOL-USD") {
                let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`);
                let data = await res.json();
                freshPrice = data.solana.usd;
            }

            const dropCalculated = ((config.basePrice - freshPrice) / config.basePrice) * 100;

            if (dropCalculated >= config.dropThreshold) {
                self.registration.showNotification('Crypto Market Crash Alert!', {
                    body: `${config.pair} dropped by ${dropCalculated.toFixed(2)}%! Live: ${freshPrice}`,
                    tag: 'price-drop-alert'
                });
                // Delete configuration so it doesn't spam
                await cache.delete('config.json');
            }
        } catch (e) {
            console.error(e);
        }
    }, 45000); // Check every 45 seconds
}
