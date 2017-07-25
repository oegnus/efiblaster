export const Display = {
  drawGameState: drawGameState
};

// init display:
const c = document.getElementById('efiCanvas');
const ctx = c.getContext('2d');

const playerColors = ['blue', 'red'];

function drawGameState(gameState) {
  console.log('--- drawGameState ---');
  drawMap(gameState.map);
  drawPlayers(gameState.players);
}

function drawMap(map) {
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

function drawPlayers(players) {
  players.forEach((player, index) => {
    drawPlayer(player, playerColors[index]);
  });
}

function drawPlayer(player, color) {
  const tileWidth = 20;
  const tileHeight = 20;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'pink';
  ctx.beginPath();
  ctx.arc(
    (player.x + 0.5) * tileWidth,
    (player.y + 0.5) * tileHeight,
    tileWidth / 2,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
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
