const rawMapData = [
  'rrrrrrr',
  'rggdddr',
  'rgrdrgr',
  'rddgggr',
  'rdrgrgr',
  'rgggggr',
  'rrrrrrr'
];

const gameState = getNewGameState(
  Map.createNewMap(rawMapData)
);

setInterval(function () {
  // TICK BOMBS
  gameState.bombs.forEach(function (bomb) {
    bomb.decreaseTimeLeft();
  });

  // TRIGGER BOMBS WITH FIRE
  gameState.bombs.forEach(function (bomb) {
    if (gameState.isTileOnFire(bomb.getTilePosition())) {
      bomb.explode();
    }
  });

  // TICK FIRES
  gameState.fires.forEach(function (fire) {
    fire.decreaseTimeLeft();
  });

  // PLACE BOMBS
  gameState.players.forEach(function (player) {
    const playerInput = getPlayerInput(player.getPlayerNumber());
    if (playerInput.placeBomb && playerHasBombsLeft(player)) {
      gameState.placeBomb(player);
    }
  });

  function playerHasBombsLeft(player) {
    return getPlayerBombsNumber(player.getPlayerNumber()) < player.getMaxBombsNumber();
  }

  function getPlayerBombsNumber(playerNum) {
    return gameState.bombs
      .filter(function (bomb) {
        return bomb.getPlayerNumber() === playerNum;
      })
      .length;
  }

  // ADD EXPLOSIONS
  gameState.bombs
    .filter(function (bomb) {
      return bomb.getTimeLeft() === 0;
    })
    .forEach(function (bomb) {
      const position = bomb.getTilePosition();
      const range = bomb.getRange();
      gameState.fires.push(new Fire(position));
      placeFire(gameState, range, position, {x: -1, y: 0});
      placeFire(gameState, range, position, {x: 1, y: 0});
      placeFire(gameState, range, position, {x: 0, y: -1});
      placeFire(gameState, range, position, {x: 0, y: 1});
    });

  function placeFire(gameState, range, position, direction) {
    const nextPosition = sumPositions(position, direction);
    if (range > 0) {
      const tile = gameState.map.getTile(nextPosition);
      if (tile.type === 'g') {
        gameState.fires.push(new Fire(nextPosition));
        placeFire(gameState, range - 1, nextPosition, direction);
      }
      if (tile.type === 'd') {
        gameState.fires.push(new Fire(nextPosition));
        tile.type = 'g';
      }
    }
  }

  // REMOVE EXPLODING BOMBS
  gameState.bombs = gameState.bombs.filter(function (bomb) {
    return bomb.getTimeLeft() > 0;
  });

  // REMOVE BURNT FIRES
  gameState.fires = gameState.fires.filter(function (fire) {
    return fire.getTimeLeft() > 0;
  });

  // MOVE PLAYERS
  const speed = 0.1;
  gameState.players.forEach(function (player) {
    const playerDirection = getPlayerInput(player.getPlayerNumber()).direction;
    const movement = {x: 0, y: 0};
    if (playerDirection.x > 0) {
      movement.x = speed;
    }
    if (playerDirection.x < 0) {
      movement.x = -speed;
    }
    if (playerDirection.y > 0) {
      movement.y = speed;
    }
    if (playerDirection.y < 0) {
      movement.y = -speed;
    }
    const newPlayerPosition = move(
      gameState,
      player.getPosition(),
      movement
    );
    player.setPosition(newPlayerPosition);
  });

  Draw.drawGameState(gameState);
}, 20);

function move(state, playerPosition, playerDirection) {
  const newPlayerPosition = sumPositions(
    playerPosition,
    playerDirection
  );
  if(canWalkOnPosition(state, playerPosition, newPlayerPosition)) {
    return newPlayerPosition;
  }

  const newPlayerPositionX = sumPositions(
    playerPosition,
    {x: playerDirection.x, y: 0}
  );
  if(canWalkOnPosition(state, playerPosition, newPlayerPositionX)) {
    return newPlayerPositionX;
  }

  const newPlayerPositionY = sumPositions(
    playerPosition,
    {x: 0, y: playerDirection.y}
  );
  if(canWalkOnPosition(state, playerPosition, newPlayerPositionY)) {
    return newPlayerPositionY;
  }

  return playerPosition;
}

function canWalkOnPosition(state, currentPosition, position) {
  if (areTilePositionsEqual(currentPosition, position)) {
    return true;
  }
  if (state.isTileWithBomb(position)) {
    return false;
  }
  const tile = state.map.getTile(position);
  return tile.type === 'g';
}
