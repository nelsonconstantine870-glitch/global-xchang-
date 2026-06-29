const assets = [
    // Cryptocurrencies
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

    // National Currencies (Fiat)
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
// Fallback rates against 1 USD for country currencies that the free API tier doesn't serve directly
const fiatUsdFallbacks = {
    'usd': 1.0, 'eur': 0.92, 'gbp': 0.79, 'jpy': 155.0, 'aud': 1.50, 'cad': 1.37, 
    'chf': 0.90, 'cny': 7.25, 'inr': 83.50, 'ngn': 1480.0, 'brl': 5.25, 'zar': 18.20, 
    'rub': 90.0, 'krw': 1370.0, 'try': 32.50, 'aed': 3.67, 'sar': 3.75, 'egp': 48.50, 'pkr': 278.00
};

// Application State Tracking
let fromAsset = assets.find(a => a.symbol === 'BTC');
let toAsset = assets.find(a => a.symbol === 'USD');

// Grab UI components
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const swapBtn = document.getElementById('swapBtn');


// ==========================================
// 2. THE CORE MATH & APP CONVERSION ENGINE
// ==========================================
// ==========================================
// 2. THE CORE MATH & APP CONVERSION ENGINE (UPGRADED)
// ==========================================
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const appMode = document.getElementById('appMode') ? document.getElementById('appMode').value : 'standard';
    
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = "Enter a valid amount";
        return;
    }

    resultDiv.innerText = "Fetching live market prices...";

    try {
        // --- STEP 1: Find the USD value of 1 unit of our "FROM" asset ---
        let fromPriceInUSD = 1;
        if (fromAsset.type === 'crypto') {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromAsset.id}&vs_currencies=usd`);
            const data = await res.json();
            fromPriceInUSD = data[fromAsset.id]['usd'];
        } else {
            fromPriceInUSD = 1 / (fiatUsdFallbacks[fromAsset.id] || 1);
        }

        // --- STEP 2: Find the USD value of 1 unit of our "TO" asset ---
        let toPriceInUSD = 1;
        if (toAsset.type === 'crypto') {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${toAsset.id}&vs_currencies=usd`);
            const data = await res.json();
            toPriceInUSD = data[toAsset.id]['usd'];
        } else {
            toPriceInUSD = 1 / (fiatUsdFallbacks[toAsset.id] || 1);
        }

        // --- STEP 3: Base USD Math Conversion ---
        let finalValue = (amount * fromPriceInUSD) / toPriceInUSD;

        // --- STEP 4: Apply Multi-App Logic Framework Deductions ---
        let labelSuffix = "";
        
        switch (appMode) {
            case 'coinstats':
                finalValue = finalValue * 0.998; // Subtract 0.2% trading fee
                labelSuffix = " (CoinStats Style - Net Market)";
                break;
            case 'koinly':
                finalValue = finalValue * 0.85;  // Subtract 15% baseline tax
                labelSuffix = " (Koinly Style - Est. Take-Home)";
                break;
            case 'summ':
                finalValue = finalValue * 0.70;  // Subtract 30% Whale Tax Bracket
                labelSuffix = " (Summ Heavy Tax Projection)";
                break;
            case 'exodus':
                finalValue = finalValue * 0.975; // Subtract 2.5% Instant Off-Ramp Premium
                labelSuffix = " (Wallet Off-Ramp Estimate)";
                break;
            default:
                labelSuffix = ""; // Standard Mode, no modifications applied
                break;
                case 'exodus':
    finalValue = finalValue * 0.975; // Subtracts 2.5% for Binance Instant Sell/P2P variance
    labelSuffix = " (Binance Style Net Cashout)";
    break;

        }

        // --- STEP 5: Render Clean Results to View Screen ---
        const decimals = toAsset.type === 'crypto' ? 6 : 2;

        resultDiv.innerText = `${amount.toLocaleString()} ${fromAsset.symbol} = ${finalValue.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})} ${toAsset.symbol}${labelSuffix}`;

    } catch (error) {
        resultDiv.innerText = "Network lag. Trying again...";
        console.error(error);
    }
}


// ==========================================
// 3. SEARCHABLE DROPDOWN INTERFACE CONTROLS
// ==========================================
function setupSearchableDropdown(type) {
    const selectedBox = document.getElementById(`${type}Selected`);
    const dropdownMenu = document.getElementById(`${type}Dropdown`);
    const searchInput = dropdownMenu.querySelector('.search-input');
    const optionsList = dropdownMenu.querySelector('.options-list');

    // Display current values initially
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

// Global window event click to close menus when selecting outside of container options
document.addEventListener('click', () => {
    document.getElementById('fromDropdown').classList.add('hidden');
    document.getElementById('toDropdown').classList.add('hidden');
});

// Flip choices back and forth
swapBtn.addEventListener('click', () => {
    const temp = fromAsset;
    fromAsset = toAsset;
    toAsset = temp;
    document.getElementById(`fromSelected`).innerText = `${fromAsset.symbol} - ${fromAsset.name}`;
    document.getElementById(`toSelected`).innerText = `${toAsset.symbol} - ${toAsset.name}`;
    convertCurrency();
});


// ==========================================
// 4. APP SYSTEM RUN INITIALIZATION
// ==========================================
amountInput.addEventListener('input', convertCurrency);

// Check if appMode dropdown is available in index.html, then link change listener
if (document.getElementById('appMode')) {
    document.getElementById('appMode').addEventListener('change', convertCurrency);
}

setupSearchableDropdown('from');
setupSearchableDropdown('to');
convertCurrency();
