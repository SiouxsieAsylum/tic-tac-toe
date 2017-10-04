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
  let squ = document.getElementById(id)
  let h2 = squ.children[0];

  if (state == x) {
    h2.style.fontSize = "17vh";
    h2.style.marginTop = "-1vh";
  }
  h2.innerHTML = state;

  if (state == x){
    clickedSquaresX.push(id);
  } else {
   clickedSquaresO.push(id);
  }

  squ.style.pointerEvents = "none";

  turnCounter++;
  checkArr();
  ifWon();
  switchState();
}

// all of X's counters
let topCounterX = 0;
let middleCounterX = 0;
let bottomCounterX = 0;
let leftCounterX = 0;
let rightCounterX = 0;

// all of O's counters
let topCounterO = 0;
let middleCounterO = 0;
let bottomCounterO = 0;
let leftCounterO = 0;
let rightCounterO = 0;

// pretty much all of my functions are "if X do this, if O do exactky same thing but for O" and I feel like there has to be a better way

//...can't think of one though, so here we go

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
  console.log(`X - topcounter = ${topCounterX}, middlecounter = ${middleCounterX}, bottomcounter = ${bottomCounterX}, leftcounter = ${leftCounterX}, rightcounter = ${rightCounterX}`);
  console.log(`O - topcounter = ${topCounterO}, middlecounter = ${middleCounterO}, bottomcounter = ${bottomCounterO}, leftcounter = ${leftCounterO}, rightcounter = ${rightCounterO}`);
}

// player 1? now it's player 2. And vice versa.
function switchState(){
  state == x ? state = o : state = x;
  console.log(`state now = ${state}`);
}

// has "top" or "left" or w/e occured 3 times? If not, check the diagonals.
function checkWin(num){
  num == 3 ? won = true : diagonalWin();
}

// does clickedSquaresX/O contain all 3 front diagonals? What about all back diagonals? Neither? Keep on trucking.
function diagonalWin(){
  let frontDiag = ["top-left","true-middle","bottom-right"];
  let backDiag = ["top-right","true-middle","bottom-left"];

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



function ifWon(){
  if (won) {
    console.log(`${state} wins!`);
    reset();
  }
}

function reset(){
  topCounterX = 0;
  middleCounterX = 0;
  bottomCounterX = 0;
  leftCounterX = 0;
  rightCounterX = 0;

  topCounterO = 0;
  middleCounterO = 0;
  bottomCounterO = 0;
  leftCounterO = 0;
  rightCounterO = 0;

  state = o;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DOM MANIPULATION~~~~~~~~~~~~~~~~~~~


