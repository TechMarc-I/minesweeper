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

const clicked = function(a)//cell a was clicked!
{
  let isAtEdgeTop = false;
  let isAtEdgeRigth = false;
  let isAtEdgeBottom = false;
  let isAtEdgeLeft = false;
  let numNearMines = 0;

  if (isABomb(a))
  {
    //get blasted into the next dimension
  }

  if (a <= numCulumn)//if we are in the top row
  {
    isAtEdgeTop = true;
  }

  if (a % numColumns == 0)// remainder of cell id divided by number of columns equals 0 when on right edge
  {
    isAtRightEdge = true;
  }

  if (a > (cellCount-numColumns))//right side calculates last possible cell not in the last row, if our cell comes after, then it's in the last row
  {
    isAtEdgeBottom = true;
  }

  if (a % numColumns == 1)// remainder of cell id divided by number of columns equals 1 when on left edge
  {
    isAtEdgeLeft = true;
  }

  //now that we have an idea of where the cell is, we can check surrounding cells

  if (!isAtEdgeTop)
  {
    //check the cell directly above cell a, only if we are not on the top row
    if (isAMine(a-numColumns))
    {
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

  if (numNearMines > 0)
  {
    //show the number of mines close to this cell
  }
  else//the 8 cells surrounding this one also dont contain mines
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

const isAMine = function(a)
{

}

generateGrid();
