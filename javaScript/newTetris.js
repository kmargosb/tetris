// ----------Audio ---------------
const $gameOverAudio = new Audio("audio/gameover2.wav");
const $pieceOff = new Audio("audio/pieza_caida.wav");
const $troika = new Audio("audio/troika.mp3");
const $lineOff = new Audio("audio/line_off.wav");
const $levelUp = new Audio("audio/level_up.mp3");

// ----------mobile----------
const $rotatePiecer = document.querySelector('.rotate-piecer');
const $rotatePiecel = document.querySelector('.rotate-piecel');
const $moveLeft = document.querySelector('.move-left');
const $moveRight = document.querySelector('.move-right');
const $moveDownl = document.querySelector('.move-downl');
const $moveDownr = document.querySelector('.move-downr');




// ----------- Canvas ------------

const canvas = document.getElementById("tetris");
const canvasNext = document.getElementById("nextPiece");
const ctxN = canvasNext.getContext("2d");
const ctx = canvas.getContext("2d");
const row = 20;
const colums = 10;
const rowN = 6;
const columsN = 5;
ctx.scale(30, 30);
ctxN.scale(30, 33.33);
const grid = createGrid();
const player = {
  position: { x: 0, y: 0 },
  tetramino: null,
  next: null,
  score: 0,
  level: 1,
  lines: 0,
};
const $gameOver = document.querySelector(".go-py1");
const colors = [
  null,
  "#00ffff",
  "#ffff00",
  "#ff00ff",
  "#00ff00",
  "#ff0000",
  "#0000ff",
  "#ffa500",
];
function createPiece(tipo) {
  if (tipo === "I") {
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  } else if (tipo === "J") {
    return [
      [2, 2, 2],
      [0, 0, 2],
      [0, 0, 0],
    ];
  } else if (tipo === "L") {
    return [
      [3, 3, 3],
      [3, 0, 0],
      [0, 0, 0],
    ];
  } else if (tipo === "O") {
    return [
      [4, 4],
      [4, 4],
    ];
  } else if (tipo === "S") {
    return [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ];
  } else if (tipo === "Z") {
    return [
      [6, 6, 0],
      [0, 6, 6],
      [0, 0, 0],
    ];
  } else if (tipo === "T") {
    return [
      [7, 7, 7],
      [0, 7, 0],
      [0, 0, 0],
    ];
  }
}

$troika.play();

updateData();
playerReset();

function createGrid() {
  const grid = [];
  for (let x = 0; x < row; x++) {
    grid.push([]);
    for (let y = 0; y < colums; y++) {
      grid[x].push(0);
    }
  }
  return grid;
}
const draw = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 10, 20);
  drawMatriz(grid, { x: 0, y: 0 });
  drawMatriz(player.tetramino, player.position);
  drawMatrizNext(player.next, { x: 1, y: 1 });
};
let time = setInterval(function () {
  moveDown();
  draw();
}, 1000);
function eraseRow() {
  let rowCount = 1;

  bucle: for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // console.table(grid[y][x]);
      if (grid[y][x] === 0) {
        continue bucle;
      }
    }
    const row = grid.splice(y, 1)[0].fill(0);
    grid.unshift(row);
    $lineOff.play();

    player.score += rowCount * 10;
    player.lines++;
    rowCount *= 2;

    if (player.lines % 10 == 0) {
      player.level++;
      $levelUp.play();
      $troika.play();
      clearInterval(time);
      setInterval(function () {
        moveDown();
        draw();
      }, 1000 - 100);
    }
  }
  $pieceOff.play();
}
function colision(grid, player) {
  let matriz = player.tetramino;
  let pos = player.position;

  for (let y = 0; y < matriz.length; y++) {
    for (let x = 0; x < matriz[y].length; x++) {
      if (
        matriz[y][x] !== 0 &&
        (grid[y + pos.y] && grid[y + pos.y][x + pos.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}
function newTetramino(grid, player) {
  player.tetramino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        grid[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}
function playerReset() {
  let nro = Math.floor(Math.random() * 7);
  let piezas = "ILJOSZT";

  if (player.next === null) {
    player.tetramino = createPiece(piezas.charAt(nro));
  } else {
    player.tetramino = player.next;
  }
  player.next = createPiece(piezas.charAt(nro));

  player.position.x = 4;
  player.position.y = 0;

  if (colision(grid, player)) {
    $gameOver.style.cssText = "display: flex";
    $gameOverAudio.play();
  }
}
function drawMatriz(matriz, offset) {
  matriz.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x + offset.x, y + offset.y, 0.95, 0.95);
      }
    });
  });
}
function drawMatrizNext(matriz, offset) {
  ctxN.fillStyle = "#000";
  ctxN.fillRect(0, 0, columsN, rowN);

  matriz.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctxN.fillStyle = colors[value];
        ctxN.fillRect(x + offset.x, y + offset.y, 0.95, 0.95);
      }
    });
  });
}
function rotacion() {
  const pos = player.position.x;
  let offset = 1;
  playerRotate(player.tetramino);
  while (colision(grid, player)) {
    player.position.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.tetramino[0].length) {
      rotacion(player.tetramino);
      player.position.x = pos;
      return;
    }
  }
}
function playerRotate(tetramino) {
  for (let y = 0; y < tetramino.length; y++) {
    for (let x = 0; x < y; x++) {
      [tetramino[x][y], tetramino[y][x]] = [tetramino[y][x], tetramino[x][y]];
    }
  }
  tetramino.forEach((row) => row.reverse());
  draw();
}
function moveDown() {
  player.position.y += 1;
  if (colision(grid, player)) {
    player.position.y -= 1;
    newTetramino(grid, player);
    playerReset();
    eraseRow();
    updateData();
  }
  draw();
}
function updateData() {
  document.querySelector(".spy").innerHTML = player.score;
  document.querySelector(".lvl").innerHTML = player.level;
  document.querySelector(".ln").innerHTML = player.lines;
}
function moveLeft() {
  player.position.x -= 1;
  if (colision(grid, player)) {
    player.position.x += 1;
  }
  draw();
}
function moveRight() {
  player.position.x += 1;
  if (colision(grid, player)) {
    player.position.x -= 1;
  }
  draw();
}
document.addEventListener("keydown", function (e) {
  // console.log(e);
  let key = e.code;
  if (key == "ArrowLeft") {
    moveLeft();
  } else if (key == "ArrowRight") {
    moveRight();
  } else if (key == "ArrowDown") {
    moveDown();
  } else if (key == "ArrowUp") {
    rotacion();
  }
});
$moveLeft.addEventListener('click', function(){
  moveLeft();
});
$moveRight.addEventListener('click', function(){
  moveRight();
});
$rotatePiecel.addEventListener('click', function(){
  rotacion();
});
$moveDownl.addEventListener('touchstart', function(){  
  moveDown();
});
$rotatePiecer.addEventListener('click', function(){
  rotacion();
});
$moveDownr.addEventListener('click', function(){
  moveDown();
});
