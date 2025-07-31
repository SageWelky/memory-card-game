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
  const [returningToGrid, setReturningToGrid] = useState(false);
  const [hideOriginal, setHideOriginal] = useState(false);
  const [grabCoordinates, setGrabCoordinates] = useState(false);
  const [jostle, setJostle] = useState(false);
  const [jostleBarCounter, setJostleBarCounter] = useState(0);
  const [tapMode, setTapMode] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clickedCardIds, setClickedCardIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const maxJostles = 10;

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
    await wait(300);

    setClickedCardIds(prev => new Set(prev).add(cardId));
    setScore(prev => prev + 1);
    await drawNewHand(12);
    setGrabCoordinates(true);
    await wait(200);

    setHideOriginal(true);
    setShuffleToCenter(true);
    await wait(900);
    setTapMode(true);
  };

  const endShuffle = async () => {
    setReturningToGrid(true);
    await wait(700);

    setShuffleToCenter(false);
    await wait(750);

    setHideOriginal(false);
    setReturningToGrid(false);
    await wait(300);

    setGrabCoordinates(false);
    setFlipped(false);
    await wait(400);
    setAnimating(false);
    setJostleBarCounter(0);
  };

  const handleShuffleClick = async (cardId) => {
    setJostle(true);
    await wait(100);
    setJostle(false);
    setJostleBarCounter(prev => prev + 1);
    if (jostleBarCounter > maxJostles - 1) {
      await wait(400);
      setTapMode(false);
      endShuffle();
    }
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
    }, 400);
    return () => {
      clearTimeout(initializeHand);
    }
  }

  return {
    started,
    loading,
    flipped,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    grabCoordinates,
    jostle,
    jostleBarCounter,
    maxJostles,
    tapMode,
    currentHand,
    score,
    gameOver,
    drawNewHand,
    handleCardClick,
    handleShuffleClick,
    startGame,
    resetGame,
  }
}
