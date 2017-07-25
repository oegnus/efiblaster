class _Display {
  constructor() {
    this.tilesetAsset = document.getElementById("tileset");
    this.playerAsset = document.getElementById("player");
    this.canvas = document.getElementById("efiCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.tileSize = 33;
  }

  drawGameState(gameState) {
    this.drawMap(gameState.map);
    gameState.players.forEach((player) => {
      this.drawPlayer(player)
    });
  }

  drawMap(map) {
    for (let y = 0; y < map.getHeight(); y++) {
      for (let x = 0; x < map.getWidth(); x++) {
        this.drawTile(
          map.getTile({x: x, y: y})
        );
      }
    }
  }

  drawPlayer(player) {
    const playerWidth = 50;
    const playerHeight = 44;
    this.ctx.beginPath();
    this.ctx.rect(
      player.x * this.tileSize - (playerWidth - this.tileSize) / 2,
      player.y * this.tileSize - (playerHeight - this.tileSize) / 2,
      50,
      44
    );
    this.ctx.stroke();
    this.ctx.drawImage(
      // tileset:
      this.playerAsset,
      0,
      0,
      50,
      44,
      // canvas:
      player.x * this.tileSize - (playerWidth - this.tileSize) / 2,
      player.y * this.tileSize - (playerHeight - this.tileSize) / 2,
      50,
      44
    );
  }

  drawTile(tile) {
    let positionInTileset = {x: 0, y: 0};
    if (tile.type === 'g') {
      positionInTileset = {x: 2, y: 0};
    }

    this.ctx.drawImage(
      // tileset:
      this.tilesetAsset,
      positionInTileset.x * this.tileSize,
      positionInTileset.y * this.tileSize,
      this.tileSize,
      this.tileSize,
      // canvas:
      tile.x * this.tileSize,
      tile.y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }
}

export const Display = new _Display();



