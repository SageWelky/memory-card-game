import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import CancelIcon from '@mui/icons-material/Cancel'
import styles from '../Footer.module.css'

export const FooterInfo = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={styles.infoBox}
            key="box"
          >
            <motion.div
              onClick={() => setIsVisible(false)}
              whileTap={{ y: 1 }}
            >
              <IconButton aria-label="close">
                <CancelIcon />
              </IconButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        onClick={() => setIsVisible(!isVisible)}
        whileTap={{ y: 1 }}
      >
        <IconButton aria-label="info">
          {isVisible ? <CancelIcon className={styles.infoIcon}/> : <InfoIcon className={styles.infoIcon}/>}
        </IconButton>
      </motion.div>
    </div>
  )
}
