import { useState } from 'react'
import { usePokemonCardsInternal } from './usePokemonCards'

export function useGameLogicInternal() {
  const {
    currentHand,
    discardHand,
    drawNewHand,
    shuffleHand,
    clearDiscardPile
  } = usePokemonCardsInternal();

  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
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
    setStarted(true);

    setLoading(true);

    // %%%%%%%%%%%%
    //loadData();
    // %%%%%%%%%%%%

    // %%%%%%%%%%%%
    //const idRef = useRef(0);
    // %%%%%%%%%%%%

    // %%%%%%%%%%%%
    /*loadData = async () => {

        try {
          idRef.current++;
          const currRequestId = idRef.current;

          const myData = await loadSomeData(id);

          if (currRequestId == idRef.current) {
            setData(myData);
            drawNewHand(12);
          }
        }
        catch (e) {
          setError(e);
        }
        finally {
          //always disable spinner so it doesn't get stuck loading
          setLoading(false);
        }
    }*/
    // %%%%%%%%%%%%

    const initializeHand = setTimeout(async () => {
      drawNewHand(12);
      setLoading(false);
    }, 400);
    return () => {
      clearTimeout(initializeHand);
    }
  }

  return {
    started,
    loading,
    currentHand,
    score,
    gameOver,
    clickedCardIds,
    drawNewHand,
    shuffleHand,
    startGame,
    endGame,
    resetGame,
    setClickedCardIds,
    incrementScore,
  }
}
