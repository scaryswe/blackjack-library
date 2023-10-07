// Import fetch for interacting with the API
import fetch from 'node-fetch';

// Defined interfaces for API responses
interface DeckResponse {
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface DrawCardResponse {
  cards: Card[];
}

interface Card {
  code: string;
  value: string;
  suit: string;
  image: string;
}

// Defined API class
class DeckOfCardsAPI {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://www.deckofcardsapi.com/api/deck';
  }

  async createNewDeck(): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/new/shuffle/?deck_count=1`);
      if (!response.ok) {
        throw new Error('Failed to create a new deck.');
      }
      const data = await response.json() as DeckResponse; // Specify the expected type
      return data.deck_id;
    } catch (error) {
      throw new Error(`Failed to create a new deck: ${error.message}`);
    }
  }
  
  async drawCards(deckId: string, numCards: number): Promise<Card[]> {
    try {
      const response = await fetch(`${this.apiUrl}/${deckId}/draw/?count=${numCards}`);
      if (!response.ok) {
        throw new Error('Failed to draw cards.');
      }
      const data = await response.json() as DrawCardResponse; // Specify the expected type
      return data.cards;
    } catch (error) {
      throw new Error(`Failed to draw cards: ${error.message}`);
    }
  }  

  async shuffleDeck(deckId: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${deckId}/shuffle/`);
      if (!response.ok) {
        throw new Error('Failed to shuffle the deck.');
      }
    } catch (error) {
      throw new Error(`Failed to shuffle the deck: ${error.message}`);
    }
  }
}

export default DeckOfCardsAPI;
