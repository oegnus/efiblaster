export const GameState = {
  getNewGameState: getNewGameState
};

function getNewGameState(map, players) {
  return {
    players: players,
    map: map
  };
}
