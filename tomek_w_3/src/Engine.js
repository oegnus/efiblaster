export const Engine = {
  tick: tick
};

function tick(getPlayerInput, gameState) {
  gameState.players.forEach((player, playerNumber) => {
    const newPlayerPosition = getNewPlayerPosition(
      player,
      getPlayerInput(playerNumber).direction
    );
    player.x = newPlayerPosition.x;
    player.y = newPlayerPosition.y;
  });
}

function getNewPlayerPosition(player, direction) {
  if (direction.x > 0) {
    return roundPosition({
      x: player.x + 0.1,
      y: player.y
    });
  } else if (direction.x < 0) {
    return roundPosition({
      x: player.x - 0.1,
      y: player.y
    });
  }

  if (direction.y > 0) {
    return roundPosition({
      x: player.x,
      y: player.y + 0.1
    });
  } else if (direction.y < 0) {
    return roundPosition({
      x: player.x,
      y: player.y - 0.1
    });
  }

  return roundPosition({
    x: player.x,
    y: player.y
  });
}

function roundPosition(position) {
  return {
    x: Math.round(position.x * 10) / 10,
    y: Math.round(position.y * 10) / 10
  };
}
