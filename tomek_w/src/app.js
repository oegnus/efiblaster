import { Map } from './Map';
import { Player } from './Player';
import { GameState } from './GameState';
import { Engine } from './Engine';
import { Input } from './Input';
import { Display } from './Display';

const rawMapData = [
  'rrrrrrr',
  'rggdddr',
  'rgrdrgr',
  'rddgggr',
  'rdrgrgr',
  'rgggggr',
  'rrrrrrr'
];

const player_0 = new Player(0, {x: 1, y: 1});
const player_1 = new Player(1, {x: 5, y: 5});

const gameState = GameState.getNewGameState(
  Map.createNewMap(rawMapData),
  [player_0, player_1]
);

setInterval(function () {
  Engine.tick(Input.getPlayerInput, gameState);
  Display.drawGameState(gameState);
}, 20);
