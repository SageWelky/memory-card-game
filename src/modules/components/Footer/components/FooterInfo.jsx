import { motion, AnimatePresence } from 'framer-motion'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import CancelIcon from '@mui/icons-material/Cancel'
import { Modal } from 'common/Modal'
import styles from 'components/Footer/Footer.module.css'

const InfoButton = ({onClick}) => {
  return(
    <IconButton onClick={onClick} aria-label="info">
      <InfoIcon className={styles.infoIcon}/>
    </IconButton>
  )
}

const CancelButton = ({ onClick }) => {
  return(
    <IconButton onClick={onClick} aria-label="close">
      <CancelIcon className={styles.infoIcon}/>
    </IconButton>
  )
}

const HowToPlay = () => {
  return(
    <ul className={styles.instructions}>
      HOW TO PLAY:
      <li>Each round 12 or less cards will be shown</li>
      <li>After selecting a card, all cards will be shuffled, and randomly selected cards will replace them</li>
      <li>Pick cards you've never clicked before to earn score</li>
      <li>The game ends when you click a duplicate card</li>
    </ul>
  )
}

export const FooterInfo = () => {


  return (
    <div>
      <Modal
        CustomOpenButton={InfoButton}
        CustomCloseButton={CancelButton}
      >
        <HowToPlay />
      </Modal>
    </div>
  )
}
