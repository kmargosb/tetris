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
  return {piezas, x, y, colorPiezas};
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
        // console.log(pieza[i].length);
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
      ctx.fillRect(j, i, 1, 1);
    }
  }
  renderTetramino();
}
function caida() {
  tetramino.y += 1;
  renderGrid();
}
function moveLeft(){
  tetramino.x-=1;
  renderGrid();
}
function moveRight(){
  tetramino.x+=1;
  renderGrid();
}
function colision(){
  let piece = tetramino.pieza;
  for(i=0; i<piece.length; i++){
    for(j=0; j<piece[i].length; j++){
    }
  }
}
document.addEventListener("keydown",function(e){
  // console.log(e);
  let key = e.code;
  if(key == "ArrowLeft"){
    moveLeft();
  } else if (key == "ArrowRight"){
    moveRight();
  }else if (key == "ArrowDown"){
    caida();
  }else if (key =="ArrowUp"){
    rotacion();
  }
});
