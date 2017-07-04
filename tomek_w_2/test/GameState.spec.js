const assert = require('assert');
import 'babel-polyfill';
import { GameState } from '../src/GameState';
import { Map } from '../src/Map';

describe('GameState', function () {
  it('should return new game state', function () {
    const player = {x: 2, y: 3};
    const map = Map.createNewMap([]);
    const gameState = GameState.getNewGameState(
      map,
      [player]
    );
    assert.strictEqual(gameState.map, map);
    assert.strictEqual(gameState.players[0], player);
  });
});
