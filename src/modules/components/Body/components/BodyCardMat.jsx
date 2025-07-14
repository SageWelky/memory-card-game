import { useState } from 'react'
import { PokemonCard } from '../../../common/PokemonCard'
import styles from '../Body.module.css'


export const BodyCardMat = ({ hand }) => {

  return (
    <ul className={styles.mat}>
      {
          hand.map((card) => {
            return(
              <li key={card.cardId}>{
                <PokemonCard
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