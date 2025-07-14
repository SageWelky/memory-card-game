import { useState } from 'react';

export function useDiscardPile() {
  const [discardPile, setDiscardPile] = useState([]);

  const addToDiscardPile = (cards = []) => {
    setDiscardPile(prev => [...prev, ...cards]);
  };

  const isInDiscardPile = (pokemonId) => {
    return discardPile.some(card => card.pokemonId === pokemonId);
  };

  return { discardPile, addToDiscardPile, isInDiscardPile };
}
