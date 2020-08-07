import React from 'react';
import './App.css';
import { BarcodeQuagga } from './components/BarcodeQuagga'
import { Droppy } from './components/Droppy'
import logo from './barcode.png'

interface IAppState {
  width: number,
  height: number,
}

class App extends React.Component<{}, IAppState> {
  private readonly initialState : IAppState = {
    width: 1200,
    height: 200
  };

  constructor(props: any) {
    super(props);
    this.state = this.initialState;
  }

  private resolutions: number[] = [100, 200, 250, 300, 480, 800, 960, 1200, 1920];

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" height="300px" />
            <br />
            <br />
            <div id='captureTarget' />

            <span>
              <Droppy title={`Width: ${this.state.width}px`} values={this.resolutions.map(x => `${x}px`)} onSelect={this.handleWidthSelected} />
              <Droppy title={`Width: ${this.state.height}px`} values={this.resolutions.map(x => `${x}px`)} onSelect={this.handleHeightSelected} />
              <BarcodeQuagga width={this.state.width} height={this.state.height} />
            </span>
          </header>
        </div>
      </>
    )
  }
  
  handleWidthSelected = (value: string | null): void => {
    let val = value?.match(/\d+/)?.[0];
    if (val !== undefined) {
      this.setState({...this.state, width: Number(val)});
    }
  }

  handleHeightSelected = (value: string | null): void => {
    let val = value?.match(/\d+/)?.[0];
    if (val !== undefined) {
      this.setState({...this.state, height: Number(val)});
    }
  }
}

export default App;
