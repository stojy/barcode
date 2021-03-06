import React, { useState } from 'react';
import { Droppy } from './Droppy'
import Button from 'react-bootstrap/esm/Button';
import { BarcodeQuagga, ErrorDetails } from './BarcodeQuagga';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import 'react-bootstrap/esm';
//import { getCapabilities, setTorch, getCameraResolution } from './camera';
import { ObjectInspector } from 'react-inspector';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

interface IError extends Error {
  type: any
}

export function Barcode() {
  const resolutions: number[] = [1, 100, 200, 250, 300, 480, 720, 721, 960, 1080, 1280, 1281, 1920, 1921];
  const barcodeQuagga: BarcodeQuagga = new BarcodeQuagga();

  const [defaultWidth, defaultHeight] = barcodeQuagga.getCameraResolution()

  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<IError | null>(null);
  const [capabilities, setCapabilities] = useState<MediaTrackCapabilities | null>(null);
  const [showCameraInfo, setShowCameraInfo] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);

  const handleWidthSelected = (value: string | null): void => {
    let val = value?.match(/\d+/)?.[0];
    if (val !== undefined)
      setWidth(Number(val));
  }

  const handleHeightSelected = (value: string | null): void => {
    let val = value?.match(/\d+/)?.[0];
    if (val !== undefined)
      setHeight(Number(val));
  }

  const start = () => {
    console.log("starting..")
    try {
      barcodeQuagga.start({ width, height, onDetected: handleDetected, onInitialised: handleInitialised });
    }
    catch (err) {
      handleError(err);
    }
    setActive(true)
  }

  const stop = () => {
    console.log("stopping..")
    barcodeQuagga.stop();
    setActive(false)
  }

  const handleDetected = (code: string) => {
    console.log(`detected: code=${code}`)
    setCode(code)
    beep();
  }

  const handleInitialised = (error: ErrorDetails | null) => {
    console.log(`initialised: error=${error}`)
    if (error)
      handleError(error)
  }

  const beep = () => {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.volume = 1;
    snd.play();
  }

  const handleError = (err: Error) => {
    console.error(err);

    // redefining error as the original (MediaStreamError?) Error doesn't seem to have a working toJSON overload
    // - also the underlying object type gets lost
    let error: IError = {
      message: err.message,
      name: err.name,
      stack: err.stack,
      type: Object.prototype.toString.call(err) // https://stackoverflow.com/questions/332422/get-the-name-of-an-objects-type
    }
    setError(error);
  }

  const toggleCameraCapabilities = () => {
    try {
      if (!capabilities) {
        let retrievedCapabilities = barcodeQuagga.getCapabilities();
        setCapabilities(retrievedCapabilities)
      }

      setShowCameraInfo(!showCameraInfo);
    }
    catch (err) {
      handleError(err)
    }
  }

  const handleTorchChanged = async () => {
    try {
      await barcodeQuagga.setTorch(!torchEnabled);
    }
    catch (err) {
      handleError(err);
    }

    setTorchEnabled(!torchEnabled);
  }

  return (
    <>
      <div>
        <div id='captureTarget' style={{ visibility: active ? 'visible' : 'collapse' }} />

        <div>
          {
            active ?
              <>
                <Button className='ml-2' onClick={() => stop()}>Stop</Button>
                <Button className='ml-2' variant='secondary' onClick={toggleCameraCapabilities}>Show/Hide Camera Info</Button>
                <FormControlLabel className='ml-2'
                  control={<Checkbox style={{ color: "#00e676" }} checked={torchEnabled} onChange={handleTorchChanged} />}
                  label="Torch"
                />

                <div className='mt-2 text-left' hidden={!showCameraInfo}>
                  <ObjectInspector data={capabilities} expandLevel={10} showNonenumerable={false} sortObjectKeys={true} theme='chromeDark' />
                </div>
              </>
              :
              <>
                <div>
                  <Dropdown as={ButtonGroup}>
                    <Droppy title={`Width: ${width}px`} values={resolutions.map(x => `${x}px`)} onSelect={handleWidthSelected} />
                    <Droppy title={`Height: ${height}px`} values={resolutions.map(x => `${x}px`)} onSelect={handleHeightSelected} />
                  </Dropdown>
                </div>
                <Button className='ml-2' onClick={() => start()}>Start (Quagga)</Button>
                <Button className='ml-2' disabled>Start (Quagga2.. TBA)</Button>
                <Button className='ml-2' disabled>Start (ZXing.. TBA)</Button>

                <form action=".">
                  <div>
                    <label>standard: <input></input></label>
                  </div>
                  <div>
                    <label>search2: <input type="search"></input></label>
                  </div>
                </form>
              </>
          }
          {
            code ?
              <>
                <br />
                <div>{`Code: ${code}`}</div>
              </>
              : null
          }
          <div className='mt-2 text-left' hidden={!error}>
            <ObjectInspector data={error} expandLevel={10} showNonenumerable={false} sortObjectKeys={true} theme='chromeDark' />
          </div>
        </div>
      </div>
    </>
  )
}
