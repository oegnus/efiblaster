function getNewGameState(map) {
  const player_0 = new Player(0, {x: 1, y: 1});
  const player_1 = new Player(1, {x: 5, y: 5});
  return {
    players: [
      player_0,
      player_1
    ],
    bombs: [
      new Bomb(player_0)
    ],
    fires: [
    ],
    map: map,
    isTileOnFire: function (position) {
      const tilePosition = positionToTilePosition(position);
      const firesInThisPosition = this.fires.filter(function (fire) {
        return areTilePositionsEqual(tilePosition, fire.getTilePosition());
      });
      return firesInThisPosition.length > 0;
    },
    isTileWithBomb: function (position) {
      return this.getBombsInPosition(position).length > 0;
    },
    getBombsInPosition: function (position) {
      return this.bombs.filter(function (bomb) {
        return areTilePositionsEqual(bomb.getPosition(), position);
      });
    },
    placeBomb: function (player) {
      if (!this.isTileWithBomb(player.getPosition())) {
        this.bombs.push(
          new Bomb(player)
        );
      }
    }
  };
}
