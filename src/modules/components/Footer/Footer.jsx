import { FooterCredits } from 'components/Footer/components/FooterCredits'
import { FooterInfo } from 'components/Footer/components/FooterInfo'
import styles from 'components/Footer/Footer.module.css'

export const Footer = () => {

  return (

      <div className={styles.footer}>
        <div></div>
        <FooterCredits />
        <FooterInfo />
      </div>

  )
}