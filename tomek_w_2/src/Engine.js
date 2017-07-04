export const Engine = {
  tick: (getPlayerInputFn, gameState) => {
    const p1 = gameState.players[0];
    const newPlayerPosition = {
      x: p1.x + 0.1,
      y: p1.y
    };
    const tile = gameState.map.getTile(newPlayerPosition);
    if (tile.type === 'g') {
      p1.x = newPlayerPosition.x;
      p1.y = newPlayerPosition.y;
    }
  }
};
