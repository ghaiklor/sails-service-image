var assert = require('chai').assert;
var ImageMagick = require('../../lib/ImageMagick');

describe('ImageMagick', function () {
  it('Should properly export', function () {
    assert.isFunction(ImageMagick);
  });
});
