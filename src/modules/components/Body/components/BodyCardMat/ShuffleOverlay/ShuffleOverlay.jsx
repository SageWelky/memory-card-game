import styles from 'components/Body/Body.module.css';
import {
  useCardRefs,
  useShowShuffleOverlay,
  useShuffleToCenter,
  useTapMode,
} from 'context/ShuffleContext';
import { useLayoutEffect, useRef, useState } from 'react';
import { PokemonCard } from 'src/modules/common/PokemonCard';
import { ShuffleCardWrapper } from 'src/modules/components/Body/components/BodyCardMat/ShuffleOverlay/ShuffleCardWrapper';
import { TapBar, TapHeader } from 'src/modules/components/Body/components/BodyCardMat/ShuffleOverlay/TapUi';

export const ShuffleOverlay = ({ currentHand }) => {
  const { tapMode } = useTapMode();
  const { shuffleToCenter } = useShuffleToCenter();
  const { showShuffleOverlay } = useShowShuffleOverlay();
  const { cardRefs } = useCardRefs();

  const [cardRects, setCardRects] = useState({});
  let scale = useRef();

  // Card tracking for swapping in and out of display: flex.
  useLayoutEffect(() => {
    if (showShuffleOverlay) {
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
  }, [currentHand]);

  return (
    <div className={styles.absoluteOverlay}>
      <TapHeader tapMode={tapMode} />
      {currentHand.map((card) => {
        return (
          <ShuffleCardWrapper
            key={card.cardId}
            currentHandLength={currentHand.length}
            card={card}
            cardRects={cardRects}
            tapMode={tapMode}
          >
            <PokemonCard
              mode='cardback'
            />
          </ShuffleCardWrapper>
        )
      })}
      <TapBar
        tapMode={tapMode}
      />
    </div>
  )
}
