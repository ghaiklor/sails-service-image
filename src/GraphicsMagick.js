var gm = require('gm');
var Promise = require('bluebird');
var util = require('util');
var BaseImage = require('./BaseImage');

util.inherits(GraphicsMagick, BaseImage);

/**
 * Create GM instance
 * @constructor
 */
function GraphicsMagick() {
  BaseImage.apply(this, arguments);

  this.setProvider(gm);
}

/**
 * Get title from IPTC
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.getTitle = function (image) {
  return new Promise(function (resolve, reject) {
    this.getProvider()(image).identify('%[IPTC:2:05]', function (error, metadata) {
      return error ? reject(error) : resolve(metadata.trimRight());
    });
  }.bind(this));
};

/**
 * Get description from IPTC
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.getDescription = function (image) {
  return new Promise(function (resolve, reject) {
    this.getProvider()(image).identify('%[IPTC:2:120]', function (error, metadata) {
      return error ? reject(error) : resolve(metadata.trimRight());
    });
  }.bind(this));
};

/**
 * Get keywords from IPTC
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.getKeywords = function (image) {
  return new Promise(function (resolve, reject) {
    this.getProvider()(image).identify('%[IPTC:2:25]', function (error, metadata) {
      return error ? reject(error) : resolve(metadata.trimRight().split(';').join(','));
    });
  }.bind(this));
};

/**
 * Get category from IPTC
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.getCategory = function (image) {
  return new Promise(function (resolve, reject) {
    this.getProvider()(image).identify('%[IPTC:2:15]', function (error, metadata) {
      return error ? reject(error) : resolve(metadata.trimRight());
    });
  }.bind(this));
};

/**
 * Get image format
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.getFormat = function (image) {
  return new Promise(function (resolve, reject) {
    this.getProvider()(image).identify(function (error, data) {
      return error ? reject(error) : resolve(data.format);
    });
  }.bind(this));
};

/**
 * Get IPTC information from image
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.iptc = function (image) {
  return Promise.all([
    this.getTitle(image),
    this.getDescription(image),
    this.getKeywords(image),
    this.getCategory(image),
    this.getFormat(image)
  ]).spread(function (title, description, keywords, category, format) {
    return Promise.resolve({
      title: title,
      description: description,
      keywords: keywords,
      category: category,
      format: format
    });
  });
};

/**
 * Resize image
 * @param {String|Buffer|Stream} image Source image
 * @param {Object} [_config] Configuration object
 * @returns {Promise}
 */
GraphicsMagick.prototype.resize = function (image, _config) {
  var config = _config || {};

  return new Promise(function (resolve, reject) {
    this.getProvider()(image)
      .resize(config.width || 200, config.height, config.direction || '>')
      .setFormat(config.format || 'jpg')
      .toBuffer(function (error, buffer) {
        return error ? reject(error) : resolve(buffer);
      });
  }.bind(this));
};

/**
 * Crop image
 * @param {String|Buffer|Stream} image Source image
 * @param {Object} [_config] Configuration object
 * @returns {Promise}
 */
GraphicsMagick.prototype.crop = function (image, _config) {
  var config = _config || {};

  return new Promise(function (resolve, reject) {
    this.getProvider()(image)
      .crop(config.width || '100%', config.height || '100%', config.x || 0, config.y || 0)
      .setFormat(config.format || 'jpg')
      .toBuffer(function (error, buffer) {
        return error ? reject(error) : resolve(buffer);
      });
  }.bind(this));
};

/**
 * Create thumbnail for image
 * @param {String|Buffer|Stream} image Source image
 * @returns {Promise}
 */
GraphicsMagick.prototype.thumbnail = this.resize;

module.exports = GraphicsMagick;
