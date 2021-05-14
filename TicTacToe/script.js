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
  activePlayer = activePlayer === 1 ? 2 : 1;
}

function winCondition() {
  let result = 0;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winConditions.forEach(function (event) {
    const a = playerSelection[event[0]];
    const b = playerSelection[event[1]];
    const c = playerSelection[event[2]];

    if (a === b && b === c && c !== 0) {
      result = activePlayer; //returns the number of the active player, hence the winner.
    } else if (!playerSelection.includes(0)) {
      result = 3; //'3' as the winner, signifying a draw
    }
  });
  return result;
}

function playerMove() {
  for (let i = 0; i < gridItems.length; i++) {
    addClickEvent(gridItems[i], function () {
      console.log(ifValidMove(i));
      if (ifValidMove(i)) {
        playerSelection[i] = activePlayer;
        updateBoard();
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
      }
    });
  }
}

function ifValidMove(playerMove) {
  let result = true;
  if (playerSelection[playerMove] !== 0) {
    result = false;
  }
  return result;
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
