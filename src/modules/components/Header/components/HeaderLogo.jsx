import pokemonLogo from '../../../../assets/images/pokemonLogo.png'
import styles from '../Header.module.css'

export const HeaderLogo = () => {

  return(
    <img className={styles.logo} src={pokemonLogo} alt={"logo"}></img>
  )
};