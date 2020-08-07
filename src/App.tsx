import React from 'react';
import './App.css';
import { BarcodeQuagga } from './components/BarcodeQuagga'
import logo from './barcode.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


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

  private widths: number[] = [100, 200, 250, 300, 480, 800, 960, 1200, 1920];
  private heights: number[] = [100, 200, 250, 300, 480, 800, 960, 1200, 1920];

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
              <DropdownButton id="dropdown-basic-button" title={`Width: ${this.state.width}`}>
                {
                  this.widths.map(width => <Dropdown.Item eventKey={`${width}`} onSelect={this.selectedWidth}>{width}px</Dropdown.Item>)
                }
              </DropdownButton>

              <DropdownButton id="dropdown-basic-button" title={`Height: ${this.state.height}`}>
                {
                  this.heights.map(height => <Dropdown.Item eventKey={`${height}`} onSelect={this.selectedHeight}>{height}px</Dropdown.Item>)
                }
              </DropdownButton>

              <BarcodeQuagga width={this.state.width} height={this.state.height} />

            </span>

          </header>
        </div>
      </>
    )
  }
  
  selectedWidth = (eventKey: string | null, e: React.SyntheticEvent<unknown>): void => {
    this.setState({...this.state, width: Number(eventKey)});
  }

  selectedHeight = (eventKey: string | null, e: React.SyntheticEvent<unknown>): void => {
    this.setState({...this.state, height: Number(eventKey)});
  }
}

export default App;
