// Import necessary dependencies
import DeckOfCardsAPI from './deckofcardsAPI'; 
const CARD_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'JACK': 10, 'QUEEN': 10, 'KING': 10, 'ACE': 11,
};
// Function to initialize the game state
export async function initializeGame() {
    const deckApi = new DeckOfCardsAPI();
    try {
        const deckResponse = await deckApi.createNewDeck();
        const gameState = {
            playerHand: [],
            dealerHand: [],
            playerScore: 0,
            dealerScore: 0,
            gameOver: false,
            deckId: deckResponse.deck_id,
            cardsRemaining: deckResponse.remaining, // Store the total number of cards
        };
        return gameState;
    }
    catch (error) {
        throw new Error(`Failed to initialize the game: ${error.message}`);
    }
}
// Function to calculate the score of a hand
export function calculateScore(hand) {
    let score = 0;
    let numAces = 0;
    for (const card of hand) {
        const cardValue = CARD_VALUES[card.slice(0, -1)]; // Remove the suit from the card
        score += cardValue;
        if (cardValue === 11) {
            numAces++;
        }
    }

    while (numAces > 0 && score > 21) {
        score -= 10;
        numAces--;
    }
    return score;
}
// Function to deal a card to a hand
export async function dealCard(hand, deckApi, gameState) {
    try {
        const cards = await deckApi.drawCards(gameState.deckId, 1);
        hand.push(cards[0].code);
        gameState.cardsRemaining--; // Update the remaining cards
    }
    catch (error) {
        throw new Error(`Failed to deal a card: ${error.message}`);
    }
}
// Function to start the game loop
export function startGameLoop(gameState) {

    while (!gameState.gameOver) {
        // Display game state and prompt for player's action
        console.log('Player Hand:', gameState.playerHand.join(', '));
        console.log('Player Score:', gameState.playerScore);
        console.log('Dealer Hand:', gameState.dealerHand[0], '***'); // Show only the dealer's first card
        console.log('--------------------------------');
        // Check for player blackjack or bust
        if (gameState.playerScore === 21) {
            console.log('Blackjack! You win!');
            gameState.gameOver = true;
            break;
        }
        else if (gameState.playerScore > 21) {
            console.log('Bust! Dealer wins.');
            gameState.gameOver = true;
            break;
        }

    console.log('Game over.');
}
}
