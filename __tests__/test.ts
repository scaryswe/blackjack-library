import DeckOfCardsAPI from '../deckofcardsAPI';
import { calculateScore } from '../blackjack';


describe('DeckOfCardsAPI', () => {
  it('should create a new deck', async () => {
    const deckApi = new DeckOfCardsAPI();
    const deckResponse = await deckApi.createNewDeck();

    expect(deckResponse.success).toBe(true);
    expect(deckResponse.deck_id).toBeDefined();
    expect(deckResponse.remaining).toBeGreaterThan(0);
  });

});
describe('calculateScore', () => {
  it('should correctly calculate the score of a hand', () => {
    // Test case 1: Hand with numeric cards
    const hand1 = ['2D', '5H', '9S']; // 2 + 5 + 9 = 16
    expect(calculateScore(hand1)).toBe(16);

    // Test case 2: Hand with face cards and Ace
    const hand2 = ['KH', 'AD', 'JS']; // 10 + 11 (Ace as 11) + 10 = 31 (Ace is reduced to 1 to avoid bust)
    expect(calculateScore(hand2)).toBe(31);

    // Test case 3: Hand with multiple Aces
    const hand3 = ['AS', 'AC', 'AD']; // 11 (Ace as 11) + 11 (Ace as 11) + 11 (Ace as 11) = 33 (Two Aces are reduced to 1 each to avoid bust)
    expect(calculateScore(hand3)).toBe(33);

    // Test case 4: Hand with Blackjack (10-value card and Ace)
    const hand4 = ['10D', 'AH']; // 10 + 11 (Ace as 11) = 21 (Blackjack)
    expect(calculateScore(hand4)).toBe(21);

    // Test case 5: Hand with bust (Ace used as 11 causing bust)
    const hand5 = ['9C', '4H', 'AD']; // 9 + 4 + 11 (Ace as 11) = 24 (Ace is reduced to 1 to avoid bust)
    expect(calculateScore(hand5)).toBe(24);
  });
});