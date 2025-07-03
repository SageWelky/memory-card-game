import { useState } from 'react'
import Card from '@mui/material/Card'

export const BodyCardMatt = ({hand}) => {

  return (
    <ul style={{ display: 'flex', justifyContent: 'center' }}>
      {
        hand.map((card) => (
          <li key={card.cardId}>{card?.name ? <Card></Card> : 'No card available'}</li>
        ))
      }
      <div>{hand[0]?.name ?? 'No card available'}</div>
    </ul>
  )
}
