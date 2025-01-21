// Funktion för att slumpa startspelare
function choosStartingPlayer(players) {
  const randomIndex = Math.floor(Math.random() * players.length);
  const startingPlayer = players[randomIndex];
  console.log(`${startingPlayer} börjer gissa!`);
  return startingPlayer;
}

const players = ["Player 1", "Player 2"]; // Exempel på spelare
const startingPlayer = choosStartingPlayer(players); //Slumpa och visa vem som börjar
console.log(`Spelet börjar! ${startingPlayer} är först.`); // Hänga med i turordningen i spelet

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

let number = 10;
let player1Word = [];
let player2Word = [];

// What happens when a user presses the Start game button
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide-new-game-screen");
  gameScreen.classList.add("show-game-screen");
  gameScreen.classList.remove("hide-game-screen");
  // reset player 1 variables
  player1Word.splice(0); //Reset chosen word  player 1
  player1Guessed = 0; //Reset guessed letters player 1
  player1RemainingChances = 10; //  Reset remaining chances  player 1
  // reset player 2 variables
  player2Word.splice(0); //Reset chosen word player 2
  player2Guessed = 0; //Reset guessed letters  player 2
  player2RemainingChances = 10; // Reset remaining chances player 2
});
