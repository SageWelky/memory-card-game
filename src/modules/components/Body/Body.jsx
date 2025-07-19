import { useState, useEffect } from 'react'
import { BodyStartup } from './components/BodyStartup'
import { BodyCardMat } from './components/BodyCardMat'
import { usePokemonCards } from '../../../context/PokemonCardsProvider'
import styles from './Body.module.css'

export const Body = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentHand, drawNewHand, shuffleHand, discardHand } = usePokemonCards();

  // %%%%%%%%%%%%
  //const idRef = useRef(0);
  // %%%%%%%%%%%%

  const beginGame = () => {
    setStarted(true);
  }

  // %%%%%%%%%%%%
  /*loadData = async () => {

      try {
        idRef.current++;
        const currRequestId = idRef.current;

        const myData = await loadSomeData(id);

        if (currRequestId == idRef.current) {
          setData(myData);
          drawNewHand(12);
        }
      }
      catch (e) {
        setError(e);
      }
      finally {
        //always disable spinner so it doesn't get stuck loading
        setLoading(false);
      }
  }*/
  // %%%%%%%%%%%%

  useEffect(() => {
    setLoading(true);

    // %%%%%%%%%%%%
    //loadData();
    // %%%%%%%%%%%%

    const initializeHand = setTimeout(async () => {
      drawNewHand(12);
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
          <BodyCardMat hand={currentHand} />
        )
      ) : (
        <BodyStartup handleClick={beginGame}></BodyStartup>
      )}
    </>
  )
}