// ---------------Variables DOM--------------
const $gameOver = document.querySelector(".go-py1");
const $score = document.getElementsByClassName("score");

//---------------Canvas ----------------
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
ctx.scale(30, 30);

let tetramino = null;
const row = 20;
const colums = 10;
let grid = getGrid();

// ---------- Piezas y colores -----------
const tetraminos = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
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

//--------- Movimiento en caida -----------
setInterval(newGame, 1000);

//----------Funciones --------------

function newGame() {
  score();
  if (tetramino == null) {
    tetramino = getRandomnumber();
    renderTetramino();
  }
  caida();
}
function score() {
  for (let i = 0; i < grid.length; i++) {
      let tetris = true;
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 0) {
        tetris = false;
      }
    }
    if(tetris){
      grid.splice(i,1);
      grid.unshift(0,0,0,0,0,0,0,0,0,0);
    }  
  }
}


function getRandomnumber() {
  let nro = Math.floor(Math.random() * 7);
  // console.log(tetrominos[nro]);
  let piezas = tetraminos[nro];
  let colorPiezas = nro + 1;
  let x = 4;
  let y = -1;
  return { piezas, x, y, colorPiezas };
}
function renderTetramino() {
  let pieza = tetramino.piezas;
  for (let i = 0; i < pieza.length; i++) {
    for (let j = 0; j < pieza[i].length; j++) {
      if (pieza[i][j] == 1) {
        ctx.fillStyle = colors[tetramino.colorPiezas];
        ctx.fillRect(tetramino.x + j, tetramino.y + i, 0.95, 0.95);
        // console.log(tetramino.x + j, tetramino.y + i, 1, 1);
        // console.log("esto es j=" +" " + j)
        // console.log("esto es i=" + " " + i)
        // console.log(tetramino.y + j)
        // console.log(tetramino.x)
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
  return grid;
}
function renderGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ctx.fillStyle = colors[grid[i][j]];
      ctx.fillRect(j, i, 0.95, 0.95);
    }
  }
  renderTetramino();
}
function caida() {
  if (!colision(tetramino.x, tetramino.y + 1)) {
    tetramino.y += 1;
  } else {
    for (let i = 0; i < tetramino.piezas.length; i++) {
      for (let j = 0; j < tetramino.piezas[i].length; j++) {
        if (tetramino.piezas[i][j] == 1) {
          let c = tetramino.x + j;
          let r = tetramino.y + i;
          grid[r][c] = tetramino.colorPiezas;
        }
      }
    }
    if (tetramino.y < 1) {
      $gameOver.style.cssText = "display: flex;";
    }
    tetramino = null;
  }
  renderGrid();
}
function moveLeft() {
  if (!colision(tetramino.x - 1, tetramino.y)) tetramino.x -= 1;
  renderGrid();
}
function moveRight() {
  if (!colision(tetramino.x + 1, tetramino.y)) tetramino.x += 1;
  renderGrid();
}
function rotacion() {
  let rotate = [];
  let pieza = tetramino.piezas;

  for (let i = 0; i < pieza.length; i++) {
    rotate.push([]);
    for (let j = 0; j < pieza[i].length; j++) {
      rotate[i].push(0);
      rotate[i][j] = pieza[j][i];
    }
  }
  for (let i = 0; i < rotate.length; i++) {
    rotate[i] = rotate[i].reverse();
  }
  if (!colision(tetramino.x, tetramino.y, rotate)) {
    tetramino.piezas = rotate;
  }
  renderGrid();
}
function colision(x, y, rotate) {
  let piece = rotate || tetramino.piezas;
  for (i = 0; i < piece.length; i++) {
    for (j = 0; j < piece[i].length; j++) {
      if (piece[i][j] == 1) {
        let c = x + j;
        let r = y + i;
        if (c >= 0 && c < colums && r >= 0 && r < row) {
          if (grid[r][c] > 0) {
            return true;
          }
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
