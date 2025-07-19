import { useDiscardPile } from './useDiscardPile'
import { useCurrentHand } from './useCurrentHand'
import { useDrawCard } from './useDrawCard'

export function usePokemonCardsInternal() {
  const { discardPile, addToDiscardPile, isInDiscardPile } = useDiscardPile();
  const { currentHand, replaceHand, shuffleHand } = useCurrentHand();
  const { drawNewHand: _drawNewHand } = useDrawCard({ discardPile, isInDiscardPile });

  const drawNewHand = async (amount) => {
    const newHand = await _drawNewHand(amount);

    const newToDiscard = currentHand.filter(
      item => !discardPile.some(p => p.pokemonId === item.pokemonId)
    );

    addToDiscardPile(newToDiscard);
    replaceHand(newHand);
  }

  function getNewToDiscard(currentHand, discardPile) {
    const discardIds = new Set(discardPile.map(card => card.pokemonId));

    return currentHand.filter(card => !discardIds.has(card.pokemonId))
  }

  const discardHand = () => {
    const newToDiscard = getNewToDiscard(currentHand, discardPile);

    addToDiscardPile(newToDiscard);
    replaceHand([]);
  }

  return {
    currentHand,
    discardPile,
    drawNewHand,
    shuffleHand,
    discardHand
  }
}
