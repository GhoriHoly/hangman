// Ordlista med ord som spelarna ska gissa
const wordList = [
    "banan",
    "äpple",
    "jordgubbe",
    "päron",
    "melon",
    "apelsin",
    "kiwi"
];


let chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = []; 
let displayedWord = []; 


function displayWord() {
    displayedWord = chosenWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    );
    document.getElementById('word-display').textContent = displayedWord.join(' ');
}


function handleGuess() {
    const letterInput = document.getElementById('letter-input');
    const guess = letterInput.value.toLowerCase();

    if (guess && guess.length === 1 && !guessedLetters.includes(guess)) {
        guessedLetters.push(guess);
        if (chosenWord.includes(guess)) {
            displayWord(); 
        } else {
            alert("Fel gissning!");
        }
        letterInput.value = ''; 
    } else {
        alert("Ange en giltig bokstav som du inte redan har gissat.");
    }

    if (!displayedWord.includes('_')) {
        document.getElementById('message').textContent = "Grattis! Du har gissat ordet!";
    }
}

// Funktion för att starta spelet
function startGame() {
  
    guessedLetters = [];
    displayWord();
    document.getElementById('message').textContent = "Vänta, turen är på gång...";
}

// Starta spelet när sidan laddas
window.onload = startGame;

// Lägg till eventlyssnare på knappen för gissningar
document.getElementById('guess-button').addEventListener('click', handleGuess);
s



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



