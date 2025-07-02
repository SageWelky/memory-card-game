import { useState, useEffect } from 'react'
import { Header } from './modules/components/Header/Header'
// import { Body } from './modules/components/Body/Body'
// import { Footer } from './modules/components/Footer/Footer'
import { usePokemonCards } from './hooks/usePokemonCards';

function App() {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentHand, drawNewHand, shuffleHand, discardHand } = usePokemonCards();

  useEffect(() => {
    setLoading(true);

    const initializeHand = setTimeout(async () => {
      drawNewHand(1);
      setLoading(false);
    }, 800);
    return () => {
      clearTimeout(initializeHand);
    }
  }, []);


  return (
    <>
      <Header score={score} />
      {loading ? (
        <div>Loading</div>
      ) : (
          <div>{currentHand[0]?.name ?? 'No card available'}</div>
      )}
    </>
  )
}

export default App
