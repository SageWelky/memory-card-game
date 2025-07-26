export const ALL_IDS = Array.from({ length: 151 }, (_, i) => (i + 1).toString());

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
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex]
}

export function isInList(list, id) {
  return list.some(item => item.pokemonId === id)
}