/****************************************************************************/
/* Copyright 2017 Maxim Zhukov                                              */
/*                                                                          */
/* Licensed under the Apache License, Version 2.0 (the "License");          */
/* you may not use this file except in compliance with the License.         */
/* You may obtain a copy of the License at                                  */
/*                                                                          */
/*     http://www.apache.org/licenses/LICENSE-2.0                           */
/*                                                                          */
/* Unless required by applicable law or agreed to in writing, software      */
/* distributed under the License is distributed on an "AS IS" BASIS,        */
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. */
/* See the License for the specific language governing permissions and      */
/* limitations under the License.                                           */
/****************************************************************************/
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
/*[mui====>*/
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
/*<====mui]*/
import { Provider } from 'react-redux'
//import { createStore, compose } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import mainReducer from './reducers'
import './index.css'
import App from './App'
import * as initialStates from './modules/initialStates'
import registerServiceWorker from './registerServiceWorker'

/*[mui====>*/injectTapEventPlugin();/*<====mui]*/


 const initialState = {
                      qrData:  initialStates.qrDataInit,
                      tcgData: initialStates.tcgDataInit
                     }

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
                        mainReducer,
                        initialState, 
                        compose (
                                 applyMiddleware(sagaMiddleware), 
                                )
                       );

sagaMiddleware.run(rootSaga);


const startIt = () => 
{ 
 render(
     <BrowserRouter basename="CeruleanWhisper-Pub">
      <Provider store={store}>
       <MuiThemeProvider>
        <App/>
       </MuiThemeProvider>
      </Provider>
     </BrowserRouter>,
  document.getElementById('root')

 ); 
 registerServiceWorker();
};


if (window.cordova) {
 document.addEventListener('deviceready',startIt,false);
} else {
 startIt();
}
