const assert = require('assert');
import 'babel-polyfill';
import { Position } from '../src/Position';

describe('Position', function() {
  it('should sum positions', function() {
    const p1 = {x: 2, y: 3};
    const p2 = {x: 4, y: 5};
    const p3 = {x: 6, y: 8};
    assert.deepEqual(p3, Position.sumPositions(p1, p2));
  });
});
