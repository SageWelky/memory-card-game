import { usePokemonCardsInternal } from 'hooks/usePokemonCards/usePokemonCards';
import { useState } from 'react';

export function useGameLogicInternal() {
  const {
    currentHand,
    discardHand,
    drawNewHand,
    firstLoadDrawNewHand,
    shuffleHand,
    clearDiscardPile
  } = usePokemonCardsInternal();

  const [started, setStarted] = useState(false);
  const [clickedCardIds, setClickedCardIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const incrementScore = () => {
    setScore(prev => prev + 1);
  }

  const endGame = () => {
    setGameOver(true);
  }

  const resetGame = () => {
    setClickedCardIds(new Set());
    setScore(0);
    setGameOver(false);
    discardHand();
    clearDiscardPile();
    setStarted(false);
  };

  const startGame = () => {
    firstLoadDrawNewHand(12);
    setStarted(true);
  }

  return {
    started,
    currentHand,
    score,
    gameOver,
    clickedCardIds,
    drawNewHand,
    firstLoadDrawNewHand,
    shuffleHand,
    startGame,
    endGame,
    resetGame,
    setClickedCardIds,
    incrementScore,
  }
}
