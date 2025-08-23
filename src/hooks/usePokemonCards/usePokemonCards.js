import { useCurrentHand } from 'hooks/usePokemonCards/useCurrentHand';
import { useDiscardPile } from 'hooks/usePokemonCards/useDiscardPile';
import { useDrawCard } from 'hooks/usePokemonCards/useDrawCard';

export function usePokemonCardsInternal() {
  const { discardPileIds, addToDiscardPile, isInDiscardPile, clearDiscardPile } = useDiscardPile();
  const { currentHand, replaceHand, shuffleHand } = useCurrentHand();
  const { drawNewCards: _drawNewCards, firstLoadDrawNewCards: _firstLoadDrawNewCards } = useDrawCard({ discardPileIds });

  const drawNewHand = async (amount = 12, shouldShuffle = false, clickedCardIds = []) => {
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

  const firstLoadDrawNewHand = async (amount = 12, clickedCardIds = []) => {
    const newHand = await _firstLoadDrawNewCards(amount, [...clickedCardIds]);

    const newToDiscard = currentHand.filter(
      card => !isInDiscardPile(card.pokemonId)
    );

    shuffleHand(newHand);
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
    firstLoadDrawNewHand,
    shuffleHand,
    discardHand
  }
}
