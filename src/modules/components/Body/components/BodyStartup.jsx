import { useState } from 'react'
import Button from '@mui/material/Button'

export const BodyStartup = ({ handleClick }) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" onClick={handleClick}>Start Game</Button>
    </div>
  )
}