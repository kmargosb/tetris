const tetrominos = [
    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]
    ],
    [
      [0,0,1],
      [0,0,1],
      [0,1,1],
    ],
    [
      [1,0,0],
      [1,0,0],
      [1,1,0],
    ],
    [
      [1,1],
      [1,1],
    ],
    [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    [
      [1,1,1],
      [0,1,0],
      [0,0,0],
    ]
];

  const colors = [
    '#00ffff',
    '#ffff00',
    '#ff00ff',
    '#00ff00',
    '#ff0000',
    '#0000ff',
    '#ffa500'
  ];

const row = 20;
const colums = 10;

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext("2d");

ctx.scale(20,20);

function getRandomnumber(){
    let nro = Math.floor(Math.random()*7);
    // console.log(tetrominos[nro]);
    let piezas = tetrominos[nro];
    let colorPiezas = nro;
    let x = 4;
    let y = 0;
    return {piezas, x, y, colorPiezas}

}

let tetramino = getRandomnumber();
console.log(tetramino);

function renderTetramino(){
    let pieza = tetramino.piezas;
    for(let i = 0; i < pieza.length; i++){
        for(let j = 0; j < pieza[i].length; j++){
            if(pieza[i][j] == 1){
                ctx.fillStyle = colors[tetramino.colorPiezas];
                ctx.fillRect(tetramino.x+j,tetramino.y+i,1,1);
            }
        }
    }
}
renderTetramino();

