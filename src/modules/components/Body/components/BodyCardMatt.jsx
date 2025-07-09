import { useState } from 'react'
import { PokemonCard } from '../../../common/PokemonCard'

export const BodyCardMatt = ({ hand, mattClassName, pokemonClassName }) => {

  return (
    <ul className={mattClassName}>
      {
          hand.map((card) => {
            return(
              <li key={card.cardId}>{
                <PokemonCard
                  pokemonClassName={pokemonClassName}
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