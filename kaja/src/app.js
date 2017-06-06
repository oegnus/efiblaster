import {
  Map
} from './Map';
import {
  Display
} from './Display';


const map = Map.createNewMap([
  'rrrrrrrr',
  'rrggggrr',
  'rggrrggr',
  'gggggggg',
  'rggggggr',
  'rrggggrr',
  'rrrggrrr'
])

const gameState = {
  map: map,
  players: [{
    x: 1,
    y: 3
  }, {
    x: 5,
    y: 5
  }]
}


setInterval(tick, 1000);

function tick() {
  const p1 = gameState.players[0];
  const newPlayerPosition = p1.x = {
    x: p1.x + 0.1,
    y: p1.y
  };
  const tile = gameState.map.getTile(newPlayerPosition);

if (tile.type === 'g') {
  p1.x = newPlayerPosition.x;
  p1.y = newPlayerPosition.y;

}

  Display.drawGameState(gameState);
}
