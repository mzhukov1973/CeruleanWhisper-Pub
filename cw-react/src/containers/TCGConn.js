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
import { TCG_SEL, TCG_ENC_PREP, TCG_SND, TCG_TXTA_CHANGE, TCG_TXTADDR_CHANGE,TCG_TOGGLE_TIMER, TCG_STAT_TIMER, TCG_CAM_FLIP, TCG_CAM_CONT_UPDATE, TCG_CAM_STORE_KEY, TCG_CAM_SIZE_UPDATE } from'../actions'
import TCG from '../components/TCG'

const mapStateToProps = ( state ) => { 
  return { tcgData: state.tcgData }; 
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
          onSelChange:      (selVal)           => {
                                                   dispatch({type:TCG_SEL,             data:{val:selVal}});
                                                   dispatch({type:TCG_TXTA_CHANGE.PRG, data:{val:selVal}});
                                                  },
          onPressEnc:       (ev)               => {dispatch({type:TCG_ENC_PREP.REQ});},
/**/      onPressSnd:       (ev)               => {alert('onPressSnd has fired! ev:'+ev);dispatch({type:TCG_SND.REQ});},
          onTxtArChange:    (ev,newVal)        => {
                                                   dispatch({type:TCG_TXTA_CHANGE.KBD, data:{val:newVal}});
                                                   dispatch({type:TCG_SEL,             data:{val:'usrData'}});
                                                  },
          onTxtAddrChange:  (ev,newVal)        => {dispatch({type:TCG_TXTADDR_CHANGE.KBD, data:{val:newVal}});},
/**/      flipTCGCam:       (ev)               => {dispatch({type:TCG_CAM_FLIP});},
/**/      updateContentCam: (cntnt)            => {dispatch({type:TCG_CAM_CONT_UPDATE, data:cntnt});},
          //N.B.!: {cntnt}: {sd0:'innerHTML for sd0', sd1:'innerHTML for sd1'}, both sd0 & sd1 are optional.
/**/      storeKeyFCCam:    (key)              => {dispatch({type:TCG_CAM_STORE_KEY,data:key});},
/**/      updateSizeCam:    (size)             => {dispatch({type:TCG_CAM_SIZE_UPDATE,data:{width:'100%',height:'100%'}});},
//For tests only, uses TCG_TOGGLE_TIMER actions group:
          setISMS:          (newObj)            => {
                                                    dispatch({type:TCG_STAT_TIMER.ISMS,   data:newObj.status, timestamp:newObj.tstamp});
                                                    dispatch({type:TCG_TOGGLE_TIMER.ISMS, data:newObj.status, timestamp:newObj.tstamp});
                                                   },
          setIQRG:          (newObj)            => {
                                                    dispatch({type:TCG_STAT_TIMER.IQRG,   data:newObj.status, timestamp:newObj.tstamp});
                                                    dispatch({type:TCG_TOGGLE_TIMER.IQRG, data:newObj.status, timestamp:newObj.tstamp});
                                                   },
          setIQRR:          (newObj)            => {
                                                    dispatch({type:TCG_STAT_TIMER.IQRR,   data:newObj.status, timestamp:newObj.tstamp});
                                                    dispatch({type:TCG_TOGGLE_TIMER.IQRR, data:newObj.status, timestamp:newObj.tstamp});
                                                   }
         }
  }

const TCGConn = connect(mapStateToProps,mapDispatchToProps)(TCG)

export default TCGConn
