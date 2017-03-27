var fieldArray =
[ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

//makes a div for each row in the array and one div per column in each row
for(var i = 0; i < fieldArray.length; i++){
  
  var rowWrapper = $("<div></div>").addClass("flex-row");
  rowWrapper.addClass("fieldRow");
  $("#playField").append(rowWrapper);
  
  for(var i2 = 0; i2 < fieldArray[i].length; i2++){
    var indexDiv = $("<div></div>").addClass("fieldDiv");
    $(rowWrapper).append(indexDiv);
    
  }
}

//dynamic sizing for the playing field height
function setBoxHeight() {
  var height = $("#playField").width()*2;
  height /= 20;
  height -= 2;
  //$('.fieldDiv').eq(0).width()
   $('.fieldDiv').height(height);
}

//uses value of each index in the field array to set the color of its respective div
function updateColors() {
  for(var i = 0; i < fieldArray.length; i++){
  
    for(var i2 = 0; i2 < fieldArray[i].length; i2++){
      
      var color;
      
      switch(fieldArray[i][i2]) {
        case 0:
          color = "black";
          break;
        case 1:
          color = "cyan";
          break;
        case 2:
          color = "blue";
          break;
        case 3:
          color = "orange";
          break;
        case 4:
          color = "yellow";
          break;
        case 5:
          color = "lime";
          break;
        case 6:
          color = "purple";
          break;
        case 7:
          color = "red";
          break;
        
      }
      $(".fieldRow").eq(i).children().eq(i2).css("background-color", color);
  }
}
}

//creates a new piece at the top of the board
function summonPieceToField(pieceType) {
  writePiece();
}

function randomPiece() {
  var randomNum = Math.floor(Math.random() * 7) + 1;
  var newPiece;
  
  switch (randomNum) {
    case 1:
      newPiece = new pieceL();
      break;
    case 2:
      newPiece = new pieceJ();
      break;
    case 3:
      newPiece = new pieceBox();
      break;
    case 4:
      newPiece = new pieceI();
      break;
    case 5:
      newPiece = new pieceZ();
      break;
    case 6:
      newPiece = new pieceS();
      break;
    case 7:
      newPiece = new pieceT();
      break;
  }
  return newPiece;
}


//changes the color values of a piece to make it look like it has moved; x,y are the respective amounts.
function movePiece(changeX, changeY, auto){

  if(hitDetection(changeX, changeY, auto)){
    clearPiece();
    currentPiece.y += changeY;
    currentPiece.x += changeX;
  
    writePiece();
  }
}
//clears the current piece for moving or rotating
function clearPiece(){
  for(var i = 0; i < currentPiece.organization.length; i++){
 
    for(var i2 = 0; i2 < currentPiece.organization[i].length; i2++){
      if(currentPiece.organization[i][i2] == currentPiece.color){
        fieldArray[currentPiece.y+i][currentPiece.x+i2] = 0;
      }
    }
  }
}

//sets the field colors as the organization of current piece
function writePiece(){
  for(var i = 0; i < currentPiece.organization.length; i++){
 
      for(var i2 = 0; i2 < currentPiece.organization[i].length; i2++){
        if(currentPiece.organization[i][i2] == currentPiece.color){
          fieldArray[currentPiece.y+i][currentPiece.x+i2] = currentPiece.organization[i][i2];
        }
      }
    }
}

//rotates the piece clockwise
function rotateClockwise(){
  
  var piece = currentPiece.organization;
  
  var newarr = [];
  for(i = 0; i < piece[0].length; i++){
    newarr.push(new Array());
  }
  for(i = 0; i < newarr.length; i++){
    newarr[i].push(new Array(piece.length));
  }
  
  for(var i = piece.length - 1; i >= 0; i--){
    for(var j = 0; j < piece[i].length; j++){
      newarr[j][piece.length - 1 - i] = piece[i][j];
    }
  }
  
  clearPiece();
  if(rotateDetection(newarr)){
    currentPiece.organization = newarr;
    writePiece();
  }else {
    writePiece();
  }
}
//rotates the piece counterclockwise
function rotateCounterClockwise(){
  
  var piece = currentPiece.organization;
  
  var newarr = [];
  for(i = 0; i < piece[0].length; i++){
    newarr.push(new Array());
  }
  for(i = 0; i < newarr.length; i++){
    newarr[i].push(new Array(piece.length));
  }

  for(var i = 0; i < piece.length; i++){
    for(var j = piece[i].length - 1; j >= 0; j--){
      newarr[piece[i].length - 1 - j][i] = piece[i][j];
    }
  }
  
  clearPiece();
  if(rotateDetection(newarr)){
    currentPiece.organization = newarr;
    writePiece();
  }else {
    writePiece();
  }
}
//gives the leftmost x index with a value of not zero for hit detection
function getLeftmost(y){
  var x = 0;
  for(var i = currentPiece.organization[y].length - 1; i >= 0; i--){
    if(currentPiece.organization[y][i] != 0){
      x = i;
    }
  }
  return x;
}
//gives the rightmost x index with a value of not zero for hit detection
function getRightmostLeft(y){
  var x = 0;
  for(var i = 0; i < currentPiece.organization[y].length; i++){
    if(currentPiece.organization[y][i] != 0){
      x = i;
    }
  }
  return x;
}
//give the downmost y index with a non zero value for hit detection
function getDownmost(x){
  var y = 0;
  for(var i = 0; i < currentPiece.organization.length; i++){
    if(currentPiece.organization[i][x] != 0){
      y = i;
    }
  }
  return y;
}

//hit detection, auto is if the automatic move down has called this function
function hitDetection(changeX, changeY, auto){
  var movable = true;
  
  //positive x direction
  if(changeX > 0){
    //if the piece would hit another piece, or move off right, stop it
    for(var i = 0; i < currentPiece.organization.length; i++){
      if(fieldArray[currentPiece.y + i][currentPiece.x + getRightmostLeft(i) + changeX] != 0 && currentPiece.organization[i][getRightmostLeft(i) + changeX] != 0) {
        movable = false;
      }
      //if the piece would move off of the board to the right, stop it
      if(currentPiece.x + getRightmostLeft(i) + changeX > 9) {
        movable = false;
      }
    }
  }
  //negative x direction
  if(changeX < 0){
    //if the piece would move off of the board to the left, stop it
    for(var i = 0; i < currentPiece.organization.length; i++){
      if(currentPiece.x + getLeftmost(i) + changeX < 0) {
        movable = false;
      }
    }
    for(var i = 0; i < currentPiece.organization.length; i++){
      if(fieldArray[currentPiece.y + i][currentPiece.x + changeX] != 0 && currentPiece.organization[i][0] != 0){
        movable = false;
      }
    }
  }
  //positive y direction (down)
  if(changeY > 0){
    var arrayOutOfBounds = false;
    //if the piece would move off of the board, stop it
    if(currentPiece.y + getDownmost() + changeY > 20) {
      movable = false;
      arrayOutOfBounds = true;
    }
    //if the piece would hit another piece, stop it
    for(var i = 0; i < currentPiece.organization[0].length; i++){
      if(!arrayOutOfBounds){
        if(fieldArray[currentPiece.y + getDownmost(i)+ changeY][currentPiece.x + i] != 0 && currentPiece.organization[getDownmost(i)][i] != 0) {
          movable = false;
        }
      }
    }
  }
  
  if(auto == true && !movable){
    autoMoveFail();
  }
  
  return movable;
}
//rotation detection
function rotateDetection(newPos){
  for(var i = 0; i < newPos.length; i++){
    for(var j = 0; j < newPos[i].length; j++){
      
      x = currentPiece.x;
      y = currentPiece.y;
       
      var result = false;
         
      if(y + i < 20 || x + j < 10 || y + i >= 0 || x + j >= 0){
        if(y+i < 20){
          if(fieldArray[y + i][x + j] == 0){
            result = true;
          }
        }
      }
    }
  }
  return result;
}


//detects if a line is full
function lineCheck(){
  var lines = new Array();
  var anyCleared = false;
  for(var i = 0; i < fieldArray.length; i++){
    var line = true;
    for(var j = 0; j < fieldArray[i].length; j++){
      if(fieldArray[i][j] == 0){
        line = false
      }else{
      }
    }
    if(line){
      lines.push(i);
      anyCleared = true;
    }
  }
  //clear the lines
  for(var i = 0; i < lines.length; i++){
    for(var j = 0; j < fieldArray[lines[i]].length; j++){
      fieldArray[lines[i]][j] = 0;
    }
  }
  lineData(lines.length);
  scoreLine(lines.length);
  updateColors();
  setTimeout(function(){moveDown(lines)}, speedMultiplier*1/4);
  if(anyCleared){
    return true;
  }else{
    return false;
  }
}

//moves all of the blocks down after removing a line
function moveDown(lines){
  for(var i = lines.length - 1; i >= 0; i--){
    console.log(lines[i]);
    for(var j = 0; j < lines[i]; j++){
      for(var j2 = 0; j2 < fieldArray[j].length; j2++){
        fieldArray[lines[i] - j][j2] = fieldArray[lines[i] - j - 1][j2];
      }
      updateColors();
    }
  }
}


//summons new piece from the array of next pieces, and adds a new one
function createFromArray(){
  currentPiece = nextArray.shift();
  summonPieceToField(currentPiece);
  nextArray.push(randomPiece());
  visualizeNext();
}

//makes a new piece when the current one stops
function autoMoveFail(){
    var makeNew = false;
    var canGoDown = hitDetection(0, 1, false);
    if(!canGoDown){
      if(lineCheck()){
        setTimeout(function(){makeNew = true;}, speedMultiplier*1/4);
      }else if (currentPiece.y != 0){
        makeNew = true;
      }else if(!lost){
        //removes key controls
        document.removeEventListener("keydown", keyCodes);
        lost = true;
        alert("You lost!  Score: " + score + "  Refresh to play again.");
      }
    }else{
      autoMove();
    }
    
    if(makeNew){
      swapped = false;
      createFromArray();
    }
}
//allows the other doc to change focus
function setFocus(to){
  focus = to;
}

//automatically moves the piece down
function autoMove(){
  movePiece(0, 1, true);
  if(focus){
    setTimeout(function(){autoMove();}, speedMultiplier);
  }
}
//swaps the piece if it hasn't been swapped yet
function swap(){
  if(!swapped){
    var tempCurrent = currentPiece;
    //removes current piece
    clearPiece();
    //puts the new piece at the top
    if(swappedPiece == null){
      createFromArray();
    }else{
      currentPiece = swappedPiece;
      summonPieceToField(swappedPiece);
    }
    //puts the removed piece in the swapped div
    swappedPiece = tempCurrent;
    swappedPiece.x = getPieceCenter(swappedPiece);
    swappedPiece.y = 0;
    swapped = true;
    visualizeSwapped(swappedPiece);
    
  }
}
function getPieceCenter(piece){
  var center;
  center = Math.floor(5 - piece.organization[0].length * 0.5);
  return center;
}

function visualizeSwapped(swapped2){
  var h = $(".fieldDiv").width();
  $("#heldPiece").empty();
  $("#heldPiece").height(h * swapped2.organization.length + swapped2.organization.length * 2)
  //makes a div for each row in the array and one div per column in each row
  for(var i = 0; i < swapped2.organization.length; i++){
    var rowWrapper = $("<div></div>").addClass("flex-row");
    rowWrapper.addClass("heldPieceRow");
    $("#heldPiece").append(rowWrapper);
    
    for(var i2 = 0; i2 < swapped2.organization[i].length; i2++){
      var indexDiv = $("<div></div>").addClass("fieldDiv");
      indexDiv.addClass("heldPieceDiv")
      $(rowWrapper).append(indexDiv);
    }
  }
  $(".heldPieceDiv").width(h);
  $(".heldPieceDiv").height(h);
  for(var i = 0; i < swapped2.organization.length; i++){
    for(var i2 = 0; i2 < swapped2.organization[i].length; i2++){
     var color;
     switch(swapped2.organization[i][i2]) {
        case 0:
          color = "black";
          break;
        case 1:
          color = "cyan";
          break;
        case 2:
          color = "blue";
          break;
        case 3:
          color = "orange";
          break;
        case 4:
          color = "yellow";
          break;
        case 5:
          color = "lime";
          break;
        case 6:
          color = "purple";
          break;
        case 7:
          color = "red";
          break;
     }
     $(".heldPieceRow").eq(i).children().eq(i2).css("background-color", color);
     $(".heldPieceRow").eq(i).children().eq(i2).css("background-color", color);
    }
  }
}

function hardDrop(){
  var y = currentPiece.y;
  var x = currentPiece.x;
  var maxY;
  var moved = false;
  
  for(var i = 0; i < fieldArray.length; i++){
    if(!hitDetection(0, i, false)){
      maxY = i - 1;
      i = fieldArray.length;
    }
  }
  movePiece(0, maxY, false);
  scoreHardDrop(maxY);
  swapped = false;
  var makeNew = false;
  if(lineCheck()){
      setTimeout(function(){createFromArray()}, speedMultiplier*1/4);
    }else if (currentPiece.y != 0){
      makeNew = true;
    }else if(!lost){
    //removes key controls
    document.removeEventListener("keydown", keyCodes);
    lost = true;
    alert("You lost!  Score: " + score + "  Refresh to play again.");
  }
  if(makeNew){
    swapped = false;
    createFromArray();
  }
}

function visualizeNext(){
  var h = $(".fieldDiv").width();
  $(".nextPieces").empty();
  //makes a div for each row in the array and one div per column in each row
  for(var j = 0; j < nextArray.length; j++){
    $(".nextPieces").height(h * nextArray[j].organization.length + nextArray[j].organization.length * 2);
    for(var i = 0; i < nextArray[j].organization.length; i++){
      var rowWrapper = $("<div></div>").addClass("flex-row");
      rowWrapper.addClass("heldPieceRow");
      $(".nextPieces").eq(j).append(rowWrapper);
    
      for(var i2 = 0; i2 < nextArray[j].organization[i].length; i2++){
        var indexDiv = $("<div></div>").addClass("fieldDiv");
        indexDiv.addClass("nextPieceDiv")
        $(rowWrapper).append(indexDiv);
      }
    }
  }
  $(".nextPieceDiv").width(h);
  $(".nextPieceDiv").height(h);
  for(var j = 0; j < nextArray.length; j++){
    for(var i = 0; i < nextArray[j].organization.length; i++){
      for(var i2 = 0; i2 < nextArray[j].organization[i].length; i2++){
       var color;
       switch(nextArray[j].organization[i][i2]) {
        case 0:
          color = "black";
          break;
        case 1:
          color = "cyan";
          break;
        case 2:
          color = "blue";
          break;
        case 3:
          color = "orange";
          break;
        case 4:
          color = "yellow";
          break;
        case 5:
          color = "lime";
          break;
        case 6:
          color = "purple";
          break;
        case 7:
          color = "red";
          break;
      }
      $(".nextPieces").eq(j).children().eq(i).children().eq(i2).css("background-color", color);
      }
    }
  }
}

//piece that is currently falling
var currentPiece;
//swapped piece and boolean if it has been swapped yet
var swapped = false;
var swappedPiece;
//level
var level = 1;
//how many miliseconds between each move down
var speedMultiplier = 1000 + 250 * (level - 1);
//the array of next pieces to come
var nextArray = [randomPiece(), randomPiece(), randomPiece(), randomPiece()];
//if the game has been lost
var lost = false;
//the score
var score = 0;
//how many lines were in the last set to be cleared
var lastLines;


  //starts with the piece moving (maybe change later for a menu). also note that it starts moving if focus is lost and then regained
  setTimeout(function(){autoMove();}, speedMultiplier);
  
  setBoxHeight();

  $(window).resize(function(){
    setBoxHeight();
  });
  
  createFromArray();
  
  visualizeNext();

  //for pausing on loss of focus
  $(window).focus(function() {
    setFocus(true)
    autoMove();
  }).blur(function() {
    setFocus(false
  )});

  setInterval(function(){updateColors();}, 10);
  
/* THINGS TO DO:
NEXT PRIORITY:

  -multiple lines cleared problem
  -hit detection
      -seems to work for now, needs more testing
      
*/
