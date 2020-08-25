/* istanbul ignore file */
import Quagga, { QuaggaJSResultObject } from 'quagga'

type OnDetectedCallback = (code: string) => void
type OnInitialisedCallback = (error: ErrorDetails | null) => void

// unfortunately torch capability isn't natively part of MediaTrackCapabilities as it appears to be a browser specific feature
export interface CameraCapabilities extends MediaTrackCapabilities {
  torch: boolean
}

// unfortunately quagga's error type is unspecified so a 'common' error type is defined here instead
export interface ErrorDetails extends Error {
  code: number
}

export interface BarcodeSetup {
  width: number
  height: number
  onInitialised: OnInitialisedCallback
  onDetected: OnDetectedCallback
}

export class BarcodeQuagga {
  _onDetected!: OnDetectedCallback

  start({ width, height, onInitialised, onDetected }: BarcodeSetup): void {
    this._onDetected = onDetected

    const config = {
      numOfWorkers: navigator.hardwareConcurrency,
      locate: true,
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: '#captureTarget',
        constraints: {
          width,
          height,
          facingMode: 'environment',
        },
        area: {
          top: '0%',
          right: '0%',
          left: '0%',
          bottom: '0%',
        },
      },
      decoder: {
        readers: ['code_128_reader'],
        debug: {
          drawBoundingBox: false,
          showFrequency: false,
          drawScanline: false,
          showPattern: false,
        },
        multiple: false,
      },
      locator: {
        halfSample: true,
        patchSize: 'large', // x-small, small, medium, large, x-large
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
            showBB: false,
          },
        },
      },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Quagga.init(config, (err: any) => {
      // unfortunately quagga doesn't define the error type so instead we reconstruct a 'common' error type here
      let error: ErrorDetails | null = null;
      if (err) {
        error = {
          code: 'code' in err ? err.code : 0,
          message: 'message' in err ? err.message : '',
          name: 'name' in err ? err.name : '',
          stack: 'stack' in err ? err.stack : ''
        }
      }
      else {
        const drawingCanvas = Quagga.canvas.dom.overlay
        drawingCanvas.style.display = 'none'

        Quagga.onDetected(this.handleDetected.bind(this))
        Quagga.start()
      }

      onInitialised(error)
    })
  }

  stop(): void {
    Quagga.offDetected(this.handleDetected)
    Quagga.stop()
  }

  handleDetected(data: QuaggaJSResultObject): void {
    this._onDetected(data.codeResult.code)
  }

  getCapabilities(): CameraCapabilities | null {
    let capabilities: CameraCapabilities | null = null

    var track = Quagga.CameraAccess.getActiveTrack() as MediaStreamTrack
    if (typeof track.getCapabilities === 'function') {
      capabilities = track.getCapabilities() as CameraCapabilities
    }

    return capabilities
  }

  async setTorch(enable: boolean): Promise<void> {
    return Quagga.CameraAccess.getActiveTrack().applyConstraints({
      advanced: [{ torch: enable } as MediaTrackConstraintSet],
    })
  }

  getCameraResolution(): [number, number] {
    // use low(er) resolution (e.g. 480px) instead of the camera's maximum allowed resolution to reduce processing overheads.. also not neeed to read a barcode
    let width = 480
    let height = 240

    // camera screen/width is taken from a landscape perspective, so..
    // - for a real device running mobi (i.e. in portrait) the values are reversed
    // - for a simulated device running mobi (i.e. desktop development of mobi) OR desktop the values are left unchanged
    if (window.screen.height > window.screen.width /*&& !!PRODUCTION*/) {
      return [height, width]
    }
    return [width, height]
  }
}
