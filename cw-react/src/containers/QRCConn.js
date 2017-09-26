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
import { connect } from 'react-redux'
import { QR_STORE_KEY, QR_FLIP, QR_CONT_UPDATE, QR_CALC } from'../actions'
import QRC from '../components/QRC'

const mapStateToProps = ( state ) => { 
  return { qrData: state.qrData }; 
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
//        qrInit: (ev,qrDataInit)            => {dispatch({type:QR_INIT, dat:qrDataInit});},
          flipQR: (ev)                       => {dispatch({type:QR_FLIP});},
          updateContent: (cntnt)             => {dispatch({type:QR_CONT_UPDATE, data:cntnt});},
          storeKeyFC: (key)                  => {dispatch({type:QR_STORE_KEY,data:key});}          
          //N.B.!: {cntnt}: {sd0:'innerHTML for sd0', sd1:'innerHTML for sd1'}, both sd0 & sd1 are optional.
         }
  }

const QRCConn = connect(mapStateToProps,mapDispatchToProps)(QRC)

export default QRCConn
