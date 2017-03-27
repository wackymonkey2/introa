/*In traditional games, a level-up would occur once every ten lines are cleared. After a level-up, the blocks fall slightly faster, and typically more points are given*/
/*0 = blank
  1 = cyan
  2 = blue
  3 = orange
  4 = yellow
  5 = lime
  6 = purple
  7 = red*/
var cyan = 1;
var blue = 2;
var orange = 3;
var yellow = 4;
var lime = 5;
var purple = 6;
var red = 7;
  
//objects for all of the tetronimos with their arrangements, x,y are coordinates of top left corner
function pieceL () {
  this.x = 3;
  this.y = 0;
  this.angle = 0;
  this.color = orange;
  this.organization =
  [[0, 0, 3],
   [3, 3, 3]];
}
     
function pieceJ () {
  this.x  = 3;
  this.y = 0;
  this.angle = 0;
  this.color = blue;
  this.organization =
  [[2, 0, 0],
   [2, 2, 2]];
}
     
function pieceBox () {
  this.x  = 4;
  this.y = 0;
  this.angle = 0;
  this.color = yellow;
  this.organization =
  [[4, 4],
   [4, 4]];
}
     
function pieceI () {
  this.x  = 3;
  this.y = -1;
  this.angle = 0;
  this.color = cyan;
  this.organization =
  [[0, 0, 0, 0],
   [1, 1, 1, 1]];
}
    
function pieceZ () {
  this.x  = 3;
  this.y = 0;
  this.angle = 0;
  this.color = red;
  this.organization =
  [[7, 7, 0],
   [0, 7, 7]];
}
     
function pieceS () {
  this.x  = 3;
  this.y = 0;
  this.angle = 0;
  this.color = lime;
  this.organization =
  [[0, 5, 5],
   [5, 5, 0]];
}
     
function pieceT () {
  this.x  = 3;
  this.y = 0;
  this.angle = 0;
  this.color = purple;
  this.organization =
  [[0, 6, 0],
   [6, 6, 6]];
}

//key codes for controls
function keyCodes(event){
  
  //move left
  if(event.keyCode == 37){
    movePiece(-1, 0, false);
  }
  //move right
  if(event.keyCode == 39){
    movePiece(1, 0, false);
  }
  //move down
  if(event.keyCode == 40){
    if(hitDetection(0, 1, false)){
      scoreSoftDrop();
    }
    movePiece(0, 1, false);
  }
  //rotate clockwise
  if(event.keyCode == 88){
    rotateClockwise();
  }
  //rotate counter-clockwise
  if(event.keyCode == 90){
    rotateCounterClockwise();
  }
  //hold the piece
  if(event.keyCode == 67){
    swap();
  }
  //hard drop
  if(event.keyCode == 32){
    hardDrop();
  }
}
document.addEventListener('keydown', keyCodes);

//scoring, levels and lines stuff
function lineData(num){
  var lineData = parseInt($("#lineData").html());
  
  lineData += num;
  
  $("#lineData").html(lineData);
  updateLevel(lineData);
}

function updateLevel(lines){
  level = Math.floor(lines/10) + 1;
  speedMultiplier = 1000 + 250 * (level - 1);
  $("#levelData").html(level);
}
function scoreLine(num){
  if(num<4){
    score += 100 * num * level;
  }else if(lastLines == 4){
    score += 1200 * level;
  }else{
    score += 800 * level;
  }
  lastLines = num;
  updateScoreDisplay();
}
function scoreSoftDrop(){
  score += level;
  updateScoreDisplay();
}
function scoreHardDrop(distance){
  score += 2 * level * distance;
  updateScoreDisplay();
}
function updateScoreDisplay(){
  $('#scoreData').html(score);
}
