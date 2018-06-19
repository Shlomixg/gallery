'use strict';

// Global Variables
var gNum1 = null;
var gNum2 = null;
var gNum3 = null;
var gOp = null;
var gIsDecimal = false;
var gCountDecimal = 0;
var gMemoryNum = null;

function turnOnDecimal() {
    gIsDecimal = true;
    gCountDecimal = 0;
}

function addDigit(digit) {

    var temp = (gNum2 === null) ? gNum1 : gNum2;
    if (!gIsDecimal) {
        temp = (temp * 10) + digit;
    }
    else {
        if (gCountDecimal === 0) temp = temp + '.';
        temp = '' + temp + digit;
        temp = +temp;
        gCountDecimal++;
    }
    updateDisplay(temp);
    (gNum2 === null) ? gNum1 = temp : gNum2 = temp;
}

function setOp(op) {
    gIsDecimal = false;
    if (gNum2 === null) gNum2 = 0;
    gOp = op;
}

function calcResult() {
    if (gNum2 === null && gNum3 !== null) gNum2 = gNum3;
    else gNum3 = gNum2;
    switch (gOp) {
        case '+':
            gNum1 = gNum1 + gNum2;
            break;
        case '-':
            gNum1 = gNum1 - gNum2;
            break;
        case '/':
            gNum1 = gNum1 / gNum2;
            break;
        case '*':
            gNum1 = gNum1 * gNum2;
            break;
            break;
        case '√':
            calcRoot();
            break;
        case '%':
            gNum1 = gNum1 % gNum2;
            break;
        case '1/x':
            calc1X();
            break;
    }
    gNum2 = null;
    updateDisplay(gNum1);
}

function resetAll() {
    gNum1 = null;
    gNum2 = null;
    gNum3 = null;
    gOp = null;
    gIsDecimal = false;
    gMemoryNum = null;
    updateDisplay();
}

function resetCurrNum() {
    updateDisplay(null);
    (gNum2 === null) ? gNum1 = null : gNum2 = 0;
}

function deleteLastDigit() {
    var temp = (gNum2 === null) ? gNum1.toString(10) : gNum2.toString(10);
    temp = temp.slice(0, -1);
    if (temp.charAt(temp.length - 1) === '.') temp = temp.slice(0, -1);
    temp = +temp;
    updateDisplay(temp);
    (gNum2 === null) ? gNum1 = temp : gNum2 = temp;
}

function negativeNum() {
    var temp = (gNum2 === null) ? gNum1 : gNum2;
    temp = -temp;
    updateDisplay(temp);
    (gNum2 === null) ? gNum1 = temp : gNum2 = temp;
}

function calcRoot() {
    gOp = '√';
    var temp = (gNum2 === null) ? gNum1 : gNum2;
    temp = Math.sqrt(temp);
    updateDisplay(temp);
    if (gNum2 === null) gNum1 = temp;
    else gNum2 = temp;
}

function calc1X() {
    gOp = '1/x';
    var temp = (gNum2 === null) ? gNum1 : gNum2;
    temp = 1 / temp;
    updateDisplay(temp);
    if (gNum2 === null) gNum1 = temp;
    else gNum2 = temp;
}

function updateDisplay(res) {
    if (res === null || res === undefined) res = ' ';
    var elResDisplay = document.querySelector('.res-display');
    elResDisplay.textContent = res;
}

function handleKey(event) {
    console.log('ev', event);
    if (event.key >= 0 && event.key <= 9) addDigit(+event.key);
    if (event.key === '=' || event.key === 'Enter') calcResult();
    if (event.key === '+' || event.key === '-' || 
        event.key === '*' || event.key === '/') {
            setOp(event.key);
        }
    if (event.key === '.') turnOnDecimal();
}

/* --- Memory Functions --- */

function clearMemory() {
    gMemoryNum = null;
}

function recallMemory() {
    if (gMemoryNum === null) return;
    (gNum2 === null) ? gNum1 = gMemoryNum : gNum2 = gMemoryNum;
    var elResDisplay = document.querySelector('.res-display');
    elResDisplay.textContent = gMemoryNum;
}

function storeMemory() {
    gMemoryNum = (gNum2 === null) ? gNum1 : gNum2;
}

function addMemory() {
    if (gMemoryNum === null) gMemoryNum = 0;
    gMemoryNum += (gNum2 === null) ? gNum1 : gNum2;;
}

function subMemory() {
    if (gMemoryNum === null) gMemoryNum = 0;
    gMemoryNum -= (gNum2 === null) ? gNum1 : gNum2;
}

/* --- Bases Functions --- */