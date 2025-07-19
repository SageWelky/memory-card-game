import { useState } from 'react'

export function useCurrentHand() {
  const [currentHand, setCurrentHand] = useState([]);

  const replaceHand = (newHand) => setCurrentHand(newHand);

  const shuffleHand = () => {
    const shuffled = [...currentHand];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCurrentHand(shuffled);
  }

  return { currentHand, replaceHand, shuffleHand }
}
