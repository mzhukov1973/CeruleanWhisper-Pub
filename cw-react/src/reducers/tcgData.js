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
import { TCG_SEL, TCG_ENC_PREP, TCG_SND, TCG_TXTA_CHANGE, TCG_TXTADDR_CHANGE, TCG_TOPST_SET, TCG_TOGGLE_TIMER, TCG_STAT_TIMER, TCG_CAM_FLIP, TCG_CAM_CONT_UPDATE, TCG_CAM_STORE_KEY, TCG_CAM_SIZE_UPDATE } from '../actions'

const tcgData = (state = {}, action) => {
 let new_state;
 const txtaPresets = function(val) 
 {
  if (Number(val)>0)
  {
   let txtaContent='';
   for(let i=0;i<Number(val)/100;i++)
   {
    for(let k=0;k<=9;k++) {txtaContent+='1234567890';}
    txtaContent+="\n";
   }
   return txtaContent;
  }
  else if (val==='qrData')  {return 'qrData';}
  else if (val==='usrData') {return 'usrData';}
  else {return 'err';}
 };
 switch(action.type)
 {
  case TCG_CAM_SIZE_UPDATE:
   new_state = Object.assign({},state);
   new_state.fcData.containerSize.width=action.data.width;
   new_state.fcData.containerSize.height=action.data.height;
   return new_state;

  case TCG_CAM_CONT_UPDATE:
   new_state = Object.assign({},state);
   for (let k in action.data) {
    if (action.data.hasOwnProperty(k)) {
     if (k==='sd0') {new_state.fcData.containerFront=action.data[k];}
     else if (k==='sd1') {new_state.fcData.containerBack=action.data[k];}
    }
   }
   return new_state;

  case TCG_CAM_FLIP:
   new_state = Object.assign({},state);
   new_state.fcData.side0Up = !new_state.fcData.side0Up;
   return new_state;

  case TCG_CAM_STORE_KEY:
   new_state = Object.assign({},state);
   new_state.fcData.modId = action.data;
   return new_state;


  case TCG_STAT_TIMER.ISMS:
   let statusSMS  = state.smsSendState.currentState;
   let deltaSMS   = action.timestamp - state.smsSendState.timestamp; 
/*   let oldHeapSMS = state.smsSendStats[statusSMS];*/
   let preObSMS = Object.assign({},state.smsSendStats,{[statusSMS]:(/*oldHeapSMS*/+deltaSMS)});
   return Object.assign({},state,{'smsSendStats':preObSMS});
  case TCG_STAT_TIMER.IQRG:
   let statusQRG  = state.qrGenerationState.currentState;
   let deltaQRG   = action.timestamp - state.qrGenerationState.timestamp;
/*   let oldHeapQRG = state.qrGenerationStats[statusQRG];*/
   let preObQRG = Object.assign({},state.qrGenerationStats,{[statusQRG]:(/*oldHeapQRG*/+deltaQRG)});
   return Object.assign({},state,{'qrGenerationStats':preObQRG});
  case TCG_STAT_TIMER.IQRR:
   let statusQRR  = state.qrScanState.currentState;
   let deltaQRR   = action.timestamp - state.qrScanState.timestamp;
/*   let oldHeapQRR = state.qrScanStats[statusQRR];*/
   let preObQRR = Object.assign({},state.qrScanStats,{[statusQRR]:(/*oldHeapQRR*/+deltaQRR)});
   return Object.assign({},state,{'qrScanStats':preObQRR});

  case TCG_TOGGLE_TIMER.ISMS:
   return Object.assign({},state,{'smsSendState':      {'currentState':action.data, 'timestamp':action.timestamp}});
  case TCG_TOGGLE_TIMER.IQRG:
   return Object.assign({},state,{'qrGenerationState': {'currentState':action.data, 'timestamp':action.timestamp}});
  case TCG_TOGGLE_TIMER.IQRR:
   return Object.assign({},state,{'qrScanState':       {'currentState':action.data, 'timestamp':action.timestamp}});

  case TCG_SEL:
   //action.data.val //selVal
   new_state = Object.assign({},state);
   new_state.uiSelVal=action.data.val;
   return new_state;

//=======Below is a saga-bound action (3 in fact)
  case TCG_ENC_PREP.REQ:
    return state;
  case TCG_ENC_PREP.OK:
   return state;
  case TCG_ENC_PREP.FAIL:
   return state;
//================================================================================================================

//=======Below is a saga-bound action (3 in fact)
  case TCG_SND.REQ:
   return state;
  case TCG_SND.OK:
   return state;
  case TCG_SND.FAIL:
   return state;
//================================================================================================================

  case TCG_TXTA_CHANGE.PRG:
   return Object.assign({},state,{uiTxtArVal:txtaPresets(action.data.val)});
  case TCG_TXTA_CHANGE.KBD:
   return Object.assign({},state,{uiTxtArVal:action.data.val});

  case TCG_TXTADDR_CHANGE.PRG:
   return state;
  case TCG_TXTADDR_CHANGE.KBD:
   return Object.assign({},state,{uiAddrVal:action.data.val});

  case TCG_TOPST_SET:
   //action.data.val /*newTopStatValue*/
   return Object.assign({},state,{uiStatTopVal:action.data.val});

  default:
   return state;
 }
}

export default tcgData
