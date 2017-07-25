const playersInput = [
  {
    direction: {x: 0, y: 0}
  },
  {
    direction: {x: 0, y: 0}
  }
];

export const Input = {
  getPlayerInput: getPlayerInput
};

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 65) {
    playersInput[0].direction.x = -1;
  }
  if (event.keyCode === 68) {
    playersInput[0].direction.x = 1;
  }
});

function getPlayerInput(playerNumber) {
  return playersInput[playerNumber] || {
    direction: {x: 0, y: 0}
  };
}
