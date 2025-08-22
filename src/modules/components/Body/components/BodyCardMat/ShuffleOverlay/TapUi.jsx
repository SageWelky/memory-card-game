import styles from 'components/Body/Body.module.css';
import {
  useBarControls,
  useJostleCounter,
  useMaxJostles,
} from 'context/ShuffleContext';
import { AnimatePresence, motion } from 'framer-motion';

export const TapBar = ({ tapMode }) => {
  const { maxJostles } = useMaxJostles();
  const { jostleCounter } = useJostleCounter();
  const { barControls } = useBarControls();

  return (
    <AnimatePresence>
      {tapMode && (
        <div className={styles.tapBarWrapper}>
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              key="tap-bar"
              className={styles.tapBar}
              animate={barControls.tapBar}
            >
              <motion.div
                initial={{ backgroundColor: "#f00000", width: "0dvw" }}
                className={styles.barFill}
                animate={barControls.barFill}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const TapHeader = ({ tapMode }) => {
  return (
    <>
      {tapMode && (
        <div className={styles.tapHeaderWrapper}>
          <motion.div
            className={styles.tapHeader}
            animate={{
              scale: [1, 1.3, 1],
              textShadow: [
                "5px 5px 5px #3c5aa6, 1px 1px 1px #ffcb05",
                "10px 10px 13px #3c5aa6, 1px 1px 1px #ffcb05",
                "5px 5px 5px #3c5aa6, 1px 1px 1px #ffcb05"
              ]
            }}
            transition={{
              duration: 1.2,
              ease: ["easeInOut", [0.55, 0.085, 0.68, 0.53]],
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            Tap to Shuffle!
          </motion.div>
        </div>
      )}
    </>
  )
}