import './App.css';
import React from 'react';
import { Droppy } from './components/Droppy'
import logo from './barcode.png'
import Button from 'react-bootstrap/esm/Button';
import { BarcodeQuagga } from './components/BarcodeQuagga';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import 'react-bootstrap/esm';
import { getCapabilities } from './components/camera';
import { ObjectInspector } from 'react-inspector';
import { Form } from 'react-bootstrap/esm';

interface IAppState {
  width: number,
  height: number,
  code: string | null,
  active: boolean,
  capabilities: MediaTrackCapabilities | null,
  showCameraInfo: boolean,
}

class App extends React.Component<{}, IAppState> {
  private readonly initialState: IAppState = {
    width: 800,
    height: 200,
    code: null,
    active: false,
    capabilities: null,
    showCameraInfo: false
  };

  constructor(props: any) {
    super(props);

    this.state = this.initialState;
    console.log(`app.tsx ctor: state=${JSON.stringify(this.state)}`)

    this.getCameraCapabilities();
  }

  private resolutions: number[] = [100, 200, 250, 300, 480, 800, 960, 1280, 1920];
  private barcodeQuagga: BarcodeQuagga = new BarcodeQuagga();

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" height="300px" />
            <br />
            <br />
            <div id='captureTarget' style={{ visibility: this.state.active ? 'visible' : 'collapse' }} />
            <video hidden={true}></video>

            <div>
              {
                this.state.active ?
                  <Button className='ml-2' onClick={() => this.stop()}>Stop</Button>
                  :
                  <>
                    <Form className='mb-3'>
                      <Dropdown as={ButtonGroup}>
                        <Droppy title={`Width: ${this.state.width}px`} values={this.resolutions.map(x => `${x}px`)} onSelect={this.handleWidthSelected} />
                        <Droppy title={`Height: ${this.state.height}px`} values={this.resolutions.map(x => `${x}px`)} onSelect={this.handleHeightSelected} />
                      </Dropdown>
                      <Button variant='secondary' onClick={() => this.setState({ ...this.state, showCameraInfo: !this.state.showCameraInfo })}>Show/Hide Camera Info</Button>
                      {/* <checkbox>blah</checkbox> */}
                      {/* <Button type='checkbox'>blah2</Button> */}

                      <label>
                        <input
                          type="checkbox"
                          // name={label}
                          // checked={true}
                          // onChange={onCheckboxChange}
                          className="form-check-input"
                        />
                        "hello"
                      </label>
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form>

                    <div className='mt-2 text-left' hidden={!this.state.showCameraInfo}>
                      <ObjectInspector data={this.state.capabilities} expandLevel={10} showNonenumerable={false} sortObjectKeys={true} theme='chromeDark' />
                    </div>

                    <Button className='ml-2' onClick={() => this.start()}>Start (Quagga)</Button>
                    <Button className='ml-2' disabled>Start (Quagga2.. TBA)</Button>
                    <Button className='ml-2' disabled>Start (ZXing.. TBA)</Button>
                  </>
              }

              {
                this.state.code ?
                  <>
                    <br />
                    <div>{`Code: ${this.state.code}`}</div>
                  </>
                  : null
              }
            </div>
          </header>
        </div>
      </>
    )
  }

  handleWidthSelected = (value: string | null): void => {
    let val = value?.match(/\d+/)?.[0];
    if (val !== undefined) {
      this.setState({ ...this.state, width: Number(val) });
    }
  }

  handleHeightSelected = (value: string | null): void => {
    let val = value?.match(/\d+/)?.[0];
    if (val !== undefined) {
      this.setState({ ...this.state, height: Number(val) });
    }
  }

  start() {
    console.log("starting..")
    this.barcodeQuagga.start({ width: this.state.width, height: this.state.height, onDetected: this.handleDetected });

    this.setState({ ...this.state, active: true })
  }

  stop() {
    console.log("stopping..")
    this.barcodeQuagga.stop();
    this.setState({ ...this.state, active: false })
  }

  handleDetected = (code: string) => {
    console.log(`detected: code=${code}`)
    this.setState({ ...this.state, code })
    this.beep();
  }

  beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.volume = 1;
    snd.play();
  }

  getCameraCapabilities() {
    getCapabilities((capabilities: MediaTrackCapabilities) => {
      this.setState({ ...this.state, capabilities })
    });
  }
}

export default App;
