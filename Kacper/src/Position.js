export const Position = {
  sumPositions: sumPositions
};

export function sumPositions(p1, p2) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
}
