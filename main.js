let numRows = 10;
let numColumns = 10;
let boardContainer = document.querySelector("#board");
let cellCount = numRows*numColumns;
//Variable for starting number of mines
let mines = 10;
//Variable for flags
let flags = mines

let bombIndex = [];

let checkedCells = [];//so we can't click on a cell twice

const checkWin = function(a)
{
  let checkCell = 0;
  while(checkCell < cellCount)
  {
    checkCell++;
    if (!(checkedCells.includes(checkCell)))//if we haven't checked the cell yet
    {
      if (!(bombIndex.includes(checkCell)))//AND is not a mine
      {
        return false;//we didn't win yet, there are still unchecked cells that are not mines
      }
    }
  }
  return true;//we looked through everything, all cells either exist in checked cells or is a mine
}

//Function to generate Mine locations
const generateMines = function() {

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
      bombIndex.push(parseInt(currentCell.id,10));
    }

    //If bombs still remain when the all cells have run through, run through all cells again until no bombs left
    if (cellIndex == 100 && mines !== 0) {
      cellIndex = 0;
    };
  }

  //Display bombIndex in console.
  console.log(bombIndex);

}

//checked in clicked function
const isAMine = function(a)
{
  for (i = 0; i < bombIndex.length; i++)//iterates through bomb index
  {
    if (a == bombIndex[i])//if exists in bomb index
    {
      return true;
    }
  }
  return false;
}

//Function to Create Grid


const revealOtherMines = function()//happens when you accidently click a mine
{
  for (i = 0; i < bombIndex.length; i++)//iterates through bomb bombIndex
  {
    document.getElementById(bombIndex[i]).style.backgroundColor = 'red';//turns all mines red
  }
}

const clicked = function(cellNumber)//cell a was clicked!
{
  let a = parseInt(cellNumber,10);
  let cell = document.getElementById(a);
  var isAtEdgeTop = false;
  var isAtEdgeRight = false;
  var isAtEdgeBottom = false;
  var isAtEdgeLeft = false;
  var numNearMines = 0;
  //console.log("checking " + a);


  if(checkedCells.includes(a))//did we check that cell aready?
  {
    //console.log("This cell was already checked");
    return;//we will be stuck in an infinite loop if we don't do this
  }
  else
  {
    //console.log("This is the first time we clicked this cell");
    checkedCells.push(a);//make sure we don't check this cell again
    cell.style.backgroundColor = 'green';//turn the cell green for now
  }

  if (isAMine(a))
  {
    //get blasted into the next dimension
    cell.style.backgroundColor = 'red';
    console.log("get blasted into the next dimension");
    revealOtherMines();
    return;
  }

  if (a <= numColumns)//if a is less that numColumns(default is 10)
  {
    isAtEdgeTop = true;//then we are in the top row
    //console.log(a + "is on top");
  }

  if (a % numColumns == 0)//remainder of a divided by number of columns equals 0 when on right edge
  {
    isAtEdgeRight = true;
    //console.log(a + "is on right");
    //console.log("variable is" + isAtRightEdge);
  }

  if (a > (cellCount-numColumns))//calculates last possible cell not in the last row, if a is greater than this, then it's in the last row
  {
    isAtEdgeBottom = true;
    //console.log(a + "is on bottom");
  }

  if (a % numColumns == 1)// remainder of cell id divided by number of columns equals 1 when on left edge
  {
    isAtEdgeLeft = true;
    //console.log(a + "is on left");
  }

  //now that we have an idea of where the cell is, we can check surrounding cells

  if (!isAtEdgeTop)//we can't check the cell above us if we are already in the top row lol
  {
    //console.log("hey");
    if (isAMine(a-numColumns))//up one cell
    {
      //console.log("we did a thing");
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeTop && !isAtEdgeRight)
  {
    if (isAMine(a-numColumns+1))//cell up one and right one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeRight)
  {
    if (isAMine(a+1))//cell right one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeRight && !isAtEdgeBottom)
  {
    if (isAMine(a+numColumns+1))//cell right one and down one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeBottom)
  {
    if (isAMine(a+numColumns))//cell down one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeLeft && !isAtEdgeBottom)
  {
    if (isAMine(a+numColumns-1))//cell left one and down one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeLeft)
  {
    if (isAMine(a-1))//cell left one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (!isAtEdgeTop && !isAtEdgeLeft)
  {
    if (isAMine(a-numColumns-1))//cell up one and left one
    {
      numNearMines++;//if that cell contains a mine, remember that
    }
  }

  if (checkWin(a))//see if we won
  {
    for (i = 0; i < bombIndex.length; i++)//iterates through bomb bombIndex
    {
      document.getElementById(bombIndex[i]).style.backgroundColor = 'blue';//turns all mines blue
    }
  }

  //now we've determined two things, the current cell is NOT a mine, and we found the number mines touching this one

  cell.textContent = numNearMines;

  //console.log(numNearMines);

  if (numNearMines > 0)
  {
    //show the number of mines close to this cell
  }
  else if (numNearMines == 0)//if each if the surrounding eight cells don't contain a mine, then they're safe to click on right? Lets save some time for the user and click those cell for them, losing almost no time!
  {
    //console.log("gonna look at other stuff now");
    //call this function recursivly for each of the 8 surrounding mines
    if (!isAtEdgeTop)
    {
      //console.log(a + " is checking pos 1 now");
      clicked(a-numColumns);
    }

    if (!isAtEdgeTop && !isAtEdgeRight)
    {

      //console.log(a + " is checking pos 2 now");
      clicked((a-numColumns)+1);
    }

    if (!isAtEdgeRight)
    {

      //console.log(a + " is checking pos 3 now");
      clicked(a+1);
    }


    if (!isAtEdgeRight && !isAtEdgeBottom)
    {

      //console.log(a + " is checking pos 4 now");
      clicked(a+numColumns+1);
    }


    if (!isAtEdgeBottom)
    {

      //console.log(a + " is checking pos 5 now");
      clicked(a+numColumns);
    }


    if (!isAtEdgeLeft && !isAtEdgeBottom)
    {

      //console.log(a + " is checking pos 6 now");
      clicked(a+numColumns-1);
    }


    if (!isAtEdgeLeft)
    {

      //console.log(a + " is checking pos 7 now");
      clicked(a-1);
    }

    if (!isAtEdgeTop && !isAtEdgeLeft)
    {

      //console.log(a + " is checking pos 8 now");
      clicked(a-numColumns-1);
    }
  }

}
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

  cellId = 0;
  while (cellId < cellCount)
  {
    cellId++;
    let theCell = document.getElementById(cellId);
    theCell.addEventListener("click",function() {clicked(theCell.id)});
  }

  generateMines();
}


generateGrid();
