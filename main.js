let numRows = 10;
let numColumns = 10;
let boardContainer = document.querySelector("#board");
let cellCount = numRows*numColumns;

let bombIndex = [];
let checkedCells = [];

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
      bombIndex.push(currentCell.id);
    }

    //If bombs still remain when the all cells have run through, run through all cells again until no bombs left
    if (cellIndex == 100 && mines !== 0) {
      cellIndex = 0;
    };

  }

  //Display bombIndex in console.
  console.log(bombIndex);

}

const isAMine = function(a)
{
  for (i = 0; i < bombIndex.length; i++)
  {
    if (a == bombIndex[i])
    {
      return true;
    }
  }
  return false;
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
  generateMines();
}

const clicked = function(a)//cell a was clicked!
{
  //let id = a;
  //let cell = document.querySelector("" + id);
  let isAtEdgeTop = false;
  let isAtEdgeRigth = false;
  let isAtEdgeBottom = false;
  let isAtEdgeLeft = false;
  let numNearMines = 0;

  if(checkedCells.includes(a))//did we check that cell aready?
  {
    console.log("Goof, you already clicked that");
    return;
  }
  else {
    console.log("first time");
    checkedCells.push(a);
  }

  if (isAMine(a))
  {
    //get blasted into the next dimension
    console.log("get blasted into the next dimension");
  }

  if (a <= numColumns)//if we are in the top row
  {
    isAtEdgeTop = true;
    console.log("were on top");
  }

  if (a % numColumns == 0)// remainder of cell id divided by number of columns equals 0 when on right edge
  {
    isAtRightEdge = true;
    console.log("were on right");
  }

  if (a > (cellCount-numColumns))//right side calculates last possible cell not in the last row, if our cell comes after, then it's in the last row
  {
    isAtEdgeBottom = true;
    console.log("were on bottom");
  }

  if (a % numColumns == 1)// remainder of cell id divided by number of columns equals 1 when on left edge
  {
    isAtEdgeLeft = true;
    console.log("were on left");
  }

  //now that we have an idea of where the cell is, we can check surrounding cells

  if (!isAtEdgeTop)
  {
    console.log("hey");
    //check the cell directly above cell a, only if we are not on the top row
    if (isAMine(a-numColumns))
    {
      console.log("we did a thing");
      numNearMines++;
    }
  }

  if (!isAtEdgeTop && !isAtEdgeRigth)
  {
    if (isAMine(a-numColumns+1))//cell up one and right one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeRigth)
  {
    if (isAMine(a+1))//cell right one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeRigth && !isAtEdgeBottom)
  {
    if (isAMine(a+numColumns+1))//cell right one and down one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeBottom)
  {
    if (isAMine(a+numColumns))//cell down one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeLeft && !isAtEdgeBottom)
  {
    if (isAMine(a+numColumns-1))//cell left one and down one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeLeft)
  {
    if (isAMine(a-1))//cell left one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeTop && !isAtEdgeLeft)
  {
    if (isAMine(a-numColumns-1))//cell up one and left one
    {
      numNearMines++;
    }
  }

  //now we've determined two things, the current cell is NOT a mine, and we found the number mines touching this one

  console.log(numNearMines);
  if (numNearMines > 0)
  {
    //show the number of mines close to this cell
  }
  else if (false) //I've disabled this for now
  {
    //call this function recursivly for each of the 8 surrounding mines
    if (!isAtEdgeTop)
    {

      clicked(a-numColumns);

    }

    if (!isAtEdgeTop && !isAtEdgeRigth)
    {
      clicked(a-numColumns+1);
    }

    if (!isAtEdgeRigth)
    {
      clicked(a+1);
    }

    if (!isAtEdgeRigth && !isAtEdgeBottom)
    {
      clicked(a+numColumns+1);
    }

    if (!isAtEdgeBottom)
    {
      clicked(a+numColumns);
    }

    if (!isAtEdgeLeft && !isAtEdgeBottom)
    {
      clicked(a+numColumns-1);
    }

    if (!isAtEdgeLeft)
    {
      clicked(a-1);
    }

    if (!isAtEdgeTop && !isAtEdgeLeft)
    {
      clicked(a-numColumns-1);
    }
  }

}


generateGrid();
