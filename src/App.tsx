import './App.css';
import React from 'react';
import { Barcode } from './components/Barcode'

import logo from './barcode.png'

export function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" height="300px" />
          <br />
          <br />

          <Barcode />
        </header>
      </div>
    </>
  )
}

export default App;
