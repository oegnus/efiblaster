class _Engine {
  tick(getPlayerInputFn, gameState) {
    let input = getPlayerInputFn(0);
    const playerPositionX = gameState.players[0].x;
    const playerPositionY = gameState.players[0].y;

    if (input.direction) {
      gameState.players[0].x = (gameState.players[0].x * 10 + input.direction.x) / 10;
      gameState.players[0].y = (gameState.players[0].y * 10 + input.direction.y) / 10;

      if (this.canWalkOnTile(gameState.map, {x: gameState.players[0].x, y: gameState.players[0].y}, input.direction)) {
        if (gameState.players[0].x < 0) {
          gameState.players[0].x = 0;
        }

        if (gameState.players[0].y < 0) {
          gameState.players[0].y = 0;
        }

      } else {
        gameState.players[0].x = playerPositionX;
        gameState.players[0].y = playerPositionY;
      }
    }
  }

  canWalkOnTile(map, position, direction) {
    let y = 0;
    let x = 0;

    if (direction.y < 0) {
      y = Math.floor(position.y) - 1;
    }

    if (direction.y > 0) {
      y = Math.ceil(position.y) + 1;
    }

    if (direction.x < 0) {
      x = Math.floor(position.x) - 1;
    }

    if (direction.x > 0) {
      x = Math.ceil(position.x) + 1;
    }

    return map.getTile({x, y}).type !== 'r'
  }
}

export const Engine = new _Engine();
