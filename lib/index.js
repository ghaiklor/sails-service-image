var images = {
  gm: require('./GraphicsMagick'),
  im: require('./ImageMagick')
};

module.exports = {
  /**
   * Create specified images instance
   * @param {String} type
   * @param {Object} config
   * @returns {*}
   */
  create: function (type, config) {
    if (images[type.toLowerCase()] instanceof Function) {
      return new images[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized type -> ' + type);
    }
  },

  GraphicsMagick: images.gm,
  ImageMagick: images.im
};
