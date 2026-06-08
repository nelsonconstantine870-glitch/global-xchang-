// ==========================================
// 1. DATABASE & CONFIGURATION
// ==========================================

const BANK_DATABASE = [
  { name: "Moniepoint POS", fee: 1.2, info: "Standard merchant withdrawal charge" },
  { name: "OPay / PalmPay Agent", fee: 1.5, info: "Average cashout/POS agent charge" },
  { name: "Binance P2P Merchant", fee: 2.0, info: "Average escrow safety/market variance" },
  { name: "Western Union (Bank Deposit)", fee: 2.5, info: "Hidden exchange rate markup" },
  { name: "Wema Bank (ALAT)", fee: 3.0, info: "Digital card rate markup" },
  { name: "GTBank (Guaranty Trust)", fee: 3.5, info: "International card fee" },
  { name: "UBA (United Bank for Africa)", fee: 3.5, info: "International card fee" },
  { name: "Payoneer Card", fee: 3.5, info: "ATM cross-border usage fee" },
  { name: "Zenith Bank", fee: 3.8, info: "International card fee" },
  { name: "Skrill Wallet", fee: 3.99, info: "Internal conversion/transfer fee" },
  { name: "Access Bank", fee: 4.0, info: "International card fee" },
  { name: "PayPal (Goods & Services)", fee: 4.4, info: "Standard merchant receive fee" }
];

// Base dictionary for symbols. If a currency isn't here, it falls back to its 3-letter code.
const CURRENCY_DATABASE = {

  // --- African Currencies (From 1780667664973.jpeg and more) ---
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
  "NGN": { name: "Nigerian Naira", symbol: "₦" },
  "ETB": { name: "Ethiopian Birr", symbol: "Br" },
  "MUR": { name: "Mauritian Rupee", symbol: "₨" },
  "MZN": { name: "Mozambican Metical", symbol: "MT" },
  "NAD": { name: "Namibian Dollar", symbol: "N$" },
  "ZMW": { name: "Zambian Kwacha", symbol: "ZK" },
  "XOF": { name: "West African CFA Franc", symbol: "CFA" },
  "XAF": { name: "Central African CFA Franc", symbol: "FCFA" },
  "CVE": { name: "Cape Verdean Escudo", symbol: "Esc" },
  "DJF": { name: "Djiboutian Franc", symbol: "Fdj" },
  "ERN": { name: "Eritrean Nakfa", symbol: "Nfk" },
  "GMD": { name: "Gambian Dalasi", symbol: "D" },
  "GNF": { name: "Guinean Franc", symbol: "FG" },
  "LSL": { name: "Lesotho Loti", symbol: "L" },
  "LRD": { name: "Liberian Dollar", symbol: "L$" },
  "MGA": { name: "Malagasy Ariary", symbol: "Ar" },
  "MWK": { name: "Malawian Kwacha", symbol: "MK" },
  "MRU": { name: "Mauritanian Ouguiya", symbol: "UM" },
  "SCR": { name: "Seychellois Rupee", symbol: "SR" },
  "SLL": { name: "Sierra Leonean Leone", symbol: "Le" },
  "SOS": { name: "Somali Shilling", symbol: "Sh" },
  "SZL": { name: "Swazi Lilangeni", symbol: "L" },
  "SSP": { name: "South Sudanese Pound", symbol: "£" },
  "STN": { name: "São Tomé and Príncipe Dobra", symbol: "Db" },

  // --- Major Global Currencies ---
  "USD": { name: "United States Dollar", symbol: "$" },
  "EUR": { name: "Euro", symbol: "€" },
  "GBP": { name: "British Pound Sterling", symbol: "£" },
  "JPY": { name: "Japanese Yen", symbol: "¥" },
  "AUD": { name: "Australian Dollar", symbol: "A$" },
  "CAD": { name: "Canadian Dollar", symbol: "C$" },
  "CHF": { name: "Swiss Franc", symbol: "CHF" },
  "CNY": { name: "Chinese Yuan", symbol: "¥" },
  "HKD": { name: "Hong Kong Dollar", symbol: "HK$" },
  "NZD": { name: "New Zealand Dollar", symbol: "NZ$" },
  "SEK": { name: "Swedish Krona", symbol: "kr" },
  "SGD": { name: "Singapore Dollar", symbol: "S$" },

  // --- Americas ---
  "ARS": { name: "Argentine Peso", symbol: "$" },
  "BRL": { name: "Brazilian Real", symbol: "R$" },
  "CLP": { name: "Chilean Peso", symbol: "$" },
  "COP": { name: "Colombian Peso", symbol: "$" },
  "MXN": { name: "Mexican Peso", symbol: "$" },
  "PEN": { name: "Peruvian Sol", symbol: "S/." },
  "UYU": { name: "Uruguayan Peso", symbol: "$U" },
  "VEF": { name: "Venezuelan Bolívar", symbol: "Bs.F" },
  "CRC": { name: "Costa Rican Colón", symbol: "₡" },
  "DOP": { name: "Dominican Peso", symbol: "RD$" },
  "GTQ": { name: "Guatemalan Quetzal", symbol: "Q" },
  "HNL": { name: "Honduran Lempira", symbol: "L" },
  "NIO": { name: "Nicaraguan Córdoba", symbol: "C$" },
  "PAB": { name: "Panamanian Balboa", symbol: "B/." },
  "PYG": { name: "Paraguayan Guaraní", symbol: "₲" },
  "TTD": { name: "Trinidad and Tobago Dollar", symbol: "TT$" },
  "BBD": { name: "Barbadian Dollar", symbol: "Bds$" },
  "JMD": { name: "Jamaican Dollar", symbol: "J$" },
  "BSD": { name: "Bahamian Dollar", symbol: "B$" },

  // --- Asia ---
  "INR": { name: "Indian Rupee", symbol: "₹" },
  "IDR": { name: "Indonesian Rupiah", symbol: "Rp" },
  "ILS": { name: "Israeli New Shekel", symbol: "₪" },
  "KRW": { name: "South Korean Won", symbol: "₩" },
  "MYR": { name: "Malaysian Ringgit", symbol: "RM" },
  "PHP": { name: "Philippine Peso", symbol: "₱" },
  "PKR": { name: "Pakistani Rupee", symbol: "₨" },
  "THB": { name: "Thai Baht", symbol: "฿" },
  "TRY": { name: "Turkish Lira", symbol: "₺" },
  "TWD": { name: "New Taiwan Dollar", symbol: "NT$" },
  "VND": { name: "Vietnamese Dong", symbol: "₫" },
  "AED": { name: "United Arab Emirates Dirham", symbol: "د.إ" },
  "AFN": { name: "Afghan Afghani", symbol: "؋" },
  "BDT": { name: "Bangladeshi Taka", symbol: "৳" },
  "BHD": { name: "Bahraini Dinar", symbol: ".د.ب" },
  "BND": { name: "Brunei Dollar", symbol: "B$" },
  "KHR": { name: "Cambodian Riel", symbol: "៛" },
  "IRR": { name: "Iranian Rial", symbol: "﷼" },
  "IQD": { name: "Iraqi Dinar", symbol: "ع.د" },
  "JOD": { name: "Jordanian Dinar", symbol: "د.ا" },
  "KWD": { name: "Kuwaiti Dinar", symbol: "د.ك" },
  "LKR": { name: "Sri Lankan Rupee", symbol: "Rs" },
  "LAK": { name: "Lao Kip", symbol: "₭" },
  "MMK": { name: "Myanmar Kyat", symbol: "K" },
  "MNT": { name: "Mongolian Tögrög", symbol: "₮" },
  "NPR": { name: "Nepalese Rupee", symbol: "₨" },
  "OMR": { name: "Omani Rial", symbol: "ر.ع." },
  "QAR": { name: "Qatari Riyal", symbol: "ر.ق" },
  "SAR": { name: "Saudi Riyal", symbol: "ر.س" },
  "LBN": { name: "Lebanese Pound", symbol: "ل.ل" },

  // --- Europe & Remaining Regions ---
  "DKK": { name: "Danish Krone", symbol: "kr" },
  "NOK": { name: "Norwegian Krone", symbol: "kr" },
  "PLN": { name: "Polish Zloty", symbol: "zł" },
  "RUB": { name: "Russian Ruble", symbol: "₽" },
  "UAH": { name: "Ukrainian Hryvnia", symbol: "₴" },
  "CZK": { name: "Czech Koruna", symbol: "Kč" },
  "HUF": { name: "Hungarian Forint", symbol: "Ft" },
  "BGN": { name: "Bulgarian Lev", symbol: "лв" },
  "RON": { name: "Romanian Leu", symbol: "lei" },
  "ISK": { name: "Icelandic Króna", symbol: "kr" },
  "HRK": { name: "Croatian Kuna", symbol: "kn" },
  "RSD": { name: "Serbian Dinar", symbol: "дин." },
  "FJD": { name: "Fijian Dollar", symbol: "FJ$" },
  "PGK": { name: "Papua New Guinean Kina", symbol: "K" },
  "WST": { name: "Samoan Tālā", symbol: "WS$" },
  "VUV": { name: "Vanuatu Vatu", symbol: "VT" }
};

// ==========================================
// 2. APP STATE & DOM LINKS
// ==========================================
let officialRatesUSD = {};
let selectedFromCode = "USD";
let selectedToCode = "NGN";
let activeTargetType = "from"; 

const feeAmountInput = document.getElementById('fee-amount');
const feePercentageInput = document.getElementById('fee-percentage');
const bankSearchInput = document.getElementById('bank-search');
const bankDropdown = document.getElementById('bank-dropdown');

const fromSelector = document.getElementById('from-selector');
const toSelector = document.getElementById('to-selector');
const fromDisplay = document.getElementById('from-display');
const toDisplay = document.getElementById('to-display');

const deductNative = document.getElementById('deduct-native');
const deductForeign = document.getElementById('deduct-foreign');
const remainNative = document.getElementById('remain-native');
const remainForeign = document.getElementById('remain-foreign');

const searchModal = document.getElementById('search-modal');
const modalTitle = document.getElementById('modal-title');
const currencySearchInput = document.getElementById('currency-search-input');
const optionsList = document.getElementById('modal-options-list');
const closeModalBtn = document.getElementById('close-modal-btn');

// ==========================================
// 3. CORE OFFICIAL EXCHANGE MECHANICS
// ==========================================

async function fetchRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    if (data && data.rates) {
      officialRatesUSD = data.rates;
      calculateFees();
    }
  } catch (e) {
    console.error("Rate fetching encountered error: ", e);
  }
}

function calculateFees() {
  const amount = parseFloat(feeAmountInput.value) || 0;
  const percent = parseFloat(feePercentageInput.value) || 0;

  // Deduction math
  const nativeDeducted = amount * (percent / 100);
  const nativeRemaining = amount - nativeDeducted;

  // DIRECT OFFICIAL RATES LOOKUP (No overrides, no manual spreads)
  const fromRate = officialRatesUSD[selectedFromCode] || 1.0;
  const toRate = officialRatesUSD[selectedToCode] || 1.0;
  
  // Cross currency math formula: (Amount / From Rate) * To Rate
  const conversionFactor = toRate / fromRate;

  const foreignDeducted = nativeDeducted * conversionFactor;
  const foreignRemaining = nativeRemaining * conversionFactor;

  const fromSym = CURRENCY_DATABASE[selectedFromCode]?.symbol || selectedFromCode;
  const toSym = CURRENCY_DATABASE[selectedToCode]?.symbol || selectedToCode;

  // Render UI updates
  deductNative.innerHTML = `Native: <span style="color: #3b82f6;">${fromSym}${nativeDeducted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
  deductForeign.innerHTML = `Converted: <span>${toSym}${foreignDeducted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
  
  remainNative.innerHTML = `Native: <span style="color: #10b981;">${fromSym}${nativeRemaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
  remainForeign.innerHTML = `Converted: <span>${toSym}${foreignRemaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
}

// ==========================================
// 4. FILTERING & DROPDOWN RENDER ENGINES
// ==========================================

function filterBanksByPercentage(targetPercent) {
  if (isNaN(targetPercent) || targetPercent === null || feePercentageInput.value === "") {
    bankDropdown.style.display = "none";
    return;
  }

  let html = "";
  const affordableBanks = BANK_DATABASE.filter(bank => bank.fee <= targetPercent);

  if (affordableBanks.length === 0) {
    const closest = BANK_DATABASE.reduce((prev, curr) => (prev.fee < curr.fee) ? prev : curr);
    html = `
      <div style="padding: 12px; color: #9ca3af; font-size: 0.85rem;">
        No bank matches this low rate. Showing lowest alternative option:
      </div>
      <div class="option-item bank-item" data-fee="${closest.fee}" data-name="${closest.name}" style="padding: 12px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer;">
        <div>
          <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">${closest.name}</div>
          <div style="font-size: 0.75rem; color: #ef4444;">Exceeds target budget</div>
        </div>
        <span style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">${closest.fee}%</span>
      </div>
    `;
  } else {
    html = `<div style="padding: 8px 12px; font-size: 0.75rem; color: #10b981; text-transform: uppercase; font-weight: 700; background: rgba(255,255,255,0.02);">Banks within your ${targetPercent}% limit:</div>`;
    affordableBanks.forEach(bank => {
      html += `
        <div class="option-item bank-item" data-fee="${bank.fee}" data-name="${bank.name}" style="padding: 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer;">
          <div>
            <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">${bank.name}</div>
            <div style="font-size: 0.75rem; color: #9ca3af;">${bank.info}</div>
          </div>
          <span style="color: #10b981; font-weight: 700; font-size: 0.9rem;">${bank.fee}%</span>
        </div>
      `;
    });
  }

  bankDropdown.innerHTML = html;
  bankDropdown.style.display = "block";
  attachBankClickHandlers();
}

function renderBankOptions(filterText = "") {
  let query = filterText.toLowerCase().trim();
  if (!query) {
    bankDropdown.style.display = "none";
    return;
  }

  let matches = BANK_DATABASE.filter(bank => bank.name.toLowerCase().includes(query));
  let html = "";

  if (matches.length === 0) {
    html = `<div style="padding: 12px; color: #9ca3af; font-size: 0.85rem;">No matching bank criteria tracked.</div>`;
  } else {
    matches.forEach(bank => {
      html += `
        <div class="option-item bank-item" data-fee="${bank.fee}" data-name="${bank.name}" style="padding: 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer;">
          <div>
            <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">${bank.name}</div>
            <div style="font-size: 0.75rem; color: #9ca3af;">${bank.info}</div>
          </div>
          <span style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">${bank.fee}%</span>
        </div>
      `;
    });
  }

  bankDropdown.innerHTML = html;
  bankDropdown.style.display = "block";
  attachBankClickHandlers();
}

function attachBankClickHandlers() {
  document.querySelectorAll('.bank-item').forEach(item => {
    item.addEventListener('click', () => {
      bankSearchInput.value = item.getAttribute('data-name');
      feePercentageInput.value = item.getAttribute('data-fee');
      bankDropdown.style.display = "none";
      calculateFees();
    });
  });
}

// Automatically pulls ALL 160+ official live currency fields dynamically
function renderModalOptions(filterText = "") {
  let query = filterText.toLowerCase().trim();
  let html = "";

  const allAvailableCodes = Object.keys(officialRatesUSD);

  for (let code of allAvailableCodes) {
    let knownCurrency = CURRENCY_DATABASE[code];
    let currencyName = knownCurrency ? knownCurrency.name : `${code} Currency`;
    let currencySymbol = knownCurrency ? knownCurrency.symbol : code; 

    if (code.toLowerCase().includes(query) || currencyName.toLowerCase().includes(query)) {
      html += `
        <div class="option-item currency-option" data-code="${code}" style="padding: 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer;">
          <div>
            <span class="currency-code" style="font-weight:700; color:#fff; margin-right:8px;">${code}</span>
            <span class="currency-name" style="color: #9ca3af; font-size:0.85rem;">${currencyName}</span>
          </div>
          <span class="currency-symbol" style="color: #3b82f6; font-weight:700;">${currencySymbol}</span>
        </div>
      `;
    }
  }
  
  optionsList.innerHTML = html;

  document.querySelectorAll('.currency-option').forEach(item => {
    item.addEventListener('click', () => {
      const code = item.getAttribute('data-code');
      let currentName = CURRENCY_DATABASE[code] ? CURRENCY_DATABASE[code].name : `${code} Currency`;
      
      if (activeTargetType === "from") {
        selectedFromCode = code;
        fromDisplay.textContent = `${code} - ${currentName}`;
      } else {
        selectedToCode = code;
        toDisplay.textContent = `${code} - ${currentName}`;
      }
      searchModal.classList.remove('open');
      calculateFees();
    });
  });
}

// ==========================================
// 5. EVENT HOOKS INTERACTION ASSIGNMENT
// ==========================================

feeAmountInput.addEventListener('input', calculateFees);

feePercentageInput.addEventListener('input', (e) => {
  calculateFees();
  let targetVal = parseFloat(e.target.value);
  filterBanksByPercentage(targetVal);
});

bankSearchInput.addEventListener('input', (e) => {
  renderBankOptions(e.target.value);
});

document.addEventListener('click', (e) => {
  if (!bankSearchInput.contains(e.target) && !feePercentageInput.contains(e.target) && !bankDropdown.contains(e.target)) {
    bankDropdown.style.display = "none";
  }
});

fromSelector.addEventListener('click', () => {
  activeTargetType = "from";
  modalTitle.textContent = "Select Base Currency";
  searchModal.classList.add('open');
  renderModalOptions("");
});

toSelector.addEventListener('click', () => {
  activeTargetType = "to";
  modalTitle.textContent = "Convert Target Currency";
  searchModal.classList.add('open');
  renderModalOptions("");
});

closeModalBtn.addEventListener('click', () => searchModal.classList.remove('open'));
currencySearchInput.addEventListener('input', (e) => renderModalOptions(e.target.value));

fetchRates();
