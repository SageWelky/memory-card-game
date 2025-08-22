import { createContext, useContext } from 'react'
import { useGameLogicInternal } from 'hooks/useGameLogic'

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const value = useGameLogicInternal();

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
};

export const useGameLogic = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameLogic must be used within a GameProvider');
  }

  return context
};
