// ==========================================
// 1. DATABASE & CONFIGURATION (GLOBAL US/UK/NG)
// ==========================================

const BANK_DATABASE = [
  // --- Global Freelancer/Digital Paths ---
  { name: "Wise (TransferWise)", fee: 0.45, info: "Mid-market rate baseline cross-border utility" },
  { name: "Revolut Premium", fee: 0.5, info: "Cross-currency baseline workspace conversion" },
  { name: "Moniepoint POS / Business", fee: 1.2, info: "Standard baseline merchant conversion layout" },
  { name: "OPay / PalmPay Business", fee: 1.5, info: "Agent wallet micro-deduction margin profile" },
  { name: "Starling Bank (UK)", fee: 2.0, info: "International card purchase / exchange spread" },
  { name: "Binance P2P Escrow", fee: 2.0, info: "Average market variation safety clearance" },
  { name: "Western Union Speed Transfer", fee: 2.5, info: "Retail client programmatic rate markup" },
  { name: "Barclays Bank (UK Exchange)", fee: 2.75, info: "Traditional retail cross-border transaction rate" },
  { name: "Chase Bank (US Mobile)", fee: 3.0, info: "Standard global debit markup tiering" },
  { name: "Bank of America (International)", fee: 3.0, info: "Foreign transactions assessment index" },
  { name: "Wema Bank (ALAT Custom)", fee: 3.0, info: "Digital proxy system valuation index" },
  { name: "GTBank (Guaranty Trust)", fee: 3.5, info: "Standard international network processing" },
  { name: "UBA Domiciliary Operations", fee: 3.5, info: "Inbound settlement network pipeline clearance" },
  { name: "Payoneer Professional Card", fee: 3.5, info: "Global ATM ecosystem operations framework" },
  { name: "Zenith Global Settlement", fee: 3.8, info: "Corporate client foreign interface surcharge" },
  { name: "Skrill Digital Wallet", fee: 3.99, info: "Merchant processing currency gateway allocation" },
  { name: "Access Bank Cards", fee: 4.0, info: "Cross-border clearing network execution fee" },
  { name: "PayPal Invoice Settlement", fee: 4.4, info: "Standard cross-currency commercial processing rate" }
];

const CURRENCY_DATABASE = {
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
  "INR": { name: "Indian Rupee", symbol: "₹" },
  "TRY": { name: "Turkish Lira", symbol: "₺" },
  "AED": { name: "United Arab Emirates Dirham", symbol: "د.إ" },
  "SAR": { name: "Saudi Riyal", symbol: "ر.س" }
};

// ==========================================
// 2. APP STATE & DOM LINKS
// ==========================================
let officialRatesUSD = {};
let selectedFromCode = "USD";
let selectedToCode = "NGN";
let activeTargetType = "from"; 
let currentMode = "convert"; // Options: 'convert', 'transfer', 'swift'

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
const breakdownNotices = document.getElementById('breakdown-notices');

const searchModal = document.getElementById('search-modal');
const modalTitle = document.getElementById('modal-title');
const currencySearchInput = document.getElementById('currency-search-input');
const optionsList = document.getElementById('modal-options-list');
const closeModalBtn = document.getElementById('close-modal-btn');

// Mode Buttons
const btnModeConvert = document.getElementById('btn-mode-convert');
const btnModeTransfer = document.getElementById('btn-mode-transfer');
const btnModeSwift = document.getElementById('btn-mode-swift');

// ==========================================
// 3. CORE EXCHANGE & ADVANCED FEE LOGIC
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

  let nativeExtraCharges = 0;
  let foreignExtraCharges = 0;
  let noticesText = [];

  const fromRate = officialRatesUSD[selectedFromCode] || 1.0;
  const toRate = officialRatesUSD[selectedToCode] || 1.0;
  const conversionFactor = toRate / fromRate;

  // Mode Logic Simulation
  if (currentMode === "transfer") {
    // Convert & Local Account Transfer Mode
    if (selectedToCode === "NGN") {
      // 1. Calculate dynamic simulation value
      let calculatedTargetVal = amount * conversionFactor;
      
      // 2. Local NGN processing mechanics: N50 EMTL for transactions >= N10,000
      if (calculatedTargetVal >= 10000) {
        foreignExtraCharges += 50;
        noticesText.push("+ ₦50.00 Electronic Money Transfer Levy (EMTL) applied");
      }
      // 3. Interbank standard transaction execution fee
      foreignExtraCharges += 20;
      noticesText.push("+ ₦20.00 Flat Interbank Transfer Processing Fee");
    } else if (selectedToCode === "GBP") {
      foreignExtraCharges += 0.50; // Average Faster Payments micro-fee
      noticesText.push("+ £0.50 UK Faster Payments processing charge");
    } else if (selectedToCode === "USD") {
      foreignExtraCharges += 0.25; // Average ACH network clearance cost
      noticesText.push("+ $0.25 US Local ACH delivery fee");
    }
  } else if (currentMode === "swift") {
    // Raw Foreign Wire Mode (Bypassing local settlement)
    if (selectedFromCode === "USD" || selectedFromCode === "GBP" || selectedFromCode === "EUR") {
      nativeExtraCharges += 20; // Simulated $20 flat SWIFT wire execution fee
      noticesText.push(`+ ${selectedFromCode} 20.00 Flat SWIFT Telecommunication/Cable Charge`);
    } else {
      nativeExtraCharges += (amount * 0.005); // Global standard correspondent ledger deduction index
      noticesText.push("+ 0.5% Estimated Intermediary Bank Network clearing fee");
    }
  }

  // Baseline Percentage Percentage Math
  const nativePercentageDeduct = amount * (percent / 100);
  const totalNativeDeductions = nativePercentageDeduct + nativeExtraCharges;
  const nativeRemaining = Math.max(0, amount - totalNativeDeductions);

  // Conversion Execution Logic
  const foreignPercentageDeduct = nativePercentageDeduct * conversionFactor;
  const totalForeignDeductions = foreignPercentageDeduct + foreignExtraCharges + (nativeExtraCharges * conversionFactor);
  const foreignRemaining = Math.max(0, (amount * conversionFactor) - totalForeignDeductions);

  const fromSym = CURRENCY_DATABASE[selectedFromCode]?.symbol || selectedFromCode;
  const toSym = CURRENCY_DATABASE[selectedToCode]?.symbol || selectedToCode;

  // Display Output Logic
  breakdownNotices.innerHTML = noticesText.length > 0 ? noticesText.join("<br>") : "Pure currency conversion environment active.";

  deductNative.innerHTML = `Native: <span style="color: #3b82f6;">${fromSym}${totalNativeDeductions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
  deductForeign.innerHTML = `Converted: <span>${toSym}${totalForeignDeductions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
  
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
        No database entry matches this low margin. Lowest alternative option:
      </div>
      <div class="option-item bank-item" data-fee="${closest.fee}" data-name="${closest.name}" style="padding: 12px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer;">
        <div>
          <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">${closest.name}</div>
          <div style="font-size: 0.75rem; color: #ef4444;">Exceeds target boundary conditions</div>
        </div>
        <span style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">${closest.fee}%</span>
      </div>
    `;
  } else {
    html = `<div style="padding: 8px 12px; font-size: 0.75rem; color: #10b981; text-transform: uppercase; font-weight: 700; background: rgba(255,255,255,0.02);">Platforms within your ${targetPercent}% tier:</div>`;
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
    html = `<div style="padding: 12px; color: #9ca3af; font-size: 0.85rem;">No matching global profile tracked.</div>`;
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
// 5. EVENT HOOKS & MODE TOGGLE ASSIGNMENT
// ==========================================

function updateModeUI(activeBtn, targetMode) {
  [btnModeConvert, btnModeTransfer, btnModeSwift].forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
  currentMode = targetMode;
  calculateFees();
}

btnModeConvert.addEventListener('click', () => updateModeUI(btnModeConvert, 'convert'));
btnModeTransfer.addEventListener('click', () => updateModeUI(btnModeTransfer, 'transfer'));
btnModeSwift.addEventListener('click', () => updateModeUI(btnModeSwift, 'swift'));

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
