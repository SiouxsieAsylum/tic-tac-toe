const squares = Array.from(document.getElementsByClassName("square"));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GAME LOGIC ~~~~~~~~~~~~~~~~~~~~~~~~

// arrays to hold the coordinate ids of Xs and Os.
const clickedSquaresX = [];
const clickedSquaresO = [];

// state holds who is playing and what gets checked. I'm not entirely familiar with how to create the "state" (or class, or w/e) of a "player".
const x = "<i class='fa fa-times-circle-o' aria-hidden='true'></i>";
const o = "<i class='fa fa-circle-o-notch' aria-hidden='true'></i>";
let state = x;

// we check for wins every click, but we continuously check for whether or not to execute "ifWon()",
let turnCounter = 0;
let won = false;
let tie = false;

// not really very intuitively named. This is essentially the hub for the logic of the game and the flow.
function store(e){
  let id = e.id;
  let squ = document.getElementById(id);
  let h2 = squ.children[0];

    h2.style.fontSize = "7vw";
    h2.style.margin = "auto"
    h2.innerHTML = state;
    h2.classList.add("fa-spin");

  if (state == x){
    clickedSquaresX.push(id);
  } else {
   clickedSquaresO.push(id);
  }

  squ.style.pointerEvents = "none";

  turnCounter++;
  turnCounter == 9 ? tieGame() : console.log(turnCounter);
  checkArr();
  ifWon();
}

// all of X's counters
let topCounterX = 0;
let middleCounterX = 0;
let centerCounterX = 0;
let bottomCounterX = 0;
let leftCounterX = 0;
let rightCounterX = 0;

// all of O's counters
let topCounterO = 0;
let middleCounterO = 0;
let centerCounterO = 0;
let bottomCounterO = 0;
let leftCounterO = 0;
let rightCounterO = 0;

function checkArr(){
  // check the last square clicked by either X or O
  let lastX = clickedSquaresX[clickedSquaresX.length - 1];
  let lastO = clickedSquaresO[clickedSquaresO.length - 1];


  if (state == x){
    // split up the last id string and +=1 to its respectiev counter
    let csArrX = lastX.split("-");
    for (let cs of csArrX){
      if (cs.includes("top")){
          topCounterX++;
          // check if the identifier has ocurred 3 times yet
          checkWin(topCounterX);
        }else if (cs.includes("middle")){
          middleCounterX++;
           checkWin(middleCounterX);
        }else if (cs.includes("center")){
          centerCounterX++;
           checkWin(centerCounterX);
        } else if (cs.includes("bottom")){
          bottomCounterX++;
          checkWin(bottomCounterX);
        }else if(cs.includes("left")){
          leftCounterX++;
          checkWin(leftCounterX);
        }else if (cs.includes("right")){
          rightCounterX++;
          checkWin(rightCounterX);
        }
     }
  // now it's O's turn to do the same thing
  }else {
    let csArrO = lastO.split("-");
    for (let cs of csArrO){
      if (cs.includes("top")){
          topCounterO++;
          checkWin(topCounterO);
        }else if (cs.includes("middle")){
          middleCounterO++;
           checkWin(middleCounterO);
        }else if (cs.includes("center")){
          centerCounterO++;
           checkWin(centerCounterO);
        } else if (cs.includes("bottom")){
          bottomCounterO++;
          checkWin(bottomCounterO);
        }else if(cs.includes("left")){
          leftCounterO++;
          checkWin(bottomCounterO);
        }else if (cs.includes("right")){
          rightCounterO++;
          checkWin(bottomCounterO);
        }
     }
  }


  // this is mostly for my own record keeping, values are safe.
  console.log(`X - topcounter = ${topCounterX}, middlecounter = ${middleCounterX}, centercounter = ${centerCounterX} bottomcounter = ${bottomCounterX}, leftcounter = ${leftCounterX}, rightcounter = ${rightCounterX}`);
  console.log(`O - topcounter = ${topCounterO}, middlecounter = ${middleCounterO}, centercounter = ${centerCounterO}, bottomcounter = ${bottomCounterO}, leftcounter = ${leftCounterO}, rightcounter = ${rightCounterO}`);
}

// player 1? now it's player 2. And vice versa.
function switchState(){
  state == x ? state = o : state = x;
  animateHeader(state);
}

// has "top" or "left" or w/e occured 3 times? If not, check the diagonals.
function checkWin(num){
  num == 3 ? won = true : diagonalWin();
}

// does clickedSquaresX/O contain all 3 front diagonals? What about all back diagonals? Neither? Keep on trucking.
function diagonalWin(){
  let frontDiag = ["top-left","middle-center","bottom-right"];
  let backDiag = ["top-right","middle-center","bottom-left"];

  if (state == x){
    let xCounter = 0;
    clickedSquaresX.forEach(function(elm){
      frontDiag.includes(elm) ? xCounter++ : xCounter;})


    if (xCounter < 3){
      xCounter = 0;
      clickedSquaresX.forEach(function(elm){
        backDiag.includes(elm) ? xCounter++ : xCounter;}
)    }

    xCounter == 3 ? won = true : won;

  }else{
      let oCounter = 0;
    clickedSquaresO.forEach(function(elm){
      frontDiag.includes(elm) ? oCounter++ : oCounter;})


    if (oCounter < 3){
      oCounter = 0;
      clickedSquaresO.forEach(function(elm){
        backDiag.includes(elm) ? oCounter++ : oCounter;}
)    }

      oCounter == 3 ? won = true : won;
  }
}


// executes the win logic
function ifWon(){
  if (won) {
    console.log(`${state} wins!`);
    winHeader();
  } else {
    switchState();
  }
}

function reset(){

  for (let sq of squares){
    sq.innerHTML = "<h2></h2>";
    sq.style.pointerEvents = "initial";
  }

  topCounterX = 0;
  middleCounterX = 0;
  centerCounterX = 0;
  bottomCounterX = 0;
  leftCounterX = 0;
  rightCounterX = 0;

  topCounterO = 0;
  middleCounterO = 0;
  centerCounterO = 0;
  bottomCounterO = 0;
  leftCounterO = 0;
  rightCounterO = 0;

  whiteBox.classList.add("spin");
  blackBox.classList.add("oppospin");

  winText.style.animationName= "";
  turnText.style.animationDuration= "3s";
  turnText.style.animationName= "";
  headerOverlay.style.zIndex = "-1";
  headerOverlay.style.opacity = "0";
  winText.style.marginLeft = "34vw";

  header.style.opacity="1";
  button.style.opacity = "0";

  turnCounter = 0;
  state = x;
  won = false;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DOM MANIPULATION~~~~~~~~~~~~~~~~~~~
let turnText = document.getElementById("whosTurn");
let spinText = document.getElementById("spinner");
let headerOverlay = document.getElementById("headerOverlay");
let whiteBox = document.getElementById("bigger");
let blackBox = document.getElementById("big");
let winText = document.getElementById("whoWon");
let button = document.getElementById("resetButton");
let header = document.getElementById("game-header");
let winner = document.getElementById("prevWinners");

// code adapted from https://stackoverflow.com/questions/4797675/how-do-i-re-trigger-a-webkit-css-animation-via-javascript

headerOverlay.addEventListener('webkitAnimationEnd', function(){
    this.style.animationName = "";
  });

turnText.addEventListener('webkitAnimationEnd', function(){
    this.style.animationName = "";
  })


function animateHeader(state){
  headerOverlay.style.animationName = "sortaModal";

  turnText.innerHTML = `${state}`;

  turnText.style.animationName = "spin";
  spinText.style.animationName="zoominout";

}

// attempting to give players the option of stopping the icons from spinning
function iconSpin(){
  // replace inner html of all squares to icons without those class names. reset state to icons without spinny classes
  for (let sq of squares){
    sq.children[0].classList.toggle("fa-spin");
  }
}

// giving the players the option to turn off the spinning boxes in the back
function boxesSpin(){

  whiteBox.classList.toggle("spin");
  blackBox.classList.toggle("oppospin");

}

function endGame(){

  header.style.opacity="0";

  headerOverlay.style.zIndex = "9999";
  headerOverlay.style.opacity = "1";

  button.style.opacity = "1";

  turnText.style.marginLeft = "35vw";
  turnText.style.animationDuration = "1s";
  turnText.style.animationFillMode = "forwards";

  winText.style.animationName= "winAnimation";
  turnText.style.animationName= "winAnimation";
}

function winHeader(){

  turnText.innerHTML = state;
  winner.innerHTML = state;

  endGame();
}

function tieGame(){
  winText.style.marginLeft = "25vw";
  winText.innerHTML = "Game Over";
  turnText.innerHTML = "<i class='fa fa-thumbs-o-down' aria-hidden='true'></i>";
  endGame();
}
