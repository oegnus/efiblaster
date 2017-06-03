var assert = require('assert');
import 'babel-polyfill';
import { Map } from '../src/Map';

describe('Map', function() {
  it('should return tile', function() {
    const map = Map.createNewMap([
      'g'
    ]);
    const tile = map.getTile({x: 0, y: 0});
    assert.equal(tile.type, 'g');
  });
});
