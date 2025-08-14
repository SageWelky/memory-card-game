import { useDiscardPile } from 'hooks/usePokemonCards/useDiscardPile'
import { useCurrentHand } from 'hooks/usePokemonCards/useCurrentHand'
import { useDrawCard } from 'hooks/usePokemonCards/useDrawCard'

export function usePokemonCardsInternal() {
  const { discardPileIds, addToDiscardPile, isInDiscardPile, clearDiscardPile } = useDiscardPile();
  const { currentHand, replaceHand, shuffleHand } = useCurrentHand();
  const { drawNewCards: _drawNewCards } = useDrawCard({ discardPileIds });

  const drawNewHand = async (amount, clickedCardIds = []) => {
    const newHand = await _drawNewCards(amount, [...clickedCardIds]);

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
