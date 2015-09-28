import GraphicsMagick from './GraphicsMagick';
import ImageMagick from './ImageMagick';

var image = {
  gm: GraphicsMagick,
  im: ImageMagick
};

/**
 * Create specified images instance
 * @param {String} type
 * @param {Object} config
 * @returns {*}
 */
export default function (type, config) {
  if (image[type.toLowerCase()] instanceof Function) {
    return new image[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
