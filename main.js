let numRows = 10;
let numColumns = 10;
let boardContainer = document.querySelector("#board");
let cellCount = numRows*numColumns;

const generateGrid = function(){
  let cellId = 0;

  while (cellId < cellCount)
  {
    cellId++;
    let cell = document.createElement('div');
    cell.className = "cell";
    cell.id = "cell-" + cellId;

    board.appendChild(cell);
  }
}
generateGrid();
