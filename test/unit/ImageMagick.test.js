var path = require('path');
var assert = require('chai').assert;
var sinon = require('sinon');
var ImageMagick = require('../../lib/ImageMagick');

describe('ImageMagick', function () {
  it('Should properly export', function () {
    assert.isFunction(ImageMagick);
  });

  it('Should properly get IPTC information', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'identify');

    im
      .iptc(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(function (iptc) {
        assert.equal(im.getProvider().prototype.identify.callCount, 5);
        assert.equal(im.getProvider().prototype.identify.getCall(0).args[0], '%[IPTC:2:05]');
        assert.equal(im.getProvider().prototype.identify.getCall(1).args[0], '%[IPTC:2:120]');
        assert.equal(im.getProvider().prototype.identify.getCall(2).args[0], '%[IPTC:2:25]');
        assert.equal(im.getProvider().prototype.identify.getCall(3).args[0], '%[IPTC:2:15]');
        assert.isFunction(im.getProvider().prototype.identify.getCall(4).args[0]);
        assert.deepEqual(iptc, {
          title: '',
          description: '',
          keywords: '',
          category: '',
          format: 'JPEG'
        });

        im.getProvider().prototype.identify.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on getting IPTC information', function (done) {
    var im = new ImageMagick();

    sinon.stub(im.getProvider().prototype, 'identify', function (section, cb) {
      return section instanceof Function ? section('ERROR') : cb('ERROR');
    });

    im
      .iptc(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(done)
      .catch(function (error) {
        assert.equal(error, 'ERROR');
        assert.equal(im.getProvider().prototype.identify.callCount, 5);
        assert.equal(im.getProvider().prototype.identify.getCall(0).args[0], '%[IPTC:2:05]');
        assert.equal(im.getProvider().prototype.identify.getCall(1).args[0], '%[IPTC:2:120]');
        assert.equal(im.getProvider().prototype.identify.getCall(2).args[0], '%[IPTC:2:25]');
        assert.equal(im.getProvider().prototype.identify.getCall(3).args[0], '%[IPTC:2:15]');
        assert.isFunction(im.getProvider().prototype.identify.getCall(4).args[0]);

        im.getProvider().prototype.identify.restore();

        done();
      });
  });

  it('Should properly resize image with default options', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'resize');

    im
      .resize(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(function (result) {
        assert.instanceOf(result, Buffer);
        assert.ok(im.getProvider().prototype.resize.calledOnce);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[0], 200);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[1], undefined);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[2], '>');

        im.getProvider().prototype.resize.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly resize image with custom options', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'resize');

    im
      .resize(path.resolve(__dirname, '../fixtures/thailand.jpg'), {
        width: 100,
        height: 100,
        direction: '<',
        format: 'png'
      })
      .then(function (result) {
        assert.instanceOf(result, Buffer);
        assert.ok(im.getProvider().prototype.resize.calledOnce);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[0], 100);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[1], 100);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[2], '<');

        im.getProvider().prototype.resize.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on resize image', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'resize');
    sinon.stub(im.getProvider().prototype, 'toBuffer', function (cb) {
      cb('ERROR');
    });

    im
      .resize(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(done)
      .catch(function (error) {
        assert.equal(error, 'ERROR');
        assert.ok(im.getProvider().prototype.resize.calledOnce);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[0], 200);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[1], undefined);
        assert.equal(im.getProvider().prototype.resize.getCall(0).args[2], '>');

        im.getProvider().prototype.resize.restore();
        im.getProvider().prototype.toBuffer.restore();

        done();
      });
  });

  it('Should properly crop image with default options', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'crop');

    im
      .crop(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(function (result) {
        assert.instanceOf(result, Buffer);
        assert.ok(im.getProvider().prototype.crop.calledOnce);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[0], '100%');
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[1], '100%');
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[2], 0);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[3], 0);

        im.getProvider().prototype.crop.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly crop image with custom options', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'crop');

    im
      .crop(path.resolve(__dirname, '../fixtures/thailand.jpg'), {
        width: 100,
        height: 100,
        x: 200,
        y: 200,
        format: 'png'
      })
      .then(function (result) {
        assert.instanceOf(result, Buffer);
        assert.ok(im.getProvider().prototype.crop.calledOnce);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[0], 100);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[1], 100);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[2], 200);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[3], 200);

        im.getProvider().prototype.crop.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on crop image', function (done) {
    var im = new ImageMagick();

    sinon.spy(im.getProvider().prototype, 'crop');
    sinon.stub(im.getProvider().prototype, 'toBuffer', function (cb) {
      cb('ERROR');
    });

    im
      .crop(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(done)
      .catch(function (error) {
        assert.equal(error, 'ERROR');
        assert.ok(im.getProvider().prototype.crop.calledOnce);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[0], '100%');
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[1], '100%');
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[2], 0);
        assert.equal(im.getProvider().prototype.crop.getCall(0).args[3], 0);

        im.getProvider().prototype.crop.restore();
        im.getProvider().prototype.toBuffer.restore();

        done();
      });
  });
});
