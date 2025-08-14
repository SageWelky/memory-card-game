import { useState } from 'react'
import Button from '@mui/material/Button'
import styles from 'components/Body/Body.module.css'

export const BodyStartup = ({ handleClick }) => {

  return (
    <div className={styles.startButton}>
      <Button variant="contained" onClick={handleClick}>Start Game</Button>
    </div>
  )
}