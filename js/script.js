/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let isComma = false; // Kollar om decimaltecken är inlagt

function init() {
    lcd = document.getElementById('lcd');
    keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; // id:t på knappen 

    if (btn.substring(0, 1) === 'b') { //Delar upp knappen så att siffran blir kvar
        // Exempel: b1, b2, b3, b4, b5, b6, b7, b8, b9, b0
        // b1 ger 1, b2 ger 2 osv.
        let digit = btn.substring(1, 2);
        addDigit(digit);
    } else if (btn === 'comma') { // Decimaltecken
        addComma();
    } else if (btn === 'clear') { // Clear knappen
        memClear();
    } else if (btn === 'enter') { // Enter knappen
        calculate();
    } else { // Operator knapparna, exempel: add, sub, mul, div
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
            lcd.value = '0.'; // Börjar med 0. om inget fanns
        } else {
            lcd.value += '.'; // Tillägger decimaltecken
        }
        isComma = true; // Sätter flaggan till true så att det inte går att lägga till fler decimaltecken
    }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    memory = parseFloat(lcd.value); // Lagrar värdet från displayen i minnet
    arithmetic = operator; // lagrar operatorn
    clearLCD(); // Rensar displayen för nästa beräkning
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    if (arithmetic && lcd.value !== '') {
        let currentValue = parseFloat(lcd.value); // Hämtar värdet från displayen
        let result;

        switch (arithmetic) {
            case 'add': // '+'
                result = memory + currentValue;
                break;
            case 'sub': // '-'
                result = memory - currentValue;
                break;
            case 'mul': // '*'
                result = memory * currentValue;
                break;
            case 'div': // '/'
                result = currentValue !== 0 ? memory / currentValue : 'Error'; // Handle division by zero
                break;
        }

        lcd.value = result; 
        memory = result; // Lagrar resultatet i minnet för nästa beräkning
        arithmetic = null; // Återställer operatorn
        isComma = false; // Återställer decimaltecken 
    }
}

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