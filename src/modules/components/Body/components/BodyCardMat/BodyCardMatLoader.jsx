import { cardManager } from 'src/services/cardManagerSingleton';
import { lazy, use } from 'react';
const LazyBodyCardMat = lazy(() => import('./BodyCardMat'));

export function BodyCardMatLoader({ drawNewHand, firstLoadDrawNewHand }) {
  const isFirstLoad = use(checkFirstTimeAndHydratePromise);

  return (
    <LazyBodyCardMat />
  )
}

const checkFirstTimeAndHydratePromise = (async () => {
  await cardManager.dbPromise;
  try {
    const isFirst = await cardManager.checkIndexedDBForFirstTime();
    if (isFirst) {
      await cardManager.seedInitialCards();
    }
    return isFirst
  } catch (err) {
    console.error("Error checking or hydrating first load:", err);
    // If we trigger an error and return false
    // this will allow for fallback logic to kick in.
    return false
  }
})();