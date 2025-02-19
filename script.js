"use strict";

const cells = document.querySelectorAll(".cell");
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer;
let currentPlayerText = document.querySelector(".player--choosing h2");
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const modal = document.querySelector(".modal");
const buttonO = document.querySelector(".player--one");
const buttonX = document.querySelector(".player--two");
const buttonStart = document.querySelector(".start");
const buttonRestart = document.querySelector(".game--restart");
const buttonNextGame = document.querySelector(".game--next");
const gameStatus = document.querySelector(".game--status");
let stepxAudio = new Audio("Public/audio/stepx.mp3");
let stepoAudio = new Audio("Public/audio/stepo.mp3");

function choosingPlayer(event) {
  if (event.target.textContent === "X") {
    currentPlayer = "X";
    currentPlayerText.innerHTML = "Light side of Force";
    buttonX.style.opacity = "1";
    buttonO.style.opacity = "0.2";
  } else {
    currentPlayer = "O";
    currentPlayerText.innerHTML = "Dark side of Force";
    buttonO.style.opacity = "1";
    buttonX.style.opacity = "0.2";
  }
}

function startGame() {
    if (!currentPlayer) {
      alert("Сhoose a side to continue you must");
    } else {
      modal.style.display = "none";
      gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    }
  }

function init(event) {
  if (event.target.textContent === "") {
    gameState[event.target.dataset.cellIndex] = currentPlayer;
    event.target.innerHTML = currentPlayer;
    if (currentPlayer === "X") {
      stepxAudio.play();
      event.target.style.color = "DodgerBlue";
      event.target.style.webkitTextStrokeColor = "white";
      event.target.style.webkitTextStrokeWidth = "1px";
    } else {
      stepoAudio.play();
      event.target.style.color = "FireBrick";
      event.target.style.webkitTextStrokeColor = "HotPink";
      event.target.style.webkitTextStrokeWidth = "1px";
    }
    win();
    changePlayer();
    if (!gameState.includes("") && gameActive) {
      gameStatus.innerHTML = "Draw";
    }
  } else {
    alert("Oops! Try another cell");
  }
}

function changePlayer() {
  if (gameActive) {
    currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
  }
}

function win() {
  for (let i = 0; i < winCombinations.length; i++) {
    const firstLine = gameState[winCombinations[i][0]];
    const secondLine = gameState[winCombinations[i][1]];
    const thirdLine = gameState[winCombinations[i][2]];

    if (firstLine === "" || secondLine === "" || thirdLine === "") {
      continue;
    }

    if (firstLine === secondLine && secondLine === thirdLine) {
      cells.forEach((cell) => {
        cell.removeEventListener("click", init);
      });

    if (currentPlayer === "X") {
        gameStatus.innerHTML = `Light side wins!`
        gameStatus.style.color = "DeepSkyBlue";
    } else {
        gameStatus.innerHTML = `Darck side wins!`;
        gameStatus.style.color = "DarkRed";
    }

      gameActive = false;
      gameStatus.style.webkitTextStrokeColor = "black";
      gameStatus.style.fontSize = "5em";
    }
  }
}

function restartGame() {
  modal.style.display = "flex";
  gameActive = true;
  currentPlayer = undefined;
  currentPlayerText.innerHTML = "Choose your side";
  buttonX.style.opacity = "1";
  buttonO.style.opacity = "1";
  gameStatus.style.color = "black";
  gameStatus.style.webkitTextStrokeColor = "Gold";
  cells.forEach((cell) => (cell.innerHTML = ""));
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.addEventListener("click", init);
  });
}

function nextGame() {
  gameActive = true;
  gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
  gameStatus.style.color = "black";
  gameStatus.style.webkitTextStrokeColor = "Gold";
  cells.forEach((cell) => (cell.innerHTML = ""));
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.addEventListener("click", init);
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", init);
});

buttonO.addEventListener("click", choosingPlayer);
buttonX.addEventListener("click", choosingPlayer);
buttonStart.addEventListener("click", startGame);
buttonRestart.addEventListener("click", restartGame);
buttonNextGame.addEventListener("click", nextGame);
