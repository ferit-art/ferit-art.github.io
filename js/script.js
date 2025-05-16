
let lcd = null; // displayen

let memory = 0; // Lagrar gamla värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let isComma = false; // Kollar om decimaltecken är inlagt

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard');
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; // id for the button clicked

    if (btn.substring(0, 1) === 'b') { //Delar upp knappen så att siffran blir kvar
        // Exempel: b1, b2, b3
        // b1 ger 1, b2 ger 2 osv.
        let digit = btn.substring(1, 2);
        addDigit(digit);
    } else if (btn === 'comma') { // Decimal point
        addComma();
    } else if (btn === 'clear') { // Clear button
        memClear();
    } else if (btn === 'enter') { // Equals button
        calculate();
    } else { // Operator buttons (+, -, *, /)
        let operator = btn;
        setOperator(operator);
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    if (lcd.value === '0' || lcd.value === '') {
        lcd.value = digit; // Skriver ut siffran i lcd
    } else {
        lcd.value += digit; // Lägger till siffran i lcd om det redan fanns något tal
    }
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!isComma) {
        if (lcd.value === '') {
            lcd.value = '0.'; // Start with 0 if empty
        } else {
            lcd.value += '.'; // Append decimal point
        }
        isComma = true; // Prevent multiple commas
    }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    memory = parseFloat(lcd.value); // Store current value in memory
    arithmetic = operator; // Store the operator
    clearLCD(); // Clear display for the next input
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    if (arithmetic && lcd.value !== '') {
        let currentValue = parseFloat(lcd.value); // Get the current value
        let result;

        switch (arithmetic) {
            case 'add':
                result = memory + currentValue;
                break;
            case 'sub':
                result = memory - currentValue;
                break;
            case 'mul':
                result = memory * currentValue;
                break;
            case 'div':
                result = currentValue !== 0 ? memory / currentValue : 'Error'; // Handle division by zero
                break;
        }

        lcd.value = result; // Display the result
        memory = result; // Store result in memory for further calculations
        arithmetic = null; // Reset operator
        isComma = false; // Reset comma flag
    }
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;