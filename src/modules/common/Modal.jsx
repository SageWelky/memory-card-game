import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import styles from './Modal.module.css'

const DefaultOpenButton = ({ onClick }) => {
  return(
    <button onClick={onClick} aria-label="open">Open</button>
  )
}

const DefaultCloseButton = ({ onClick }) => {
  return(
    <IconButton onClick={onClick} aria-label="close">
      <CancelIcon />
    </IconButton>
  )
}

const NullButton = () => {
  return(
    <></>
  )
}

const ModalBox = ({ onClose, children, CustomCloseButton }) => {
  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className={styles.boxContainer}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={styles.box}
          key="box"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            whileTap={{ y: 1 }}
            className={styles.exitButtonContainer}
          >
            <CustomCloseButton onClick={onClose} />
          </motion.div>
          <div className={styles.content}>
            {children}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export const Modal = ({
  noOpenButton = false,
  noCloseButton = false,
  CustomOpenButton = noOpenButton ? NullButton : DefaultOpenButton,
  CustomCloseButton = noCloseButton ? NullButton : DefaultCloseButton,
  children
  }) => {
  const [isVisible, setIsVisible] = useState(false);

  const noop = () => {};
  var closeOp = noCloseButton ? noop : () => setIsVisible(false);


  useEffect(() => {
    if (noOpenButton) {
      setIsVisible(true);
    }
  });

  return (
    <>
      {isVisible ?
        <CustomCloseButton onClick={() => setIsVisible(false)}/>
        : <CustomOpenButton onClick={() => setIsVisible(true)} />
      }

        {isVisible && createPortal(
          <ModalBox
            onClose={closeOp}
            CustomCloseButton={CustomCloseButton}
          >
            {children}
          </ModalBox>,
          document.body
        )}

    </>
  )
}
