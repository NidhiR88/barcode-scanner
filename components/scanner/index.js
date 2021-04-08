import React, { Component } from 'react';
import Quagga from 'quagga';

class ScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { barcodes: [] };
    // this.onDetect = this.onDetect.bind(this);
  }

  componentDidMount() {
    this.initializeScanning();
  }

  initializeScanning() {
    Quagga.init(
      {
        constraints: {
          facingMode: 'environment',
        },
        debug: {
          drawBoundingBox: true,
          drawScanLine: true,
        },
        locator: {
          patchSize: 'Large',
        },
        decoder: {
          readers: [
            'code_128_reader',
            // 'ean_8_reader',
            // 'code_39_reader',
            // 'code_39_vin_reader',
            // 'codeabar_reader',
          ],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log('error code');
        }
        Quagga.start();
      }
    );
    Quagga.onProcessed(this.onProcessed);
  }

  onDetect(result) {
    console.log('from onDetect func', result.codeResult.code);
    //check if valid result
    if (result.codeResult.code) {
      var scannedCode = result.codeResult.code;
      this.setState({ barcodes: scannedCode });
      Quagga.stop();
    }
  }

  onProcessed = (result) => {
    console.log('from onProcessed func', result);

    var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;
    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width')),
          parseInt(drawingCanvas.getAttribute('height'))
        );
        result.boxes
          .filter(function (box) {
            return box !== result.box;
          })
          .forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'green',
              lineWidth: 2,
            });
          });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: '#00F',
          lineWidth: 2,
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          result.line,
          { x: 'x', y: 'y' },
          drawingCtx,
          { color: 'red', lineWidth: 3 }
        );
        Quagga.onDetected(this.onDetect);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="scan-barcode">
          <span>
            <h2>Barcode Scanner</h2>
          </span>
          <div id="interactive" className="viewport">
            <video
              className="videoInsert"
              autoPlay={true}
              preload="auto"
              src=""
              muted={true}
              playsInline={true}
            ></video>
            <canvas
              className="drawingBuffer videoInsert"
              styles={{ top: '0px', left: '0px', position: 'absolute' }}
            ></canvas>
          </div>
          {/* {this.state.barcodes.length !== 0 && ( */}
          <div className="barcode-result">
            <h1>Code:</h1>
            {this.state.barcodes.codeResult}
          </div>
          {/* )} */}
        </div>
      </React.Fragment>
    );
  }
}

export { ScannerComponent };
