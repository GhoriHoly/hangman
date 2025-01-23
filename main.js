// Word list with words the players will guess
const wordList = [
    "banan",
    "äpple",
    "jordgubbe",
    "päron",
    "melon",
    "apelsin",
    "kiwi",
];

const hangmanStages = [
    `
     
     
     
     
     
     
    `,
    `
     
     
     
     
     
     -----
    `,
    `
     
     
     
     |
     |
     -----
    `,
    `
     O  
     |
     |
     |
     |
     -----
    `,
    `
     O  
    /|  
     |  
     |  
     |
     -----
    `,
    `
     O  
    /|\\
     |  
     |  
     |
     -----
    `,
    `
     O  
    /|\\
     |  
    / \\
     |
     -----
    `,
];

let wrongGuesses = 0; // Tracks wrong guesses
const maxWrongGuesses = hangmanStages.length; // Maximum number of wrong gussess

function updateHangman() {
    const hangmanElement = document.getElementById("player1-hangman-display");
    hangmanElement.textContent = hangmanStages[wrongGuesses];
}

let chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = [];
let displayedWord = [];

function displayWord() {
    displayedWord = chosenWord
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"));
    document.getElementById("player1-word-display").textContent =
        displayedWord.join(" ");
}

function handleGuess() {
    const letterInput = document.getElementById("player1-letter-input");
    const guess = letterInput.value.toLowerCase();

    if (guess && guess.length === 1 && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        if (chosenWord.includes(guess)) {
            displayWord();
        } else {
            alert("Fel gissning!");
            wrongGuesses++;
            updateHangman();

            if (wrongGuesses >= maxWrongGuesses) {
                document.getElementById(
                    "player1-message"
                ).textContent = `Du förlorade! Ordet var: ${chosenWord}`;
                document.getElementById("guess-button").disabled = true;
                document.getElementById("letter-input").disabled = true;
            }
        }
        letterInput.value = "";
    } else {
        alert("Ange en giltig bokstav som du inte redan har gissat.");
    }

    if (!displayedWord.includes("_")) {
        document.getElementById("player1-message").textContent =
            "Grattis! Du har gissat ordet!";
    }
}

// Funktion för att starta spelet
function startGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    displayWord();
    updateHangman();
    document.getElementById("player1-message").textContent =
        "Vänta, turen är på gång...";
    document.getElementById("player1-guess-button").disabled = false;
    document.getElementById("player1-letter-input").disabled = false;
}

// Starta spelet när sidan laddas
window.onload = startGame;

// Lägg till eventlyssnare på knappen för gissningar
document
    .getElementById("player1-guess-button")
    .addEventListener("click", handleGuess);

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

// Updates the visual represention of the hangman
function updateHangman() {
    let revealedWord = []; // Displayedword
    const hangmanElement = document.getElementById("player1-hangman-display");
    hangmanElement.textContent = hangmanStages[wrongGuesses];
}

// Reveals the word with guessed letters or underscores
function revealWord() {
    // Stores this array. It is used to keep track of which letters have been revealed
    revealedWord = chosenWord; //Maps each letter in the word to either the guesses letter or an underscore
    chosenWord.split(""); // Splits the string "____"into an array where each - becomes a separate element
    chosenWord.map((letter) =>
        guessedLetters.includes(letter) ? letter : "_"
    );
    document.getElementById("word-display").textContent =
        revealedWord.join(" "); // Update the word display in the UI
}

// Ends the game and shows optins to play again or exit
function endGame(word) {
    document.getElementById("guess-button").disabled = true;
    document.getElementById("letter-input").disabled = true;

    const messageElement = document.getElementById("message");
    if (won) {
        messageElement.textContent =
            "Congratulations! You've guessed the word!";
    } else {
        messageElement.textContent = `You lost! The word was: ${chosenWord}`;
    }
    showEndOptions();
}

// Show button for playing again or exiting
function showEndOptions() {
    const messageElement = document.getElementById("message");
    messageElement.insertAdjacentHTML(
        "afterend",
        `<div id = "end-options">
        <button id = "play-again-button" class = "button">Play Again</button>
        <button id = "exit-button" class = "button">Exit </button>
        </div>`
    );

    // Event listener for "Play Again"
    document
        .getElementById("play-again-button")
        .addEventListener("click", () => {
            document.getElementById("end-options").remove();
            startGame();
            chosenWord = wordList[Math.random() * wordList];
        });

    // Event listener for "Exit"
    document.getElementById("exit-button").addEventListener("click", () => {
        document.getElementById("message").textContent =
            "Thank you for playing!";
        document.getElementById("word-display").textContent = "";
        document.getElementById("hangman-display").textContent = "";
        document.getElementById("end-option").remove();
    });
}

const startBtn = document.getElementById("start-btn"); // Variable for Start new game-button
// What happens when a user presses the Start new game button
startBtn.addEventListener("click", () => {
    startGame();
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)]; // RAndomize a new word
});

// Funktion för att lägga till nytt ord till ordlistan
function addNewWord() {
    const newWordInput = document.getElementById("new-word-input");
    const newWord = newWordInput.value.trim().toLowerCase();

    // Kontrollera om ordet är giltigt
    if (newWord && !wordList.includes(newWord)) {
        wordList.push(newWord);
        alert("Ordet har lagts till!");
    } else {
        alert("Ange ett giltigt ord som inte redan finns i listan.");
    }

    // Rensa input-fältet
    newWordInput.value = "";
}

// Lägg till eventlyssnare på knappen för att lägga till ord
document
    .getElementById("add-word-button")
    .addEventListener("click", addNewWord);
