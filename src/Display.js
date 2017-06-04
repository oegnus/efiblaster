export const Display = (function () {
  const tilesetAsset = document.getElementById("tileset");
  const charactersAsset = document.getElementById("characters");
  const playerAsset = document.getElementById("player");
  const bombAsset = document.getElementById("bomb");

  const c = document.getElementById("efiCanvas");
  const ctx = c.getContext("2d");

  const mapTileWidth = 33;
  const mapTileHeight = 33;

  const tilesetPositions = {
    g: {x: 2, y: 0},
    r: {x: 0, y: 0},
    d: {x: 1, y: 0},
    w: {x: 3, y: 0}
  };

  // module public interface:
  return {
    drawGameState: drawGameState
  }

  function drawGameState(gameState) {
    for (var y = 0; y < gameState.map.getHeight(); y ++) {
      for (var x = 0; x < gameState.map.getWidth(); x ++) {
        drawMapTile(
          gameState.map.getTile({x: x, y: y})
        );
      }
    }
    gameState.bombs.forEach(function (bomb) {
      drawBomb(bomb);
      drawText(bomb.getPosition(), bomb.getTimeLeft());
    });
    gameState.fires.forEach(function (fire) {
      drawOutline(fire.getTilePosition(), 'yellow');
      drawText(fire.getTilePosition(), fire.getTimeLeft());
    });
    gameState.players.forEach(function (player) {
      drawOutline(player.getTilePosition(), 'blue');
      drawPlayer(player, gameState.tick);
    });
  }

  function drawMapTile(mapTile) {
    const positionInTileset = tilesetPositions[mapTile.type];
    const tileWidth = 33;
    const tileHeight = 33;
    if (positionInTileset) {
      ctx.drawImage(
        // tileset:
        tilesetAsset,
        positionInTileset.x * tileWidth,
        positionInTileset.y * tileWidth,
        tileWidth,
        tileHeight,
        // canvas:
        mapTile.x * mapTileWidth,
        mapTile.y * mapTileHeight,
        tileWidth,
        tileHeight
      );
    }
  }

  function drawPlayer(player, tick) {
    const playerNumOffset = 3 * player.getPlayerNumber();
    const position = player.getPosition();
    const direction = player.getDirection();

    const spriteNums = {0: 0, 1: 1, 2: 2, 3: 1};
    const movementFrame = Math.round(tick / 8) % 4;
    const spriteNum = playerNumOffset + spriteNums[movementFrame];
    let positionInTileset = {x: 7 + playerNumOffset, y: 0};
    if (player.getDirection().y > 0) {
      positionInTileset = {x: 6 + spriteNum, y: 0};
    }
    if (player.getDirection().y < 0) {
      positionInTileset = {x: 6 + spriteNum, y: 3};
    }
    if (player.getDirection().x < 0) {
      positionInTileset = {x: 6 + spriteNum, y: 1};
    }
    if (player.getDirection().x > 0) {
      positionInTileset = {x: 6 + spriteNum, y: 2};
    }

    const tileWidth = 32;
    const tileHeight = 48;
    ctx.drawImage(
      // tileset:
      charactersAsset,
      positionInTileset.x * tileWidth,
      positionInTileset.y * tileHeight,
      tileWidth,
      tileHeight,
      // canvas:
      Math.round(position.x * mapTileWidth + 0.5 * (mapTileWidth - tileWidth)),
      Math.round(position.y * mapTileHeight + 0.5 * (mapTileHeight - tileHeight)),
      tileWidth,
      tileHeight
    );
  }

  function drawBomb(bomb) {
    let animationFrame = Math.round(bomb.getTimeLeft() / 10) % 4;
    if (animationFrame > 2) {
      animationFrame = 1;
    }
    const position = bomb.getTilePosition();
    const positionInTileset = {x: animationFrame, y: 0};
    const tileWidth = 32;
    const tileHeight = 32;
    ctx.drawImage(
      // tileset:
      bombAsset,
      positionInTileset.x * tileWidth,
      positionInTileset.y * tileWidth,
      tileWidth,
      tileWidth,
      // canvas:
      position.x * mapTileWidth + Math.round(0.5 * (mapTileWidth - tileWidth)),
      position.y * mapTileHeight + Math.round(0.5 * (mapTileHeight - tileHeight)),
      tileWidth,
      tileHeight
    );
  }

  function drawOutline(position, color) {
    ctx.beginPath();
    ctx.lineWidth = '3';
    ctx.strokeStyle = color || 'red';
    ctx.rect(
      position.x * mapTileWidth,
      position.y * mapTileHeight,
      mapTileWidth,
      mapTileWidth
    );
    ctx.stroke();
  }

  function drawText(position, text) {
    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(
      text,
      position.x * mapTileWidth + mapTileWidth / 2,
      position.y * mapTileHeight + mapTileHeight / 2
    );
  }
})();
