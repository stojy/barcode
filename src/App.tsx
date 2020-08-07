import React from 'react';
import './App.css';
import { BarcodeQuagga } from './components/BarcodeQuagga'
import logo from './barcode.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class App extends React.Component<{}, {}> {

  private widths: number[] = [240, 480, 800, 960, 1200, 1920];
  private heights: number[] = [240, 480, 800, 960, 1200, 1920];

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
              <DropdownButton id="dropdown-basic-button" title="Width:">
                {
                  this.widths.map(width => <Dropdown.Item eventKey={`${width}`} onSelect={this.selected}>{width}px</Dropdown.Item>)
                }
              </DropdownButton>

              <DropdownButton id="dropdown-basic-button" title="Height:">
                {
                  this.heights.map(height => <Dropdown.Item eventKey={`${height}`} onSelect={this.selected}>{height}px</Dropdown.Item>)
                }
              </DropdownButton>

              <BarcodeQuagga width={800} height={400} />

            </span>

          </header>
        </div>
      </>
    )
  }
  
  selected(eventKey: string | null, e: React.SyntheticEvent<unknown>): void {
    debugger
  }
}

export default App;
