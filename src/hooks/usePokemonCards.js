import { useState } from 'react'

//PUBLIC:
export const usePokemonCards = () => {
  const { currentHand, discardPile, drawNewHand, shuffleHand, discardHand } = usePokemonCardsInternal();
  return { currentHand, discardPile, drawNewHand, shuffleHand, discardHand };
}

//PRIVATE:
const usePokemonCardsInternal = () => {
  const [discardPile, setDiscardPile] = useState([]);
  const [currentHand, setCurrentHand] = useState([]);

  function _isInDiscardPile(targetPokemonId) {
    return discardPile.find(({ pokemonId }) => pokemonId === targetPokemonId)
  }

  function _isInDrawnCards(drawnCards, targetPokemonId) {
    return drawnCards.find(({ pokemonId }) => pokemonId === targetPokemonId)
  }

  function _discardOrReplaceHand(newHand = []) {
    const newToDiscard = currentHand.filter(item => !discardPile.has(item));
    setDiscardPile([...discardPile, ...newToDiscard]);
    setCurrentHand(newHand);
  }

  const drawNewHand = async (amount) => {
    if ( (Math.ceil(amount / 2) + discardPile.length) > 151) {
      if (discardPile.length === 151) {
        throw new Error("No unseen cards left to draw.");
      } else {
        amount = (151 - discardPile.length) * 2;
      }
    }
    if ( amount < 1 ) {
      throw new Error("Cannot draw less than one card for a hand.");
    }

    const drawnCards = [];

    while( drawnCards.length < amount ) {
      let newPokemonId;

      // Ensures at least half the cards are not from the discard pile.
      if ( drawnCards < (Math.ceil(amount / 2)) ) {
        do {
          newPokemonId = generateRandomPokemonId();
        } while ( _isInDrawnCards(drawnCards, newPokemonId) || _isInDiscardPile(newPokemonId) );
      } else {
        do {
          newPokemonId = generateRandomPokemonId();
        } while ( _isInDrawnCards(drawnCards, newPokemonId) );
      }
      const drawnPokemonCard = await drawCardById(newPokemonId);
      drawnCards.push(drawnPokemonCard);
    }

    _discardOrReplaceHand(drawnCards);
  }

  const shuffleHand = () => {
    const cardsToShuffle = [...currentHand];
    const shuffledCards = [];

    while (cardsToShuffle.length > 0) {
      const index = Math.floor(Math.random() * cardsToShuffle.length);
      let [removedCard] = cardsToShuffle.splice(index, 1);
      shuffledCards.push(removedCard);
    }

    setCurrentHand(shuffledCards);
  };

  const discardHand = () => _discardOrReplaceHand();

  return { currentHand, discardPile, drawNewHand, shuffleHand, discardHand };
}


//UTILS:
function generateRandomPokemonId() {
  // Range as been abritrarily limited to the 151 "first-gen" pokemon,
  // but the API supports more.
  return Math.floor(Math.random() * 152).toString();
}

const drawCardById = async (pokemonId) => {
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

const getFetchCard = async (pokemonId) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }

    const { name, sprites } = await res.json();
    const defaultImage = sprites["front_default"];
    const shinyImage = sprites["front_shiny"];
    const cardId = crypto.randomUUID();

    return { cardId, name, pokemonId, defaultImage, shinyImage };
  }
  catch (error) {
    (error => console.error('Error fetching data:', error));
  }
}

function getStoredCard(pokemonId) {
  const key = pokemonId;
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
}

function setStoredCard({ cardId, name, pokemonId, defaultImage, shinyImage }) {
  const key = pokemonId;
  localStorage.setItem(key, JSON.stringify({ cardId, name, pokemonId, defaultImage, shinyImage }));
}
