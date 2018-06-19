var GHOST  = 'ᗩ'; //'&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var ghost = {
        color: getRandomColor(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        isDead: false
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = `<span style="color: ${ghost.color}";>${GHOST}</span>`;
}

function createGhosts(board, countGhosts) {
  gGhosts = [];
  for (var i = 0; i < countGhosts; i++) {
      createGhost(board);
  }
  
  gIntervalGhosts = setInterval(function moveGhosts(){
    
    gGhosts.forEach(function moveGhost(ghost) {

        if (ghost.isDead) return;

        var nextLocation = {
            i: ghost.location.i + getRandomIntInclusive(-1, 1),
            j: ghost.location.j + getRandomIntInclusive(-1, 1)
        }
        
        if (board[nextLocation.i][nextLocation.j] === WALL) return;
        if (board[nextLocation.i][nextLocation.j] === GHOST) return;
        
        // set back what we stepped on
        board[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);
        
        // move the ghost
        ghost.location = nextLocation;
        var isGameOver = checkEngage(board[nextLocation.i][nextLocation.j], PACMAN, nextLocation.i, nextLocation.j);
        
        if (!ghost.isDead) {
            // keep the contnet of the cell we are going to
            ghost.currCellContent = board[ghost.location.i][ghost.location.j];
            board[ghost.location.i][ghost.location.j] = GHOST;
            // move the ghost model and update dom
            renderCell(ghost.location, getGhostHTML(ghost));
        }
     });
  }, 1000);
}

function getGhostHTML(ghost) {
    var ghostColor = (gPacman.isSuper) ? '#0a0add;' : ghost.color;
    // var ghostColor = ghost.color;
    return `<span style="color: ${ghostColor}";>${GHOST}</span>`;
}