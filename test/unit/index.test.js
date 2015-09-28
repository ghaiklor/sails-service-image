import { assert } from 'chai';
import ImageService from '../../src/index';
import GraphicsMagick from '../../src/GraphicsMagick';
import ImageMagick from '../../src/ImageMagick';

describe('ImageService', () => {
  it('Should properly export', () => {
    assert.isFunction(ImageService);
  });

  it('Should properly create image instances', () => {
    assert.instanceOf(ImageService('gm'), GraphicsMagick);
    assert.instanceOf(ImageService('im'), ImageMagick);
  });

  it('Should properly throw error on unrecognized type', () => {
    assert.throws(() => ImageService('NOT_EXISTS'), Error);
  });
});
