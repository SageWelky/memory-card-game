import { useGameLogic } from '../../../../context/GameContext'

export const HeaderScore = () => {
  const { score } = useGameLogic();

  return (
    <div>{`Your Score: ${score}`}</div>
  )
};