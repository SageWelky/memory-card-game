import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PokemonCard } from 'common/PokemonCard'
import { useShuffleAnimations } from 'context/ShuffleContext'
import { generateJostleOffset } from 'utils/jostleUtils'
import styles from 'components/Body/Body.module.css'

export const ShuffleOverlay = ({ currentHand }) => {
  const {
    cardRefs,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    grabCoordinates,
    jostleBarCounter,
    maxJostles,
    tapMode,
    handleShuffleClick,
  } = useShuffleAnimations();

  const [cardRects, setCardRects] = useState({});
  const jostleRef = useRef({});
  let scale = useRef();

  // Precompute jostle offsets when shuffle begins.
  useEffect(() => {
    if (shuffleToCenter) {
      // Spread of cards is absolute, not scaled to media, so we need a multiplier.
      scale = window.innerWidth / 1920;
      let scaledDistance = scale * 500;
      currentHand.forEach(card => {
        const id = card.cardId;
        if (!jostleRef.current[id]) {
          jostleRef.current[id] = {};
        }
        for (let i = 0; i <= maxJostles; i++) {
          if (!jostleRef.current[id][i]) {
            jostleRef.current[id][i] = generateJostleOffset(scaledDistance, 300);
          }
        }
      });
    }
  }, [shuffleToCenter]);

  // Card tracking for swapping in and out of display: flex.
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

  return (
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

        const centerX = (window.innerWidth / 2 - rect.width / 2);
        const centerY = (window.innerHeight / 2 - rect.height / 2);
        const jostle = (jostleRef.current[card.cardId]?.[jostleBarCounter] ?? { x: 0, y: 0, rotate: 0 });

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
                      stiffness: 200,
                      damping: 18,
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
              layout
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                key="tap-bar"
                className={styles.tapBar}
                animate={{
                  scale: Math.random() * 0.2 + 0.9,
                  x: Math.random() * 40 - 20,
                  y: Math.random() * 40 - 20,
                  rotate: Math.random() * 15 - 7.5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <motion.div
                  initial={{ backgroundColor: "#f00000", width: `${(jostleBarCounter / maxJostles) * 70}dvw` }}
                  className={styles.barFill}
                  animate={
                    jostleBarCounter < maxJostles ? {
                      width: `${(jostleBarCounter / maxJostles) * 70}dvw`,
                      transition: { duration: 0.1 }
                    }
                    : {
                      backgroundColor: ["#f00000", "#ff7c7c", "#f00000"],
                      transition: {
                        duration: 0.6,
                        ease: ["easeInOut"],
                        repeat: Infinity,
                        repeatType: "loop"
                      }
                    }
                  }
                />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
