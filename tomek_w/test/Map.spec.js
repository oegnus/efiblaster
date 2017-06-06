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

  it('should return . outside of map borders', function() {
    const map = Map.createNewMap([
      'g'
    ]);
    const tile = map.getTile({x: -1, y: -1});
    assert.equal(tile.type, '.');
  });

  it('should return map size', function() {
    const map1 = Map.createNewMap([]);
    assert.equal(map1.getHeight(), 0);
    assert.equal(map1.getWidth(), 0);

    const map2 = Map.createNewMap([
      'ggg',
      'ggg'
    ]);
    assert.equal(map2.getHeight(), 2);
    assert.equal(map2.getWidth(), 3);
  });
});
