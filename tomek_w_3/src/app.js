import { Position } from './Position';
import { GameState } from './GameState';
import { Map } from './Map';
import { Input } from './Input.tomek';
import { Display } from './Display';
import { Engine } from './Engine';

const mapData = [
  'rrgggrr',
  'rrrrrrr',
  'ggggrrr',
  'ggggrrr',
  'ggggrrr',
  'ggggrrr'
];

const players = [
  {
    x: 1,
    y: 2
  },
  {
    x: 3,
    y: 3
  }
];

const gameState = GameState.getNewGameState(
  Map.createNewMap(mapData),
  players
);

setInterval(
  () => {
    Engine.tick(Input.getPlayerInput, gameState);
    Display.drawGameState(gameState);
  },
  100
);
