var util = require('util');
var BaseImage = require('./BaseImage');

util.inherits(ImageMagick, BaseImage);

function ImageMagick() {
  BaseImage.apply(this, arguments);
}

module.exports = ImageMagick;
