import { cardManager } from 'services/cardManagerSingleton';
import {
  ALL_IDS,
  getRandomIdFromList,
} from 'utils/cardUtils';

export function useDrawCard({ discardPileIds }) {

  const drawNewCards = async (amount, clickedCardIds = []) => {

    const totalPossibleCards = 151;
    const discardSize = discardPileIds.size;

    if ((1 + discardSize) > totalPossibleCards) {
      if (discardSize === totalPossibleCards) {
        throw new Error("No unseen cards left to draw.");
      } else {
        amount = totalPossibleCards - discardSize + 1;
      }
    }

    if (amount < 1) {
      throw new Error("Cannot draw less than one card.");
    }

    const drawnCards = [];

    if (clickedCardIds.length > 0) {
      const clickedCardId = getRandomIdFromList(clickedCardIds);
      const clickedPokemonId = cardManager.getPokemonIdFromCardId(clickedCardId)
      const clickedCard = await cardManager.getCardById(clickedPokemonId);
      drawnCards.push(clickedCard);
    }

    const unseenIds = ALL_IDS.filter(id => !discardPileIds.has(id));
    if (unseenIds.length === 0) {
      throw new Error("No unseen Pokémon left to draw.");
    }
    const unseenId = getRandomIdFromList(unseenIds);
    const unseenCard = await cardManager.getCardById(unseenId);
    drawnCards.push(unseenCard);

    while (drawnCards.length < amount) {
      const usedIds = new Set(drawnCards.map(c => c.pokemonId));
      const availableIds = ALL_IDS.filter(id => !usedIds.has(id));

      if (availableIds.length === 0) {
        throw new Error("No available Pokémon left to draw.");
      }

      const newId = getRandomIdFromList(availableIds);
      const card = await cardManager.getCardById(newId);
      drawnCards.push(card);
    }
    return drawnCards
  }

  return { drawNewCards }
}
