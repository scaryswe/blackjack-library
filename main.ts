// main.ts

// Import necessary dependencies
import * as readline from 'readline';
import DeckOfCardsAPI from './deckofcardsAPI'; // Import your custom module for managing decks
import { initializeGame, startGameLoop, dealCard, calculateScore } from './blackjack'; // Import game logic functions

// Other imports, such as player or dealer modules, if applicable

// Define getPlayerChoice function
async function getPlayerChoice(): Promise<string> {
  // Create a readline interface for getting player input
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
async function updateGameState(playerChoice: string): Promise<void> {
  // Implement your logic to update the game state based on the player's choice
  // You can add the logic for the dealer's turn here as well
  
  if (playerChoice === 'hit') {
    await dealCard(gameData.playerHand, deckApi, gameData);
    gameData.playerScore = calculateScore(gameData.playerHand);
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
    console.error(`An error occurred: ${error.message}`);
  }
};

// Start the game loop
gameLoop();
