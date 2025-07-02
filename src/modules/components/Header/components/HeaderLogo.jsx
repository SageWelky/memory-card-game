import pokemonLogo from '../../../../assets/images/pokemonLogo.png';

export const HeaderLogo = ({ className }) => {

  return(
    <img className={className} src={pokemonLogo} alt={"logo"}></img>
  )
};