var _ = require('lodash');

/**
 * Create base instance for image service
 * @param {Object} [_config]
 * @constructor
 */
function BaseImage(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this));
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseImage.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseImage}
 */
BaseImage.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

/**
 * Get image provider
 * @returns {*}
 */
BaseImage.prototype.getProvider = function () {
  return this._provider;
};

/**
 * Set new provider
 * @param {*} provider
 * @returns {BaseImage}
 */
BaseImage.prototype.setProvider = function (provider) {
  this._provider = provider;
  return this;
};

module.exports = BaseImage;
