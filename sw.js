setAlertBtn.addEventListener('click', () => {
    if (!('Notification' in window)) {
        alertStatus.innerText = "Notifications not supported.";
        return;
    }

    // Fallback-proof wrapper that forces the browser prompt UI on all versions
    Notification.requestPermission().then(async (permission) => {
        if (permission !== 'granted') {
            alertStatus.innerText = "Please look at your browser address bar and ALLOW notifications.";
            alertStatus.style.color = "#ef4444";
            return;
        }

        const dropPct = parseFloat(document.getElementById('dropPercentage').value);
        if(isNaN(dropPct) || dropPct <= 0) {
            alertStatus.innerText = "Enter a valid percentage drop target.";
            return;
        }

        try {
            let fromPriceInUSD = await getPriceInUSD(fromAsset);
            let toPriceInUSD = await getPriceInUSD(toAsset);
            let startingCrossRate = fromPriceInUSD / toPriceInUSD;

            const alertConfig = {
                fromAsset: fromAsset,
                toAsset: toAsset,
                baseCrossRate: startingCrossRate,
                dropThreshold: dropPct
            };
            
            const cache = await caches.open('alert-config');
            await cache.put('config.json', new Response(JSON.stringify(alertConfig)));
            
            alertStatus.innerText = `Guard active! Tracking ${fromAsset.symbol}/${toAsset.symbol} from ${startingCrossRate.toFixed(4)}`;
            alertStatus.style.color = "#10b981";
        } catch(err) {
            alertStatus.innerText = "Error establishing market baseline rates.";
        }
    });
});
