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

const blerg = function()
{

}

const revealOtherMines = function()
{
  for (i = 0; i < bombIndex.length; i++)
  {
    document.getElementById(bombIndex[i]).style.backgroundColor = 'red';
  }
}

const clicked = function(a)//cell a was clicked!
{
  //let id = a;
  let cell = document.getElementById(a);
  var isAtEdgeTop = false;
  var isAtEdgeRight = false;
  var isAtEdgeBottom = false;
  var isAtEdgeLeft = false;
  var numNearMines = 0;
  console.log("checking " + a);


  if(checkedCells.includes(a))//did we check that cell aready?
  {
    console.log("This cell was already checked");
    return;
  }
  else
  {
    console.log("This is the first time we clicked this cell");
    checkedCells.push(a);
    cell.style.backgroundColor = 'green';
  }

  if (isAMine(a))
  {
    //get blasted into the next dimension
    cell.style.backgroundColor = 'red';
    console.log("get blasted into the next dimension");
    revealOtherMines();
    return;

  }

  if (a <= numColumns)//if we are in the top row
  {
    isAtEdgeTop = true;
    console.log(a + "is on top");
  }

  if (a % numColumns == 0)// remainder of cell id divided by number of columns equals 0 when on right edge
  {
    isAtEdgeRight = true;
    console.log(a + "is on right");
    //console.log("variable is" + isAtRightEdge);
  }

  if (a > (cellCount-numColumns))//right side calculates last possible cell not in the last row, if our cell comes after, then it's in the last row
  {
    isAtEdgeBottom = true;
    console.log(a + "is on bottom");
  }

  if (a % numColumns == 1)// remainder of cell id divided by number of columns equals 1 when on left edge
  {
    isAtEdgeLeft = true;
    console.log(a + "is on left");
  }

  //now that we have an idea of where the cell is, we can check surrounding cells

  if (!isAtEdgeTop)
  {
    //console.log("hey");
    //check the cell directly above cell a, only if we are not on the top row
    if (isAMine(a-numColumns))
    {
      //console.log("we did a thing");
      numNearMines++;
    }
  }

  if (!isAtEdgeTop && !isAtEdgeRight)
  {
    if (isAMine(a-numColumns+1))//cell up one and right one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeRight)
  {
    if (isAMine(a+1))//cell right one
    {
      numNearMines++;
    }
  }

  if (!isAtEdgeRight && !isAtEdgeBottom)
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

  cell.textContent = numNearMines;
  console.log(numNearMines);
  if (numNearMines > 0)
  {
    //show the number of mines close to this cell
  }
  else if (numNearMines == 0) //I've disabled this for now
  {
    console.log("gonna look at other stuff now");
    //call this function recursivly for each of the 8 surrounding mines
    if (!isAtEdgeTop)
    {
      console.log(a + " is checking pos 1 now");
      clicked(a-numColumns);
    }

    if (!isAtEdgeTop && !isAtEdgeRight)
    {

      console.log(a + " is checking pos 2 now");
      clicked((a-numColumns)+1);
    }

    if (!isAtEdgeRight)
    {

      console.log(a + " is checking pos 3 now");
      clicked(a+1);
    }


    if (!isAtEdgeRight && !isAtEdgeBottom)
    {

      console.log(a + " is checking pos 4 now");
      clicked(a+numColumns+1);
    }


    if (!isAtEdgeBottom)
    {

      console.log(a + " is checking pos 5 now");
      clicked(a+numColumns);
    }


    if (!isAtEdgeLeft && !isAtEdgeBottom)
    {

      console.log(a + " is checking pos 6 now");
      clicked(a+numColumns-1);
    }


    if (!isAtEdgeLeft)
    {

      console.log(a + " is checking pos 7 now");
      clicked(a-1);
    }

    if (!isAtEdgeTop && !isAtEdgeLeft)
    {

      console.log(a + " is checking pos 8 now");
      clicked(a-numColumns-1);
    }
  }

}


generateGrid();
