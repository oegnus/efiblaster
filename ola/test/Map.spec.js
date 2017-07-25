var assert = require('assert');
import 'babel-polyfill';
import { Map } from '../src/Map';

// tile: {x, y, type}

describe('Map', function() {
    it('should create map object', function() {
        const mapData = [
            'rggggr',
            'rggrrr'
        ];
        const newMap = Map.createNewMap(mapData);
        assert.strictEqual(typeof newMap, 'object');
    });
    it('should return map tile for position', function() {
        const mapData = [
            'rggggr',
            'rggrrr'
        ];
        const newMap = Map.createNewMap(mapData);
        const tile1 = newMap.getTile({x:0, y:0});
        assert.strictEqual(tile1.type, 'r');
    
        const tile2 = newMap.getTile({x:1, y:0});
        assert.strictEqual(tile2.type, 'g');
    });
    it('should return map tile with coordinates', function() {
        const mapData = [
            'rggggr',
            'rggrrr'
        ];
        const newMap = Map.createNewMap(mapData);
        const tile = newMap.getTile({x:2, y:1});
        assert.strictEqual(tile.x, 2);
        assert.strictEqual(tile.y, 1);
    });
    it('should return empty tile off map', function() {
        const mapData = [
            'rggggr',
            'rggrrr'
        ];
        const newMap = Map.createNewMap(mapData);
        const tile = newMap.getTile({x:5, y:-2});
        assert.strictEqual(tile.type, '.');
        assert.strictEqual(tile.x, 5);
        assert.strictEqual(tile.y, -2);
    });
    it('should return width and height', function() {
        const mapData = [
            'rggggr',
            'rggrrr'
        ];
        const newMap = Map.createNewMap(mapData);
        assert.strictEqual(newMap.getWidth(), 6);
        assert.strictEqual(newMap.getHeight(), 2);
    });
});
