import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { BodyStartup } from 'components/Body/components/BodyStartup'
import { BodyCardMat } from 'components/Body/components/BodyCardMat/BodyCardMat'
import { Modal } from 'common/Modal'
import { useGameLogic } from 'context/GameContext'
import styles from 'components/Body/Body.module.css'

const GameOverInfo = ({ resetGame }) => {
  return(
    <>
      <p className={styles.gameOverMessage}>You clicked a duplicate card!</p>
      <Button
        variant="contained"
        onClick={() => resetGame()}
        sx={{
              background: '#ffcb05',
              padding: '0.4dvw',
              paddingTop: 'calc(0.4dvw + 3px)',
              width: 'fitContent',
              color: '#3c5aa6',
            }}
      >
        Play Again
      </Button>
    </>
  )
}

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
            <Modal
              noOpenButton={true}
              noCloseButton={true}
            >
              <GameOverInfo resetGame={resetGame}/>
            </Modal>

          )}
    </>
  )
}