import { useState } from 'react'
import { PokemonCard } from '../../../common/PokemonCard'
import { useGameLogic } from '../../../../context/GameContext'
import styles from '../Body.module.css'

export const BodyCardMat = ({ hand }) => {
  const { currentHand, handleCardClick } = useGameLogic();

  return (
    <ul className={styles.mat}>
      {
          currentHand.map((card) => {
            return(
              <li key={card.cardId}>{
                <PokemonCard
                  handleClick={() => handleCardClick(card.cardId)}
                  name={card.name}
                  type={card.type}
                  pokemonId={card.pokemonId}
                  defaultImage={card.defaultImage}
                />
              }</li>
            )
          })
      }
    </ul>
  )
}