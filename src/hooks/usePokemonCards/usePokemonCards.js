import { useCurrentHand } from 'hooks/usePokemonCards/useCurrentHand';
import { useDiscardPile } from 'hooks/usePokemonCards/useDiscardPile';
import { useDrawCard } from 'hooks/usePokemonCards/useDrawCard';

export function usePokemonCardsInternal() {
  const { discardPileIds, addToDiscardPile, isInDiscardPile, clearDiscardPile } = useDiscardPile();
  const { currentHand, replaceHand, shuffleHand } = useCurrentHand();
  const { drawNewCards: _drawNewCards } = useDrawCard({ discardPileIds });

  const drawNewHand = async (amount, shouldShuffle = false, clickedCardIds = []) => {
    const newHand = await _drawNewCards(amount, [...clickedCardIds]);

    const newToDiscard = currentHand.filter(
      card => !isInDiscardPile(card.pokemonId)
    );

    addToDiscardPile(newToDiscard);
    if(shouldShuffle){
      shuffleHand(newHand);
    } else {
      replaceHand(newHand);
    }
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
