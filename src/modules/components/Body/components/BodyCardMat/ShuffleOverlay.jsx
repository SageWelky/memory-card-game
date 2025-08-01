import { useLayoutEffect, useRef, useState } from 'react'
import { PokemonCard } from '../../../../common/PokemonCard'
import { useGameLogic } from '../../../../../context/GameContext'
import { useShuffleAnimations } from '../../../../../context/ShuffleContext'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '../../Body.module.css'

export const ShuffleOverlay = () => {
  const {
    currentHand,
  } = useGameLogic();

  const {
    cardRefs,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    grabCoordinates,
    jostleBarCounter,
    maxJostles,
    tapMode,
    getJostleState,
    handleShuffleClick,
  } = useShuffleAnimations();

  const [cardRects, setCardRects] = useState({});
  const jostleStates = getJostleState();

  useLayoutEffect(() => {
    if (shuffleToCenter || grabCoordinates) {
      const newRects = {};
      currentHand.forEach(card => {
        const el = cardRefs.current[card.cardId];
        if (el) {
          const rect = el.getBoundingClientRect();
          newRects[card.cardId] = rect;
        }
      });
      setCardRects(newRects);
    }
  }, [shuffleToCenter, grabCoordinates]);

  return(
    <div className={styles.absoluteOverlay}>
              {tapMode && (
                <div className={styles.tapHeaderWrapper}>
                  <motion.div
                    className={styles.tapHeader}
                    animate={{
                      scale: [1, 1.3, 1],
                      textShadow: [
                        "5px 5px 5px #3c5aa6, 1px 1px 1px #ffcb05",
                        "10px 10px 13px #3c5aa6, 1px 1px 1px #ffcb05",
                        "5px 5px 5px #3c5aa6, 1px 1px 1px #ffcb05"
                      ]
                    }}
                    transition={{
                      duration: 1.2,
                      ease: ["easeInOut", [0.55, 0.085, 0.68, 0.53]],
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    Tap to Shuffle!
                  </motion.div>
                </div>
              )}
              {currentHand.map((card) => {
                const rect = cardRects[card.cardId];
                if (!rect) return null;

                const centerX = window.innerWidth / 2 - rect.width / 2;
                const centerY = window.innerHeight / 2 - rect.height / 2;
                const jostle = jostleStates[card.cardId] || { x: 0, y: 0, rotate: 0 };

                return (
                  <motion.div
                    onClick={() => handleShuffleClick(card.cardId)}
                    key={card.cardId}
                    initial={{
                      x: rect.left,
                      y: rect.top,
                      width: rect.width,
                      height: rect.height,
                      position: "absolute"
                    }}
                    animate={
                      shuffleToCenter
                        ? {
                            x: centerX + Math.random() * 40 - 20,
                            y: centerY + Math.random() * 40 - 20,
                            rotate: Math.random() * 70 - 35,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }
                        : returningToGrid
                        ? {
                            x: rect.left,
                            y: rect.top,
                            rotate: 0,
                            transition: { duration: 0.4, ease: "easeInOut" }
                          }
                        : tapMode
                        ? {
                            x: centerX + jostle.x,
                            y: centerY + jostle.y,
                            rotate: jostle.rotate,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 20
                            }
                          }
                        : {}
                    }
                    style={{
                      position: "absolute",
                      pointerEvents: tapMode ? "auto" : "none",
                      zIndex: 1
                    }}
                  >
                    <PokemonCard
                      name={card.name}
                      type={card.type}
                      pokemonId={card.pokemonId}
                      defaultImage={card.defaultImage}
                    />
                  </motion.div>
                )
              })}
              <AnimatePresence>
                {tapMode && (
                  <div className={styles.tapBarWrapper}>
                    <motion.div
                      key="tap-bar"
                      className={styles.tapBar}
                      layout
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: (Math.random() * 0.2) + 0.9,
                        x: Math.random() * 20 - 20,
                        y: Math.random() * 20 - 20,
                        rotate: Math.random() * 5 - 2.5,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: ["easeOut"]
                      }}
                    >
                      <motion.div
                        className={styles.barFill}
                        style={{ width: `${(jostleBarCounter / maxJostles) * 70}dvw` }}
                        layout
                      />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
    </div>
  )
}