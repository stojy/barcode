import './App.css';
import React from 'react';
import { Barcode } from './components/Barcode'

import logo from './barcode.png'

class App extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);

    console.log(`app.tsx ctor: state=${JSON.stringify(this.state)}`)
  }

  render() {
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
}

export default App;
