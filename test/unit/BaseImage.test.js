import { assert } from 'chai';
import BaseImage from '../../src/BaseImage';

describe('BaseImage', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseImage);
  });

  it('Should properly make objects configurable', () => {
    let image = new BaseImage();

    assert.notOk(image.get('foo'));
    assert.instanceOf(image.set('foo', 'bar'), BaseImage);
    assert.instanceOf(image.set('obj', {foo: 'bar'}), BaseImage);
    assert.deepEqual(image.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(image.get('obj'), {foo: 'bar'});
    assert.equal(image.get('obj.foo'), 'bar');
    assert.equal(image.get('foo'), 'bar');
  });

  it('Should properly create image with pre-defined config', () => {
    let image = new BaseImage({
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

  it('Should properly get/set provider', () => {
    let image = new BaseImage();

    assert.deepEqual(image.getProvider(), {});
    assert.instanceOf(image.setProvider('PROVIDER'), BaseImage);
    assert.equal(image.getProvider(), 'PROVIDER');
  });
});
