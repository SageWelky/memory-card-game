import styles from 'components/Header/Header.module.css';
import { useGameLogic } from 'context/GameContext';

export const HeaderScore = () => {
  const { score } = useGameLogic();

  return (
    <div className={styles.score}>{`Score: ${score}`}</div>
  )
};