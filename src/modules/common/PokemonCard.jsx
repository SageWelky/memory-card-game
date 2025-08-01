import { useState, useEffect } from 'react'
import { useShuffleAnimations } from '../../context/ShuffleContext'
import { getImageSrcFromCard } from '../../utils/cardUtils'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { motion } from 'framer-motion'
import pokemonCardBack from '../../assets/images/pokemonCardBack.jpg'
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
  const [imgSrc, setImgSrc] = useState(null);
  const { flipped } = useShuffleAnimations();
  const texture = getPokemonCardTextureByType(type);

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 150,
  };

  const flipVariants = {
    faceUp: { rotateY: 0 },
    faceDown: { rotateY: 180 },
  };

  useEffect(() => {
    if (!defaultImage) return;

    let objectUrl;

    if (defaultImage instanceof Blob) {
      objectUrl = URL.createObjectURL(defaultImage);
      setImgSrc(objectUrl);
    } else {
      setImgSrc(defaultImage);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    }
  }, [defaultImage]);

  return (
    <motion.div
      className={styles.pokemonCard}
      onClick={handleClick}
      initial="faceDown"
      layout={false}
      animate={flipped ? "faceDown" : "faceUp"}
      variants={flipVariants}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1000 }}
    >
      <div className={styles.cardFront}>
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
            borderRadius: '0px',
          }}
        >
          <CardHeader
            title={name}
            titleTypographyProps={{ fontSize: '1.25dvw' }}
            subheader={type}
            subheaderTypographyProps={{ fontSize: '0.8dvw' }}
            sx={{
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '0.4dvw',
              '.MuiCardHeader-content': {
                overflow: 'hidden',
              }
            }}
          />
          <CardMedia
            component="img"
            image={imgSrc}
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
      <div className={styles.cardBack}>
        <Card
          elevation={23}
          sx={{
            boxSizing: 'border-box',
            backgroundImage:`url(${pokemonCardBack})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '0.5dvw',
          }}
        ></Card>
      </div>
    </motion.div>
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