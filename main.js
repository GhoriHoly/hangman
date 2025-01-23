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

// Swtich the current player
function switchCurrentPlayer() {
    if (currentPlayer == players[0]) {
        currentPlayer = players[1];
        document.getElementById("message").textContent =
            "Player 2, it is your turn";
    } else if (currentPlayer == players[1]) {
        currentPlayer = players[0];
        document.getElementById("message").textContent =
            "Player 1, it is your turn";
    }
}

// Set up each player as an object
let player1 = {
    chosenWord: wordList[Math.floor(Math.random() * wordList.length)], //Randomizes the player's word
    guessedLetters: [], // Stores the player's guessed letters
    displayedWord: [], // Representation of the word, underscores or correctly guessed letters
    wrongGuesses: 0, // Tracks number of wrong guesses
    addWrongGuess: this.wrongGuesses++,
};
let player2 = {
    chosenWord: wordList[Math.floor(Math.random() * wordList.length)], //Randomizes the player's word
    guessedLetters: [], // Stores the player's guessed letters
    displayedWord: [], // Representation of the word, underscores or correctly guessed letters
    wrongGuesses: 0, // Tracks number of wrong guesses
    addWrongGuess: this.wrongGuesses++,
};

//Initialize each player, used when starting/resetting game, resetting the variables and randomizing a new word
function initPlayers() {
    player1 = {
        chosenWord: wordList[Math.floor(Math.random() * wordList.length)], //Randomizes the player's word
        guessedLetters: [], // Stores the player's guessed letters
        displayedWord: [], // Representation of the word, underscores or correctly guessed letters
        wrongGuesses: 0, // Tracks number of wrong guesses
        addWrongGuess: this.wrongGuesses++,
    };
    player2 = {
        chosenWord: wordList[Math.floor(Math.random() * wordList.length)], //Randomizes the player's word
        guessedLetters: [], // Stores the player's guessed letters
        displayedWord: [], // Representation of the word, underscores or correctly guessed letters
        wrongGuesses: 0, // Tracks number of wrong guesses
        addWrongGuess: this.wrongGuesses++,
    };
}

// Initialize each players displayedWord
function initPlayersWords() {
    player1.displayedWord = player1.chosenWord
        .split("")
        .map((letter) =>
            player1.guessedLetters.includes(letter) ? letter : "_"
        );
    player2.displayedWord = player2.chosenWord
        .split("")
        .map((letter) =>
            player2.guessedLetters.includes(letter) ? letter : "_"
        );
}

// Function used to fetch the current players data in other functions
function getCurrentPlayerData(currentPlayer) {
    return currentPlayer === players[0] ? player1 : player2;
}

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

const maxWrongGuesses = hangmanStages.length; // Maximum number of wrong gussess

function updateHangman() {
    const hangmanElement = document.getElementById(
        `${currentPlayer}-hangman-display`
    ); // Update hangman figure for the current player
    hangmanElement.textContent = hangmanStages[wrongGuesses];
}

function displayWord() {
    let playerData = getCurrentPlayerData(currentPlayer); // Fetch current player data
    playerData.displayedWord = playerData.chosenWord
        .split("")
        .map((letter) =>
            playerData.guessedLetters.includes(letter) ? letter : "_"
        );

    document.getElementById(`${currentPlayer}-word-display`).textContent =
        playerData.displayedWord.join(" ");
}

function handleGuess() {
    let playerData = getCurrentPlayerData(currentPlayer); // Fetch current player data
    const letterInput = document.getElementById("letter-input");
    const guess = letterInput.value.toLowerCase();

    if (
        guess &&
        guess.length === 1 &&
        !playerData.guessedLetters.includes(guess)
    ) {
        playerData.guessedLetters.push(guess);
        if (playerData.chosenWord.includes(guess)) {
            displayWord();
        } else {
            alert("Fel gissning!");
            playerData.addWrongGuess;
            updateHangman();

            if (playerData.wrongGuesses >= maxWrongGuesses) {
                document.getElementById(
                    `${currentPlayer}-message`
                ).textContent = `Du förlorade! Ordet var: ${chosenWord}`;
                document.getElementById("guess-button").disabled = true;
                document.getElementById("letter-input").disabled = true;
            }
        }
        letterInput.value = "";
        if (!playerData.displayedWord.includes("_")) {
            console.log("win");
            if (currentPlayer == players[0]) {
                endGame("Player 1", "win"); // Call end function
            } else if (currentPlayer == players[1]) {
                endGame("Player 2", "win"); // Call end function
            }
        } else {
            switchCurrentPlayer(); // Switch the current player if the game has not ended
        }
    } else {
        alert("Ange en giltig bokstav som du inte redan har gissat.");
    }
}

// Funktion för att starta spelet
function startGame() {
    initPlayers();
    initPlayersWords();
    player1.displayedWord = player1.chosenWord
        .split("")
        .map((letter) =>
            player1.guessedLetters.includes(letter) ? letter : "_"
        );
    document.getElementById("player1-word-display").textContent =
        player1.displayedWord.join(" ");
    player2.displayedWord = player2.chosenWord
        .split("")
        .map((letter) =>
            player2.guessedLetters.includes(letter) ? letter : "_"
        );
    document.getElementById("player2-word-display").textContent =
        player2.displayedWord.join(" ");
    updateHangman();
    if (currentPlayer == players[0]) {
        // Sets the message to says whos turn it is
        document.getElementById("message").textContent =
            "Player 1, it is your turn";
    } else if (currentPlayer == players[1]) {
        document.getElementById("message").textContent =
            "Player 2, it is your turn";
    }
    document.getElementById("guess-button").disabled = false;
    document.getElementById("letter-input").disabled = false;
}

// Starta spelet när sidan laddas
window.onload = startGame;

// Lägg till eventlyssnare på knappen för gissningar
document.getElementById("guess-button").addEventListener("click", handleGuess);

// Funktion för att slumpa startspelare
function choosStartingPlayer(players) {
    const randomIndex = Math.floor(Math.random() * players.length);
    startingPlayer = players[randomIndex];
    console.log(`${startingPlayer} börjer gissa!`);
    return startingPlayer;
}

const players = ["player1", "player2"]; // Exempel på spelare
let currentPlayer = choosStartingPlayer(players); //Slumpa och visa vem som börjar

console.log(`Spelet börjar! ${currentPlayer} är först.`); // Hänga med i turordningen i spelet

// Updates the visual represention of the hangman
function updateHangman() {
    let playerData = getCurrentPlayerData(currentPlayer); // Fetches the current players data
    const hangmanElement = document.getElementById(
        `${currentPlayer}-hangman-display`
    );
    hangmanElement.textContent = hangmanStages[playerData.wrongGuesses];
}

// Reveals the word with guessed letters or underscores
function revealWord() {
    // Stores this array. It is used to keep track of which letters have been revealed
    let revealedWord = chosenWord; //Maps each letter in the word to either the guesses letter or an underscore
    chosenWord.split(""); // Splits the string "____"into an array where each - becomes a separate element
    chosenWord.map((letter) =>
        guessedLetters.includes(letter) ? letter : "_"
    );
    document.getElementById("word-display").textContent =
        revealedWord.join(" "); // Update the word display in the UI
}

// Ends the game and shows optins to play again or exit
function endGame(player, win) {
    document.getElementById("guess-button").disabled = true;
    document.getElementById("letter-input").disabled = true;

    const messageElement = document.getElementById("message");
    if (win) {
        messageElement.textContent = `Congratulations ${player}! You've guessed the word!`;
    } else {
        messageElement.textContent = `You lost! The word was: ${currentPlayer.chosenWord}`;
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
