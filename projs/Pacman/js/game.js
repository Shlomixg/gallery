'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var POWER_FOOD = '&#9679;';
var CHERRY = '&#127826;';

var gBoard;
var gState;
var gCountGhosts;
var gCherryInterval;

function init() {
  gState = {
    score: 0,
    foodies: 0,
    powerFoodies: 0,
    isGameDone: false
  }
  gCountGhosts = 3;
  
  gBoard = buildBoard();
  gCherryInterval = setInterval(placeItemRandom, 15000, gBoard, CHERRY);

  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      // Placing walls
      if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
        continue;
      }
      // Placing Powerfood at corners
      if ((i === 1 && (j === 1 || j === SIZE - 2)) ||
        (i === SIZE - 2 && (j === 1 || j === SIZE - 2))) {
        board[i][j] = POWER_FOOD;
        gState.powerFoodies++;
        continue;
      }

      board[i][j] = FOOD;
      gState.foodies++;
    }
  }
  gState.foodies--;
  createPacman(board);
  createGhosts(board, gCountGhosts);
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent, row, col) {
  if (cell === opponent) {
    if (gPacman.isSuper) {
      console.log('i:', row, 'j:', col);

      for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === row && gGhosts[i].location.j === col) {
          gGhosts[i].isDead = true;
          if (opponent === PACMAN) renderCell(gGhosts[i].location, PACMAN);
          console.log('Ghost is dead');
          if (gGhosts[i].currCellContent === FOOD) eatFood();
          if (gGhosts[i].currCellContent === POWER_FOOD) eatPowerFood();
          gGhosts[i].currCellContent = EMPTY;
          break;
        }
      }
    } else {
      stopGame(false);
      console.log('Game Over!');
      return true;
    }
  }
  return false;
}

function stopGame(isWon) {
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  gState.isGameDone = true;
  if (isWon) openModal('You Won! Congrats!');
  else openModal('You Lost :( Wanna Try Again?');
}

// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
  console.log('Score updated with more', value, 'points');

}

function placeItemRandom(board, item) {
  var i = getRandomIntInclusive(0, board.length - 1);
  var j = getRandomIntInclusive(0, board[0].length - 1);
  if (board[i][j] === EMPTY) {
    board[i][j] = item;
    renderCell({i: i, j: j}, item);
  }
}

function openModal(strHeader) {
  var elModal = document.querySelector('.modal');
  elModal.classList.add('modal-open');
  var elModalHeader = document.querySelector('.modal-header h1');
  elModalHeader.textContent = strHeader;
}

function closeModal() {
  var elModal = document.querySelector('.modal');
  elModal.classList.remove('modal-open');
}