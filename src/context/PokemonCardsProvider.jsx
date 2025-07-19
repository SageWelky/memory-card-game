import { createContext, useContext } from 'react'
import { usePokemonCardsInternal } from '../hooks/usePokemonCards'

const PokemonCardsContext = createContext(null);

export const PokemonCardsProvider = ({ children }) => {
  const value = usePokemonCardsInternal();
  return (
    <PokemonCardsContext.Provider value={value}>
      {children}
    </PokemonCardsContext.Provider>
  )
};

export const usePokemonCards = () => {
  const context = useContext(PokemonCardsContext);
  if (!context) {
    throw new Error("usePokemonCards must be used within a PokemonCardsProvider");
  }
  return context
};
