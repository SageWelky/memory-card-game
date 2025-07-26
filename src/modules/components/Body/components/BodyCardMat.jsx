import { useState } from 'react'
import { PokemonCard } from '../../../common/PokemonCard'
import { useGameLogic } from '../../../../context/GameContext'
import { motion } from 'framer-motion'
import styles from '../Body.module.css'

export const BodyCardMat = ({ hand }) => {
  const { currentHand, handleCardClick, shuffleToCenter } = useGameLogic();

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 150,
  };

  const shuffleVariants = {
    idle: {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    center: {
      x: 0,
      y: 0,
      scale: 0.8,
      zIndex: 10,
      position: "absolute",
      top: "50%",
      left: "50%",
      translateX: "-50%",
      translateY: "-50%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <ul className={styles.mat}>
      {
        currentHand.map((card) => {
          return(
            <motion.li key={card.cardId} className={styles.list}
              layout
              animate={shuffleToCenter ? "center" : "idle"}
              // variants={shuffleVariants}
              transition={spring}
            >{
              <PokemonCard
                handleClick={() => handleCardClick(card.cardId)}
                name={card.name}
                type={card.type}
                pokemonId={card.pokemonId}
                defaultImage={card.defaultImage}
              />
            }</motion.li>
          )
        })
      }
    </ul>
  )
}