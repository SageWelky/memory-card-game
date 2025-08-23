import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import missingNo from 'assets/images/missingNo.webp'
import pokemonCardBack from 'assets/images/pokemonCardBack.jpg'
import styles from 'common/PokemonCard.module.css'
import { useFlipped } from 'context/ShuffleContext'
import { motion } from 'framer-motion'
import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { getPokemonCardTextureByType } from 'utils/textureUtils'

const noop = () => {};

export const PokemonCard = memo(({
  handleClick = noop,
  name = 'Name Not Found',
  type = 'Type Not Found',
  pokemonId = 'N/A',
  defaultImage = missingNo,
  refId = null,
  mode = 'full',
  pokemonClassName,
}) => {
  const { flipped } = useFlipped();
  const animationFrame = useRef(null);
  const gradientRef = useRef(null);
  const [shadowStyle, setShadowStyle] = useState({
    boxShadow: `3px 3px 15px 1px rgba(0,0,0,0.4)`,
    borderRadius: '0.75dvw',
    overflow: 'hidden',
    zIndex: 12,
  });

  // Throttled handler for tilt move.
  const handleMove = useCallback(({ tiltAngleX = 0, tiltAngleY = 0 }) => {
    if (animationFrame.current) return;
    if (!(tiltAngleX || tiltAngleY)) return;

    animationFrame.current = requestAnimationFrame(() => {
      const offsetX = (tiltAngleY * 0.7) - 10;
      const offsetY = (tiltAngleX * 0.7) + 10;
      gradientRef.current.style.backgroundPosition = `${offsetX/66}% ${offsetY/50}%`;
      const blur = 15;
      const spread = 1;

      setShadowStyle({
        boxShadow: `${-offsetX * 0.6}px ${offsetY * 0.6}px ${blur}px ${spread}px rgba(0,0,0,0.4)`,
        transition: 'box-shadow 0.15s ease',
        borderRadius: '0.75dvw',
        overflow: 'hidden',
        zIndex: '12',
      });

      animationFrame.current = null;
    });
  }, []);

  if (mode === 'cardback') {
    return (
      <motion.div
        className={styles.pokemonCard}
        initial="faceDown"
        layout={false}
        animate={"faceDown"}
        variants={{ faceDown: { rotateY: 180 } }}
        transition={{ duration: 0.4 }}
        style={{ perspective: 800, willChange: 'transform' }}
      >
        <div className={styles.cardBack}>
          <Card
            sx={{
              boxSizing: 'border-box',
              backgroundImage:`url(${pokemonCardBack})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              height: '100%',
              width: '100%',
              borderRadius: '0.75dvw',
              overflow: 'hidden',
              zIndex: 12,
            }}
          />
          <div className={styles.staticGradientBack} />
        </div>
      </motion.div>
    )
  }

  const [imgSrc, setImgSrc] = useState(null);
  const texture = getPokemonCardTextureByType(type);

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

  // Handles image format and related cleanup.
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
      transition={{ duration: 0.4 }}
      onAnimationComplete={
        () => {
          if (refId?.onFlipComplete) {
            refId.onFlipComplete();
            refId.onFlipComplete = null;
          }
        }
      }
      style={{ perspective: 800, willChange: 'transform' }}
    >
      <Tilt
        className={styles.cardFront}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={800}
        scale={1.05}
        glareEnable={true}
        glareMaxOpacity={0.6}
        glarePosition="all"
        onMove={handleMove}
        style={shadowStyle}
      >
        <Card
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
            borderRadius: '0.75px',
          }}
        >
          <CardHeader
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            titleTypographyProps={{ variant: 'secondary', fontSize: '1.25dvw' }}
            subheader={type}
            subheaderTypographyProps={{ variant: 'secondary', fontSize: '0.8dvw' }}
            sx={{
              background: 'rgba(192, 192, 192, 0.85)',
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
            paddingBottom: '0',
            overflow: 'hidden',
          }}
        />
        <div className={styles.staticGradientBack} />
      </div>
    </motion.div>
  )
})
