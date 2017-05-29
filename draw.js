const tilesetAsset = document.getElementById("tileset");
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

function drawMap(gameState) {
  const mapTiles = gameState.mapTiles;
  for (var coordinates in mapTiles) {
    var mapTile = mapTiles[coordinates];
    drawMapTile(mapTile);
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
    drawPlayer(player.getPosition());
  });
}

function drawMapTile(mapTile) {
  const positionInTileset = tilesetPositions[mapTile.type];
  const tileWidth = 33;
  const tileHeight = 33;
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

function drawPlayer(player) {
  const positionInTileset = {x: 0, y: 0};
  const tileWidth = 50;
  const tileHeight = 44;
  ctx.drawImage(
    // tileset:
    playerAsset,
    positionInTileset.x * tileWidth,
    positionInTileset.y * tileWidth,
    tileWidth,
    tileWidth,
    // canvas:
    player.x * mapTileWidth + Math.round(0.5 * (mapTileWidth - tileWidth)),
    player.y * mapTileHeight + Math.round(0.5 * (mapTileHeight - tileHeight)),
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
