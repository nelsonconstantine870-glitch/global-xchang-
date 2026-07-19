self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Dynamic Asset Guard Activated.');
    startBackgroundFetch();
});

function startBackgroundFetch() {
    // Fallback dictionary duplicated inside worker instance scope safely
    const fiatUsdFallbacks = {
        'usd': 1.0, 'eur': 0.92, 'gbp': 0.79, 'jpy': 155.0, 'aud': 1.50, 'cad': 1.37, 
        'chf': 0.90, 'cny': 7.25, 'inr': 83.50, 'ngn': 1480.0, 'brl': 5.25, 'zar': 18.20, 
        'rub': 90.0, 'krw': 1370.0, 'try': 32.50, 'aed': 3.67, 'sar': 3.75, 'egp': 48.50, 'pkr': 278.00
    };

    async function getPrice(asset) {
        if (asset.type === 'crypto') {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${asset.id}&vs_currencies=usd`);
            const data = await res.json();
            return data[asset.id]['usd'];
        } else {
            return 1 / (fiatUsdFallbacks[asset.id] || 1);
        }
    }

    setInterval(async () => {
        try {
            const cache = await caches.open('alert-config');
            const response = await cache.match('config.json');
            if (!response) return;

            const config = await response.json();
            
            // Get fresh individual USD base indices
            let fromUSD = await getPrice(config.fromAsset);
            let toUSD = await getPrice(config.toAsset);
            
            // Cross asset value math
            let currentCrossRate = fromUSD / toUSD;
            const dropCalculated = ((config.baseCrossRate - currentCrossRate) / config.baseCrossRate) * 100;

            if (dropCalculated >= config.dropThreshold) {
                self.registration.showNotification('Asset Target Triggered!', {
                    body: `${config.fromAsset.symbol}/${config.toAsset.symbol} fell by ${dropCalculated.toFixed(2)}%! Value: ${currentCrossRate.toFixed(4)}`,
                    tag: 'dynamic-price-alert'
                });
                await cache.delete('config.json');
            }
        } catch (e) {
            console.error("Worker process error:", e);
        }
    }, 45000); // Polls every 45 seconds safely in background
}
