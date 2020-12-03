let numRows = 10;
let numColumns = 10;
let boardContainer = document.querySelector("#board");
let cellCount = numRows*numColumns;

//Function to Create Grid
const generateGrid = function(){
  let cellId = 0;

  while (cellId < cellCount)
  {
    cellId += 1;
    let cell = document.createElement('div');
    cell.className = "cell";
    cell.id = cellId;//id of cell

    board.appendChild(cell);
  }
}

generateGrid();
