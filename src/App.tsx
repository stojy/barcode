import React from 'react';
import './App.css';
import {BarcodeQuagga} from './components/BarcodeQuagga'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div id='captureTarget' />
        <BarcodeQuagga/>
      </header>
    </div>
  );
}

export default App;
 