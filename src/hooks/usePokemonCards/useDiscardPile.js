import { useState } from 'react'

export function useDiscardPile() {
  const [discardPileIds, setDiscardPileIds] = useState(() => new Set());

  const clearDiscardPile = () => {
    setDiscardPileIds(() => new Set());
  }

  const addToDiscardPile = (cards = []) => {
    setDiscardPileIds(prev => {
      const updated = new Set(prev);
      for (const card of cards) {
        updated.add(card.pokemonId);
      }

      return updated
    });
  };

  const isInDiscardPile = (pokemonId) => discardPileIds.has(pokemonId);

  return { discardPileIds, addToDiscardPile, isInDiscardPile, clearDiscardPile }
}