import * as readline from 'readline';
import DeckOfCardsAPI from './deckofcardsAPI'; 
import { initializeGame, startGameLoop, calculateScore, dealCard } from './blackjack';


// Define getPlayerChoice function
async function getPlayerChoice(): Promise<string> {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    // Ask the player for their move
    rl.question('Choose an action (hit/stand): ', (choice) => {
      rl.close();
      resolve(choice.trim().toLowerCase());
    });
  });
}

// Define updateGameState function
function updateGameState(playerChoice: string): void {

  if (playerChoice === 'hit') {
    dealCard(gameData.playerHand, deckApi, gameData); // Pass the required arguments
    gameData.playerScore = calculateScore(gameData.playerHand); // Calculate the player's score
  } else if (playerChoice === 'stand') {
    // Dealer's turn logic goes here
  }
  // Check for game over condition and update gameData.gameOver if necessary
  // Determine the winner and update gameData.gameOver as needed
}

// Initialize game components
const deckApi = new DeckOfCardsAPI();
const gameData = await initializeGame(); // Initialize game state

// Define the game loop
const gameLoop = async () => {
  try {
    while (!gameData.gameOver) {
      // Display game state
      console.log('--------------------------------');
      console.log('Blackjack Game');
      console.log('--------------------------------');
      console.log(`Player Hand: ${gameData.playerHand.join(', ')}`);
      console.log(`Player Score: ${gameData.playerScore}`);
      console.log(`Dealer Hand: ${gameData.dealerHand.join(', ')}`);
      console.log(`Dealer Score: ${gameData.dealerScore}`);
      console.log('--------------------------------');

      // Prompt the player for their move (use readline or inquirer)
      const playerChoice = await getPlayerChoice();
      
      // Update game state based on the player's choice
      updateGameState(playerChoice);

      // Check if the game is over
      if (gameData.gameOver) {
        console.log('--------------------------------');
        console.log('Game Over');
        console.log('--------------------------------');
        console.log(`Player Score: ${gameData.playerScore}`);
        console.log(`Dealer Score: ${gameData.dealerScore}`);
        console.log('--------------------------------');
      }
    }
  } catch (error) {
    console.error(`An error occurred: ${(error as Error).message}`);
  }
};

// Start the game loop
gameLoop();
