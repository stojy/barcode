import React from 'react';
import Quagga from 'quagga'

interface IBarcodeProps {
  width: number,
  height: number,
  onDetected: (code: string) => void,
}

interface IBarcodeState {
  active: boolean
}

export class BarcodeQuagga extends React.Component<IBarcodeProps, IBarcodeState> {
  private readonly initialState = {
    active: false
  };

  constructor(props: IBarcodeProps) {
    super(props)

    // todo; lift state and use a params callback
    this.state = this.initialState
  }

  render() {
    return (
      <>
        {
          this.state.active ? null :
            <button onClick={() => this.start()}>
              {"Start (Quagga)"}
            </button>
        }
        {
          this.state.active ?
            <button onClick={() => this.stop()}>
              {"Stop"}
            </button> : null
        }
      </>
    )
  }

  start() {
    console.log("starting..")
    const self = this

    this.setState({ ...this.state, active: true })

    const config = {
      numOfWorkers: navigator.hardwareConcurrency,
      locate: true,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: '#captureTarget',
        constraints: {
          width: this.props.width,
          height: this.props.height,
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
    console.log("stopping..")
    this.setState({ ...this.initialState })

    Quagga.offDetected(this.handleDetected);
    Quagga.stop()
  }

  handleDetected(data: any) {
    this.props.onDetected(data.codeResult.code);
  }
}

