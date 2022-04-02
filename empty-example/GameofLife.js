function make2DArray ( cols, rows){
  let arr = new Array(cols);
  for ( let i=0; i < arr.length; i++){
    arr[i] = new Array (rows);
  }
  return arr;
}
//we defined a 2D array for grid

let grid;
let cols ;
let rows ;
let resolution = 10;

function setup () {
  createCanvas(600,500);
  cols = width / resolution;
  rows = height / resolution;
  
  grid = make2DArray(cols, rows);
  for ( let i = 0; i < cols; i++) {
    for ( let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
      //It returns only random(2) values in the grid, 0 and 1 below change these 2 values to black and white
    }
  }
}

function draw () {
  background(0);
  for ( let i = 0; i < cols; i++) {
    for ( let j = 0; j < rows; j++) {
      
      let x = i*resolution;
      let y = j*resolution;
      
      if(grid[i][j] == 1){  //code that says random for the grid above 
       // if the inside of squares is 1, we fill it with black color
        fill(255);
        stroke(0);  //for rect in line colors 
        rect(x, y, resolution-1, resolution-1); // if it is resolution-1 the thickness of the lines changes.
      }
    }
  }
  
  let next = make2DArray(cols, rows);
  
  //compute next based on grid
  for ( let i = 0; i < cols; i++) {
    for ( let j = 0; j < rows; j++) {      
        let state = grid [i][j];
        //count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
        
        if (state == 0 && neighbors == 3){
          next [i][j] = 1;
        } else if ( state == 1 && (neighbors < 2 || neighbors > 3 )) {
          next [i][j] = 0;
        } else {
          next [i][j] = state;
        }
      
    }
  }
  grid = next;
}
          
  function countNeighbors (grid, x, y) {
    let sum = 0;
    for (let i = -1; i<2; i++){
      for (let j = -1; j<2; j++){
        
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;        
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;    
  }
