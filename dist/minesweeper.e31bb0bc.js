// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var numRows = 10;
var numColumns = 10;
var boardContainer = document.querySelector("#board");
var cellCount = numRows * numColumns;
var isTimerSet = false;
var time = 0;
var shouldTimerStop = false;
var cellWidth = 36;
var maxMines = 10; //Variable for starting number of mines

var mines = 10; //Variable for flags

var flags = mines;
var bombIndex = [];
var checkedCells = []; //so we can't click on a cell twice
//Variables for smiley/reset button

var smileyContainer = document.querySelector('#smileyface');
var face = document.querySelector('#face');

var hasAFlag = function hasAFlag(cellId) {
  var theCell = document.getElementById(cellId);

  if (theCell.lastElementChild !== null) {
    //Check to see if last child is called flagSprite
    //If last child is flagSprite, it has a flag
    if (theCell.lastChild.className === 'flagSprite') {
      return true;
    }
  }

  return false;
};

var checkWin = function checkWin(a) {
  var checkCell = 0;

  while (checkCell < cellCount) {
    checkCell++;

    if (!checkedCells.includes(checkCell)) //if we haven't checked the cell yet
      {
        if (!bombIndex.includes(checkCell)) //AND is not a mine
          {
            return false; //we didn't win yet, there are still unchecked cells that are not mines
          }
      }
  }

  shouldTimerStop = true; //stop the timer from counting up

  document.getElementById(100).textContent = "";
  return true; //we looked through everything, all cells either exist in checked cells or is a mine
}; //Function to generate Mine locations


var generateMines = function generateMines() {
  //Variable for starting cell
  var cellIndex = 0; //Loop until mines remaining = 0

  while (mines !== 0) {
    //Create a random number from 1-20
    var random = Math.round(Math.random() * 200);
    cellIndex += 1;
    var currentCell = document.getElementById(cellIndex); //If random number = 5 and no bomb exists in that cell, place bomb in that cell

    if (random === 5 && currentCell.firstElementChild === null) {
      //Create Mine Sprite
      var mineSprite = document.createElement('img');
      mineSprite.className = 'bombSprite';
      mineSprite.src = 'assets/mine.png';
      currentCell.appendChild(mineSprite);
      mines -= 1;
      bombIndex.push(parseInt(currentCell.id, 10));
    }

    ; //If currentCell now contains a bomb, push cellID to bomb index

    if (currentCell.firstElementChild !== null) {} //If bombs still remain when the all cells have run through, run through all cells again until no bombs left


    if (cellIndex == cellCount && mines !== 0) {
      cellIndex = 0;
    }

    ;
  } //Display bombIndex in console.


  console.log(bombIndex);
}; //Update Flag Counter


var flagCount = function flagCount() {
  var flagContainer = document.querySelector('#flagCounter');
  var flagString = flags.toString();
  flagContainer.textContent = flagString.padStart(3, '0');
}; //checked in clicked function


var isAMine = function isAMine(a) {
  for (i = 0; i < bombIndex.length; i++) //iterates through bomb index
  {
    if (a == bombIndex[i]) //if exists in bomb index
      {
        return true;
      }
  }

  return false;
};

var revealOtherMines = function revealOtherMines() //happens when you accidently click a mine
{
  for (i = 0; i < bombIndex.length; i++) //iterates through bomb bombIndex
  {
    document.getElementById(bombIndex[i]).style.backgroundColor = 'red'; //turns all mines red
  }

  document.querySelectorAll(".bombSprite").forEach(function (a) {
    return a.style.display = "inline";
  });
  document.querySelectorAll(".flagSprite").forEach(function (a) {
    return a.style.display = "none";
  });
  shouldTimerStop = true; //stop the timer from counting up
  //Make all cells unclickable

  checkedCells = [];
  var cellId = 0;

  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);
    checkedCells.push(cellId);
  }

  face.src = 'assets/deadFace.png';
};

var addTime = function addTime() {
  if (!shouldTimerStop) {
    time++;
    var appendTime = time;

    if (time <= 99) //add a 0 to the front if the time is a two or one digit number
      {
        appendTime = "0" + appendTime;
      }

    if (time <= 9) //add another 0 to the front if the time is a one digit number
      {
        appendTime = "0" + appendTime;
      }

    var timeContainer = document.querySelector('#timer');
    timeContainer.textContent = appendTime;
  }
};

var clicked = function clicked(cellNumber) //cell a was clicked!
{
  var a = parseInt(cellNumber, 10);
  var cell = document.getElementById(a);
  var isAtEdgeTop = false;
  var isAtEdgeRight = false;
  var isAtEdgeBottom = false;
  var isAtEdgeLeft = false;
  var numNearMines = 0;

  if (!isTimerSet) //timer starts on the first click!
    {
      isTimerSet = true;
      shouldTimerStop = false;
      setInterval(addTime, 1000);
    }

  if (hasAFlag(a)) //does this cell have a flag?
    {
      return;
    }

  if (checkedCells.includes(a)) //did we check that cell aready?
    {
      //console.log("This cell was already checked");
      return; //we will be stuck in an infinite loop if we don't do this
    } else {
    //console.log("This is the first time we clicked this cell");
    checkedCells.push(a); //make sure we don't check this cell again
    //Inverts cell and boarder colors

    cell.style.backgroundColor = '#BEBEBE';
    cell.style.border = '1px solid #DCDCDC';
  }

  shouldTimerStop = false;

  if (isAMine(a)) {
    //get blasted into the next dimension
    cell.style.backgroundColor = 'red';
    console.log("get blasted into the next dimension");
    revealOtherMines();
    return;
  }

  if (a <= numColumns) //if a is less that numColumns(default is 10)
    {
      isAtEdgeTop = true; //then we are in the top row
    }

  if (a % numColumns == 0) //remainder of a divided by number of columns equals 0 when on right edge
    {
      isAtEdgeRight = true;
    }

  if (a > cellCount - numColumns) //calculates last possible cell not in the last row, if a is greater than this, then it's in the last row
    {
      isAtEdgeBottom = true;
    }

  if (a % numColumns == 1) // remainder of cell id divided by number of columns equals 1 when on left edge
    {
      isAtEdgeLeft = true;
    } //now that we have an idea of where the cell is, we can check surrounding cells


  if (!isAtEdgeTop) //we can't check the cell above us if we are already in the top row lol
    {
      if (isAMine(a - numColumns)) //up one cell
        {
          numNearMines++; //if that cell contains a mine, remember that
        }
    }

  if (!isAtEdgeTop && !isAtEdgeRight) {
    if (isAMine(a - numColumns + 1)) //cell up one and right one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  }

  if (!isAtEdgeRight) {
    if (isAMine(a + 1)) //cell right one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  }

  if (!isAtEdgeRight && !isAtEdgeBottom) {
    if (isAMine(a + numColumns + 1)) //cell right one and down one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  }

  if (!isAtEdgeBottom) {
    if (isAMine(a + numColumns)) //cell down one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  }

  if (!isAtEdgeLeft && !isAtEdgeBottom) {
    if (isAMine(a + numColumns - 1)) //cell left one and down one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  }

  if (!isAtEdgeLeft) {
    if (isAMine(a - 1)) //cell left one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  }

  if (!isAtEdgeTop && !isAtEdgeLeft) {
    if (isAMine(a - numColumns - 1)) //cell up one and left one
      {
        numNearMines++; //if that cell contains a mine, remember that
      }
  } //now we've determined two things, the current cell is NOT a mine, and we found the number mines touching this one


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
  } //console.log(numNearMines);


  if (numNearMines > 0) {//show the number of mines close to this cell
  } else if (numNearMines == 0) //if each if the surrounding eight cells don't contain a mine, then they're safe to click on right? Lets save some time for the user and click those cell for them, losing almost no time!
    {
      //console.log("gonna look at other stuff now");
      //call this function recursivly for each of the 8 surrounding mines
      if (!isAtEdgeTop) {
        //console.log(a + " is checking pos 1 now");
        clicked(a - numColumns);
      }

      if (!isAtEdgeTop && !isAtEdgeRight) {
        //console.log(a + " is checking pos 2 now");
        clicked(a - numColumns + 1);
      }

      if (!isAtEdgeRight) {
        //console.log(a + " is checking pos 3 now");
        clicked(a + 1);
      }

      if (!isAtEdgeRight && !isAtEdgeBottom) {
        //console.log(a + " is checking pos 4 now");
        clicked(a + numColumns + 1);
      }

      if (!isAtEdgeBottom) {
        //console.log(a + " is checking pos 5 now");
        clicked(a + numColumns);
      }

      if (!isAtEdgeLeft && !isAtEdgeBottom) {
        //console.log(a + " is checking pos 6 now");
        clicked(a + numColumns - 1);
      }

      if (!isAtEdgeLeft) {
        //console.log(a + " is checking pos 7 now");
        clicked(a - 1);
      }

      if (!isAtEdgeTop && !isAtEdgeLeft) {
        //console.log(a + " is checking pos 8 now");
        clicked(a - numColumns - 1);
      }
    }

  if (checkWin(a)) //see if we won
    {
      for (i = 0; i < bombIndex.length; i++) //iterates through bomb bombIndex
      {
        document.getElementById(bombIndex[i]).style.backgroundColor = 'blue'; //turns all mines blue
      }

      document.querySelectorAll(".bombSprite").forEach(function (a) {
        return a.style.display = "inline";
      });
      document.querySelectorAll(".flagSprite").forEach(function (a) {
        return a.style.display = "none";
      }); //Make all cells unclickable

      checkedCells = [];
      var _cellId = 0;

      while (_cellId < 100) {
        _cellId += 1;
        cell = document.getElementById(_cellId);
        checkedCells.push(_cellId);
      }

      face.src = 'assets/winFace.png';
    }
}; //Function to Create Grid


var generateGrid = function generateGrid() {
  var cellId = 0;
  cellCount = numRows * numColumns;

  while (cellId < cellCount) {
    cellId += 1;

    var _cell = document.createElement('div');

    _cell.className = "cell";

    _cell.setAttribute('data-long-press-delay', '500');

    _cell.id = cellId; //id of cell

    board.appendChild(_cell);
  }

  boardContainer.style.width = cellWidth * numColumns + "px";
  var wide = cellWidth * numColumns + 40;
  console.log(wide);
  document.getElementById("gameWindow").style.width = wide + "px";
  cellId = 0;

  var _loop = function _loop() {
    cellId++;
    var theCell = document.getElementById(cellId);
    theCell.addEventListener("click", function () {
      clicked(theCell.id);
    });
  };

  while (cellId < cellCount) {
    _loop();
  }

  face.src = 'assets/happyFace.png';
  time = 0;
  generateMines();
  flagCount();
}; //Place Flag


var canPlaceFlag = function canPlaceFlag() {
  cellId = 0;

  var _loop2 = function _loop2() {
    cellId += 1;
    var theCell = document.getElementById(cellId); //Event Listener on all Cells

    theCell.addEventListener('contextmenu', function (e) {
      e.preventDefault(); //Flag IMG

      var flag = document.createElement('img');
      flag.className = 'flagSprite';
      flag.src = 'assets/flag.png'; //Check for child elements

      if (theCell.lastElementChild !== null) {
        //Check to see if last child is called flagSprite
        //If last child is flagSprite, remove the sprite image
        if (theCell.lastChild.className === 'flagSprite') {
          theCell.removeChild(theCell.lastElementChild);
          flags += 1;
        } else if (theCell.lastChild.className !== 'flagSprite' && flags !== 0)
          /*last element != flagSprite and there are still flags remaining*/
          {
            theCell.appendChild(flag);
            flags -= 1;
          }

        flagCount();
      } //If no child elements and flags > 0, place a flag
      else if ((theCell.firstChild === null || theCell.firstElementChild('img').className === 'bombSprite') && flags !== 0) {
          theCell.appendChild(flag);
          flags -= 1;
          flagCount();
        }
    }); //Touch and Hold Event Listener on all Cells (for iOS Devices)

    theCell.addEventListener('long-press', function (e) {
      //e.preventDefault();
      //Flag IMG
      var flag = document.createElement('img');
      flag.className = 'flagSprite';
      flag.src = 'assets/flag.png'; //Check for child elements

      if (theCell.lastElementChild !== null) {
        //Check to see if last child is called flagSprite
        //If last child is flagSprite, remove the sprite image
        if (theCell.lastChild.className === 'flagSprite') {
          theCell.removeChild(theCell.lastElementChild);
          flags += 1;
        } else if (theCell.lastChild.className !== 'flagSprite' && flags !== 0)
          /*last element != flagSprite and there are still flags remaining*/
          {
            theCell.appendChild(flag);
            flags -= 1;
          }

        flagCount();
      } //If no child elements and flags > 0, place a flag
      else if ((theCell.firstChild === null || theCell.firstElementChild('img').className === 'bombSprite') && flags !== 0) {
          theCell.appendChild(flag);
          flags -= 1;
          flagCount();
        }
    });
  };

  while (cellId < cellCount) {
    _loop2();
  }
}; //TEMPORARY FUNCTION FOR TESTING TO REVEAL BOMB LOCATIONS


var x = 0;

var devTest = function devTest() {
  if (x === 0) {
    document.querySelectorAll(".bombSprite").forEach(function (a) {
      return a.style.display = "inline";
    });
    x += 1;
  } else {
    document.querySelectorAll(".bombSprite").forEach(function (a) {
      return a.style.display = "none";
    });
    x -= 1;
  }
};

generateGrid();
canPlaceFlag();
smileyContainer.addEventListener('click', function () {
  bombIndex = [];
  checkedCells = [];
  var cellId = 0;

  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);
    boardContainer.removeChild(cell);
  }

  mines = maxMines;
  flags = mines;
  shouldTimerStop = true;
  var timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
document.getElementById("small").addEventListener('click', function () {
  numRows = 10;
  numColumns = 10;
  bombIndex = [];
  checkedCells = [];
  var cellId = 0;

  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);
    boardContainer.removeChild(cell);
  }

  mines = 10;
  maxMines = 10;
  flags = mines;
  shouldTimerStop = true;
  var timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
document.getElementById("medium").addEventListener('click', function () {
  numRows = 12;
  numColumns = 15;
  bombIndex = [];
  checkedCells = [];
  var cellId = 0;

  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);
    boardContainer.removeChild(cell);
  }

  mines = 25;
  maxMines = 25;
  flags = mines;
  shouldTimerStop = true;
  var timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
document.getElementById("large").addEventListener('click', function () {
  numRows = 15;
  numColumns = 20;
  bombIndex = [];
  checkedCells = [];
  var cellId = 0;

  while (cellId < cellCount) {
    cellId += 1;
    cell = document.getElementById(cellId);
    boardContainer.removeChild(cell);
  }

  mines = 50;
  maxMines = 50;
  flags = mines;
  shouldTimerStop = true;
  var timeContainer = document.querySelector('#timer');
  timeContainer.textContent = "000";
  generateGrid();
  canPlaceFlag();
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62459" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/minesweeper.e31bb0bc.js.map