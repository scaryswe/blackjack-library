// Import the required modules
import fetch from 'node-fetch';

interface DeckResponse {
  deck_id: string;
  remaining: number;
  success: boolean;
  shuffled: boolean;
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

interface ShuffleDeckResponse {
  success: boolean;
  shuffled: boolean;
  remaining: number;
  deck_id: string;
}

class DeckOfCardsAPI {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://www.deckofcardsapi.com/api/deck/new/';
  }

  async createNewDeck(): Promise<DeckResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/new/shuffle/?deck_count=1`);
      if (!response.ok) {
        throw new Error('Failed to create a new deck.');
      }
      const data = (await response.json()) as DeckResponse; 
      return data;
    } catch (error) {
        throw new Error(`Failed to create a new deck: ${(error as Error).message}`);
    }
  }
  

  async drawCards(deckId: string, numCards: number): Promise<Card[]> {
    const response = await fetch(`${this.apiUrl}/${deckId}/draw/?count=${numCards}`);
    if (!response.ok) {
      throw new Error('Failed to draw cards.');
    }
    const data = (await response.json()) as DrawCardResponse;
    return data.cards;
  }

  async shuffleDeck(deckId: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${deckId}/shuffle/`);
      if (!response.ok) {
        throw new Error('Failed to shuffle the deck.');
      }
      const data = (await response.json()) as ShuffleDeckResponse; 
      if (!data.success) {
        throw new Error('Failed to shuffle the deck.');
      }
    } catch (error) {
        throw new Error(`Failed to shuffle the deck: ${(error as Error).message}`);
    }
  }
}

export default DeckOfCardsAPI; 
