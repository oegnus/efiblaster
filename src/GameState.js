import { Position } from './Position';
import { Bomb } from './Bomb';

export const GameState = {
  getNewGameState: getNewGameState
};

function getNewGameState(map, players, bombs) {
  return {
    tick: 0,
    players: players || [],
    bombs: bombs || [],
    fires: [
    ],
    map: map,
    isTileOnFire: function (position) {
      const tilePosition = Position.positionToTilePosition(position);
      const firesInThisPosition = this.fires.filter(function (fire) {
        return Position.areTilePositionsEqual(tilePosition, fire.getTilePosition());
      });
      return firesInThisPosition.length > 0;
    },
    isTileWithBomb: function (position) {
      return this.getBombsInPosition(position).length > 0;
    },
    getBombsInPosition: function (position) {
      return this.bombs.filter(function (bomb) {
        return Position.areTilePositionsEqual(bomb.getPosition(), position);
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
