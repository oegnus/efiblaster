function getPlayerInput(playerNum) {
  return playersInputs[playerNum];
}

const playersInputs = [
  {
    direction: {x: 0, y: 0},
    placeBomb: false
  },
  {
    direction: {x: 0, y: 0},
    placeBomb: false
  }
]

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

document.addEventListener('keydown', onKeyDownHandler);
document.addEventListener('keyup', onKeyUpHandler);

function onKeyDownHandler(e) {
  switch (e.keyCode) {
    case keyCodes.P1_UP:
      playersInputs[0].direction.y = -1;
      break;
    case keyCodes.P1_DOWN:
    playersInputs[0].direction.y = 1;
      break;
    case keyCodes.P1_LEFT:
      playersInputs[0].direction.x = -1;
      break;
    case keyCodes.P1_RIGHT:
    playersInputs[0].direction.x = 1;
      break;
    case keyCodes.P2_UP:
      playersInputs[1].direction.y = -1;
      break;
    case keyCodes.P2_DOWN:
      playersInputs[1].direction.y = 1;
      break;
    case keyCodes.P2_LEFT:
      playersInputs[1].direction.x = -1;
      break;
    case keyCodes.P2_RIGHT:
      playersInputs[1].direction.x = 1;
      break;
    case keyCodes.P1_BOMB:
      playersInputs[0].placeBomb = true;
      break;
    case keyCodes.P2_BOMB:
      playersInputs[1].placeBomb = true;
      break;
  }
}

function onKeyUpHandler(e) {
  switch (e.keyCode) {
    case keyCodes.P1_UP:
      playersInputs[0].direction.y = 0;
      break;
    case keyCodes.P1_DOWN:
    playersInputs[0].direction.y = 0;
      break;
    case keyCodes.P1_LEFT:
      playersInputs[0].direction.x = 0;
      break;
    case keyCodes.P1_RIGHT:
      playersInputs[0].direction.x = 0;
      break;
    case keyCodes.P2_UP:
      playersInputs[1].direction.y = 0;
      break;
    case keyCodes.P2_DOWN:
      playersInputs[1].direction.y = 0;
      break;
    case keyCodes.P2_LEFT:
      playersInputs[1].direction.x = 0;
      break;
    case keyCodes.P2_RIGHT:
      playersInputs[1].direction.x = 0;
      break;
    case keyCodes.P1_BOMB:
      playersInputs[0].placeBomb = false;
      break;
    case keyCodes.P2_BOMB:
      playersInputs[1].placeBomb = false;
      break;
  }
}
