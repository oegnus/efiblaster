function Player(playerNumber, position, direction) {
  this.playerNumber = playerNumber;
  this.range = 2;
  this.position = position || {x: 0, y: 0};
  this.direction = direction || {x: 0, y: 0};
  this.placeBomb = false;

  this.getPlayerNumber = function () {
    return this.playerNumber;
  };

  this.getRange = function () {
    return this.range;
  };

  this.getPosition = function () {
    return this.position;
  };

  this.getTilePosition = function () {
    return {
      x: Math.round(this.position.x),
      y: Math.round(this.position.y)
    };
  };

  this.setPosition = function (newPosition) {
    this.position = newPosition;
  };

  this.getDirection = function () {
    return this.direction;
  };

  this.setDirection = function (newDirection) {
    this.direction = newDirection;
  };

  this.setDirectionX = function (x) {
    this.direction.x = x;
  };

  this.setDirectionY = function (y) {
    this.direction.y = y;
  };

  this.tryPlacingBomb = function () {
    this.placeBomb = true;
  };

  this.resetPlacingBomb = function () {
    this.placeBomb = false;
  };
}
