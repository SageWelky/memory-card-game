import { useState, useRef } from 'react'
import { useGameLogic } from '../context/GameContext'
import { generateJostleOffset } from '../utils/jostleUtils';
import { wait } from '../utils/cardUtils'

export function useShuffleAnimationsInternal() {
  const {
    started,
    loading,
    currentHand,
    score,
    gameOver,
    clickedCardIds,
    drawNewHand,
    startGame,
    endGame,
    resetGame,
    setClickedCardIds,
    incrementScore,
  } = useGameLogic();

  const [animating, setAnimating] = useState(false);
  const [shuffleToCenter, setShuffleToCenter] = useState(false);
  const [returningToGrid, setReturningToGrid] = useState(false);
  const [hideOriginal, setHideOriginal] = useState(false);
  const [grabCoordinates, setGrabCoordinates] = useState(false);
  const [jostleBarCounter, setJostleBarCounter] = useState(0);
  const [tapMode, setTapMode] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const jostleRef = useRef({});
  const cardRefs = useRef({});
  const getJostleState = () => jostleRef.current;
  let lastClickTime = 0;

  const maxJostles = 10;

  const handleCardClick = async (cardId) => {
    if (animating || gameOver) {
      return
    }

    if (clickedCardIds.has(cardId)) {
      endGame();
      return
    }

    setAnimating(true);
    setFlipped(true);
    await wait(300);

    setClickedCardIds(prev => new Set(prev).add(cardId));
    incrementScore();
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

  const handleShuffleClick = (cardId) => {
    if (!tapMode) return;

    const throttleMs = 100;

    const now = Date.now();
    if (now - lastClickTime < throttleMs) return;
    lastClickTime = now;

    jostleRef.current[cardId] = generateJostleOffset();

    setJostleBarCounter(prev => {
      const next = prev + 1;
      if (next > maxJostles) {
        setTapMode(false);
        endShuffle();
      }
      return next;
    });
  };

  return {
    cardRefs,
    flipped,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    grabCoordinates,
    jostleBarCounter,
    maxJostles,
    tapMode,
    getJostleState,
    handleCardClick,
    handleShuffleClick,
  }
}
