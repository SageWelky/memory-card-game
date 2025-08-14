import { useGameLogic } from 'context/GameContext'
import styles from 'components/Header/Header.module.css'

export const HeaderScore = () => {
  const { score } = useGameLogic();

  return (
    <div className={styles.score}>{`Score: ${score}`}</div>
  )
};