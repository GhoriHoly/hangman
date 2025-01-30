// Word list with words the players will guess
let wordList = [
    "banan",
    "äpple",
    "päron",
    "melon",
    "apelsin",
    "kiwi",
    "avokado",
    "lime",
    "körsbär",
    "oliv",
    "persika",
];

// Options category
const option = {
    fruits: ["banan", "äpple", "druvor", "päron", "melon", "apelsin", "kiwi"],
    programming: ["php", "javascript", "python", "java"],
    movies: ["coco", "up", "prestige", "inception"],
    people: ["albert", "einstein", "alexander", "mahatma ghandi", "cleopatra"],
    countries: ["Sudan", "Egypt", "Sweden", "India", "Iraq"],
};

// Select Options Category
function setCategoryAndStartGame() {
    const selectedCategory = document.getElementById("category-select").value;
    wordList = option[selectedCategory];
    startGame();
}

// Initialize players
let player1, player2;

function initPlayers() {
    player1 = {
        name: "player1",
        chosenWord: "",
        guessedLetters: [],
        displayedWord: [],
        wrongGuesses: 0,
        correctGuesses: 0,
        addWrongGuess: function () {
            this.wrongGuesses++;
        },
        addCorrectGuess: function () {
            this.correctGuesses++;
        },
    };
    player2 = {
        name: "player2",
        chosenWord: "",
        guessedLetters: [],
        displayedWord: [],
        wrongGuesses: 0,
        correctGuesses: 0,
        addWrongGuess: function () {
            this.wrongGuesses++;
        },
        addCorrectGuess: function () {
            this.correctGuesses++;
        },
    };
}

// Initialize players' words
function initPlayersWords() {
    player1.chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    player1.displayedWord = Array(player1.chosenWord.length).fill("_");
    do {
        player2.chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    } while (player2.chosenWord === player1.chosenWord || player2.chosenWord.length !== player1.chosenWord.length);
    player2.displayedWord = Array(player2.chosenWord.length).fill("_");
    document.getElementById("player1-word-display").textContent = player1.displayedWord.join(" ");
    document.getElementById("player2-word-display").textContent = player2.displayedWord.join(" ");
}

// Fetch the exact turn for player
function getCurrentPlayerData() {
    return currentPlayer === players[0] ? player1 : player2;
}

// Handle player guess
function handleGuess() {
    let playerData = getCurrentPlayerData();
    const letterInput = document.getElementById("letter-input");
    const guess = letterInput.value.toLowerCase();

    if (guess && guess.length === 1 && !playerData.guessedLetters.includes(guess)) {
        playerData.guessedLetters.push(guess);
        if (playerData.chosenWord.includes(guess)) {
            playerData.addCorrectGuess();
            displayWord();
            updateHangman(playerData);
        } else {
            alert("Fel gissning!");
            playerData.addWrongGuess();
            if (playerData.wrongGuesses >= maxWrongGuesses) {
                endGame(currentPlayer, false);
                return;
            }
        }
        letterInput.value = "";
        if (!playerData.displayedWord.includes("_")) {
            endGame(currentPlayer, true);
        } else {
            switchCurrentPlayer();
        }
    } else {
        alert("Please enter a valid letter you haven't already guessed.");
    }
}

// Switch the current player
function switchCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    document.getElementById("message").textContent = `${currentPlayer}, it is your turn`;
}

// Start game function
function startGame() {
    initPlayers();
    initPlayersWords();
    updateHangman(player1);
    updateHangman(player2);
    document.getElementById("correct-1").textContent = "0";
    document.getElementById("wrong-1").textContent = "0";
    document.getElementById("correct-2").textContent = "0";
    document.getElementById("wrong-2").textContent = "0";
    currentPlayer = choosStartingPlayer(players);
    document.getElementById("message").textContent = `${currentPlayer}, it is your turn`;
    document.getElementById("guess-button").disabled = false;
    document.getElementById("letter-input").disabled = false;
}

window.onload = function() {
    loadWordList();
    startGame();
};

// Add event listener to guess button
document.getElementById("guess-button").addEventListener("click", handleGuess);

// Choose starting player function
function choosStartingPlayer(players) {
    return players[Math.floor(Math.random() * players.length)];
}

const players = ["player1", "player2"];
let currentPlayer = choosStartingPlayer(players);

console.log(`Spelet börjar! ${currentPlayer} är först.`);
