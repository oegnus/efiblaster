var assert = require('assert');
import 'babel-polyfill';
import { Position } from '../src/Position';

describe('Position', function() {
  it('should sum positions', function() {
    const p1 = {x: 2, y: 3};
    const p2 = {x: 4, y: 5};
    const p3 = {x: 6, y: 8};
    assert.deepEqual(p3, Position.sumPositions(p1, p2));
  });

  it('should compare positions', function() {
    const p1 = {x: 2, y: 3};
    const p2 = {x: 2, y: 3};
    const p3 = {x: 4, y: 5};
    assert.equal(true, Position.areTilePositionsEqual(p1, p2));
    assert.equal(false, Position.areTilePositionsEqual(p1, p3));
  });

  it('should change any position to tile position', function() {
    const p1 = {x: 0.2, y: 2.3};
    const p2 = {x: 2, y: 3};
    const p3 = {x: 4.9, y: 5.1};
    assert.deepEqual({x: 0, y: 2}, Position.positionToTilePosition(p1));
    assert.deepEqual({x: 2, y: 3}, Position.positionToTilePosition(p2));
    assert.deepEqual({x: 5, y: 5}, Position.positionToTilePosition(p3));
  });
});
