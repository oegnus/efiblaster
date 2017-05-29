function Fire(position, timeLeft) {
  this.position = position || {x: 0, y: 0};
  this.timeLeft = timeLeft || 30;

  this.getTilePosition = function () {
    return {
      x: Math.round(this.position.x),
      y: Math.round(this.position.y)
    };
  };

  this.getTimeLeft = function () {
    return this.timeLeft;
  };

  this.decreaseTimeLeft = function () {
    this.timeLeft = Math.max(0, this.timeLeft - 1);
  };
}
