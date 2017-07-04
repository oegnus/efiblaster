var assert = require('assert');
import 'babel-polyfill';
import { GameState } from '../src/GameState';

describe('Map', function() {
  it('should return tile', function() {
    const map = Map.createNewMap([
      'g'
    ]);
    const tile = map.getTile({x: 0, y: 0});
    assert.strictEqual(tile.type, 'g');
  });
});
