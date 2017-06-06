const tilesetAsset = document.getElementById("tileset");
const playerAsset = document.getElementById("player");

const c = document.getElementById("efiCanvas");
const ctx = c.getContext("2d");
const tileSize = 33;

export const Display = {
  drawGameState: function(gameState) {
    this.drawMap(gameState.map);
    drawPlayer(gameState.players[0]);

    gameState.players.forEach(drawPlayer)
  },

  drawMap: function(map) {
    for (var y = 0; y < map.getHeight(); y++) {
      for (var x = 0; x < map.getWidth(); x++) {
        drawTile(
          map.getTile({
            x: x,
            y: y
          })
        )
      }
    }
  }
}

function drawPlayer (player) {
  ctx.drawImage(
    // tileset:
    playerAsset,
    0,
    0,
    50,
    44,
    // canvas:
    player.x * tileSize,
    player.y * tileSize,
    50,
    44
  );
}


function drawTile(tile) {
  let positionInTileset = {
    x: 0,
    y: 0
  };

  if (tile.type === 'g') {
    positionInTileset = {
      x: 2,
      y: 0
    }
  }

  ctx.drawImage(
    // tileset:
    tilesetAsset,
    positionInTileset.x * tileSize,
    positionInTileset.y * tileSize,
    tileSize,
    tileSize,
    // canvas:
    tile.x * tileSize,
    tile.y * tileSize,
    tileSize,
    tileSize
  );
}
