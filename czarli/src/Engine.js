class _Engine {
  tick(getPlayerInputFn, gameState) {
    let input = getPlayerInputFn(0);

    const playerPosX = gameState.players[0].x;
    const playerPosY = gameState.players[0].y;

    // console.log(input.direction.x);
    console.log(playerPosX);
    console.log(playerPosY);
    console.log(input.direction);

    if (this.canWalkOnTile(gameState.map, {x: playerPosX, y: playerPosY}, input.direction)) {
      gameState.players[0].x = (gameState.players[0].x * 10 + input.direction.x) / 10;
      gameState.players[0].y = (gameState.players[0].y * 10 + input.direction.y) / 10;
    }
  }

  canWalkOnTile(map, position, direction) {
    let y;
    let x;

    if (direction.y === 0) {
      y =  Math.floor(position.y);
    }

    if (direction.x === 0) {
      x =  Math.floor(position.x);
    }

    if (direction.y < 0) {
      y =  Math.ceil(position.y) - 1
    }

    if (direction.y > 0) {
      y =  Math.floor(position.y) + 1
    }

    if (direction.x < 0) {
      x =  Math.ceil(position.x) - 1
    }

    if (direction.x > 0) {
      x =  Math.floor(position.x) + 1
    }

    return map.getTile({x, y}).type !== 'r'
  }
}

export const Engine = new _Engine();
