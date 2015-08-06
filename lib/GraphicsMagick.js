var util = require('util');
var BaseImage = require('./BaseImage');

util.inherits(GraphicsMagick, BaseImage);

function GraphicsMagick() {
  BaseImage.apply(this, arguments);
}

module.exports = GraphicsMagick;
