const assert = require('assert');
import 'babel-polyfill';
import { Map } from '../src/Map';
import { GameState } from '../src/GameState';
import { Engine } from '../src/Engine';

describe('Engine', function () {
  it('should tick and not change players positions', function () {
    const map = Map.createNewMap([]);
    const players = [{x: 0, y: 0}];
    const gameState = GameState.getNewGameState(map, players);
    const getPlayerInput = () => {
      return {
        direction: {x: 0, y: 0}
      };
    };

    Engine.tick(getPlayerInput, gameState);

    assert.deepEqual(gameState.players, [{x: 0, y: 0}]);
  });

  it('should move player right', function () {
    const map = Map.createNewMap([
      'ggg',
      'ggg',
      'ggg',
    ]);
    const players = [{x: 0, y: 0}];
    const gameState = GameState.getNewGameState(map, players);
    const getPlayerInput = () => {
      return {
        direction: {x: 1, y: 0}
      };
    };

    Engine.tick(getPlayerInput, gameState);

    assert.deepEqual(gameState.players, [{x: 0.1, y: 0}]);
  });
});
