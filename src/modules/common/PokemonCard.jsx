import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import pokemonCardBack from '../../assets/images/pokemonCardBack.jpg'
import missingNo from '../../assets/images/missingNo.webp'
import { getImageSrcFromCard } from '../../utils/cardUtils'
import { getPokemonCardTextureByType } from '../../utils/textureUtils'
import { useShuffleAnimations } from '../../context/ShuffleContext'
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
  const [shadowStyle, setShadowStyle] = useState({});
  const [imgSrc, setImgSrc] = useState(null);
  const { flipped } = useShuffleAnimations();
  const texture = getPokemonCardTextureByType(type);

  const animationFrame = useRef(null);
  const gradientRef = useRef(null);

  // Throttled handler for tilt move.
  const handleMove = useCallback(({ tiltAngleX, tiltAngleY }) => {
    if (animationFrame.current) return;

    animationFrame.current = requestAnimationFrame(() => {
      const offsetX = (tiltAngleY * 0.7) - 10;
      const offsetY = (tiltAngleX * 0.7) + 10;
      gradientRef.current.style.backgroundPosition = `${offsetX/50}% ${offsetY/50}%`;
      const blur = 15;
      const spread = 1;

      setShadowStyle({
        boxShadow: `${-offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0,0,0,0.4)`,
        transition: 'box-shadow 0.15s ease',
        borderRadius: '1dvw',
        overflow: 'hidden',
        zIndex: '12',
      });

      animationFrame.current = null;
    });
  }, []);

  // Cleanup animation frame on unmount.
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 150,
  };

  const flipVariants = {
    faceUp: { rotateY: 0 },
    faceDown: { rotateY: 180 },
  };

  // Handles image format and cleanup.
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
      <Tilt
        className={styles.cardFront}
        tiltEnable={!flipped}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={800}
        scale={1.05}
        glareEnable={true}
        glareMaxOpacity={0.6}
        glarePosition="right"
        onMove={handleMove}
        style={shadowStyle}
      >
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
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            titleTypographyProps={{ variant: 'secondary', fontSize: '1.25dvw' }}
            subheader={type}
            subheaderTypographyProps={{ variant: 'secondary', fontSize: '0.8dvw' }}
            sx={{
              background: 'rgba(255, 255, 255, 0.4)',
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
              width: '95%',
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
              width: '1.6dvw',
              height: '1.6dvw',
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
            <Typography
              variant="primary"
            >
              {pokemonId}
            </Typography>
          </CardContent>
        </Card>
        <div ref={gradientRef} className={styles.staticGradient}>
        </div>
      </Tilt>
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
        >
        </Card>
        <div className={styles.staticGradient}>
        </div>
      </div>
    </motion.div>
  )
}
