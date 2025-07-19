import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import missingNo from '../../assets/images/missingNo.webp'
import grassTexture from '../../assets/images/grassTexture.jpg'
import fireTexture from '../../assets/images/fireTexture.jpg'
import waterTexture from '../../assets/images/waterTexture.jpg'
import lightningTexture from '../../assets/images/lightningTexture.jpg'
import psychicTexture from '../../assets/images/psychicTexture.png'
import fightingTexture from '../../assets/images/fightingTexture.png'
import colorlessTexture from '../../assets/images/colorlessTexture.png'
import styles from './PokemonCard.module.css'

const noop = () => {};

export const PokemonCard = ({
  handleClick = noop,
  name = 'Name Not Found',
  type = 'Type Not Found',
  pokemonId = 'N/A',
  defaultImage = missingNo,
  pokemonClassName,
  }) => {
  const texture = getPokemonCardTextureByType(type);

  return (
    <div className={styles.pokemonCard} onClick={handleClick}>
      <Card
        elevation={23}
        sx={{
          boxSizing: 'border-box',
          backgroundImage:`url(${texture})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',

          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: '0.5dvw',
        }}
      >
        <CardHeader
          title={name}
          titleTypographyProps={{ fontSize: '1.25dvw' }}
          subheader={type}
          subheaderTypographyProps={{ fontSize: '0.8dvw' }}
          sx={{
            // fontSize: '2dvw',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '0.4dvw',
            '.MuiCardHeader-content': {
              overflow: 'hidden',
            }
          }}
        />
        <CardMedia
          component="img"
          image={defaultImage}
          alt="PokemonImage"
          sx={{
            width: '65%',
            margin: '0 auto',
            objectFit: 'contain',
          }}
        />
        <CardContent
          sx={{
            aspectRatio: '1 / 1',
            fontSize: '0.7dvw',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1.3dvw',
            height: '1.3dvw',
            textAlign: 'center',
            fontWeight: 'bold',
            borderRadius: '50%',
            boxShadow: 'inset 1px 1px 5px 3px white',
             padding: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          {pokemonId}
        </CardContent>
      </Card>
    </div>
  )
}

const getPokemonCardTextureByType = (pokemonType) => {
  let type = pokemonType;
  let texture;

  if (type === "grass" || type === "bug" || type === "poison") {
    texture = grassTexture;
  }
  if (type === "fire") {
    texture = fireTexture;
  }
  if (type === "water" || type === "ice") {
    texture = waterTexture;
  }
  if (type === "electric") {
    texture = lightningTexture;
  }
  if (type === "psychic" || type === "ghost" || type === "fairy") {
    texture = psychicTexture;
  }
  if (type === "fighting" || type === "ground" || type === "rock") {
    texture = fightingTexture;
  }
  if (type === "normal" || type === "flying" || type === "dragon") {
    texture = colorlessTexture;
  }
  return (texture)
}