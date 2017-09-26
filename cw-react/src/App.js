/*===========================================================================*/
/*  Copyright 2017 Maxim Zhukov                                              */
/*                                                                           */
/*  Licensed under the Apache License, Version 2.0 (the "License");          */
/*  you may not use this file except in compliance with the License.         */
/*  You may obtain a copy of the License at                                  */
/*                                                                           */
/*      http://www.apache.org/licenses/LICENSE-2.0                           */
/*                                                                           */
/*  Unless required by applicable law or agreed to in writing, software      */
/*  distributed under the License is distributed on an "AS IS" BASIS,        */
/*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. */
/*  See the License for the specific language governing permissions and      */
/*  limitations under the License.                                           */
/*===========================================================================*/
import React, { Component } from 'react'
//import { Navbar,Nav,NavItem } from 'react-bootstrap';
//import { LinkContainer } from 'react-router-bootstrap';
//import { Switch, Route, Link } from 'react-router-dom'
import QRCConn from './containers/QRCConn'
import TCGConn from './containers/TCGConn'
//import './css/bootstrap.min.css';
//import './css/bootstrap-theme.min.css';
//import './css/react-bootstrap-table-all.min.css';
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
