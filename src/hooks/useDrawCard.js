import { generateRandomPokemonId } from '../utils/cardUtils'
import { cardManager } from '../services/cardManagerSingletoner'

export function useCardDraw({ discardPile, isInDiscardPile }) {


  const isInDrawn = (drawnCards, id) =>
    drawnCards.some(card => card.pokemonId === id);

  const drawNewHand = async (amount) => {
    if ((Math.ceil(amount / 2) + discardPile.length) > 151) {
      if (discardPile.length === 151) {
        throw new Error("No unseen cards left to draw.");
      } else {
        amount = (151 - discardPile.length) * 2;
      }
    }

    if (amount < 1) {
      throw new Error("Cannot draw less than one card.");
    }

    const drawnCards = [];

    while (drawnCards.length < amount) {
      let newId;
      const half = Math.ceil(amount / 2);

      if (drawnCards.length < half) {
        do {
          newId = generateRandomPokemonId();
        } while (isInDrawn(drawnCards, newId) || isInDiscardPile(newId));
      } else {
        do {
          newId = generateRandomPokemonId();
        } while (isInDrawn(drawnCards, newId));
      }

      const card = await cardManager.getCardById(newId);
      drawnCards.push(card);
    }

    return drawnCards
  };

  return { drawNewHand }
}
