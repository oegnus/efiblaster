import { Position } from './Position';
import { Map } from './Map';
import { Display } from './Display';

const mapData = [
  'rrgggrr',
  'rrrrrrr',
  'gggggrr',
];

const gameState = {
  map: Map.createNewMap(mapData)
};


Display.drawGameState(gameState);
