import { HeaderLogo } from './components/HeaderLogo'
import { HeaderScore } from './components/HeaderScore'
import styles from './Header.module.css'

export const Header = ({ score }) => {

  return (
    <div className={styles.header} >
      <HeaderLogo />
      <HeaderScore score={score} />
    </div>
  )
};