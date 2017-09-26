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
import { QR_STORE_KEY, QR_INIT, QR_FLIP, QR_CONT_UPDATE, QR_CALC, QR_SEQ } from '../actions'

const qrData = (state = {}, action) => {
//===debug stuff, comment out when done==
//const thisModNum = 1;
//if (window.redCalls === undefined) {window.redCalls=0;} window.redCalls++;
//if (window['redCalls'+((thisModNum>=1)?thisModNum:'')] === undefined) {window['redCalls'+((thisModNum>=1)?thisModNum:'')]=0;} window['redCalls'+((thisModNum>=1)?thisModNum:'')]++;
//let alertTxt  = 'qr'+((thisModNum>=2)?thisModNum:'')+'Data reducer called with action: \''+action.type+'\'!\n(call #'+window['redCalls'+((thisModNum>=1)?thisModNum:'')]+' for this reducer out of #'+window.redCalls+' total qrData/qr2Data reducer calls.)';
//if (action.type==='@@INIT') {alertTxt += '\nAction is \'@@INIT\', init the state of the \'QRC'+((thisModNum>=2)?thisModNum:'')+'\' component.\nInitial state sample: state.containerFront/Back = \''+state.fcData.containerFront+'\'/\''+state.fcData.containerBack+'\'';}
//alert(alertTxt);
//=======================================
 let new_state;
 switch(action.type)
 {
  case QR_INIT:
   return state;

  case QR_CONT_UPDATE:
   new_state = Object.assign({},state);
   for (let k in action.data) {
    if (action.data.hasOwnProperty(k)) {
     if (k==='sd0') {
                     new_state.fcData.containerFront=action.data[k];
                     new_state.qrTopStatusVal='Up to first 20 chars of encoded info:<br/>['+new_state.text.slice(0,20)+((new_state.text.length>20)?'...':'')+']';
                    }
     else if (k==='sd1') {new_state.fcData.containerBack=action.data[k];}
    }
   }
   return new_state;

  case QR_FLIP:
   new_state = Object.assign({},state);
   new_state.fcData.side0Up = !new_state.fcData.side0Up;
   return new_state;

  case QR_STORE_KEY:
   new_state = Object.assign({},state);
   new_state.fcData.modId = action.data;
   return new_state;


  case QR_SEQ.CRE:/*action.payload=chunks[]*/
   
   return state;
  case QR_SEQ.DEL:
   return state;


  default:
   return state;
 }
}

export default qrData
