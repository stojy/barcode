import Quagga from 'quagga'
 
type OnDetectedCallback = (code: string) => void;

export interface IBarcode {
  width: number,
  height: number,
  onDetected: OnDetectedCallback,
}

export class BarcodeQuagga {
  _onDetected!: OnDetectedCallback;

  start({width, height, onDetected}: IBarcode) {
    this._onDetected = onDetected

    const self = this

    const config = {
      numOfWorkers: navigator.hardwareConcurrency,
      locate: true,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: '#captureTarget',
        constraints: {
          width,
          height,
          facingMode: "environment"
        },
        area: {
          top: "0%",
          right: "0%",
          left: "0%",
          bottom: "0%"
        },
      },
      decoder: {
        readers: ["code_128_reader"],
        debug: {
          drawBoundingBox: false,
          showFrequency: false,
          drawScanline: false,
          showPattern: false
        },
        multiple: false
      },
      locator: {
        halfSample: true,
        patchSize: "large", // x-small, small, medium, large, x-large
        debug: {
          showCanvas: false,
          showPatches: false,
          showFoundPatches: false,
          showSkeleton: false,
          showLabels: false,
          showPatchLabels: false,
          showRemainingPatchLabels: false,
          boxFromPatches: {
            showTransformed: false,
            showTransformedBox: false,
            showBB: false
          }
        }
      }
    };
    console.log(`config: ${JSON.stringify(config)}`)

    Quagga.init(config, function (err: any) {
      if (err) {
        console.log(err);
        return
      }

      console.log("initialization finished");
      Quagga.onDetected(self.handleDetected.bind(self));
      Quagga.start();
    });
  }

  stop() {
    Quagga.offDetected(this.handleDetected);
    Quagga.stop()
  }

  handleDetected(data: any) {
    this._onDetected(data.codeResult.code);
  }

  getCapabilities() : MediaTrackCapabilities | null {
    let capabilities : MediaTrackCapabilities | null = null;

    var track = Quagga.CameraAccess.getActiveTrack() as MediaStreamTrack;
    if (typeof track.getCapabilities === 'function') {
        capabilities = track.getCapabilities();
    }

    return capabilities
  }

  async setTorch(enable: boolean) {
    await Quagga.CameraAccess.getActiveTrack().applyConstraints({
      advanced: [{ torch: enable } as any]
    })
  }  

  getCameraResolution(): [number, number] {
    // use low(er) resolution (e.g. 480px) instead of the camera's maximum allowed resolution to reduce processing overheads.. also not neeed to read a barcode
    let width = 480
    let height = 240
  
    // camera screen/width is taken from a landscape perspective, so..
    // - for a real device running mobi (i.e. in portrait) the values are reversed
    // - for a simulated device running mobi (i.e. desktop development of mobi) OR desktop the values are left unchanged
    if (window.screen.height > window.screen.width) {
      return [height, width]
    }
    return [width, height]
  }
}

