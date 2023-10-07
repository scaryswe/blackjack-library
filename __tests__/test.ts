import DeckOfCardsAPI from '../deckofcardsAPI';

describe('DeckOfCardsAPI', () => {
  it('should create a new deck', async () => {
    const deckApi = new DeckOfCardsAPI();
    const deckResponse = await deckApi.createNewDeck();

    expect(deckResponse.success).toBe(true);
    expect(deckResponse.deck_id).toBeDefined();
    expect(deckResponse.remaining).toBeGreaterThan(0);
  });

  // Add more test cases here for other methods and scenarios
});
