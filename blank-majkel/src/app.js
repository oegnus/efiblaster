import { Map } from './Map';
import { Display } from './Display';
// import { Position } from './Position';

const map = Map.createNewMap([
  'rrrrrrr',
  'rgggggr',
  'rgrgrgr',
  'rgggggr',
  'rgrgrgr',
  'rgggggr',
  'rrrrrrr'
]);

const gameState = {
  map: map,
  players: [
    {
      x: 1,
      y: 3
    },
    {
      x: 5,
      y: 3
    }
  ],
};

setTimeout(function () {

  setInterval(tick, 100);

  function tick() {
    const p1 = gameState.players[0];
    const newPlayerPosition = {
      x: p1.x + 0.1,
      y: p1.y
    };
    const tile = gameState.map.getTile(newPlayerPosition);

    if (tile.type === 'g') {
      p1.x = newPlayerPosition.x;
      p1.y = newPlayerPosition.y
    }

    Display.drawGameState(gameState);
  }

}, 1000);
