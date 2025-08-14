import { HeaderLogo } from 'components/Header/components/HeaderLogo'
import { HeaderScore } from 'components/Header/components/HeaderScore'
import styles from 'components/Header/Header.module.css'

export const Header = () => {

  return (
    <div className={styles.header} >
      <HeaderLogo />
      <HeaderScore />
    </div>
  )
};