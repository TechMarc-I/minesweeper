let numRows = 10;
let numColumns = 10;
let boardContainer = document.querySelector("#board");
let cellCount = numRows*numColumns;

let bombIndex = [];

//Function to generate Mine locations
const generateMines = function() {
  //Variable for starting number of mines
  let mines = 10;
  //Variable for starting cell
  let cellIndex = 0;

  //Loop until mines remaining = 0
  while (mines !== 0) {

    //Create a random number from 1-10
    let random = Math.round(Math.random()*10);
    cellIndex += 1;

    let currentCell = document.getElementById(cellIndex);
    
    //If random number = 5 and no bomb exists in that cell, place bomb in that cell
    if (random === 5 && currentCell.textContent !== "bomb") {
      currentCell.textContent = "bomb"
      mines -= 1;
    };

    //If currentCell now contains a bomb, push cellID to bomb index
    if (currentCell.textContent === "bomb") {
      bombIndex.push(currentCell);
    }

    //If bombs still remain when the all cells have run through, run through all cells again until no bombs left
    if (cellIndex == 100 && bombs !== 0) {
      cellIndex = 0;
    };
    
  }

  //Display bombIndex in console.
  console.log(bombIndex);
  
}

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
