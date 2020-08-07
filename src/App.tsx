import React from 'react';
import './App.css';
import {BarcodeQuagga} from './components/BarcodeQuagga'
import logo from './barcode.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" height="300px" />
        <br/>
        <br/>
        <div id='captureTarget' />
        <BarcodeQuagga width={800} height={400}/>
      </header>
    </div>
  );
}

export default App;
 