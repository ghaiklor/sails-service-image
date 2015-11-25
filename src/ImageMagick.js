import gm from 'gm';
import Promise from 'bluebird';
import BaseImage from './BaseImage';

export default class GraphicsMagick extends BaseImage {
  constructor(config) {
    super(config);

    this.setProvider(gm.subClass({imageMagick: true}));
  }

  /**
   * Get title from IPTC
   * @param {String|Buffer|Stream} image Source image
   * @returns {Promise}
   */
  getTitle(image) {
    return new Promise((resolve, reject) => {
      this.getProvider()(image).identify('%[IPTC:2:05]', (error, metadata) => error ? reject(error) : resolve(metadata.trimRight()));
    });
  }

  /**
   * Get description from IPTC
   * @param {String|Buffer|Stream} image Source image
   * @returns {Promise}
   */
  getDescription(image) {
    return new Promise((resolve, reject) => {
      this.getProvider()(image).identify('%[IPTC:2:120]', (error, metadata) => error ? reject(error) : resolve(metadata.trimRight()));
    });
  }

  /**
   * Get keywords from IPTC
   * @param {String|Buffer|Stream} image Source image
   * @returns {Promise}
   */
  getKeywords(image) {
    return new Promise((resolve, reject) => {
      this.getProvider()(image).identify('%[IPTC:2:25]', (error, metadata) => error ? reject(error) : resolve(metadata.trimRight().split(';').join(',')));
    });
  }

  /**
   * Get category from IPTC
   * @param {String|Buffer|Stream} image Source image
   * @returns {Promise}
   */
  getCategory(image) {
    return new Promise((resolve, reject) => {
      this.getProvider()(image).identify('%[IPTC:2:15]', (error, metadata) => error ? reject(error) : resolve(metadata.trimRight()));
    });
  }

  /**
   * Get image format
   * @param {String|Buffer|Stream} image Source image
   * @returns {Promise}
   */
  getFormat(image) {
    return new Promise((resolve, reject) => {
      this.getProvider()(image).identify((error, data) => error ? reject(error) : resolve(data.format));
    });
  }

  /**
   * Get IPTC information from image
   * @param {String|Buffer|Stream} image Source image
   * @returns {Promise}
   */
  iptc(image) {
    return Promise.all([
      this.getTitle(image),
      this.getDescription(image),
      this.getKeywords(image),
      this.getCategory(image),
      this.getFormat(image)
    ]).spread((title, description, keywords, category, format) => Promise.resolve({
      title,
      description,
      keywords,
      category,
      format
    }));
  }

  /**
   * Resize image
   * @param {String|Buffer|Stream} image Source image
   * @param {Object} [_config] Configuration object
   * @returns {Promise}
   */
  resize(image, _config) {
    let config = _config || {};

    return new Promise((resolve, reject) => {
      this.getProvider()(image)
        .resize(config.width || 200, config.height, config.direction || '>')
        .setFormat(config.format || 'jpg')
        .toBuffer((error, buffer) => error ? reject(error) : resolve(buffer));
    });
  }

  /**
   * Crop image
   * @param {String|Buffer|Stream} image Source image
   * @param {Object} [_config] Configuration object
   * @returns {Promise}
   */
  crop(image, _config) {
    let config = _config || {};

    return new Promise((resolve, reject) => {
      this.getProvider()(image)
        .crop(config.width || '100%', config.height || '100%', config.x || 0, config.y || 0)
        .setFormat(config.format || 'jpg')
        .toBuffer((error, buffer) => error ? reject(error) : resolve(buffer));
    });
  }

  /**
   * Create thumbnail for image
   * @param {String|Buffer|Stream} image Source image
   * @param {Object} [_config]
   * @returns {Promise}
   */
  thumbnail(image, _config) {
    return this.resize(image, _config);
  }
}
