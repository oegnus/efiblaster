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

  it('should return tile with position', function() {
    const map = Map.createNewMap([
      'gggg',
      'gggg',
      'gggg'
    ]);
    const tile = map.getTile({x: 1, y: 2});
    assert.equal(tile.x, 1);
    assert.equal(tile.y, 2);
  });

  it('should return tile for non integer position', function() {
    const map = Map.createNewMap([
      'gggg',
      'gggg',
      'gggg'
    ]);
    const tile = map.getTile({x: 1.3, y: 1.6});
    assert.equal(tile.type, 'g');
    assert.equal(tile.x, 1);
    assert.equal(tile.y, 2);

    const tileOutside = map.getTile({x: 1.3, y: 2.6});
    assert.equal(tileOutside.type, '.');
    assert.equal(tileOutside.x, 1);
    assert.equal(tileOutside.y, 3);
  });

  it('should return tile from outside of map with position', function() {
    const map = Map.createNewMap([]);
    const tile = map.getTile({x: 1, y: 2});
    assert.equal(tile.x, 1);
    assert.equal(tile.y, 2);
  });

  it('should return . outside of map borders', function() {
    const map = Map.createNewMap([
      'g'
    ]);
    const tile = map.getTile({x: -1, y: -1});
    assert.equal(tile.type, '.');
  });

  it('should return empty map size', function() {
    const map1 = Map.createNewMap([]);
    assert.equal(map1.getHeight(), 0);
    assert.equal(map1.getWidth(), 0);
  });

  it('should return map size', function() {
    const map2 = Map.createNewMap([
      'ggg',
      'ggg'
    ]);
    assert.equal(map2.getHeight(), 2);
    assert.equal(map2.getWidth(), 3);
  });
});
