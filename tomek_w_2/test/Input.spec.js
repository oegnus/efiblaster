const assert = require('assert');
import 'babel-polyfill';
import { Input } from '../src/Input';

describe('Input', function () {
  it('should return player input', function () {
    const playerInput = Input.getPlayerInput(0);
    assert.strictEqual(playerInput.direction.x, 0);
    assert.strictEqual(playerInput.direction.y, 0);
  });
});
