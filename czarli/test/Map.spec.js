var assert = require('assert');
import 'babel-polyfill';
import { Map } from '../src/Map';

describe('Map', function() {
  it('should return tile', function() {
    const map = Map.createNewMap([
      'g'
    ]);
    const tile = map.getTile({x: 0, y: 0});
    assert.strictEqual(tile.type, 'g');
  });

  it('should return tile with position', function() {
    const map = Map.createNewMap([
      'gggg',
      'gggg',
      'gggg'
    ]);
    const tile = map.getTile({x: 1, y: 2});
    assert.strictEqual(tile.x, 1);
    assert.strictEqual(tile.y, 2);
  });

  it('should return . outside of map borders', function() {
    const map = Map.createNewMap([
      'g'
    ]);
    const tile = map.getTile({x: -1, y: -1});
    assert.strictEqual(tile.type, '.');
  });

  it('should return tile from outside of map with position', function() {
    const map = Map.createNewMap([]);
    const tile = map.getTile({x: 1, y: 2});
    assert.strictEqual(tile.x, 1);
    assert.strictEqual(tile.y, 2);
  });

  it('should return tile for non integer position', function() {
    const map = Map.createNewMap([
      'gggg',
      'gggg',
      'gggg'
    ]);
    const tile = map.getTile({x: 1.3, y: 1.6});
    assert.strictEqual(tile.type, 'g');
    assert.strictEqual(tile.x, 1);
    assert.strictEqual(tile.y, 2);

    const tileOutside = map.getTile({x: 1.3, y: 2.6});
    assert.strictEqual(tileOutside.type, '.');
    assert.strictEqual(tileOutside.x, 1);
    assert.strictEqual(tileOutside.y, 3);
  });

  it('should return empty map size', function() {
    const map = Map.createNewMap([]);
    assert.strictEqual(map.getWidth(), 0);
    assert.strictEqual(map.getHeight(), 0);
  });

  it('should return map size', function() {
    const map = Map.createNewMap([
      'ggg',
      'ggg'
    ]);
    assert.strictEqual(map.getWidth(), 3);
    assert.strictEqual(map.getHeight(), 2);
  });

  it('should return tile type', function() {
    const map = Map.createNewMap([
      'abc',
      'def'
    ]);
    assert.strictEqual(map.getTile({x: 0, y: 0}).type, 'a');
    assert.strictEqual(map.getTile({x: 1, y: 0}).type, 'b');
    assert.strictEqual(map.getTile({x: 1, y: 1}).type, 'e');
  });
});
