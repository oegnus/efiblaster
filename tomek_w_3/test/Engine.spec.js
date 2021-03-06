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
    const getPlayerInput = () => ({
      direction: {x: 0, y: 0}
    });

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
    const getPlayerInput = () => ({
      direction: {x: 1, y: 0}
    });

    Engine.tick(getPlayerInput, gameState);

    assert.deepEqual(gameState.players, [{x: 0.1, y: 0}]);
  });

  it('should move player left', function () {
    const map = Map.createNewMap([
      'ggg',
      'ggg',
      'ggg',
    ]);
    const players = [{x: 1, y: 0}];
    const gameState = GameState.getNewGameState(map, players);
    const getPlayerInput = () => ({
      direction: {x: -1, y: 0}
    });

    Engine.tick(getPlayerInput, gameState);
    Engine.tick(getPlayerInput, gameState);
    Engine.tick(getPlayerInput, gameState);

    assert.deepEqual(gameState.players, [{x: 0.7, y: 0}]);
  });

  it('should move player up', function () {
    const map = Map.createNewMap([
      'ggg',
      'ggg',
      'ggg',
    ]);
    const players = [{x: 1, y: 1}];
    const gameState = GameState.getNewGameState(map, players);
    const getPlayerInput = () => ({
      direction: {x: 0, y: -1}
    });

    Engine.tick(getPlayerInput, gameState);
    Engine.tick(getPlayerInput, gameState);

    assert.deepEqual(gameState.players, [{x: 1, y: 0.8}]);
  });

  it('should move player down', function () {
    const map = Map.createNewMap([
      'ggg',
      'ggg',
      'ggg',
    ]);
    const players = [{x: 1, y: 1}];
    const gameState = GameState.getNewGameState(map, players);
    const getPlayerInput = () => ({
      direction: {x: 0, y: 1}
    });

    Engine.tick(getPlayerInput, gameState);
    Engine.tick(getPlayerInput, gameState);

    assert.deepEqual(gameState.players, [{x: 1, y: 1.2}]);
  });
  
  // it('shouldn\'t move outside of map', function () {
  //   const map = Map.createNewMap([
  //     'ggg',
  //     'ggg',
  //     'ggg',
  //   ]);
  //   const players = [{x: 0, y: 0}];
  //   const gameState = GameState.getNewGameState(map, players);
  //   let direction;
  //   const getPlayerInput = () => ({
  //     direction: direction
  //   });
  //
  //   direction = {x: -1, y: 0};
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   direction = {x: 0, y: -1};
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //
  //   assert.deepEqual(gameState.players, [{x: 0, y: 0}]);
  // });
  //
  // it('shouldn\'t move on rocks', function () {
  //   const map = Map.createNewMap([
  //     'ggg',
  //     'grg',
  //     'ggg',
  //   ]);
  //   const players = [{x: 0, y: 0}];
  //   const gameState = GameState.getNewGameState(map, players);
  //   let direction;
  //   const getPlayerInput = () => ({
  //     direction: direction
  //   });
  //
  //   direction = {x: 1, y: 0};
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //   direction = {x: 0, y: 1};
  //   Engine.tick(getPlayerInput, gameState);
  //   Engine.tick(getPlayerInput, gameState);
  //
  //   assert.deepEqual(gameState.players, [{x: 1, y: 0}]);
  // });
});
