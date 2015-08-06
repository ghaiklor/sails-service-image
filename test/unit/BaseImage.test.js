var assert = require('chai').assert;
var BaseImage = require('../../lib/BaseImage');

describe('BaseImage', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseImage);
    assert.isFunction(BaseImage.prototype.get);
    assert.isFunction(BaseImage.prototype.set);
    assert.isFunction(BaseImage.prototype.getProvider);
    assert.isFunction(BaseImage.prototype.setProvider);
  });

  it('Should properly make objects configurable', function () {
    var image = new BaseImage();

    assert.notOk(image.get('foo'));
    assert.instanceOf(image.set('foo', 'bar'), BaseImage);
    assert.instanceOf(image.set('obj', {foo: 'bar'}), BaseImage);
    assert.deepEqual(image.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(image.get('obj'), {foo: 'bar'});
    assert.equal(image.get('obj.foo'), 'bar');
    assert.equal(image.get('foo'), 'bar');
  });

  it('Should properly create image with pre-defined config', function () {
    var image = new BaseImage({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(image.get('foo'), 'bar');
    assert.equal(image.get('obj.foo'), 'bar');
    assert.deepEqual(image.get('obj'), {foo: 'bar'});
    assert.notOk(image.get('NOT_EXISTS'));
  });

  it('Should properly get/set provider', function () {
    var image = new BaseImage();

    assert.notOk(image.getProvider());
    assert.instanceOf(image.setProvider('PROVIDER'), BaseImage);
    assert.equal(image.getProvider(), 'PROVIDER');
  });
});
