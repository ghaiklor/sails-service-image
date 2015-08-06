var assert = require('chai').assert;
var GraphicsMagick = require('../../lib/GraphicsMagick');

describe('GraphicsMagick', function () {
  it('Should properly export', function () {
    assert.isFunction(GraphicsMagick);
  });
});
