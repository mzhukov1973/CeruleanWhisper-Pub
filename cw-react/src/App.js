import React, { Component } from 'react'
import QRCConn from './containers/QRCConn'
import TCGConn from './containers/TCGConn'
import './App.css'

class App extends Component {

  render() {
    return (
<div>
        <div className='App'>
         <h1 className='pgHd'>
          <span className='componentTitle'>
           <code>
            <span className='cerShadow'>Cerulean&nbsp;Whisper</span>
            Optical&nbsp;<span className='supTop'>public&nbsp;app</span>
           </code>
          </span>
          <br/>
          <small className='smallBase smallRaised'>the ultimate protected communications solution.</small>
         </h1>
         <div className='QRGroup'>
          <QRCConn/>    
         </div>
         <div className='ControlsGroupHolder'>
          <TCGConn/> 
         </div>
        </div>
</div>
    );                   
  }
}

export default App
