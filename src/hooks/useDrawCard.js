import {
  ALL_IDS,
  getUsedIds,
  getAvailableIds,
  getRandomIdFromList
} from '../utils/cardUtils'
import { cardManager } from '../services/cardManagerSingleton'

export function useDrawCard({ discardPile, isInDiscardPile }) {

  const isInDrawn = (drawnCards, id) => {
    drawnCards.some(card => card.pokemonId === id)
  }

  const drawNewHand = async (amount) => {
    const maxCards = 151;

    if ((Math.ceil(amount / 2) + discardPile.length) > maxCards) {
      if (discardPile.length === maxCards) {
        throw new Error("No unseen cards left to draw.");
      } else {
        amount = (maxCards - discardPile.length) * 2;
      }
    }

    if (amount < 1) {
      throw new Error("Cannot draw less than one card.");
    }

    const drawnCards = [];
    const half = Math.ceil(amount / 2);

    while (drawnCards.length < amount) {
      const usedIds = getUsedIds(discardPile, drawnCards);
      const availableIds = ALL_IDS.filter(id => !usedIds.has(id));

      if (availableIds.length === 0) {
        throw new Error("No available Pokémon left to draw.");
      }

      let newId;

      if (drawnCards.length < half) {
        // Prioritize unseen cards: not in discardPile or already drawn
        const unseenIds = availableIds.filter(id => !discardPile.some(c => c.pokemonId === id));
        if (unseenIds.length === 0) {
          throw new Error("No unseen Pokémon left to draw.");
        }
        newId = getRandomIdFromList(unseenIds);
      } else {
        // Accept duplicates from discard pile
        newId = getRandomIdFromList(availableIds);
      }

      const card = await cardManager.getCardById(newId);
      drawnCards.push(card);
    }

    return drawnCards
  }


  return { drawNewHand }
}
