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
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { TCG_ENC_PREP, TCG_TOGGLE_TIMER, TCG_STAT_TIMER, QR_SEQ } from './actions'



//Base64 encode/decode UTF-8 string:
const utoa = function(str) {return window.btoa(unescape(encodeURIComponent(str)));}
const atou = function(str) {return decodeURIComponent(escape(window.atob(str)));}

//===============AJAX, WebWorker and other massively async functions here==========================================
const DoQREncodePrepMsg = (msg)=>
{
/*===>In production mode, one should prepare the original message here (i.e. convert it to base64, split in numbered pieces, etc) and then feed it one by one to QR_CALC et al.<===*/
 const MAX_CHARS_IN_QR = 1800, msgb64 = utoa(msg), loops = (msgb64.length - (msgb64.length % MAX_CHARS_IN_QR)) / MAX_CHARS_IN_QR;
 let chunks = [];
 for (let i=0;i<=loops;i++){chunks.push(msgb64.slice(i*MAX_CHARS_IN_QR,(i+1)*MAX_CHARS_IN_QR));}

 const p = new Promise((resolve,reject) => {
    ()=>{
         if (chunks.length>0) {resolve( {success:true,  payload:chunks} );}
         else                 {reject(  {success:false, error:'An error in DoQREncodePrepMsg.'} );}
    }
  });
/*sleep for some time here, then return a promise - either successful or failed*/
/*const p = new Promise((resolve,reject) => {setTimeout(function(){if (Math.random()<0.5) {resolve({res:'success', data:'payload'});} else {reject('Error - parameter was false.');} },5000);});*/
  return p;
};
//=================================================================================================================



//================QREncode related saga============================================================================
//FYI:
//  At error correction level H and 177x177 blocks (size 40) QR code we can have
//ca. 1800+ base64 characters. More (ca. 4200+) at lower error corrections levels, up to
//the minimum of L. ([L]ow, [M]edium, [Q]uartile (i.e. 25% can be restored) and [H]igh.)
//  Also, H means error correction capability of ~30%, while L ~ 7%.
//  Typical margin requirement around QR code is at least 4 module-worth. (4/177th of its 
//width if it's Model 2 type 40 (177x177))
//  All this is for the most popular type of QR code: 'QR Code Model 2'.
//  'iQR Code' has the theoretical ability to store up to 40K numbers at version 61 
//(422x422 modules). An iQR Code of the same size as an existing QR Code can 
//hold up to 80% more information. Top error correction capability of iQR Code is also
//superior to the popular QR Code Model 2 - when Model 2 can reach maximum of 30%, iQR
//Code is capable of hitting 50% (at error correction level S). There is also mention
//of another level for iQR Code: level T, which restores up to 60% of lost codewords, and 
//the fact that iQR Code requires a margin only 1 module wide (2 modules in the case
//of 2-byte characters), as opposed to 4 modules-wide margins required by QR Code Model 2.
//==>HOWEVER. iQR Codes are not free to use they are licensed to their creators. Damn.<==

export function* tcgEncPrep(action) /*action.msg contains text string to prep and encode*/
{
 try {
      const dat = yield call(DoQREncodePrepMsg,action.msg) /*we get an array of chunks*/

      yield put({type: QR_SEQ.CRE, payload:dat.payload}) /*Create new sequence (it then gets fed into QRC)*/

      yield put({type: TCG_ENC_PREP.OK, 'data':dat.data})
     } 
 catch (error) 
     { 
      yield put({type: TCG_ENC_PREP.FAIL, 'error':error.error}); 
     }
}
export function* watchTCGEncPrepRequest() {
  yield takeEvery(TCG_ENC_PREP.REQ, tcgEncPrep)
}

//Single entry point to start all sagas at once:
export default function* rootSaga() {
  yield all([
    watchTCGEncPrepRequest()
  ])
}
