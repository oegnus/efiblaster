export const Engine = {
  tick: (getPlayerInputFn, gameState) => {
    const playerSpeed = 0.1;

    const p0 = gameState.players[0];
    const p0_input = getPlayerInputFn(0);

    const p0_positionDelta = {x: 0, y: 0};
    if (p0_input.direction.x > 0) {
      p0_positionDelta.x = playerSpeed;
    }
    if (p0_input.direction.x < 0) {
      p0_positionDelta.x = -playerSpeed;
    }
    const p0_newPosition = {
      x: Math.round(100 * (p0.x + p0_positionDelta.x)) * 0.01,
      y: Math.round(100 * (p0.y + p0_positionDelta.y)) * 0.01
    };
    const tile = gameState.map.getTile(p0_newPosition);
    if (tile.type === 'g') {
      p0.x = p0_newPosition.x;
      p0.y = p0_newPosition.y;
    }
  }
};
