export function generateJostleOffset(range = 20, rotation = 35) {
  const rand = (min, max) => min + Math.random() * (max - min);
  return {
    x: rand(-range, range),
    y: rand(-range, range),
    rotate: rand(-rotation, rotation),
  }
}