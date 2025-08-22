import colorlessTexture from 'assets/images/colorlessTexture.png'
import fightingTexture from 'assets/images/fightingTexture.png'
import fireTexture from 'assets/images/fireTexture.jpg'
import grassTexture from 'assets/images/grassTexture.jpg'
import lightningTexture from 'assets/images/lightningTexture.jpg'
import psychicTexture from 'assets/images/psychicTexture.png'
import waterTexture from 'assets/images/waterTexture.jpg'

export const getPokemonCardTextureByType = (pokemonType) => {
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