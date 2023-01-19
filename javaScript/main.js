const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const tetraminos = [
  [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
];
const colors = [
  "#000",
  "#00ffff",
  "#ffff00",
  "#ff00ff",
  "#00ff00",
  "#ff0000",
  "#0000ff",
  "#ffa500",
];

let tetramino = null;
const row = 20;
const colums = 10;
ctx.scale(20, 20);
let grid = getGrid();

setInterval(newGame, 1000);

function getRandomnumber() {
  let nro = Math.floor(Math.random() * 7);
  // console.log(tetrominos[nro]);
  let piezas = tetraminos[nro];
  let colorPiezas = nro + 1;
  let x = 4;
  let y = -1;
  return { piezas, x, y, colorPiezas };
}
function newGame() {
  if (tetramino == null) {
    tetramino = getRandomnumber();
    renderTetramino();
  }
  caida();
}
function renderTetramino() {
  let pieza = tetramino.piezas;
  for (let i = 0; i < pieza.length; i++) {
    for (let j = 0; j < pieza[i].length; j++) {
      if (pieza[i][j] == 1) {
        ctx.fillStyle = colors[tetramino.colorPiezas];
        ctx.fillRect(tetramino.x + j, tetramino.y + i, 1, 1);
        console.log(tetramino.x + j, tetramino.y + i, 1, 1);
        console.log("esto es j=" +" " + j)
        console.log("esto es i=" + " " + i)
        console.log(tetramino.y + j)
      }
    }
  }
}
function getGrid() {
  let grid = [];
  for (let i = 0; i < row; i++) {
    grid.push([]);
    for (let j = 0; j < colums; j++) {
      grid[i].push(0);
    }
  }
  console.log(grid);
  return grid;
}
function renderGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ctx.fillStyle = colors[grid[i][j]];
      ctx.fillRect(j, i, 1, 1);
    }
  }
  renderTetramino();
}
function caida() {
  if (!colision(tetramino.x, tetramino.y + 1))
   tetramino.y += 1;
  renderGrid();
}
function moveLeft() {
  if (!colision(tetramino.x - 1, tetramino.y))
   tetramino.x -= 1;
  renderGrid();
}
function moveRight() {
  if (!colision(tetramino.x + 1, tetramino.y))
   tetramino.x += 1;
  renderGrid();
}
function colision(x, y) {
  let piece = tetramino.piezas;
  for (i = 0; i < piece.length; i++) {
    for (j = 0; j < piece[i].length; j++) {
      if (piece[i][j] == 1) {
        let c = x + j;
        let r = y + i;
        if (c >= 0 && c < colums && r >= 0 && r < row) {
        } else {
          return true;
        }
      }
    }
  }
  return false;
}
document.addEventListener("keydown", function (e) {
  // console.log(e);
  let key = e.code;
  if (key == "ArrowLeft") {
    moveLeft();
  } else if (key == "ArrowRight") {
    moveRight();
  } else if (key == "ArrowDown") {
    caida();
  } else if (key == "ArrowUp") {
    rotacion();
  }
});
