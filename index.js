let numRows = 10;
let numColumns = 10;
let boardContainer = document.querySelector("#board");
let cellCount = numRows*numColumns;
let isTimerSet = false;
let time = 0;
let shouldTimerStop = false;
let cellWidth = 36;
let maxMines = 10;
let interval = null;


//Variable for starting number of mines
let mines = 10;
//Variable for flags
let flags = mines;

let bombIndex = [];

let checkedCells = [];//so we can't click on a cell twice


//Variables for smiley/reset button
let smileyContainer = document.querySelector('#smileyface');
let face = document.querySelector('#face');

const hasAFlag = function(cellId)
{
  let theCell = document.getElementById(cellId);

  if (theCell.lastElementChild !== null)
  {
    //Check to see if last child is called flagSprite
    //If last child is flagSprite, it has a flag
    if (theCell.lastChild.className === 'flagSprite')
    {
      return true;
    }
  }
  return false;
}

const revealMine = function(a)
{
  if (bombIndex.length > 0)
  {
    if (!hasAFlag(bombIndex[0]))
    {
      document.getElementById(bombIndex[0]).style.backgroundColor = 'red';//turns all mines red
    }

    bombIndex.shift();
  }
  else
    {
      document.querySelectorAll(".bombSprite").forEach(a=>a.style.display = "inline");
    }
}


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
  shouldTimerStop = true;//stop the timer from counting up
  document.getElementById(100).textContent = "";
  return true;//we looked through everything, all cells either exist in checked cells or is a mine
}

//Function to generate Mine locations
const generateMines = function() {

  //Variable for starting cell
  let cellIndex = 0;

  //Loop until mines remaining = 0
  while (mines !== 0) {

    //Create a random number from 1-20
    let random = Math.round(Math.random()*200);
    cellIndex += 1;

    let currentCell = document.getElementById(cellIndex);

    //If random number = 5 and no bomb exists in that cell, place bomb in that cell
    if (random === 5 && currentCell.firstElementChild === null) {
      //Create Mine Sprite
      let mineSprite = document.createElement('img');
      mineSprite.className = 'bombSprite';
      mineSprite.src = 'assets/mine.png';

      currentCell.appendChild(mineSprite);
      mines -= 1;
      bombIndex.push(parseInt(currentCell.id,10));
    };

    //If currentCell now contains a bomb, push cellID to bomb index
    if (currentCell.firstElementChild !== null) {

    }

    //If bombs still remain when the all cells have run through, run through all cells again until no bombs left
    if (cellIndex == cellCount && mines !== 0) {
      cellIndex = 0;
    };
  }

  //Display bombIndex in console.
  console.log(bombIndex);

}

//Update Flag Counter
const flagCount = function() {
  let flagContainer = document.querySelector('#flagCounter')
  let flagString = flags.toString();
  flagContainer.textContent = flagString.padStart(3, '0');
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

const revealOtherMines = function()//happens when you accidently click a mine
{
  interval = setInterval(revealMine,100);

  //for (i = 0; i < bombIndex.length; i++)//iterates through bomb bombIndex
  //{
    //setTimeout(revealMine,1000,bombIndex[i]);
  //}


  document.querySelectorAll(".flagSprite").forEach(a=>a.style.display = "none");

  shouldTimerStop = true;//stop the timer from counting up

  //Make all cells unclickable
  checkedCells = [];
  let cellId = 0;
  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);

    checkedCells.push(cellId);
  }

  face.src = 'assets/deadFace.png';

}

const addTime = function()
{
  if (!shouldTimerStop)
  {
    time++;
    let appendTime = time;
    if (time <= 99)//add a 0 to the front if the time is a two or one digit number
    {
      appendTime = "0" + appendTime;
    }
    if (time <= 9)//add another 0 to the front if the time is a one digit number
    {
      appendTime = "0" + appendTime;
    }
    let timeContainer = document.querySelector('#timer');
    timeContainer.textContent = appendTime;
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

  if (!isTimerSet)//timer starts on the first click!
  {
    isTimerSet = true;
    shouldTimerStop = false;
    setInterval(addTime,1000);
  }

  if (hasAFlag(a))//does this cell have a flag?
  {
    return;
  }

  if(checkedCells.includes(a))//did we check that cell aready?
  {
    //console.log("This cell was already checked");
    return;//we will be stuck in an infinite loop if we don't do this
  }
  else
  {
    //console.log("This is the first time we clicked this cell");
    checkedCells.push(a);//make sure we don't check this cell again

    //Inverts cell and boarder colors
    cell.style.backgroundColor = '#BEBEBE';
    cell.style.border = '1px solid #DCDCDC';
  }

  shouldTimerStop = false;

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
  }

  if (a % numColumns == 0)//remainder of a divided by number of columns equals 0 when on right edge
  {
    isAtEdgeRight = true;
  }

  if (a > (cellCount-numColumns))//calculates last possible cell not in the last row, if a is greater than this, then it's in the last row
  {
    isAtEdgeBottom = true;
  }

  if (a % numColumns == 1)// remainder of cell id divided by number of columns equals 1 when on left edge
  {
    isAtEdgeLeft = true;
  }

  //now that we have an idea of where the cell is, we can check surrounding cells

  if (!isAtEdgeTop)//we can't check the cell above us if we are already in the top row lol
  {
    if (isAMine(a-numColumns))//up one cell
    {
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



  //now we've determined two things, the current cell is NOT a mine, and we found the number mines touching this one

  if (numNearMines !== 0) {
    cell.textContent = numNearMines;

    if (numNearMines === 1) {
      cell.style.color = 'blue';
    } else if (numNearMines === 2) {
      cell.style.color = 'green';
    } else if (numNearMines === 3) {
      cell.style.color = 'red';
    } else if (numNearMines === 4) {
      cell.style.color = 'purple';
    } else if (numNearMines === 5) {
      cell.style.color = 'maroon';
    } else if (numNearMines === 6) {
      cell.style.color = 'turquoise';
    } else if (numNearMines === 7) {
      cell.style.color = 'black';
    } else if (numNearMines === 8) {
      cell.style.color = 'darkgray';
    }


  }

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

  if (checkWin(a))//see if we won
  {
    for (i = 0; i < bombIndex.length; i++)//iterates through bomb bombIndex
    {
      document.getElementById(bombIndex[i]).style.backgroundColor = 'blue';//turns all mines blue
    }

    document.querySelectorAll(".bombSprite").forEach(a=>a.style.display = "inline");
    document.querySelectorAll(".flagSprite").forEach(a=>a.style.display = "none");

    //Make all cells unclickable
    checkedCells = [];
    let cellId = 0;
    while (cellId < 100) {
      cellId += 1;
      cell = document.getElementById(cellId);

      checkedCells.push(cellId);
    }
    face.src = 'assets/winFace.png';
  }

}

//Function to Create Grid
const generateGrid = function() {
  clearInterval(interval);
  let cellId = 0;
  cellCount = numRows*numColumns;
  while (cellId < cellCount)
  {
    cellId += 1;
    let cell = document.createElement('div');
    cell.className = "cell";
    cell.setAttribute('data-long-press-delay', '500');
    cell.id = cellId;//id of cell


    board.appendChild(cell);

  }


  boardContainer.style.width = (cellWidth * numColumns) + "px";
  let wide = cellWidth * numColumns + 40;
  console.log(wide);
  document.getElementById("gameWindow").style.width = wide + "px";

  cellId = 0;
  while (cellId < cellCount)
  {
    cellId++;
    let theCell = document.getElementById(cellId);
    theCell.addEventListener("click",function() {clicked(theCell.id)});
  }

  face.src = 'assets/happyFace.png'

  time = 0;

  generateMines();
  flagCount();
}

//Place Flag
const canPlaceFlag = function () {
  cellId = 0;
  while (cellId < cellCount)
  {
    cellId += 1;
    let theCell = document.getElementById(cellId);

    //Event Listener on all Cells
    theCell.addEventListener('contextmenu', function(e) {
      e.preventDefault();

      //Flag IMG
      let flag = document.createElement('img');
      flag.className = 'flagSprite';
      flag.src = 'assets/flag.png';

      //Check for child elements
      if (theCell.lastElementChild !== null) {

        //Check to see if last child is called flagSprite
        //If last child is flagSprite, remove the sprite image
        if (theCell.lastChild.className === 'flagSprite') {
          theCell.removeChild(theCell.lastElementChild);
          flags += 1;

        } else if (theCell.lastChild.className !== 'flagSprite' && flags !== 0) /*last element != flagSprite and there are still flags remaining*/ {
          theCell.appendChild(flag);

          flags -= 1;

        }

        flagCount();

      }

      //If no child elements and flags > 0, place a flag
      else if ((theCell.firstChild === null || theCell.firstElementChild('img').className === 'bombSprite') && flags !== 0) {
        theCell.appendChild(flag);

        flags -= 1;
        flagCount();
      }

    });

    //Touch and Hold Event Listener on all Cells (for iOS Devices)
    theCell.addEventListener('long-press', function(e) {
      //e.preventDefault();

      //Flag IMG
      let flag = document.createElement('img');
      flag.className = 'flagSprite';
      flag.src = 'assets/flag.png';

      //Check for child elements
      if (theCell.lastElementChild !== null) {

        //Check to see if last child is called flagSprite
        //If last child is flagSprite, remove the sprite image
        if (theCell.lastChild.className === 'flagSprite') {
          theCell.removeChild(theCell.lastElementChild);
          flags += 1;

        } else if (theCell.lastChild.className !== 'flagSprite' && flags !== 0) /*last element != flagSprite and there are still flags remaining*/ {
          theCell.appendChild(flag);

          flags -= 1;

        }

        flagCount();

      }

      //If no child elements and flags > 0, place a flag
      else if ((theCell.firstChild === null || theCell.firstElementChild('img').className === 'bombSprite') && flags !== 0) {
        theCell.appendChild(flag);

        flags -= 1;
        flagCount();
      }

    });

  }

}

//TEMPORARY FUNCTION FOR TESTING TO REVEAL BOMB LOCATIONS
let x = 0;
const devTest = function () {
  if (x === 0) {
    document.querySelectorAll(".bombSprite").forEach(a=>a.style.display = "inline");
    x += 1;
  } else {
    document.querySelectorAll(".bombSprite").forEach(a=>a.style.display = "none");
    x -= 1;
  }
}

generateGrid();
canPlaceFlag();

smileyContainer.addEventListener('click', function() {
  bombIndex = [];
  checkedCells = [];
  let cellId = 0;
  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);

    boardContainer.removeChild(cell);
  }
  mines = maxMines;
  flags = mines;
  shouldTimerStop = true;
  let timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";

  generateGrid();
  canPlaceFlag();
});
document.getElementById("small").addEventListener('click',function(){
  numRows = 10;
  numColumns = 10;
  bombIndex = [];
  checkedCells = [];
  let cellId = 0;
  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);

    boardContainer.removeChild(cell);
  }
  mines = 10;
  maxMines = 10;
  flags = mines;
  shouldTimerStop = true;
  let timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
document.getElementById("medium").addEventListener('click',function(){
  numRows = 12;
  numColumns = 15;
  bombIndex = [];
  checkedCells = [];
  let cellId = 0;
  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);

    boardContainer.removeChild(cell);
  }
  mines = 25;
  maxMines = 25;
  flags = mines;
  shouldTimerStop = true;
  let timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
document.getElementById("large").addEventListener('click',function(){
  numRows = 15;
  numColumns = 20;
  bombIndex = [];
  checkedCells = [];
  let cellId = 0;
  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);

    boardContainer.removeChild(cell);
  }
  mines = 50;
  maxMines = 50;
  flags = mines;
  shouldTimerStop = true;
  let timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
