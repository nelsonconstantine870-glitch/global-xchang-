// Display State tracking variables
let currentInput = '0';
let currentExpression = '';
let isCalculationDone = false;
let pastCalculations = []; // Stores list of past entries

const outputDisplay = document.getElementById('calc-output');
const historyDisplay = document.getElementById('calc-history');
const historyListElement = document.getElementById('history-list');

// Updates display values securely
function updateDisplay() {
    outputDisplay.textContent = currentInput;
    historyDisplay.textContent = currentExpression;
}

// Append number inputs securely
function appendNumber(num) {
    if (isCalculationDone) {
        currentInput = num === '.' ? '0.' : num;
        isCalculationDone = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return; // Avoid multi-decimals
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

// Handle Math operators safely
function appendOperator(op) {
    if (isCalculationDone) {
        currentExpression = currentInput + ' ' + op + ' ';
        isCalculationDone = false;
    } else {
        if (currentInput === '0' && currentExpression === '') return;
        currentExpression += currentInput + ' ' + op + ' ';
    }
    currentInput = '0';
    updateDisplay();
}

// Wipe tracking metrics completely
function clearScreen() {
    currentInput = '0';
    currentExpression = '';
    isCalculationDone = false;
    updateDisplay();
}

// Backspace operation
function deleteLast() {
    if (isCalculationDone) {
        clearScreen();
        return;
    }
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Execute logic engine cleanly
function calculateResult() {
    if (currentExpression === '' || isCalculationDone) return;
    
    let finalExpression = currentExpression + currentInput;
    let sanitizedExpression = finalExpression.replace(/[^0-9+\-*/().\s]/g, '');

    try {
        let evalResult = new Function(`return (${sanitizedExpression})`)();
        
        if (evalResult % 1 !== 0) {
            evalResult = parseFloat(evalResult.toFixed(4));
        }

        // Save entry into our log list tracking array
        saveToHistory(finalExpression, String(evalResult));

        currentExpression = finalExpression + ' =';
        currentInput = String(evalResult);
        isCalculationDone = true;
    } catch (error) {
        currentInput = 'Error';
        currentExpression = '';
    }
    
    updateDisplay();
}

// Save calculation structure to history log
function saveToHistory(expression, result) {
    pastCalculations.unshift({ expression: expression, result: result });
    
    // Keep list capped to last 4 interactions to save clean view spacing
    if (pastCalculations.length > 4) {
        pastCalculations.pop();
    }
    
    renderHistoryList();
}

// Render dynamic log updates to UI
function renderHistoryList() {
    historyListElement.innerHTML = '';
    
    if (pastCalculations.length === 0) {
        historyListElement.innerHTML = `<div style="color: var(--text-muted); font-style: italic; font-size: 0.8rem;">No calculations yet</div>`;
        return;
    }

    pastCalculations.forEach((item) => {
        const row = document.createElement('div');
        row.style.cssText = "display: flex; justify-content: space-between; padding: 6px; cursor: pointer; border-radius: 6px; transition: background 0.2s; background: rgba(255,255,255,0.02);";
        row.innerHTML = `<span style="color: var(--text-muted); max-width: 70%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.expression}</span><strong style="color: var(--official-color);">= ${item.result}</strong>`;
        
        // Add hover visual cue
        row.addEventListener('mouseenter', () => row.style.background = "rgba(255,255,255,0.06)");
        row.addEventListener('mouseleave', () => row.style.background = "rgba(255,255,255,0.02)");
        
        // Restore values instantly on click to allow modification
        row.addEventListener('click', () => {
            currentInput = item.result;
            currentExpression = '';
            isCalculationDone = false;
            updateDisplay();
        });

        historyListElement.appendChild(row);
    });
}
