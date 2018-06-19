'use strict';

// Global Variables
var MINE = 'MINE';
var MINE_IMG = '<img class="mine" src="img/mine.png" />'
var MINE_EXPLODED_IMG = '<img class="mine" src="img/mine-exploded.png" />'
var EMPTY = '';

var gBoard = [];
var gLevel = { SIZE: 8, MINES: 6 };
var gState = { isGameOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gTimer = 0;

/* --- Functions --- */

function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    // Create the matrix
    var board = new Array(gLevel.SIZE);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(gLevel.SIZE);
    }
    // Init the cells to empty cells with 0 neighbors
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { content: EMPTY, nearbyMines: 0 };
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            strHTML += `\t<td class="cell ${cellClass}" onclick="cellClicked(this, ${i} , ${j})" >\n`
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    if (!gState.isGameOn) {
        putMines(gBoard, i, j);
        setMinesNegsCount(gBoard);
        gState.isGameOn = true;
    }
    if (gBoard[i][j].content === MINE) {
        console.log('Lost');
        showMines(i, j);
    }
}

// Counts the neighbours which mined and set number to every cell
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            currCell.nearbyMines = countMines(board, i, j);
        }
    }
}

// Counts mines around specific cell
function countMines(board, cellRow, cellCol) {
    var count = 0;
    for (var i = cellRow - 1; i < cellRow + 2; i++) {
        for (var j = cellCol - 1; j < cellCol + 2; j++) {
            if (i < 0 || i > board.length - 1) break;
            if (i === cellRow && j === cellCol || j < 0 || j > board[i].length - 1) continue;
            if (board[i][j].content === MINE) count++;
        }
    }
    return count;
}

function cellMarked(elCell) {

}

function checkGameOver() {
    return (checkMinesFlagged() && checkCellsClicked())
}

function checkMinesFlagged() {

    return true;
}

function checkCellsClicked() {

    return true;
}

function expandShown(board, elCall, i, j) {

}

function showMines(row, col) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].content === MINE) {
                var IMG = (i === row && j === col) ? MINE_EXPLODED_IMG : MINE_IMG;
                renderCell({ i: i, j: j }, IMG);
            }
        }
    }
}

window.oncontextmenu = function () {
    console.log('cancel default menu');
    return false; // cancel default menu
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

// Add mine to random cell, excluding the first clicked cell
function putMines(board, currRow, currCol) {
    // board[1][1].content = MINE;
    // board[2][3].content = MINE;
    // board[3][3].content = MINE;
    // board[6][5].content = MINE;
    // board[4][6].content = MINE;
    // board[0][7].content = MINE;
    // board[3][6].content = MINE;
    // board[2][6].content = MINE;
    // board[3][5].content = MINE;
    // board[2][4].content = MINE;
    // renderCell({ i: 1, j: 1 }, MINE_IMG);
    // renderCell({ i: 2, j: 3 }, MINE_IMG);
    // renderCell({ i: 3, j: 3 }, MINE_IMG);
    // renderCell({ i: 6, j: 5 }, MINE_IMG);
    // renderCell({ i: 4, j: 6 }, MINE_IMG);
    // renderCell({ i: 0, j: 7 }, MINE_IMG);
    // renderCell({ i: 3, j: 6 }, MINE_IMG);
    // renderCell({ i: 2, j: 6 }, MINE_IMG);
    // renderCell({ i: 3, j: 5 }, MINE_IMG);
    // renderCell({ i: 2, j: 4 }, MINE_IMG);
    for (var idx = 0; idx < gLevel.MINES; idx++) {
        var cell = getRandomCell(board, currRow, currCol);
        var i = cell.i;
        var j = cell.j;
        var targetCell = gBoard[i][j];
        targetCell.content = MINE;
        // renderCell({ i, j }, MINE_IMG);
    }
}

// Returns location of random empty cell
function getRandomCell(board, currRow, currCol) {
    var i = getRandomInteger(0, board.length - 1);
    var j = getRandomInteger(0, board[0].length - 1);
    var targetCell = board[i][j];
    while (targetCell.content !== EMPTY || (i === currRow && j === currCol)) {
        i = getRandomInteger(0, gBoard.length - 1);
        j = getRandomInteger(0, gBoard.length - 1);
        targetCell = gBoard[i][j];
    }
    return { i: i, j: j };
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}