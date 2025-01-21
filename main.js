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



