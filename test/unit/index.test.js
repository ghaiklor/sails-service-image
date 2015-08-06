var assert = require('chai').assert;
var ImageService = require('../../');
var GraphicsMagick = ImageService.GraphicsMagick;
var ImageMagick = ImageService.ImageMagick;

describe('ImageService', function () {
  it('Should properly export', function () {
    assert.isObject(ImageService);
    assert.isFunction(ImageService.create);
    assert.isFunction(ImageService.GraphicsMagick);
    assert.isFunction(ImageService.ImageMagick);
  });

  it('Should properly create image instances', function () {
    assert.instanceOf(ImageService.create('gm'), GraphicsMagick);
    assert.instanceOf(ImageService.create('im'), ImageMagick);
  });

  it('Should properly throw error on unrecognized type', function () {
    assert.throws(function () {
      ImageService.create('NOT_EXISTS');
    }, Error);
  });
});
