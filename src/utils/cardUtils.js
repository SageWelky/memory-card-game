export const ALL_IDS = Array.from({ length: 151 }, (_, i) => (i + 1).toString());
export const FIRST_IDS = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

export function getUsedIds(discardPileIds, drawnCards = []) {
  const drawnIds = drawnCards.map(card => card.pokemonId);
  return new Set([...discardPileIds, ...drawnIds])
}

export function getAvailableIds(discardPileIds, drawnCards = []) {
  const usedIds = getUsedIds(discardPileIds, drawnCards);
  return ALL_IDS.filter(id => !usedIds.has(id))
}

export function getRandomIdFromList(list) {
  if (list.length === 0) throw new Error("Cannot select from an empty list");
  const randomIndex = Math.floor(Math.random() * (list.length));
  return list[randomIndex]
}

export function isInList(list, id) {
  return list.some(item => item.pokemonId === id)
}

export function getImageSrcFromCard(card, variant = "default") {
  // Re-enable if you ever use shiny pokemon in a feature.
  // const blob = variant === "shiny" ? card.shinyImage : card.defaultImage;
  const blob = card.defaultImage;
  return blob instanceof Blob ? URL.createObjectURL(blob) : blob
}