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
      console.log("Found in cache");
      drawnPokemonCard = cachedCard;
    } else {
      console.log("Need to request this one:", pokemonId);
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
      // const shinyImageURL = sprites["front_shiny"];

      // const [defaultImage, shinyImage] = await Promise.all([
      //   this.fetchImageBlob(defaultImageURL),
      //   this.fetchImageBlob(shinyImageURL)
      // ]);
      const defaultImage = await this.fetchImageBlob(defaultImageURL);

      const cardId = crypto.randomUUID();

      // Don't forget to add shinyImage back if shiny version ever get a feature.
      return { cardId, name, type, pokemonId, defaultImage }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
  }

  async fetchWithRetry(fetchFn, retries = 2, delayMs = 300) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fetchFn();
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          console.warn(`Retrying... attempt ${attempt + 1}`);
          await new Promise(res => setTimeout(res, delayMs));
        }
      }
    }

    throw lastError;
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta');
        }
      };

      request.onsuccess = () => {
        const db = request.result;

        db.onversionchange = () => {
          db.close();
          console.warn('Database outdated.');
        };

        // This just makes sure the db is stable.
        setTimeout(() => resolve(db), 0);
      };

      request.onerror = () => reject(request.error);
    });
  }


  async getMeta(key) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('meta', 'readonly');
      const store = tx.objectStore('meta');
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async setMeta(key, value) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('meta', 'readwrite');
      const store = tx.objectStore('meta');
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
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

  async checkIndexedDBForFirstTime() {
    const alreadyDone = await this.getMeta('firstLoadDone');
    // If nothing is found it will return undefined
    // which is falsy, thus we store true in indexedDB despite returning
    // false to store in isFirstLoad.
    if (alreadyDone) {
      return false
    } else {
      return true
    }
  }

  async seedInitialCards(limit = 50, batchSize = 10, disableLimitWarn = false) {
    if ((limit < 36) && !disableLimitWarn) {
      console.warn('Ensure limit:', limit, 'is above 36 (or 3 times your hand size).');
    }
    const ids = Array.from({ length: limit }, (_, i) => (i + 1).toString());

    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);

      const cards = await Promise.all(
        batch.map(id =>
          this.fetchWithRetry(() => this.getFetchCard(id))
            .catch(err => {
              console.warn('Failed to fetch card after retries', id, err);
              return null;
            }
          )
        )
      );
      await Promise.all(cards.filter(Boolean).map(card => this.setStoredCard(card)));
    }
    await this.setMeta('firstLoadDone', true);
  }
}
