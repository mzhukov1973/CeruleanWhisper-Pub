import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';
import './css/fonts.css';
import './App.css';


class QR extends Component {
  render() {
    return (

      <div className='QR'>
       QR
      </div>

    );
  }
}

class StatusMessage extends Component {
  render() {
    return (

      <div className='StatusMessage'>
       <div id='stat1'>You have <strong>new</strong> messages.</div>
       <div id='stat2'>Flip QR to acvate handover protocol.</div>
      </div>

    );
  }
}


class App extends Component {
  render() {
    return (

      <div className='App'>
       <QR/>
       <StatusMessage/>
      </div>

    );
  }
}

export default App;
