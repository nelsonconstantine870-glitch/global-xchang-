// Display State tracking variables
let currentInput = '0';
let currentExpression = '';
let isCalculationDone = false;

const outputDisplay = document.getElementById('calc-output');
const historyDisplay = document.getElementById('calc-history');

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
    if (currentExpression === '') return;
    
    // Merge history string logic with pending input variables
    let finalExpression = currentExpression + currentInput;
    
    // Strip malicious non-mathematical code blocks out prior to execution 
    let sanitizedExpression = finalExpression.replace(/[^0-9+\-*/().\s]/g, '');

    try {
        // Safe evaluation of the math formulation using Function constructors
        let evalResult = new Function(`return (${sanitizedExpression})`)();
        
        // Handle long decimals nicely
        if (evalResult % 1 !== 0) {
            evalResult = parseFloat(evalResult.toFixed(4));
        }

        currentExpression = finalExpression + ' =';
        currentInput = String(evalResult);
        isCalculationDone = true;
    } catch (error) {
        currentInput = 'Error';
        currentExpression = '';
    }
    
    updateDisplay();
}
