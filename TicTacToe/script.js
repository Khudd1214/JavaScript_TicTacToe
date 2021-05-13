"use strict";
const playButton = document.querySelector(".playButton");
const overlay = document.querySelector(".hidden");
const gridItems = document.querySelectorAll(".grid-item");
const playerWinCounts = document.querySelectorAll(".winCount");
const message = document.querySelector(".message");

let playerSelection = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let activePlayer = 1; //Used to monitor the active player. Possible values 1 or 2.
let playerOneWinCount = 0;
let playerTwoWinCount = 0;
let firstGame = true;

let addClickEvent = function (target, action) {
  target.addEventListener("click", action);
};

addClickEvent(playButton, function () {
  clearBoard();
  updateBoard();
  openOverlay();
  if (firstGame) {
    playerMove();
    firstGame = false;
  } else {
    activePlayer = 1; //re-initializes activePlayer so X always goes first.
  }
});

function clearBoard() {
  for (let i = 0; i < playerSelection.length; i++) {
    playerSelection[i] = 0;
  }
}

function updateWinCounts() {
  playerWinCounts[0].textContent = "Player 1 Win Count : " + playerOneWinCount;
  playerWinCounts[1].textContent = "Player 2 Win Count : " + playerTwoWinCount;
}

function nextPlayer() {
  //activePlayer = activePlayer === 1 ? 2 : 1;
  if (activePlayer === 1) {
    console.log("player 1");
    activePlayer = 2;
  } else if (activePlayer === 2) {
    console.log("player 2");
    activePlayer = 1;
  }
}

function winCondition() {
  let result = 0;
  if (
    playerSelection[0] === playerSelection[1] &&
    playerSelection[1] === playerSelection[2] &&
    playerSelection[2] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[3] === playerSelection[4] &&
    playerSelection[4] === playerSelection[5] &&
    playerSelection[5] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[6] === playerSelection[7] &&
    playerSelection[7] === playerSelection[8] &&
    playerSelection[8] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[0] === playerSelection[3] &&
    playerSelection[3] === playerSelection[6] &&
    playerSelection[6] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[1] === playerSelection[4] &&
    playerSelection[4] === playerSelection[7] &&
    playerSelection[7] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[2] === playerSelection[5] &&
    playerSelection[5] === playerSelection[8] &&
    playerSelection[8] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[0] === playerSelection[4] &&
    playerSelection[4] === playerSelection[8] &&
    playerSelection[8] !== 0
  ) {
    result = activePlayer;
  } else if (
    playerSelection[2] === playerSelection[4] &&
    playerSelection[4] === playerSelection[6] &&
    playerSelection[6] !== 0
  ) {
    result = activePlayer;
  } else if (!playerSelection.includes(0)) {
    result = 3;
  }
  return result;
}

function playerMove() {
  for (let i = 0; i < gridItems.length; i++) {
    addClickEvent(gridItems[i], function () {
      playerSelection[i] = activePlayer;
      updateBoard();
      console.log(playerSelection);
      let endCondition = winCondition() !== 0 ? true : false;
      if (endCondition) {
        if (winCondition() === 1) {
          playerOneWinCount++;
          updateWinCounts();
          message.textContent = "Player 1 Wins!";
          playButton.textContent = "Play again?";
          closeOverlay();
        } else if (winCondition() === 2) {
          playerTwoWinCount++;
          updateWinCounts();
          message.textContent = "Player 2 Wins!";
          playButton.textContent = "Play again?";
          closeOverlay();
        } else if (winCondition() === 3) {
          message.textContent = "Draw!";
          playButton.textContent = "Play again?";
          closeOverlay();
        }
      }
      nextPlayer();
    });
  }
}

function updateBoard() {
  for (let i = 0; i < playerSelection.length; i++) {
    if (playerSelection[i] === 1) {
      gridItems[i].textContent = "X";
    } else if (playerSelection[i] === 2) {
      gridItems[i].textContent = "O";
    } else if (playerSelection[i] === 0) {
      gridItems[i].textContent = "";
    }
  }
}

function openOverlay() {
  overlay.classList.remove("hidden");
}

function closeOverlay() {
  overlay.classList.add("hidden");
}
