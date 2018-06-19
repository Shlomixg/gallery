'use strict';

// Global Variables
var gNums = [];
var gIsPlaying = false;
var gStartTime;
var gTimer;

/* Functions */

function initGame(boardSize) {
    console.log('Let the game begin');
    gIsPlaying = false;
    gNums = resetNums(boardSize);
    var shuffledNums = shuffle(gNums);
    var strGameBoard = drawBoard(shuffledNums);
    var gameDiv = document.querySelector('.game');
    gameDiv.innerHTML = strGameBoard;
    var elTimer = document.querySelector('.timer');
    elTimer.classList.remove('winmiation');
}

function resetNums(length) {
    var nums = [];
    for (var i = 0; i < length; i++) {
        nums[i] = i + 1;
    }
    return nums;
}

function shuffle(arr) {
    var items = arr.slice();
    var j, x, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = items[i];
        items[i] = items[j];
        items[j] = x;
    }
    return items;
}

function drawBoard(nums) {
    var str = '<table class="gameTable"><tbody>'
    var rowLength = Math.sqrt(nums.length);
    for (var i = 0; i < nums.length; i++) {
        if (i % rowLength === 0) {
            str += '<tr>';
        }
        str += '<td onclick="cellClicked(this)" class="numCell">' + nums[i] + '</td>';
        if (i % rowLength === rowLength - 1) {
            str += '</tr>';
        }
    }
    str += '</tbody></table>';
    return str;
}

function cellClicked(elClickedNum) {
    if (gNums.length === 0) return; // Avoid restarting finished board by pressing again on 1
    var num = +elClickedNum.innerText;
    if (num === 1) {
        gStartTime = Date.now();
        gIsPlaying = true;
        gTimer = setInterval(setTimer, 10, document.querySelector('.timer'));
    }
    if (gIsPlaying && num === gNums[0]) {
        elClickedNum.classList.toggle('clickedNum');
        gNums.shift();
        if (gNums.length === 0) gIsPlaying = false;
    }
}

function setTimer(elTimer) {
    if (gIsPlaying) elTimer.innerText = 'Timer: ' + (Date.now() - gStartTime) / 1000;
    else {
        clearInterval(gTimer);
        if (gNums.length === 0) {
            console.log('Yay!');
            elTimer.classList.add('winmiation');
        }
    }
}