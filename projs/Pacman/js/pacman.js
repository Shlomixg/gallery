var gPacman;
var PACMAN = ` 
<div class="pacman">
  <div class="pacman-top"></div>
  <div class="pacman-bottom"></div>
</div>`;

var gSuperTimeout;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {

    case 'ArrowUp':
      var direction = 'up';
      nextLocation.i--;
      break;
    case 'ArrowDown':
      var direction = 'down';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      var direction = 'left';
      nextLocation.j--;
      break;
    case 'ArrowRight':
      var direction = 'right';
      nextLocation.j++;
      break;

  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;
  else if (nextCell === FOOD) eatFood();
  else if (nextCell === POWER_FOOD) eatPowerFood();
  else if (nextCell === CHERRY) updateScore(20);

  // Check if the player won
  if (gState.foodies === 0 && gState.powerFoodies === 0) stopGame(true);

  var isGameOver = checkEngage(nextCell, GHOST, nextLocation.i, nextLocation.j);
  if (isGameOver) return;

  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  var pac = document.querySelector('.pacman');
  pac.classList.add(direction);
}

function eatFood() {
  updateScore(1);
  gState.foodies--;
}

function eatPowerFood() {
  updateScore(15);
  gState.powerFoodies--;
  // TODO: if it's already super
  if (gPacman.isSuper) {
    clearTimeout(gSuperTimeout);
  } else {
    gPacman.isSuper = true;
    gGhosts.forEach(function paintGhost(ghost) {
      if (!ghost.isDead) renderCell(ghost.location, getGhostHTML(ghost));
    });
  }

  gSuperTimeout = setTimeout(function unsetSuper() {
    gPacman.isSuper = false;
    gGhosts.forEach(function ghostResuscitation(ghost) {
      ghost.isDead = false;
      renderCell(ghost.location, getGhostHTML(ghost));
    });
  }, 5000);
}