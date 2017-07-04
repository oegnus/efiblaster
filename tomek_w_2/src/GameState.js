export const GameState = {
  getNewGameState: getNewGameState
};

function getNewGameState(map, players) {
  return {
    map,
    players
  };
}
