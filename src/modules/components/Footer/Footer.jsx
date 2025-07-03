import { FooterCredits } from './components/FooterCredits'
import { FooterInfo } from './components/FooterInfo'
import styles from './Footer.module.css'

export const Footer = () => {

  return (

      <div className={styles.footer}>
        <div></div>
        <FooterCredits />
        <FooterInfo />
      </div>

  )
}