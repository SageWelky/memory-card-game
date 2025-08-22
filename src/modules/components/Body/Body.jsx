import Button from '@mui/material/Button'
import { Modal } from 'common/Modal'
import styles from 'components/Body/Body.module.css'
import { BodyStartup } from 'components/Body/components/BodyStartup'
import { useGameLogic } from 'context/GameContext'
import { BodyCardMat } from './components/BodyCardMat/BodyCardMat'

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
  const { gameOver, startGame, resetGame, started } = useGameLogic();

  return (
    <>
      {started ? (
        <BodyCardMat />
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