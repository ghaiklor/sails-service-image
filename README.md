# sails-service-image

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-image.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-image.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-image.svg) ![npm version](https://img.shields.io/npm/v/sails-service-image.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-image.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-image.svg) ![License](https://img.shields.io/npm/l/sails-service-image.svg)

Service for Sails framework with image features.

## List of supported image processors

- GraphicsMagick
- ImageMagick

## Getting Started

Install this module.

```shell
npm install sails-service-image
```

Then require it in your service.

```javascript
// api/services/ImageService.js
module.exports = require('sails-service-image');
```

That's it, you can create image instances for your needs in your project.

```javascript
// api/controllers/ImageController.js
var gm = ImageService.create('gm', {
  provider: {}
});

module.exports = {
  crop: function(req, res) {
    gm
      .crop('<SOURCE_IMAGE>')
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Configuration

When you instantiate image service `ImageService.create(type, config)` you can pass `provider` object.
And all other free space you can use for your needs.

`config.provider` - {Object} Configuration object for image provider

## API

## Examples

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
