import { Display } from './Display';
import { Engine } from './Engine';
import { GameState } from './GameState';
import { Input } from './Input';
import { Map } from './Map';

const map = Map.createNewMap([
  'rrrrrrr',
  'rgggggr',
  'rgrgrgr',
  'rgggggr',
  'rgrrrgr',
  'rgggggr',
  'rrrrrrr'
]);

const gameState = GameState.getNewGameState(
  map,
  [
    {
      x: 1,
      y: 3
    },
    {
      x: 5,
      y: 5
    }
  ]
);

setInterval(tick, 100);

function tick() {
  Engine.tick(Input.getPlayerInput, gameState);
  Display.drawGameState(gameState);
}
