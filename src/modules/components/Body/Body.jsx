import { useState, useEffect } from 'react'
import { BodyStartup } from './components/BodyStartup'
import { BodyCardMatt } from './components/BodyCardMatt'
import { usePokemonCards } from '../../../hooks/usePokemonCards'
import styles from './Body.module.css'

export const Body = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentHand, drawNewHand, shuffleHand, discardHand } = usePokemonCards();

  const beginGame = () => {
    setStarted(true);
  }

  useEffect(() => {
    setLoading(true);

    const initializeHand = setTimeout(async () => {
      // drawNewHand(1);
      setLoading(false);
    }, 800);
    return () => {
      clearTimeout(initializeHand);
    }
  }, []);

  return (
    <>
      {started ? (
        loading ? (
          <div>Loading</div>
        ) : (
          <BodyCardMatt hand={currentHand}></BodyCardMatt>
        )
      ) : (
        <BodyStartup handleClick={beginGame}></BodyStartup>
      )}
    </>
  )
}