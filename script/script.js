const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

let number = 10;
let player1Word = [];
let player2Word = [];

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide-new-game-screen");
  gameScreen.classList.add("show-game-screen");
  gameScreen.classList.remove("hide-game-screen");
  // reset player 1 variables
  player1Word.splice(0);
  player1Guessed = 0;
  player1RemainingChances = 10;
  // reset player 2 variables
  player2Word.splice(0);
  player2Guessed = 0;
  player2RemainingChances = 10;
});
