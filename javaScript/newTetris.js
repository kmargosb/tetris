// ----------- Canvas ------------

const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const row = 20;
const colums = 10;
const grid = createGrid();
const player = {
  position: { x: 4, y: -1 },
  tetramino: null,
};
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

ctx.scale(30, 30);
playerReset();

setInterval(function () {
  moveDown();
  draw();
}, 1000);
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
  };
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
  player.tetramino = createPiece(piezas.charAt(nro));
  player.position.x = 4;
  player.position.y = -1;
}
function drawTetramino(tetramino, offset) {
  tetramino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(x + offset.x, y + offset.y, 0.95, 0.95);
      }
    });
  });
}
const draw = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 10, 20);
  drawTetramino(grid, { x: 0, y: 0 });
  drawTetramino(player.tetramino, player.position);
};
function moveDown() {
  player.position.y += 1;
  if (colision(grid, player)) {
    player.position.y -= 1;
    newTetramino(grid, player);
    playerReset();
  }
  draw();
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
