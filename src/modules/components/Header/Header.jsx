import { HeaderLogo } from './components/HeaderLogo'
import { HeaderScore } from './components/HeaderScore'
import styles from './Header.module.css'

export const Header = () => {

  return (
    <div className={styles.header} >
      <HeaderLogo />
      <HeaderScore />
    </div>
  )
};