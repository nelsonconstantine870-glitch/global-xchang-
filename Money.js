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
const lockedPairDisplay = document.getElementById('lockedPairDisplay');

function updateAlertUI() {
    if(lockedPairDisplay) {
        lockedPairDisplay.innerText = `${fromAsset.name} (${fromAsset.symbol}) ➔ ${toAsset.name} (${toAsset.symbol})`;
    }
}

async function getPriceInUSD(asset) {
    if (asset.type === 'crypto') {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${asset.id}&vs_currencies=usd`);
        const data = await res.json();
        return data[asset.id]['usd'];
    } else {
        return 1 / (fiatUsdFallbacks[asset.id] || 1);
    }
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = "Enter a valid amount";
        return;
    }
    resultDiv.innerText = "Fetching live market prices...";
    try {
        let fromPriceInUSD = await getPriceInUSD(fromAsset);
        let toPriceInUSD = await getPriceInUSD(toAsset);

        let finalValue = (amount * fromPriceInUSD) / toPriceInUSD;
        const decimals = toAsset.type === 'crypto' ? 6 : 2;
        resultDiv.innerText = `${amount.toLocaleString()} ${fromAsset.symbol} = ${finalValue.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})} ${toAsset.symbol}`;
    } catch (error) {
        resultDiv.innerText = "Network sync lag...";
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
            updateAlertUI();
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
    updateAlertUI();
    convertCurrency();
});
// ==========================================
// PURE IMMEDIATE PROMPT ALERT ENGINE
// ==========================================
const setAlertBtn = document.getElementById('setAlertBtn');
const alertStatus = document.getElementById('alertStatus');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log("SW failed: ", err));
}

setAlertBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
        alertStatus.innerText = "Notifications not supported.";
        return;
    }

    // 1. Instantly trigger the window prompt before running calculations
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
        alertStatus.innerText = "Blocked. Please clear site settings via the URL lock icon.";
        alertStatus.style.color = "#ef4444";
        return;
    }

    const dropPct = parseFloat(document.getElementById('dropPercentage').value);
    if(isNaN(dropPct) || dropPct <= 0) {
        alertStatus.innerText = "Enter a valid percentage drop target.";
        return;
    }

    alertStatus.innerText = "Synchronizing market baseline index...";
    alertStatus.style.color = "#fbbf24";

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
        alertStatus.style.color = "#ef4444";
    }
});


amountInput.addEventListener('input', convertCurrency);
setupSearchableDropdown('from');
setupSearchableDropdown('to');
updateAlertUI();
convertCurrency();

