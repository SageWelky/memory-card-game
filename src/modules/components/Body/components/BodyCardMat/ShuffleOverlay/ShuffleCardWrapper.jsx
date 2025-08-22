import { motion, useAnimationControls } from 'framer-motion';
import {
  useHandleShuffleClick,
  useReturningToGrid,
  useShuffleToCenter,
  useShuffleSync,
} from 'src/context/ShuffleContext';

export const ShuffleCardWrapper = ({
  card,
  currentHandLength,
  cardRects,
  tapMode,
  children,
}) => {
  const { handleShuffleClick } = useHandleShuffleClick();
  const { shuffleToCenter } = useShuffleToCenter();
  const { returningToGrid } = useReturningToGrid();
  const { shuffleRefs, shuffleCardWrapController } = useShuffleSync();

  const controls = useAnimationControls();
  const id = card.cardId;
  const rect = cardRects[card.cardId];
  if (!rect) return null;

  const centerX = (window.innerWidth / 2 - rect.width / 2);
  const centerY = (window.innerHeight / 2 - rect.height / 2);

  return (
    <motion.div
      onClick={() => handleShuffleClick(card.cardId, centerX, centerY)}
      key={card.cardId}
      ref={(el) => {
        if (el) {
          shuffleRefs.current[id] = el;
          shuffleRefs.current[id].cardId = id;
          shuffleRefs.current[id].controls = controls;
          shuffleCardWrapController.refReady(currentHandLength);
        } else {
          shuffleCardWrapController.refUnmount();
          delete shuffleRefs.current[card.cardId];
        }
      }}
      initial={{
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        position: "absolute"
      }}
      animate={
        shuffleToCenter ?
        {
          x: centerX + Math.random() * 40 - 20,
          y: centerY + Math.random() * 40 - 20,
          rotate: Math.random() * 70 - 35,
          transition: { duration: 0.4, ease: "easeOut" }
        }
        : returningToGrid ?
        {
          x: rect.left,
          y: rect.top,
          rotate: 0,
          transition: { duration: 0.4, ease: "easeInOut" }
        }
        : tapMode ?
          shuffleRefs.current[id].controls
        : {}
      }
      onAnimationComplete={
        () => {
          const refId = shuffleRefs.current[card.cardId];
          if (refId?.onShuffleToCenterComplete) {
            refId.onShuffleToCenterComplete();
            refId.onShuffleToCenterComplete = null;
          }
          if (refId?.onReturningToGridComplete) {
            refId.onReturningToGridComplete();
            refId.onReturningToGridComplete = null;
          }
        }
      }
      style={{
        position: "absolute",
        pointerEvents: tapMode ? "auto" : "none",
        zIndex: 1
      }}
    >
      {children}
    </motion.div>
  )
}
