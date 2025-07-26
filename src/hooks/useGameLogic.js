import { useState, useCallback } from 'react'
import { usePokemonCardsInternal } from './usePokemonCards'
import { wait } from '../utils/cardUtils'

export function useGameLogicInternal() {
  const {
    currentHand,
    discardHand,
    drawNewHand,
    clearDiscardPile
  } = usePokemonCardsInternal();

  const [animating, setAnimating] = useState(false);
  const [shuffleToCenter, setShuffleToCenter] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clickedCardIds, setClickedCardIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = async (cardId) => {
    if (animating || gameOver) {
      return
    }

    if (clickedCardIds.has(cardId)) {
      setGameOver(true);
      return
    }

    setAnimating(true);
    setFlipped(true);
    await wait(600);
    setShuffleToCenter(true);

    setClickedCardIds(prev => new Set(prev).add(cardId));
    setScore(prev => prev + 1);

    await drawNewHand(12);

    await wait(400);

    setShuffleToCenter(false);
    await wait(500);
    setFlipped(false);
    setAnimating(false);
  };

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
    }, 800);
    return () => {
      clearTimeout(initializeHand);
    }
  }

  return {
    started,
    loading,
    flipped,
    animating,
    shuffleToCenter,
    currentHand,
    score,
    gameOver,
    drawNewHand,
    handleCardClick,
    startGame,
    resetGame,
  }
}
