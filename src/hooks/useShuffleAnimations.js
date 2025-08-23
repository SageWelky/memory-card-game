import { useAnimationControls } from 'framer-motion';
import { useState, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { useGameLogic } from 'context/GameContext';
import { generateJostleOffset } from 'utils/jostleUtils';
import { createMountController } from 'src/utils/mountControllerUtils';

export function useShuffleAnimationsInternal() {
  const {
    started,
    endGame,
    score,
    incrementScore,
    clickedCardIds,
    setClickedCardIds,
    currentHand,
    drawNewHand,
    firstLoadDrawNewHand,
    shuffleHand,
  } = useGameLogic();

  const [animating, setAnimating] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [hideOriginal, setHideOriginal] = useState(false);
  const [showShuffleOverlay, setShowShuffleOverlay] = useState(false);
  const [shuffleToCenter, setShuffleToCenter] = useState(false);
  const [returningToGrid, setReturningToGrid] = useState(false);
  const [tapMode, setTapMode] = useState(false);
  const cardRefs = useRef({});
  const shuffleRefs = useRef({});
  const maxJostles = 10;
  const jostleCounter = useRef(0);
  const jostleOffsets = useRef({});
  const barControls = {
    tapBar: useAnimationControls(),
    barFill: useAnimationControls(),
  };
  const shuffleCardWrapController = useMemo(createMountController,[]);

  const precomputeJostleOffsets = useCallback(() => {
    const scale = window.innerWidth / 1920;
    const distance = scale * 500;
    currentHand.forEach((card) => {
      const id = card.cardId;
      if (!jostleOffsets.current[id]) {
        jostleOffsets.current[id] = {};
      }
      for (let i = 0; i <= maxJostles; i++) {
        jostleOffsets.current[id][i] = generateJostleOffset(distance, 300);
      }
    });
  }, [currentHand]);

  useLayoutEffect(() => {
    precomputeJostleOffsets();
  }, [currentHand]);

  const playFlipAnimation = () => new Promise(resolve => {
    setFlipped((prev) => !prev);
    let refs = Object.values(cardRefs.current);
    let remaining = refs.length;
    refs.forEach(ref => {
      ref.onFlipComplete = () => {
        remaining--;
        if (remaining === 0) {
          resolve();
        }
      };
    });
  });

  const playShuffleToCenterAnimation = () => new Promise(resolve => {
    setHideOriginal(true);
    setShuffleToCenter(true);
    let refs = Object.values(shuffleRefs.current);
    let remaining = refs.length;
    refs.forEach(ref => {
      ref.onShuffleToCenterComplete = () => {
        remaining--;
        if (remaining === 0) {
          setShuffleToCenter(false);
          precomputeJostleOffsets();
          resolve();
        }
      };
    });
  });

  const playReturningToGridAnimation = () => new Promise(resolve => {
    setReturningToGrid(true);
    setTapMode(false);
    let refs = Object.values(shuffleRefs.current);
    let remaining = refs.length;
    refs.forEach(ref => {
      ref.onReturningToGridComplete = () => {
        remaining--;
        if (remaining === 0) {
          setHideOriginal(false);
          setReturningToGrid(false);
          jostleCounter.current = 0;
          resolve();
        }
      };
    });
  });

  const animateShuffleStart = async () => {
    setShowShuffleOverlay(true);
    await shuffleCardWrapController.allReady();
    await playShuffleToCenterAnimation();
  }

  const handleCardClick = useCallback(async (cardId) => {
    if (animating) {
      return
    }

    if (clickedCardIds.has(cardId)) {
      endGame();
      return
    }
    setAnimating(true);
    await playFlipAnimation();
    // This handles needing the newly clicked card state being
    //  stale at this point in the lifecycle.
    const newClickedCardIds = new Set(clickedCardIds);
    newClickedCardIds.add(cardId);
    setClickedCardIds(newClickedCardIds);
    // Score will not change state until after exiting handleCardClick.
    incrementScore();
    // Third clicked card will show a score of 2 here.
    if(score > 1) {
      await drawNewHand(12, true, newClickedCardIds);
    } else {
      await firstLoadDrawNewHand(12, newClickedCardIds);
    }

    await animateShuffleStart();
    setTapMode(true);
  }, [animating, currentHand, incrementScore, clickedCardIds]);

  const handleShuffleClick = useCallback((cardId, centerX, centerY) => {
    if (!tapMode) {
      return
    }

    jostleCounter.current = Math.min(jostleCounter.current + 1, maxJostles);
    const offsetIndex = jostleCounter.current;
    Object.values(shuffleRefs.current).forEach((ref) => {
      if (!ref.controls) return;
      let offset = jostleOffsets.current[ref.cardId][offsetIndex] ?? { x: 0, y: 0, rotate: 0 };
      ref.controls.start({
        x: centerX + offset.x,
        y: centerY + offset.y,
        rotate: offset.rotate,
        transition: { type: "spring", stiffness: 200, damping: 18 },
      });
    });

    barControls.tapBar.start({
      scale: Math.random() * 0.2 + 0.9,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
      rotate: Math.random() * 15 - 7.5,
      transition: {type: "spring", stiffness: 300, damping: 10 },
    });

    if (jostleCounter.current == (maxJostles - 1)) {
      barControls.barFill.start({
        width: "70dvw",
        backgroundColor: ["#f00000", "#ff7c7c", "#f00000"],
        transition: {
          duration: 0.6,
          ease: ["easeInOut"],
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    }

    barControls.barFill.start({
      width: `${(jostleCounter.current / (maxJostles - 1)) * 70}dvw`,
      transition: { duration: 0.1 }
    });

    if (jostleCounter.current >= maxJostles) {
      endShuffle();
    }
  }, [tapMode]);

  const endShuffle = useCallback(async () => {
    await playReturningToGridAnimation();
    setShowShuffleOverlay(false);
    await playFlipAnimation();
    setAnimating(false);
  }, [animating]);

  return {
    flipped,
    cardRefs,
    shuffleRefs,
    shuffleCardWrapController,
    showShuffleOverlay,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    jostleCounter,
    maxJostles,
    barControls,
    tapMode,
    handleCardClick,
    handleShuffleClick,
  }
}
