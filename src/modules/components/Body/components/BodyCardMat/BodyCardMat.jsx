import { useLayoutEffect } from 'react'
import { PokemonCard } from 'common/PokemonCard'
import styles from 'components/Body/Body.module.css'
import { ShuffleOverlay } from 'components/Body/components/BodyCardMat/ShuffleOverlay/ShuffleOverlay'
import { useGameLogic } from 'context/GameContext'
import {
  useCardRefs,
  useHandleCardClick,
  useHideOriginal,
  useShowShuffleOverlay,
  useTapMode,
} from 'context/ShuffleContext'
import { motion } from 'framer-motion'

const BodyCardMat = () => {
  const {
    currentHand,
    firstLoadDrawNewHand
  } = useGameLogic();

  const { cardRefs } = useCardRefs();
  const { showShuffleOverlay } = useShowShuffleOverlay();
  const { hideOriginal } = useHideOriginal();
  const { tapMode } = useTapMode();
  const { handleCardClick } = useHandleCardClick();

  return (
    <div className={styles.body}>
      <div className={styles.matWrap}>
        <div className={styles.matBackground}>
        </div>
        <div className={styles.matStaticGradient}>
        </div>
        <ul className={styles.mat}>
          {
            (currentHand.map((card) => (
              <motion.li
                key={card.cardId}
                className={styles.list}
                ref={(el) => {
                  if (el) {
                    cardRefs.current[card.cardId] = el;
                  } else {
                    delete cardRefs.current[card.cardId];
                  }
                }}
                initial={false}
                layout={false}
                style={{ visibility: hideOriginal ? "hidden" : "visible" }}
              >
                <PokemonCard
                  handleClick={() => handleCardClick(card.cardId)}
                  name={card.name}
                  type={card.type}
                  pokemonId={card.pokemonId}
                  defaultImage={card.defaultImage}
                  currentHand={currentHand}
                  refId={cardRefs.current[card.cardId]}
                  cardRefs={cardRefs.current}
                  cardId={card.cardId}
                />
              </motion.li>
            )))
          }
        </ul>
      </div>

      {( showShuffleOverlay ) && (
        <ShuffleOverlay currentHand={currentHand}/>
      )}
    </div>
  );
};

export default BodyCardMat;