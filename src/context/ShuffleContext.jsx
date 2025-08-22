import { createContext, useContext } from 'react';
import { useShuffleAnimationsInternal } from 'src/hooks/useShuffleAnimations';

const FlippedContext = createContext(null);
const CardRefsContext = createContext(null);
const ShuffleSyncContext = createContext(null);
const ShowShuffleOverlayContext = createContext(null);
const ShuffleToCenterContext = createContext(null);
const ReturningToGridContext = createContext(null);
const HideOriginalContext = createContext(null);
const JostleCounterContext = createContext(null);
const MaxJostlesContext = createContext(null);
const BarControlsContext = createContext(null);
const TapModeContext = createContext(null);
const HandleCardClickContext = createContext(null);
const HandleShuffleClickContext = createContext(null);

export const ShuffleProvider = ({ children }) => {
  const {
    flipped,
    cardRefs,
    shuffleCardWrapController,
    shuffleRefs,
    showShuffleOverlay,
    shuffleToCenter,
    returningToGrid,
    hideOriginal,
    jostleCounter,
    maxJostles,
    barControls,
    tapMode,
    handleCardClick,
    handleShuffleClick,
  } = useShuffleAnimationsInternal();

  return (
    <FlippedContext.Provider value={{ flipped }}>
      <CardRefsContext.Provider value={{ cardRefs }}>
        <ShuffleSyncContext.Provider value={{ shuffleRefs, shuffleCardWrapController }}>
          <ShowShuffleOverlayContext.Provider value={{ showShuffleOverlay }}>
            <ShuffleToCenterContext.Provider value={{ shuffleToCenter }}>
              <ReturningToGridContext.Provider value={{ returningToGrid }}>
                <HideOriginalContext.Provider value={{ hideOriginal }}>
                  <JostleCounterContext.Provider value={{ jostleCounter }}>
                    <MaxJostlesContext.Provider value={{ maxJostles }}>
                      <BarControlsContext.Provider value={{ barControls }}>
                        <TapModeContext.Provider value={{ tapMode }}>
                          <HandleCardClickContext.Provider value={{ handleCardClick }}>
                            <HandleShuffleClickContext.Provider value={{ handleShuffleClick }}>
                              {children}
                            </HandleShuffleClickContext.Provider>
                          </HandleCardClickContext.Provider>
                        </TapModeContext.Provider>
                      </BarControlsContext.Provider>
                    </MaxJostlesContext.Provider>
                  </JostleCounterContext.Provider>
                </HideOriginalContext.Provider>
              </ReturningToGridContext.Provider>
            </ShuffleToCenterContext.Provider>
          </ShowShuffleOverlayContext.Provider>
        </ShuffleSyncContext.Provider>
      </CardRefsContext.Provider>
    </FlippedContext.Provider>
  )
};

export const useFlipped = () =>
  useContext(FlippedContext);
export const useCardRefs = () =>
  useContext(CardRefsContext);
export const useShuffleSync = () =>
  useContext(ShuffleSyncContext);
export const useShowShuffleOverlay = () =>
  useContext(ShowShuffleOverlayContext);
export const useShuffleToCenter = () =>
  useContext(ShuffleToCenterContext);
export const useReturningToGrid = () =>
  useContext(ReturningToGridContext);
export const useHideOriginal = () =>
  useContext(HideOriginalContext);
export const useJostleCounter = () =>
  useContext(JostleCounterContext);
export const useMaxJostles = () =>
  useContext(MaxJostlesContext);
export const useBarControls = () =>
  useContext(BarControlsContext);
export const useTapMode = () =>
  useContext(TapModeContext);
export const useHandleCardClick = () =>
  useContext(HandleCardClickContext);
export const useHandleShuffleClick = () =>
  useContext(HandleShuffleClickContext);