import { createContext, useContext } from 'react'
import { useShuffleAnimationsInternal } from 'src/hooks/useShuffleAnimations/useShuffleAnimations'

const ShuffleContext = createContext(null);

export const ShuffleProvider = ({ children }) => {
  const value = useShuffleAnimationsInternal();

  return (
    <ShuffleContext.Provider value={value}>
      {children}
    </ShuffleContext.Provider>
  )
};

export const useShuffleAnimations = () => {
  const context = useContext(ShuffleContext);
  if (!context) {
    throw new Error('useGame must be used within a ShuffleProvider');
  }

  return context
};
