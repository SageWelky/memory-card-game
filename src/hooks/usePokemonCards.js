import { useDiscardPile } from './useDiscardPile'
import { useCurrentHand } from './useCurrentHand'
import { useDrawCard } from './useDrawCard'

export function usePokemonCardsInternal() {
  const { discardPileIds, addToDiscardPile, isInDiscardPile, clearDiscardPile } = useDiscardPile();
  const { currentHand, replaceHand, shuffleHand } = useCurrentHand();
  const { drawNewCards: _drawNewCards } = useDrawCard({ discardPileIds });

  const drawNewHand = async (amount) => {
    const newHand = await _drawNewCards(amount);

    const newToDiscard = currentHand.filter(
      card => !isInDiscardPile(card.pokemonId)
    );

    addToDiscardPile(newToDiscard);
    replaceHand(newHand);
  };

  const discardHand = () => {
    const newToDiscard = currentHand.filter(
      card => !isInDiscardPile(card.pokemonId)
    );

    addToDiscardPile(newToDiscard);
    replaceHand([]);
  };

  return {
    currentHand,
    discardPileIds,
    clearDiscardPile,
    drawNewHand,
    shuffleHand,
    discardHand
  }
}
