import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { BodyStartup } from './components/BodyStartup'
import { BodyCardMat } from './components/BodyCardMat/BodyCardMat'
import { useGameLogic } from '../../../context/GameContext'
import styles from './Body.module.css'

export const Body = () => {
  const { drawNewHand, gameOver, startGame, resetGame, started, loading } = useGameLogic();

  return (
    <>
      {started ? (
        loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <BodyCardMat />
        )
      ) : (
        <BodyStartup handleClick={() => startGame()}></BodyStartup>
      )}
      {gameOver && (
            <div className={styles.gameOverBackdrop}>
              <div className={styles.gameOverModal}>
                <p className={styles.modalMessage}>You clicked a duplicate card!</p>
                <Button variant="contained" onClick={() => resetGame()}>Play Again</Button>
              </div>
            </div>
          )}
    </>
  )
}