const playerName = "Ali";
const moves = ["Lapis", "Papyrus", "Scalpellus"];

let playerChoices = {};
let computerChoices = {};
let time;
let round = 0;

let roundNum = document.getElementById("roundNum");
let outcomeMessage = document.getElementById("outcomeMessage");

let targetElement = document.getElementById("gameWindow");
let counter = document.getElementById("counter");
let startButton = document.getElementById("startGame");

let chDiv = document.getElementById("btnChoices");
let chDivCom = document.getElementById("btnChoicesCom");

let playerScore = document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");

let playerScoreVal = 0;
let computerScoreVal = 0;

function createButtons(moves, targetDiv) {
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

createButtons(moves, chDiv);
createButtons(moves, chDivCom);

function chooseMove(moves) {
  return moves[Math.floor(Math.random() * 3)];
}

function matchOutcome(playerChoice, moves) {
  let computerChoice = chooseMove(moves);
  playerChoices[round] = playerChoice;
  computerChoices[round] = computerChoice;

  chDivCom.childNodes.forEach((button) => {
    if (button.value === computerChoice) {
      button.style.backgroundColor = "#f87f65";
    }
  });

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

  playerScore.innerHTML = playerScoreVal;
  computerScore.innerHTML = computerScoreVal;
}

function startGame(moves) {
  targetElement.style.display = "block";
  startButton.style.display = "none";
  startButton.innerText = "Start Again!";
  outcomeMessage.style.display = "none";
  playerScoreVal = 0;
  computerScoreVal = 0;
  playerScore.innerHTML = playerScoreVal;
  computerScore.innerHTML = computerScoreVal;
  round = 0;
  roundNum.innerHTML = round;
  playerChoices = {};
  computerChoices = {};

  chDiv.onclick = (event) => {
    if (event.target.nodeName === "BUTTON") {
      if (round >= 9) {
        if (playerScoreVal > computerScoreVal) {
          targetElement.style.display = "none";
          outcomeMessage.innerText = "You won!";
          outcomeMessage.style.display = "block";
          startButton.style.display = "block";

        } else if (playerScoreVal === computerScoreVal) {
          targetElement.style.display = "none";
          outcomeMessage.innerText = "It's a tie!";
          outcomeMessage.style.display = "block";
          startButton.style.display = "block";

        } else {
          targetElement.style.display = "none";
          outcomeMessage.innerText = "You loose!";
          outcomeMessage.style.display = "block";
          startButton.style.display = "block";
        }
      } else {
        round++;
        roundNum.innerHTML = round;
        //console.log(playerChoices, computerChoices);
        let computerButtons = chDivCom.querySelectorAll("button");
        computerButtons.forEach((button) => {
          button.style.backgroundColor = "red";
        });
        matchOutcome(event.target.value, moves);
      }
    }
  };
}

function nightMode() {
  let allText = document.querySelectorAll("h1,h2,p");
  if (document.body.style.backgroundColor === "white") {
    document.body.style.backgroundColor = "black";
    allText.forEach((e) => (e.style.color = "white"));
    document.getElementById("night").style.backgroundColor = "white";
    document.getElementById("night").style.color = "black";
  } else {
    document.body.style.backgroundColor = "white";
    allText.forEach((e) => (e.style.color = "black"));
    document.getElementById("night").style.backgroundColor = "black";
    document.getElementById("night").style.color = "white";
  }
}
