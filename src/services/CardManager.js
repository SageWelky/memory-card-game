export class CardManager {
  constructor() {

  }

  getCardById = async (pokemonId) => {
    let drawnPokemonCard;

    let cachedCard = getStoredCard(pokemonId);
    if ( cachedCard ) {
      drawnPokemonCard = cachedCard;
    } else {
      drawnPokemonCard = await getFetchCard(pokemonId);
      console.log(drawnPokemonCard);
      setStoredCard(drawnPokemonCard);
    }

    return drawnPokemonCard;
  }

  getFetchCard = async (pokemonId) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const { name, types, sprites } = await res.json();
      const type = types[0].type.name;
      const defaultImage = sprites["front_default"];
      const shinyImage = sprites["front_shiny"];
      const cardId = crypto.randomUUID();

      return { cardId, name, type, pokemonId, defaultImage, shinyImage };
    }
    catch (error) {
      (error => console.error('Error fetching data:', error));
    }
  }

  getStoredCard(pokemonId) {
    const key = pokemonId;
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  setStoredCard({ cardId, name, type, pokemonId, defaultImage, shinyImage }) {
    const key = pokemonId;
    localStorage.setItem(key, JSON.stringify({ cardId, name, type, pokemonId, defaultImage, shinyImage }));
  }

}