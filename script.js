const playerName = document.getElementById("enterName");
const moves = ["Lapis", "Papyrus", "Scalpellus"];

let playerChoices = {};
let computerChoices = {};
let round = 0;
let playerScoreVal = 0;
let computerScoreVal = 0;



let targetElement = document.getElementById("gameWindow");
let outcomeMessage = document.getElementById("outcomeMessage");
let startButton = document.getElementById("startGame");


let playerScore = document.getElementById("playerScore");
let roundNum = document.getElementById("roundNum");
let computerScore = document.getElementById("computerScore");

//setting player name
document.getElementById("playerName").innerText = playerName.value;

//Create function that will add the buttons doing this here so the moves are the names in the buttons
const createButtons = (moves, targetDiv) => {
  moves.forEach((move) => {
    let button = document.createElement("button");
    button.setAttribute("value", move);
    button.setAttribute("class", move);
    button.innerHTML = move;
    if (move === "Lapis") {
      let icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-hand-rock");
      button.appendChild(icon);
    } else if (move === "Papyrus") {
      let icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-hand-paper");
      button.appendChild(icon);
    } else if (move === "Scalpellus") {
      let icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-hand-scissors");
      button.appendChild(icon);
    }
    targetDiv.appendChild(button);
  });
}
//garbing the target divs and running the function above with the both divs
let chDiv = document.getElementById("btnChoices");
let chDivCom = document.getElementById("btnChoicesCom");
createButtons(moves, chDiv);
createButtons(moves, chDivCom);

//choose a random number
const chooseMove = moves => moves[Math.floor(Math.random() * 3)];


const matchOutcome = (playerChoice, moves) => {
  //get computer and player choices 
  let computerChoice = chooseMove(moves);
  playerChoices[round] = playerChoice;
  computerChoices[round] = computerChoice;
  //highlight randomly selected button
  chDivCom.childNodes.forEach((button) => {
    if (button.value === computerChoice) {
      button.style.backgroundColor = "#f87f65";
    }
  });
  //check the game outcome
  if (computerChoice === playerChoice) {
  } else if (
    (playerChoice === moves[0] && computerChoice === moves[1]) ||
    (playerChoice === moves[1] && computerChoice === moves[2]) ||
    (playerChoice === moves[2] && computerChoice === moves[0])
  ) {
    computerScoreVal++;
  } else if (
    (playerChoice === moves[0] && computerChoice === moves[2]) ||
    (playerChoice === moves[1] && computerChoice === moves[0]) ||
    (playerChoice === moves[2] && computerChoice === moves[1])
  ) {
    playerScoreVal++;
  }
  //update scores
  playerScore.innerHTML = playerScoreVal;
  computerScore.innerHTML = computerScoreVal;
}

const defaultValues = () => {
  targetElement.style.display = "block";
  startButton.style.display = "none";
  startButton.innerText = "Start Again!";
  outcomeMessage.style.display = "none";
  playerName.value = "";
  playerName.remove();
  playerScoreVal = 0;
  computerScoreVal = 0;
  playerScore.innerHTML = playerScoreVal;
  computerScore.innerHTML = computerScoreVal;
  round = 0;
  roundNum.innerHTML = round;
  playerChoices = {};
  computerChoices = {};
}

//gets called when the start button is pressed
const startGame = moves => {
  defaultValues();
  chDiv.onclick = (event) => {
    if (event.target.nodeName === "BUTTON") {
      if (round >= 9) {
        if (playerScoreVal > computerScoreVal) {
          gameFinish("You win!");
        } else if (playerScoreVal === computerScoreVal) {
          gameFinish("It's a tie!");
        } else {
          gameFinish("You loose!");
        }
      } else {
        round++;
        roundNum.innerHTML = round;
        //console.log(playerChoices, computerChoices);
        //resetting computer choosen buttons to default color
        let computerButtons = chDivCom.querySelectorAll("button");
        computerButtons.forEach((button) => {
          button.style.backgroundColor = "red";
        });
        //call function passing the list of moves and the player choice as arguments
        matchOutcome(event.target.value, moves);
      }
    }
  };
}


const gameFinish = message => {
  targetElement.style.display = "none";
  outcomeMessage.innerText = message;
  outcomeMessage.style.display = "block";
  startButton.style.display = "block";
}

function nightMode() {
  let allText = document.querySelectorAll("h1,h2,p");
  if (document.body.style.backgroundColor === "white") {
    document.body.style.backgroundColor = "black";
    allText.forEach((e) => (e.style.color = "white"));
    document.getElementById("night").style.backgroundColor = "white";
    document.getElementById("night").style.color = "black";
    playerName.style.backgroundColor = "white";
    playerName.style.color = "black";
  } else {
    document.body.style.backgroundColor = "white";
    allText.forEach((e) => (e.style.color = "black"));
    document.getElementById("night").style.backgroundColor = "black";
    document.getElementById("night").style.color = "white";
    playerName.style.backgroundColor = "black";
    playerName.style.color = "white";
  }
}

