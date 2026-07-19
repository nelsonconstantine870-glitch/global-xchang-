const assets = [
    { type: 'crypto', id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { type: 'crypto', id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { type: 'crypto', id: 'solana', symbol: 'SOL', name: 'Solana' },
    { type: 'crypto', id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
    { type: 'crypto', id: 'ripple', symbol: 'XRP', name: 'Ripple' },
    { type: 'crypto', id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { type: 'crypto', id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
    { type: 'crypto', id: 'tether', symbol: 'USDT', name: 'Tether' },
    { type: 'crypto', id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' },
    { type: 'crypto', id: 'the-open-network', symbol: 'TON', name: 'Toncoin' },
    { type: 'crypto', id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
    { type: 'crypto', id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
    { type: 'crypto', id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
    { type: 'crypto', id: 'pepe', symbol: 'PEPE', name: 'Pepe' },

    { type: 'fiat', id: 'usd', symbol: 'USD', name: 'US Dollar (United States)' },
    { type: 'fiat', id: 'eur', symbol: 'EUR', name: 'Euro (Eurozone)' },
    { type: 'fiat', id: 'gbp', symbol: 'GBP', name: 'British Pound (United Kingdom)' },
    { type: 'fiat', id: 'jpy', symbol: 'JPY', name: 'Japanese Yen (Japan)' },
    { type: 'fiat', id: 'aud', symbol: 'AUD', name: 'Australian Dollar (Australia)' },
    { type: 'fiat', id: 'cad', symbol: 'CAD', name: 'Canadian Dollar (Canada)' },
    { type: 'fiat', id: 'chf', symbol: 'CHF', name: 'Swiss Franc (Switzerland)' },
    { type: 'fiat', id: 'cny', symbol: 'CNY', name: 'Chinese Yuan (China)' },
    { type: 'fiat', id: 'inr', symbol: 'INR', name: 'Indian Rupee (India)' },
    { type: 'fiat', id: 'ngn', symbol: 'NGN', name: 'Nigerian Naira (Nigeria)' },
    { type: 'fiat', id: 'brl', symbol: 'BRL', name: 'Brazilian Real (Brazil)' },
    { type: 'fiat', id: 'zar', symbol: 'ZAR', name: 'South African Rand (South Africa)' },
    { type: 'fiat', id: 'rub', symbol: 'RUB', name: 'Russian Ruble (Russia)' },
    { type: 'fiat', id: 'krw', symbol: 'KRW', name: 'South Korean Won (South Korea)' },
    { type: 'fiat', id: 'try', symbol: 'TRY', name: 'Turkish Lira (Turkey)' },
    { type: 'fiat', id: 'aed', symbol: 'AED', name: 'UAE Dirham (UAE)' },
    { type: 'fiat', id: 'sar', symbol: 'SAR', name: 'Saudi Riyal (Saudi Arabia)' },
    { type: 'fiat', id: 'egp', symbol: 'EGP', name: 'Egyptian Pound (Egypt)' },
    { type: 'fiat', id: 'pkr', symbol: 'PKR', name: 'Pakistani Rupee (Pakistan)' }
];

const fiatUsdFallbacks = {
    'usd': 1.0, 'eur': 0.92, 'gbp': 0.79, 'jpy': 155.0, 'aud': 1.50, 'cad': 1.37, 
    'chf': 0.90, 'cny': 7.25, 'inr': 83.50, 'ngn': 1480.0, 'brl': 5.25, 'zar': 18.20, 
    'rub': 90.0, 'krw': 1370.0, 'try': 32.50, 'aed': 3.67, 'sar': 3.75, 'egp': 48.50, 'pkr': 278.00
};

let fromAsset = assets.find(a => a.symbol === 'BTC');
let toAsset = assets.find(a => a.symbol === 'USD');

const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = "Enter a valid amount";
        return;
    }
    resultDiv.innerText = "Fetching live market prices...";
    try {
        let fromPriceInUSD = 1;
        if (fromAsset.type === 'crypto') {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromAsset.id}&vs_currencies=usd`);
            const data = await res.json();
            fromPriceInUSD = data[fromAsset.id]['usd'];
        } else {
            fromPriceInUSD = 1 / (fiatUsdFallbacks[fromAsset.id] || 1);
        }

        let toPriceInUSD = 1;
        if (toAsset.type === 'crypto') {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${toAsset.id}&vs_currencies=usd`);
            const data = await res.json();
            toPriceInUSD = data[toAsset.id]['usd'];
        } else {
            toPriceInUSD = 1 / (fiatUsdFallbacks[toAsset.id] || 1);
        }

        let finalValue = (amount * fromPriceInUSD) / toPriceInUSD;
        const decimals = toAsset.type === 'crypto' ? 6 : 2;
        resultDiv.innerText = `${amount.toLocaleString()} ${fromAsset.symbol} = ${finalValue.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})} ${toAsset.symbol}`;
    } catch (error) {
        resultDiv.innerText = "Network lag. Trying again...";
    }
}

function setupSearchableDropdown(type) {
    const selectedBox = document.getElementById(`${type}Selected`);
    const dropdownMenu = document.getElementById(`${type}Dropdown`);
    const searchInput = dropdownMenu.querySelector('.search-input');
    const optionsList = dropdownMenu.querySelector('.options-list');

    selectedBox.innerText = `${type === 'from' ? fromAsset.symbol : toAsset.symbol} - ${type === 'from' ? fromAsset.name : toAsset.name}`;

    selectedBox.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('fromDropdown').classList.add('hidden');
        document.getElementById('toDropdown').classList.add('hidden');
        dropdownMenu.classList.remove('hidden');
        searchInput.focus();
        searchInput.value = '';
        renderOptions('', optionsList, type);
    });

    searchInput.addEventListener('input', (e) => {
        renderOptions(e.target.value.toLowerCase(), optionsList, type);
    });
    searchInput.addEventListener('click', (e) => e.stopPropagation());
}

function renderOptions(searchTerm, listElement, type) {
    listElement.innerHTML = '';
    const filtered = assets.filter(a => a.name.toLowerCase().includes(searchTerm) || a.symbol.toLowerCase().includes(searchTerm));
    filtered.forEach(asset => {
        const row = document.createElement('div');
        row.className = 'option-item';
        row.innerHTML = `<span>${asset.name}</span><strong>${asset.symbol}</strong>`;
        row.addEventListener('click', () => {
            if(type === 'from') fromAsset = asset;
            else toAsset = asset;
            document.getElementById(`${type}Selected`).innerText = `${asset.symbol} - ${asset.name}`;
            document.getElementById(`${type}Dropdown`).classList.add('hidden');
            convertCurrency();
        });
        listElement.appendChild(row);
    });
}

document.addEventListener('click', () => {
    document.getElementById('fromDropdown').classList.add('hidden');
    document.getElementById('toDropdown').classList.add('hidden');
});

swapBtn.addEventListener('click', () => {
    const temp = fromAsset;
    fromAsset = toAsset;
    toAsset = temp;
    document.getElementById(`fromSelected`).innerText = `${fromAsset.symbol} - ${fromAsset.name}`;
    document.getElementById(`toSelected`).innerText = `${toAsset.symbol} - ${toAsset.name}`;
    convertCurrency();
});

// ==========================================
// BACKGROUND OFF-SITE ALERTS LOGIC ENGINE
// ==========================================
const setAlertBtn = document.getElementById('setAlertBtn');
const alertStatus = document.getElementById('alertStatus');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log("SW Register skipped: ", err));
}

setAlertBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
        alertStatus.innerText = "Notifications not supported by this browser.";
        alertStatus.style.color = "#ef4444";
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        alertStatus.innerText = "Please allow system notifications first.";
        alertStatus.style.color = "#ef4444";
        return;
    }

    const selectedPair = document.getElementById('alertPair').value;
    const dropPct = parseFloat(document.getElementById('dropPercentage').value);

    try {
        let currentPrice = 0;
        if(selectedPair === "BTC-USD") {
            let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
            let data = await res.json();
            currentPrice = data.bitcoin.usd;
        } else if (selectedPair === "ETH-EUR") {
            let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur`);
            let data = await res.json();
            currentPrice = data.ethereum.eur;
        } else if (selectedPair === "SOL-USD") {
            let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`);
            let data = await res.json();
            currentPrice = data.solana.usd;
        }

        const alertConfig = { pair: selectedPair, basePrice: currentPrice, dropThreshold: dropPct };
        localStorage.setItem('crypto_alert_config', JSON.stringify(alertConfig));
        
        alertStatus.innerText = `Guard Configured! Monitoring ${selectedPair} from baseline: ${currentPrice}`;
        alertStatus.style.color = "#10b981";

        startBackgroundMonitor();
    } catch(err) {
        alertStatus.innerText = "Error establishing price check. Try again.";
        alertStatus.style.color = "#ef4444";
    }
});

function startBackgroundMonitor() {
    // Check every 30 seconds
    setInterval(async () => {
        const rawConfig = localStorage.getItem('crypto_alert_config');
        if(!rawConfig) return;
        
        const config = JSON.parse(rawConfig);
        try {
            let freshPrice = 0;
            if(config.pair === "BTC-USD") {
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
                if (Notification.permission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('Crypto Market Crash Alert!', {
                            body: `${config.pair} dropped by ${dropCalculated.toFixed(2)}%! Live: ${freshPrice}`,
                            tag: 'price-drop-alert'
                        });
                    });
                    localStorage.removeItem('crypto_alert_config'); // Reset target
                    if(document.getElementById('alertStatus')) {
                        document.getElementById('alertStatus').innerText = "Alert triggered!";
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, 30000);
}

amountInput.addEventListener('input', convertCurrency);
setupSearchableDropdown('from');
setupSearchableDropdown('to');
convertCurrency();
if(localStorage.getItem('crypto_alert_config')) startBackgroundMonitor();
