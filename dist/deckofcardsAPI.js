// Import the required modules
import fetch from 'node-fetch';

class DeckOfCardsAPI {
    apiUrl;
    constructor() {
        this.apiUrl = 'https://www.deckofcardsapi.com/api/deck/new/';
    }
    async createNewDeck() {
        try {
            const response = await fetch(`${this.apiUrl}/new/shuffle/?deck_count=1`);
            if (!response.ok) {
                throw new Error('Failed to create a new deck.');
            }
            const data = (await response.json()); 
            return data;
        }
        catch (error) {
            throw new Error(`Failed to create a new deck: ${error.message}`);
        }
    }
    async drawCards(deckId, numCards) {
        const response = await fetch(`${this.apiUrl}/${deckId}/draw/?count=${numCards}`);
        if (!response.ok) {
            throw new Error('Failed to draw cards.');
        }
        const data = (await response.json()); 
        return data.cards;
    }
    async shuffleDeck(deckId) {
        try {
            const response = await fetch(`${this.apiUrl}/${deckId}/shuffle/`);
            if (!response.ok) {
                throw new Error('Failed to shuffle the deck.');
            }
            const data = (await response.json()); 
            if (!data.success) {
                throw new Error('Failed to shuffle the deck.');
            }
        }
        catch (error) {
            throw new Error(`Failed to shuffle the deck: ${error.message}`);
        }
    }
}
export default DeckOfCardsAPI; 
