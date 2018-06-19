'use strict';

var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';

var gCollectedBalls;
var gActiveBalls;
var gRandomBallInterval;

var gGamerPos = { i: 0, j: 0 };
var gBoard;

var gIsWon;

function initGame() {
	var elBtn = document.querySelector('button');
	elBtn.style.display = 'none';
	gBoard = buildBoard();
	gIsWon = false;
	gCollectedBalls = 0;
	gActiveBalls = 0;
	var elBallsCounter = document.querySelector('.data h4');
	elBallsCounter.innerText = 'You Have Collected ' + gCollectedBalls + ' Balls';
	renderBoard(gBoard);
	AddElement(GAMER, GAMER_IMG);
	AddElement(BALL, BALL_IMG);
	AddElement(BALL, BALL_IMG);
}

function buildBoard() {
	// Create the Matrix
	var board = new Array(11);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(13);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			var vMiddle = Math.floor(board.length / 2);
			var hMiddle = Math.floor(board[0].length / 2);
			if ((i == 0 && j !== hMiddle) || (i == board.length - 1 && j !== hMiddle) ||
				(j == 0 && i !== vMiddle) || (j == board[0].length - 1 && i !== vMiddle)) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	// board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	// board[3][8].gameElement = BALL;
	// board[7][4].gameElement = BALL;
	// gCountActiveBalls = 2;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	gRandomBallInterval = setInterval(AddElement, 3000, BALL, BALL_IMG);
	console.log('strHTML is:');
	console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if (gIsWon) return;

	// If the gamer is at the passages, change the location
	if (i === -1) i = gBoard.length - 1;
	if (i === gBoard.length) i = 0;
	if (j === -1) j = gBoard[0].length - 1;
	if (j === gBoard[0].length) j = 0;

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	// debugger;
	// If the clicked Cell is one of the four allowed
	if (((iAbsDiff === 1 || iAbsDiff === gBoard.length - 1) && jAbsDiff === 0) ||
		((jAbsDiff === 1 || jAbsDiff === gBoard[0].length - 1) && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			gActiveBalls--;
			gCollectedBalls++;
			var elBallsCounter = document.querySelector('.data h4');
			elBallsCounter.innerText = 'You Have Collected ' + gCollectedBalls + ' Balls';
		}

		// MOVING
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

		if (gActiveBalls === 0) gameOver();
	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}

function gameOver() {
	var elBtn = document.querySelector('button');
	elBtn.style.display = 'block';
	clearInterval(gRandomBallInterval);
	var elBallsCounter = document.querySelector('.data h4');
	elBallsCounter.innerText += '\n And... You Won!';
	gIsWon = true;
	console.log('You Won!');
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Adding element to random cell
function AddElement(elGame, elGame_img) {
	var cell = getRandomCell();
	var i = cell.i;
	var j = cell.j;
	var targetCell = gBoard[i][j];
	targetCell.gameElement = elGame;
	renderCell({ i, j }, elGame_img);
	if (elGame === BALL) gActiveBalls++;
	if (elGame === GAMER) {
		gGamerPos.i = i;
		gGamerPos.j = j;
	}
}

// Returns location of random empty cell
function getRandomCell() {
	var i = getRandomInteger(0, gBoard.length - 1);
	var j = getRandomInteger(0, gBoard[0].length - 1);
	var targetCell = gBoard[i][j];
	while (targetCell.type !== FLOOR || targetCell.gameElement !== null) {
		i = getRandomInteger(0, gBoard.length - 1);
		j = getRandomInteger(0, gBoard.length - 1);
		targetCell = gBoard[i][j];
	}
	return { i: i, j: j };
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}