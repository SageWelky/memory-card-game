export class CardManager {
  constructor() {
    this.cardIdToPokemonId = new Map();
    this.dbName = 'PokemonCache';
    this.storeName = 'cards';
    this.dbPromise = this.openDB().catch(err => {
      console.error("Failed to open IndexedDB:", err);
      throw err;
    });
  }

  async getCardById(pokemonId) {
    let drawnPokemonCard;
    const cachedCard = await this.getStoredCard(pokemonId);

    if (cachedCard) {
      drawnPokemonCard = cachedCard;
    } else {
      drawnPokemonCard = await this.getFetchCard(pokemonId);
      if (drawnPokemonCard) {
        await this.setStoredCard(drawnPokemonCard);
      } else {
        console.warn(`Card fetch failed for ID ${pokemonId}`);
      }
    }

    if (drawnPokemonCard?.cardId && drawnPokemonCard?.pokemonId) {
      this.cardIdToPokemonId.set(drawnPokemonCard.cardId, drawnPokemonCard.pokemonId);
    }

    return drawnPokemonCard
  }

  getPokemonIdFromCardId(cardId) {
    return this.cardIdToPokemonId.get(cardId);
  }

  async fetchImageBlob(url) {
    if (!url) return null;
    const res = await fetch(url);
    return await res.blob();
  }

  async getFetchCard(pokemonId) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! Status: ${res.status}, Details: ${errorText}`);
      }

      const { name, types, sprites } = await res.json();
      const type = types[0].type.name;
      const defaultImageURL = sprites["front_default"];
      const shinyImageURL = sprites["front_shiny"];

      const [defaultImage, shinyImage] = await Promise.all([
        this.fetchImageBlob(defaultImageURL),
        this.fetchImageBlob(shinyImageURL)
      ]);

      const cardId = crypto.randomUUID();

      return { cardId, name, type, pokemonId, defaultImage, shinyImage }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    })
  }

  async getStoredCard(pokemonId) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.get(pokemonId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    })
  }

  async setStoredCard(cardData) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.put(cardData, cardData.pokemonId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    })
  }
}
