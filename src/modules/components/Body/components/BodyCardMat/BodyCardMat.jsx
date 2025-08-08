import { ShuffleOverlay } from './ShuffleOverlay'
import { PokemonCard } from '../../../../common/PokemonCard'
import { useGameLogic } from '../../../../../context/GameContext'
import { useShuffleAnimations } from '../../../../../context/ShuffleContext'
import { motion } from 'framer-motion'
import styles from '../../Body.module.css'

export const BodyCardMat = () => {
  const {
    currentHand,
  } = useGameLogic();

  const {
    cardRefs,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    tapMode,
    handleCardClick,
  } = useShuffleAnimations();

  return (
    <div className={styles.matContainer}>
      <div className={styles.matWrap}>
        <div className={styles.matBackground}>
        </div>
        <div className={styles.matStaticGradient}>
        </div>
        <ul className={styles.mat}>
          {
            currentHand.map((card) => (
              <motion.li
                key={card.cardId}
                className={styles.list}
                ref={el => cardRefs.current[card.cardId] = el}
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
                />
              </motion.li>
            ))
          }
        </ul>
      </div>

      {(shuffleToCenter || returningToGrid || tapMode) && (
        <ShuffleOverlay currentHand={currentHand}/>
      )}
    </div>
  );
};
