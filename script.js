const keyCodes = {
  P1_UP: 38,
  P1_DOWN: 40,
  P1_LEFT: 37,
  P1_RIGHT: 39,
  P1_BOMB: 191,
  P2_UP: 87,
  P2_DOWN: 83,
  P2_LEFT: 65,
  P2_RIGHT: 68,
  P2_BOMB: 81
};

const moveDict = {
  38: {x: 0, y: -0.1},
  40: {x: 0, y: 0.1},
  37: {x: -0.1, y: 0},
  39: {x: 0.1, y: 0}
};

const rawMapData = [
  'rrrrrrr',
  'rgggggr',
  'rgrgrgr',
  'rgggggr',
  'rgrgrgr',
  'rgggggr',
  'rrrrrrr'
];

const player_0 = new Player(0, {x: 1, y: 1});
const player_1 = new Player(1, {x: 5, y: 5});
const gameState = {
  players: [
    player_0,
    player_1
  ],
  bombs: [
    new Bomb(player_0)
  ],
  fires: [
  ],
  mapTiles: createMapTiles(rawMapData),
  isTileOnFire: function (position) {
    const tilePosition = positionToTilePosition(position);
    const firesInThisPosition = this.fires.filter(function (fire) {
      return areTilePositionsEqual(tilePosition, fire.getTilePosition());
    });
    return firesInThisPosition.length > 0;
  }
};

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
    if (player.placeBomb) {
      const bombsInThisPosition = gameState.bombs.filter(function (bomb) {
        return areTilePositionsEqual(bomb.getPosition(), player.getTilePosition());
      });
      if (bombsInThisPosition.length === 0) {
        gameState.bombs.push(
          new Bomb(player)
        );
      }
    }
  });

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
    if (range > 0 && isTileEmpty(gameState, nextPosition)) {
      gameState.fires.push(new Fire(nextPosition));
      placeFire(gameState, range - 1, nextPosition, direction)
    }
  }

  function isTileEmpty(gameState, position) {
    return getTile(gameState.mapTiles, position).type === 'g';
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
  gameState.players.forEach(function (player) {
    const newPlayerPosition = move(
      gameState,
      player.getPosition(),
      player.getDirection()
    );
    player.setPosition(newPlayerPosition);
  });

  drawMap(gameState);
}, 20);

document.addEventListener('keydown', onKeyDownHandler);
document.addEventListener('keyup', onKeyUpHandler);

function onKeyDownHandler(e) {
  switch (e.keyCode) {
    case keyCodes.P1_UP:
      gameState.players[0].setDirectionY(-0.1);
      break;
    case keyCodes.P1_DOWN:
      gameState.players[0].setDirectionY(0.1);
      break;
    case keyCodes.P1_LEFT:
      gameState.players[0].setDirectionX(-0.1);
      break;
    case keyCodes.P1_RIGHT:
      gameState.players[0].setDirectionX(0.1);
      break;
    case keyCodes.P2_UP:
      gameState.players[1].setDirectionY(-0.1);
      break;
    case keyCodes.P2_DOWN:
      gameState.players[1].setDirectionY(0.1);
      break;
    case keyCodes.P2_LEFT:
      gameState.players[1].setDirectionX(-0.1);
      break;
    case keyCodes.P2_RIGHT:
      gameState.players[1].setDirectionX(0.1);
      break;
    case keyCodes.P1_BOMB:
      gameState.players[0].tryPlacingBomb();
      break;
    case keyCodes.P2_BOMB:
      gameState.players[1].tryPlacingBomb();
      break;
  }
}

function onKeyUpHandler(e) {
  switch (e.keyCode) {
    case keyCodes.P1_UP:
      gameState.players[0].setDirectionY(0);
      break;
    case keyCodes.P1_DOWN:
      gameState.players[0].setDirectionY(0);
      break;
    case keyCodes.P1_LEFT:
      gameState.players[0].setDirectionX(0);
      break;
    case keyCodes.P1_RIGHT:
      gameState.players[0].setDirectionX(0);
      break;
    case keyCodes.P2_UP:
      gameState.players[1].setDirectionY(0);
      break;
    case keyCodes.P2_DOWN:
      gameState.players[1].setDirectionY(0);
      break;
    case keyCodes.P2_LEFT:
      gameState.players[1].setDirectionX(0);
      break;
    case keyCodes.P2_RIGHT:
      gameState.players[1].setDirectionX(0);
      break;
    case keyCodes.P1_BOMB:
      gameState.players[0].resetPlacingBomb();
      break;
    case keyCodes.P2_BOMB:
      gameState.players[1].resetPlacingBomb();
      break;
  }
}

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
  const tilePosition = {
    x: Math.round(position.x),
    y: Math.round(position.y)
  };
  if (areTilePositionsEqual(currentPosition, tilePosition)) {
    return true;
  }
  for (let i = 0; i < state.bombs.length; i ++) {
    let bombPosition = state.bombs[i].getPosition();
    if (areTilePositionsEqual(bombPosition, tilePosition)) {
      return false;
    }
  }
  const tile = getTile(state.mapTiles, tilePosition);
  return tile.type === 'g';
}

function sumPositions(p1, p2) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
}

function positionToTilePosition(position) {
  return {
    x: Math.round(position.x),
    y: Math.round(position.y)
  };
}

function areTilePositionsEqual(p1, p2) {
  return (Math.round(p1.x) === Math.round(p2.x)) && (Math.round(p1.y) === Math.round(p2.y));
}
