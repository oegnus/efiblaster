import { Position } from './Position';

export function Bomb(player, timeLeft) {
  this.player = player;
  this.position = player.getTilePosition() || {x: 0, y: 0};
  this.timeLeft = timeLeft || 100;

  this.getPosition = function () {
    return this.position;
  };

  this.getTilePosition = function () {
    return Position.positionToTilePosition(
      this.position
    );
  };

  this.getTimeLeft = function () {
    return this.timeLeft;
  };

  this.getRange = function () {
    return this.player.getRange();
  };

  this.getPlayerNumber = function () {
    return this.player.getPlayerNumber();
  };

  this.decreaseTimeLeft = function () {
    this.timeLeft = Math.max(0, this.timeLeft - 1);
  };

  this.explode = function () {
    this.timeLeft = 0;
  };
}
