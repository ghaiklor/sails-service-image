# sails-service-image

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-image.svg)
![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-image.svg)

![Downloads](https://img.shields.io/npm/dm/sails-service-image.svg)
![Downloads](https://img.shields.io/npm/dt/sails-service-image.svg)
![npm version](https://img.shields.io/npm/v/sails-service-image.svg)
![License](https://img.shields.io/npm/l/sails-service-image.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![dependencies](https://img.shields.io/david/ghaiklor/sails-service-image.svg)
![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-image.svg)

Service for Sails framework with image features.

## List of supported image processors

- GraphicsMagick
- ImageMagick

## Getting Started

Install this module.

```shell
npm install sails-service-image
```

Then require it in your service and create image instance.

```javascript
// api/services/ImageService.js
import ImageService from 'sails-service-image';

export default ImageService('gm');

// api/controllers/ImageController.js
export default {
  crop: function(req, res) {
    ImageService
      .crop(req.param('file'), {
        x: req.param('x'),
        y: req.param('y'),
        width: req.param('width'),
        height: req.param('height')
      })
      .then(StorageService.upload)
      .then(res.ok)
      .catch(res.negotiate);
  }
};
```

## API

Each of image instances has following methods:

### iptc(image)

Get IPTC information from image. Returns Promise.

`image` - {String|Buffer|Stream} From what image you want to get IPTC information.

### resize(image, [config])

Resize image and get buffer. Returns Promise.

`image` - {String|Buffer|Stream} What image you want to resize.

`config` - {Object}

  - `config.width` - {Number|String} Resulting width of image
  - `config.height` - {Number|String} Resulting height of image
  - `config.direction` - {String} In what direction make the resize (see GM docs)
  - `config.format` - {String} Resulting image format

### crop(image, [config])

Crop image and get buffer. Returns Promise.

`image` - {String|Buffer|Stream} What image you want to crop.

`config` - {Object}

  - `config.width` - {Number|String} Resulting width of image
  - `config.height` - {Number|String} Resulting height of image
  - `config.x` - {Number} Start X coordinate for cropping
  - `config.y` - {Number} Start Y coordinate for cropping
  - `config.format` - {String} Resulting image format

### thumbnail(image)

Just shortcut for `crop` and `resize` with predefined options. Creates thumbnail for image and returns Promise.

`image` - {String|Buffer|Stream} For what image you want to create thumbnail.

## Examples

### GraphicsMagick

```javascript
let gm = ImageService('gm');

// Get IPTC information from image
gm
  .iptc('my-image.jpg')
  .then(console.log.bind(console))
  .catch(console.error.bind(console));

// Resize image
gm
  .resize('my-image.jpg', {
    width: '50%'
  })
  .then(StorageService.upload)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))

// Crop image
gm
  .crop('my-image.jpg', {
    x: 100,
    y: 50,
    width: 200
  })
  .then(StorageService.upload)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))

// Create thumbnail
gm
  .thumbnail('my-image.jpg')
  .then(StorageService.upload)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
```

### ImageMagick

```javascript
let im = ImageService.create('im');

// Get IPTC information from image
im
  .iptc('my-image.jpg')
  .then(console.log.bind(console))
  .catch(console.error.bind(console));

// Resize image
im
  .resize('my-image.jpg', {
    width: '50%'
  })
  .then(StorageService.upload)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))

// Crop image
im
  .crop('my-image.jpg', {
    x: 100,
    y: 50,
    width: 200
  })
  .then(StorageService.upload)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))

// Create thumbnail
im
  .thumbnail('my-image.jpg')
  .then(StorageService.upload)
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
