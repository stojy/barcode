import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BarcodeQuagga} from './components/BarcodeQuagga.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
        <div id='captureTarget' />
        <BarcodeQuagga/>
      </header>
    </div>
  );
}

export default App;
