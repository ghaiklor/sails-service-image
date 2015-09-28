import { assert } from 'chai';
import path from 'path';
import sinon from 'sinon';
import GraphicsMagick from '../../src/GraphicsMagick';

describe('GraphicsMagick', () => {
  it('Should properly export', () => {
    assert.isFunction(GraphicsMagick);
  });

  it('Should properly get IPTC information', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'identify');

    gm
      .iptc(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(iptc => {
        assert.equal(gm.getProvider().prototype.identify.callCount, 5);
        assert.equal(gm.getProvider().prototype.identify.getCall(0).args[0], '%[IPTC:2:05]');
        assert.equal(gm.getProvider().prototype.identify.getCall(1).args[0], '%[IPTC:2:120]');
        assert.equal(gm.getProvider().prototype.identify.getCall(2).args[0], '%[IPTC:2:25]');
        assert.equal(gm.getProvider().prototype.identify.getCall(3).args[0], '%[IPTC:2:15]');
        assert.isFunction(gm.getProvider().prototype.identify.getCall(4).args[0]);
        assert.deepEqual(iptc, {
          title: '',
          description: '',
          keywords: '',
          category: '',
          format: 'JPEG'
        });

        gm.getProvider().prototype.identify.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on getting IPTC information', done => {
    let gm = new GraphicsMagick();

    sinon.stub(gm.getProvider().prototype, 'identify', (section, cb) => section instanceof Function ? section('ERROR') : cb('ERROR'));

    gm
      .iptc(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.equal(gm.getProvider().prototype.identify.callCount, 5);
        assert.equal(gm.getProvider().prototype.identify.getCall(0).args[0], '%[IPTC:2:05]');
        assert.equal(gm.getProvider().prototype.identify.getCall(1).args[0], '%[IPTC:2:120]');
        assert.equal(gm.getProvider().prototype.identify.getCall(2).args[0], '%[IPTC:2:25]');
        assert.equal(gm.getProvider().prototype.identify.getCall(3).args[0], '%[IPTC:2:15]');
        assert.isFunction(gm.getProvider().prototype.identify.getCall(4).args[0]);

        gm.getProvider().prototype.identify.restore();

        done();
      });
  });

  it('Should properly resize image with default options', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'resize');

    gm
      .resize(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(result => {
        assert.instanceOf(result, Buffer);
        assert.ok(gm.getProvider().prototype.resize.calledOnce);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[0], 200);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[1], undefined);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[2], '>');

        gm.getProvider().prototype.resize.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly resize image with custom options', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'resize');

    gm
      .resize(path.resolve(__dirname, '../fixtures/thailand.jpg'), {
        width: 100,
        height: 100,
        direction: '<',
        format: 'png'
      })
      .then(result => {
        assert.instanceOf(result, Buffer);
        assert.ok(gm.getProvider().prototype.resize.calledOnce);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[0], 100);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[1], 100);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[2], '<');

        gm.getProvider().prototype.resize.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on resize image', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'resize');
    sinon.stub(gm.getProvider().prototype, 'toBuffer', cb => cb('ERROR'));

    gm
      .resize(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(gm.getProvider().prototype.resize.calledOnce);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[0], 200);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[1], undefined);
        assert.equal(gm.getProvider().prototype.resize.getCall(0).args[2], '>');

        gm.getProvider().prototype.resize.restore();
        gm.getProvider().prototype.toBuffer.restore();

        done();
      });
  });

  it('Should properly crop image with default options', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'crop');

    gm
      .crop(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(result => {
        assert.instanceOf(result, Buffer);
        assert.ok(gm.getProvider().prototype.crop.calledOnce);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[0], '100%');
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[1], '100%');
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[2], 0);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[3], 0);

        gm.getProvider().prototype.crop.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly crop image with custom options', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'crop');

    gm
      .crop(path.resolve(__dirname, '../fixtures/thailand.jpg'), {
        width: 100,
        height: 100,
        x: 200,
        y: 200,
        format: 'png'
      })
      .then(result => {
        assert.instanceOf(result, Buffer);
        assert.ok(gm.getProvider().prototype.crop.calledOnce);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[0], 100);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[1], 100);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[2], 200);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[3], 200);

        gm.getProvider().prototype.crop.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject on crop image', done => {
    let gm = new GraphicsMagick();

    sinon.spy(gm.getProvider().prototype, 'crop');
    sinon.stub(gm.getProvider().prototype, 'toBuffer', cb => cb('ERROR'));

    gm
      .crop(path.resolve(__dirname, '../fixtures/thailand.jpg'))
      .then(done)
      .catch(error => {
        assert.equal(error, 'ERROR');
        assert.ok(gm.getProvider().prototype.crop.calledOnce);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[0], '100%');
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[1], '100%');
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[2], 0);
        assert.equal(gm.getProvider().prototype.crop.getCall(0).args[3], 0);

        gm.getProvider().prototype.crop.restore();
        gm.getProvider().prototype.toBuffer.restore();

        done();
      });
  });
});
