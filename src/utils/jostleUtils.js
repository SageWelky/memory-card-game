export function generateJostleOffset(range = 20, rotation = 35) {
  const rand = (min, max) => min + Math.random() * (max - min);
  return {
    x: rand(-range/4, range/4),
    y: rand(-range/4, range/4),
    rotate: rand(-rotation/4, rotation/4),
  }
}
