export const Position = {
  sumPositions: sumPositions,
  areTilePositionsEqual: areTilePositionsEqual,
  positionToTilePosition: positionToTilePosition
};

export function sumPositions(p1, p2) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
}

export function areTilePositionsEqual(p1, p2) {
  return (Math.round(p1.x) === Math.round(p2.x)) && (Math.round(p1.y) === Math.round(p2.y));
}

export function positionToTilePosition(position) {
  return {
    x: Math.round(position.x),
    y: Math.round(position.y)
  };
}
