export const Display = {
  drawGameState: drawGameState
};

// init display:
const c = document.getElementById("efiCanvas");
const ctx = c.getContext("2d");

function drawGameState(gameState) {
  console.log('--- drawGameState ---');

  const map = gameState.map;
  for (let y = 0; y < map.getHeight(); y ++) {
    for (let x = 0; x < map.getWidth(); x ++) {
      let tile = map.getTile({
        x: x,
        y: y
      });
      drawTile(tile);
    }
  }
}

function drawTile(tile) {
  const tileWidth = 20;
  const tileHeight = 20;
  if (tile.type === 'r') {
    ctx.fillStyle = 'grey';
  } else if (tile.type === 'g') {
    ctx.fillStyle = 'green';
  } else {
    ctx.fillStyle = 'red';
  }
  ctx.beginPath();
  ctx.fillRect(
    tile.x * tileWidth,
    tile.y * tileHeight,
    tileWidth,
    tileHeight
  );
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.rect(
    tile.x * tileWidth,
    tile.y * tileHeight,
    tileWidth,
    tileHeight
  );
  ctx.stroke();
  ctx.closePath();
}
