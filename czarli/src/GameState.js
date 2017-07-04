class _GameState {
  constructor(map, players) {
    this.map = map;
    this.players = players;
  }
}

export const GameState = {
  getNewGameState: (map, players) => {
    return new _GameState(map, players);
  }
};