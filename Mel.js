const SPECIAL_PARALLEL_OVERRIDES = {
    "NGN": 1392.50,  
    "ARS": 1415.00,   
    "EGP": 54.25,    
    "VES": 745.00
};

const GLOBAL_DEFAULT_SPREAD = 0.05; 
const CURRENCY_DATABASE = {
    // 🌍 CORE SELECTIONS
    "USD": { name: "US Dollar", symbol: "$" }, 
    "EUR": { name: "Euro", symbol: "€" },
    "GBP": { name: "British Pound", symbol: "£" }, 
    "NGN": { name: "Nigerian Naira", symbol: "₦" },
    
    // 🇸🇳 🇹🇬 WEST AFRICAN REGIONAL REGION (CFA FRANC XOF)
    "XOF": { name: "CFA Franc - West (Togo, Benin, Senegal, Mali, Niger, Ivory Coast, Burkina Faso)", symbol: "CFA" },
    
    // 🇨🇲 🇬🇦 CENTRAL AFRICAN REGIONAL REGION (CFA FRANC XAF)
    "XAF": { name: "CFA Franc - Central (Cameroon, Gabon, Chad, Congo, Equat. Guinea)", symbol: "FCFA" },

    // 🦁 MAIN AFRICAN INDEPENDENT STALWARTS
    "GHS": { name: "Ghanaian Cedi", symbol: "₵" }, 
    "KES": { name: "Kenyan Shilling", symbol: "KSh" },
    "ZAR": { name: "South African Rand", symbol: "R" }, 
    "EGP": { name: "Egyptian Pound", symbol: "E£" },
    "MAD": { name: "Moroccan Dirham", symbol: "د.م." },
    "DZD": { name: "Algerian Dinar", symbol: "د.ج" },
    "TND": { name: "Tunisian Dinar", symbol: "د.ت" },
    "LYD": { name: "Libyan Dinar", symbol: "د.ل" },
    "SDG": { name: "Sudanese Pound", symbol: "ج.س." },
    "RWF": { name: "Rwandan Franc", symbol: "FRw" },
    "TZS": { name: "Tanzanian Shilling", symbol: "TSh" },
    "UGX": { name: "Ugandan Shilling", symbol: "USh" },
    "BWP": { name: "Botswanan Pula", symbol: "P" },
    "AOA": { name: "Angolan Kwanza", symbol: "Kz" },
    "MWK": { name: "Malawian Kwacha", symbol: "MK" },
    "ZMW": { name: "Zambian Kwacha", symbol: "ZK" },
    "BIF": { name: "Burundian Franc", symbol: "FBu" },
    "DJF": { name: "Djiboutian Franc", symbol: "Fdj" },
    "ERN": { name: "Eritrean Nakfa", symbol: "Nfk" },
    "ETB": { name: "Ethiopian Birr", symbol: "Br" },
    "GMD": { name: "Gambian Dalasi", symbol: "D" },
    "GNF": { name: "Guinean Franc", symbol: "FG" },
    "LSL": { name: "Lesotho Loti", symbol: "M" },
    "LRD": { name: "Liberian Dollar", symbol: "L$" },
    "MGA": { name: "Malagasy Ariary", symbol: "Ar" },
    "MRU": { name: "Mauritanian Ouguiya", symbol: "UM" },
    "MUR": { name: "Mauritian Rupee", symbol: "₨" },
    "MZN": { name: "Mozambican Metical", symbol: "MT" },
    "NAD": { name: "Namibian Dollar", symbol: "N$" },
    "SCR": { name: "Seychellois Rupee", symbol: "₨" },
    "CVE": { name: "Cape Verdean Escudo", symbol: "$" },
    "KMF": { name: "Comorian Franc", symbol: "CF" },

    // 🌐 GLOBAL MAJORS & EMERGING MARKETS
    "CAD": { name: "Canadian Dollar", symbol: "C$" }, 
    "AUD": { name: "Australian Dollar", symbol: "A$" },
    "JPY": { name: "Japanese Yen", symbol: "¥" }, 
    "CNY": { name: "Chinese Yuan", symbol: "¥" },
    "INR": { name: "Indian Rupee", symbol: "₹" }, 
    "AED": { name: "UAE Dirham", symbol: "د.إ" }, 
    "SAR": { name: "Saudi Riyal", symbol: "ر.س" },
    "ARS": { name: "Argentine Peso", symbol: "$" }, 
    "VES": { name: "Venezuelan Bolívar", symbol: "Bs.F" }, 
    "BRL": { name: "Brazilian Real", symbol: "R$" },
    "MXN": { name: "Mexican Peso", symbol: "$" }, 
    "SGD": { name: "Singapore Dollar", symbol: "S$" },
    "NZD": { name: "New Zealand Dollar", symbol: "NZ$" }, 
    "CHF": { name: "Swiss Franc", symbol: "CHF" },
    "HKD": { name: "Hong Kong Dollar", symbol: "HK$" }, 
    "SEK": { name: "Swedish Krona", symbol: "kr" },
    "KRW": { name: "South Korean Won", symbol: "₩" }, 
    "TRY": { name: "Turkish Lira", symbol: "₺" },
    "RUB": { name: "Russian Ruble", symbol: "₽" }, 
    "AFN": { name: "Afghan Afghani", symbol: "؋" }, 
    "ALL": { name: "Albanian Lek", symbol: "L" }, 
    "AMD": { name: "Armenian Dram", symbol: "֏" }, 
    "ANG": { name: "Neth. Antillean Guilder", symbol: "ƒ" }, 
    "AWG": { name: "Aruban Florin", symbol: "ƒ" }, 
    "AZN": { name: "Azerbaijani Manat", symbol: "₼" }, 
    "BAM": { name: "Bosnia-Herzegovina Mark", symbol: "KM" }, 
    "BBD": { name: "Barbadian Dollar", symbol: "$" }, 
    "BDT": { name: "Bangladeshi Taka", symbol: "৳" }, 
    "BGN": { name: "Bulgarian Lev", symbol: "лв" }, 
    "BHD": { name: "Bahraini Dinar", symbol: ".د.ب" }, 
    "BMD": { name: "Bermudan Dollar", symbol: "$" }, 
    "BND": { name: "Brunei Dollar", symbol: "$" }, 
    "BOB": { name: "Bolivian Boliviano", symbol: "b$" }, 
    "BSD": { name: "Bahamian Dollar", symbol: "$" }, 
    "BZD": { name: "Belize Dollar", symbol: "BZ$" }, 
    "CLP": { name: "Chilean Peso", symbol: "$" }, 
    "COP": { name: "Colombian Peso", symbol: "$" }, 
    "CRC": { name: "Costa Rican Colón", symbol: "₡" }, 
    "CUP": { name: "Cuban Peso", symbol: "₱" }, 
    "CZK": { name: "Czech Koruna", symbol: "Kč" }, 
    "DKK": { name: "Danish Krone", symbol: "kr" }, 
    "DOP": { name: "Dominican Peso", symbol: "RD$" }, 
    "FJD": { name: "Fijian Dollar", symbol: "FJ$" }, 
    "GEL": { name: "Georgian Lari", symbol: "₾" }, 
    "GTQ": { name: "Guatemalan Quetzal", symbol: "Q" }, 
    "GYD": { name: "Guyanese Dollar", symbol: "GY$" }, 
    "HNL": { name: "Honduran Lempira", symbol: "L" }, 
    "HRK": { name: "Croatian Kuna", symbol: "kn" }, 
    "HTG": { name: "Haitian Gourde", symbol: "G" }, 
    "HUF": { name: "Hungarian Forint", symbol: "Ft" }, 
    "IDR": { name: "Indonesian Rupiah", symbol: "Rp" }, 
    "ILS": { name: "Israeli New Shekel", symbol: "₪" }, 
    "IQD": { name: "Iraqi Dinar", symbol: "ع.د" }, 
    "IRR": { name: "Iranian Rial", symbol: "﷼" }, 
    "ISK": { name: "Icelandic Króna", symbol: "kr" }, 
    "JMD": { name: "Jamaican Dollar", symbol: "J$" }, 
    "JOD": { name: "Jordanian Dinar", symbol: "د.ا" }, 
    "KHR": { name: "Cambodian Riel", symbol: "៛" }, 
    "KWD": { name: "Kuwaiti Dinar", symbol: "د.ك" }, 
    "KZT": { name: "Kazakhstani Tenge", symbol: "₸" }, 
    "LBP": { name: "Lebanese Pound", symbol: "ل.ل" }, 
    "LKR": { name: "Sri Lankan Rupee", symbol: "Rs" }, 
    "MKD": { name: "Macedonian Denar", symbol: "ден" }, 
    "MMK": { name: "Myanmar Kyat", symbol: "K" }, 
    "MNT": { name: "Mongolian Tugrik", symbol: "₮" }, 
    "MOP": { name: "Macanese Pataca", symbol: "MOP$" }, 
    "MVR": { name: "Maldivian Rufiyaa", symbol: "Rf" }, 
    "MYR": { name: "Malaysian Ringgit", symbol: "RM" }, 
    "NIO": { name: "Nicaraguan Córdoba", symbol: "C$" }, 
    "NOK": { name: "Norwegian Krone", symbol: "kr" }, 
    "NPR": { name: "Nepalese Rupee", symbol: "रू" }, 
    "OMR": { name: "Omani Rial", symbol: "ر.ع." }, 
    "PAB": { name: "Panamanian Balboa", symbol: "B/." }, 
    "PEN": { name: "Peruvian Sol", symbol: "S/." }, 
    "PGK": { name: "Papua New Guinean Kina", symbol: "K" }, 
    "PHP": { name: "Philippine Peso", symbol: "₱" }, 
    "PKR": { name: "Pakistani Rupee", symbol: "₨" }, 
    "PLN": { name: "Polish Zloty", symbol: "zł" }, 
    "PYG": { name: "Paraguayan Guarani", symbol: "₲" }, 
    "QAR": { name: "Qatari Riyal", symbol: "ر.ق" }, 
    "RON": { name: "Romanian Leu", symbol: "lei" }, 
    "RSD": { name: "Serbian Dinar", symbol: "дин." }, 
    "SBD": { name: "Solomon Islands Dollar", symbol: "SI$" }, 
    "THB": { name: "Thai Baht", symbol: "฿" }, 
    "TWD": { name: "New Taiwan Dollar", symbol: "NT$" }, 
    "UAH": { name: "Ukrainian Hryvnia", symbol: "₴" }, 
    "UYU": { name: "Uruguayan Peso", symbol: "$U" }, 
    "UZS": { name: "Uzbekistani Som", symbol: "so'm" }, 
    "VND": { name: "Vietnamese Dong", symbol: "₫" }
};

let officialRatesUSD = {};
let lastSelectedEngine = 'parallel'; 

// Current Selection Tracking Memory Space
let activeTargetType = ""; // Tracks if search modal is feeding "from" or "to"
let selectedFromCode = "USD";
let selectedToCode = "NGN";

const amountInput = document.getElementById('amount');
const fromSelector = document.getElementById('from-selector');
const toSelector = document.getElementById('to-selector');
const fromDisplay = document.getElementById('from-display');
const toDisplay = document.getElementById('to-display');
const swapBtn = document.getElementById('swap-btn');
const resultText = document.getElementById('result-text');
const rateTimestamp = document.getElementById('rate-timestamp');
const parallelBadge = document.getElementById('parallel-badge');
const officialBadge = document.getElementById('official-badge');
const notificationContainer = document.getElementById('notification-container');

// Search Modal DOM Bindings
const searchModal = document.getElementById('search-modal');
const modalTitle = document.getElementById('modal-title');
const searchInput = document.getElementById('currency-search-input');
const optionsList = document.getElementById('modal-options-list');
const closeModalBtn = document.getElementById('close-modal-btn');

function initializeBaselineRates() {
    for (let key in CURRENCY_DATABASE) { officialRatesUSD[key] = 1.0; }
    officialRatesUSD["NGN"] = 1430.0;
    officialRatesUSD["EUR"] = 0.92;
    officialRatesUSD["GBP"] = 0.78;
}

async function fetchOfficialRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        if (data && data.rates) {
            officialRatesUSD = data.rates;
            calculateConversion(false); 
        }
    } catch (error) {
        console.error("API error:", error);
    }
}

function getParallelRateAgainstUSD(currencyCode) {
    if (currencyCode === "USD") return 1.0;
    if (SPECIAL_PARALLEL_OVERRIDES[currencyCode] !== undefined) {
        return SPECIAL_PARALLEL_OVERRIDES[currencyCode];
    }
    const officialBase = officialRatesUSD[currencyCode] || 1;
    return officialBase * (1 + GLOBAL_DEFAULT_SPREAD);
}

function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'parallel') {
        toast.classList.add('parallel-toast');
        toast.innerHTML = `<i class="fa-solid fa-hand-holding-dollar" style="color:var(--parallel-color)"></i> ${message}`;
    } else {
        toast.classList.add('official-toast');
        toast.innerHTML = `<i class="fa-solid fa-building-columns" style="color:var(--official-color)"></i> ${message}`;
    }
    notificationContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => { toast.remove(); }, 400);
    }, 2500);
}

// 🔍 MODAL RENDER ENGINE WITH SEARCH FILTERS
function renderModalOptions(filterText = "") {
    let cleanQuery = filterText.trim().toLowerCase();
    let listHTML = "";

    for (let code in CURRENCY_DATABASE) {
        let currency = CURRENCY_DATABASE[code];
        let matchCode = code.toLowerCase().includes(cleanQuery);
        let matchName = currency.name.toLowerCase().includes(cleanQuery);

        if (cleanQuery === "" || matchCode || matchName) {
            listHTML += `
                <div class="option-item" data-code="${code}">
                    <div>
                        <span class="currency-code">${code}</span>
                        <span class="currency-name">${currency.name}</span>
                    </div>
                    <span class="currency-symbol">${currency.symbol}</span>
                </div>
            `;
        }
    }

    optionsList.innerHTML = listHTML || `<div style="text-align:center;color:var(--text-muted);padding:20px;">No matching country or code found</div>`;

    // Add immediate selection listeners to list rows
    document.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', () => {
            const chosenCode = item.getAttribute('data-code');
            const targetDisplayString = `${chosenCode} - ${CURRENCY_DATABASE[chosenCode].name}`;

            if (activeTargetType === "from") {
                selectedFromCode = chosenCode;
                fromDisplay.textContent = targetDisplayString;
            } else {
                selectedToCode = chosenCode;
                toDisplay.textContent = targetDisplayString;
            }

            closeSearchModal();
            calculateConversion(false);
        });
    });
}

function openSearchModal(targetType) {
    activeTargetType = targetType;
    modalTitle.textContent = targetType === "from" ? "Select Base Currency (From)" : "Select Target Currency (To)";
    searchInput.value = ""; // Clear input old history strings
    renderModalOptions("");
    searchModal.classList.add('open');
    setTimeout(() => searchInput.focus(), 150); // Instantly trigger keyboard for speed
}

function closeSearchModal() {
    searchModal.classList.remove('open');
}

function calculateConversion(triggerNotification = true) {
    const amount = parseFloat(amountInput.value);
    const activeToggle = document.querySelector('input[name="market-type"]:checked');
    const selectedEngine = activeToggle ? activeToggle.value : 'parallel';

    if (triggerNotification && selectedEngine !== lastSelectedEngine) {
        if (selectedEngine === 'parallel') {
            showNotification("Switched to Parallel Market Rates", "parallel");
        } else {
            showNotification("Switched to Official Central Bank Rates", "official");
        }
        lastSelectedEngine = selectedEngine;
    }

    if (isNaN(amount) || amount <= 0) {
        resultText.innerHTML = `0.00`;
        return;
    }

    let amtInUSD = 0; let finalOutput = 0;

    if (selectedEngine === 'official') {
        amtInUSD = amount / officialRatesUSD[selectedFromCode];
        finalOutput = amtInUSD * officialRatesUSD[selectedToCode];
        rateTimestamp.textContent = `Live official bank indices updated automatically.`;
    } else {
        const parallelFromRate = getParallelRateAgainstUSD(selectedFromCode);
        const parallelToRate = getParallelRateAgainstUSD(selectedToCode);
        amtInUSD = amount / parallelFromRate;
        finalOutput = amtInUSD * parallelToRate;

        if (SPECIAL_PARALLEL_OVERRIDES[selectedFromCode] || SPECIAL_PARALLEL_OVERRIDES[selectedToCode]) {
            rateTimestamp.textContent = `Using custom manual overrides for matching black-market data.`;
        } else {
            rateTimestamp.textContent = `Parallel calculation evaluated via +${GLOBAL_DEFAULT_SPREAD * 100}% variance formula.`;
        }
    }

    const fromSymbol = CURRENCY_DATABASE[selectedFromCode].symbol;
    const toSymbol = CURRENCY_DATABASE[selectedToCode].symbol;

    parallelBadge.textContent = `${fromSymbol}1 = ${toSymbol}${(getParallelRateAgainstUSD(selectedToCode) / getParallelRateAgainstUSD(selectedFromCode)).toFixed(2)}`;
    officialBadge.textContent = `${fromSymbol}1 = ${toSymbol}${(officialRatesUSD[selectedToCode] / officialRatesUSD[selectedFromCode]).toFixed(2)}`;

    resultText.innerHTML = `${fromSymbol}${amount.toLocaleString()} ${selectedFromCode} = <span class="highlight">${toSymbol}${finalOutput.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span> ${selectedToCode}`;
}

// Event Bindings Orchestration
amountInput.addEventListener('input', () => calculateConversion(false));
fromSelector.addEventListener('click', () => openSearchModal("from"));
toSelector.addEventListener('click', () => openSearchModal("to"));
closeModalBtn.addEventListener('click', closeSearchModal);
searchInput.addEventListener('input', (e) => renderModalOptions(e.target.value));

// Close modal if user clicks outside content card area
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
});

swapBtn.addEventListener('click', () => {
    const temp = selectedFromCode;
    selectedFromCode = selectedToCode;
    selectedToCode = temp;

    fromDisplay.textContent = `${selectedFromCode} - ${CURRENCY_DATABASE[selectedFromCode].name}`;
    toDisplay.textContent = `${selectedToCode} - ${CURRENCY_DATABASE[selectedToCode].name}`;

    calculateConversion(false);
});

document.querySelectorAll('input[name="market-type"]').forEach(radio => {
    radio.addEventListener('change', () => calculateConversion(true));
});

// App Engine Pipeline Startup
initializeBaselineRates();
calculateConversion(false); 
fetchOfficialRates();
