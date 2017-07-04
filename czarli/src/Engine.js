class _Engine {
  tick(getPlayerInputFn, gameState) {
    let input = getPlayerInputFn(0);
    if (input.direction) {
      gameState.players[0].x += input.direction.x / 10;
      gameState.players[0].y += input.direction.y / 10;
    }
  }
}

export const Engine = new _Engine();
