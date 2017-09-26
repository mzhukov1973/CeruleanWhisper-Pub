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
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio as EUIRadio, Button as EUIButton, FormSelect as EUIFormSelect } from 'elemental' 
/*[mui====>*/
import TextField from 'material-ui/TextField'
import SMSSendIcon from 'mui-icons/fontawesome/envelope-o'
import QRGenIcon from 'mui-icons/cmdi/qrcode'
import QRReadIcon from 'mui-icons/cmdi/qrcode-scan'
/*<====mui]*/
import 'css/elemental-ui.styles.min.css'
import './TCG.css'

const itemsSel = [
                  {label:'txt100',   value:'100'},
                  {label:'txt200',   value:'200'},
                  {label:'txt300',   value:'300'},
                  {label:'txt400',   value:'400'},
                  {label:'txt500',   value:'500'},
                  {label:'txt600',   value:'600'},
                  {label:'txt700',   value:'700'},
                  {label:'txt800',   value:'800'},
                  {label:'txt900',   value:'900'},
                  {label:'txt1000',  value:'1000'},
                  {label:'txt1100',  value:'1100'},
                  {label:'qrData',   value:'qrData'},
                  {label:'User-def', value:'usrData'}
                 ];

const iC    = {off:'QRTSIndIcons',in_progress:'QRTSIndIcons QRTSIndIconsSPIN',ok:'QRTSIndIcons QRTSIndIconsOK',err:'QRTSIndIcons QRTSIndIconsERR'}
const iCc   = {off:'rgba(0,0,0,1)',in_progress:'rgba(142,36,170,1)',ok:'rgba(139,255,74,1)',err:'rgba(255,57,53,1)'}
const iOk  = {off:'QRTSIndIconsOk', in_progress:'QRTSIndIconsOk', ok:'QRTSIndIconsOk QRTSIndIconsReveal',err:'QRTSIndIconsOk'}
const iErr  = {off:'QRTSIndIconsErr',in_progress:'QRTSIndIconsErr',ok:'QRTSIndIconsErr',                  err:'QRTSIndIconsErr QRTSIndIconsReveal'}

class TCG extends Component {
/*Just to shorten some stuff ('i<something>' stands here for 'indicator-something'):*/
 iC(indState)    {return (indState==='off')?iC.off:(indState==='in_progress')?iC.in_progress:(indState==='ok')?iC.ok:iC.err;}
 iCok(indState)  {return (indState==='off')?iOk.off:(indState==='in_progress')?iOk.in_progress:(indState==='ok')?iOk.ok:iOk.err;}
 iCerr(indState) {return (indState==='off')?iErr.off:(indState==='in_progress')?iErr.in_progress:(indState==='ok')?iErr.ok:iErr.err;}
 ic(indState)    {return (indState==='off')?iCc.off:(indState==='in_progress')?iCc.in_progress:(indState==='ok')?iCc.ok:iCc.err;}
 
  generateModIdCam()
  {
   const res = Date.now().toString(16).slice(4);
   this.props.storeKeyFCCam(res);
   return res;
  }
  modIdCam = this.generateModIdCam(); /*Unique key-string to identify each new instance of this module (and object, created from this class)*/

  componentDidMount = function() {
  //   When component has mounted, initialise QRData structure
  //and generate a test QR code:
  //this.props.updateContentCam({sd0:this......});
   this.props.updateSizeCam({width:'100%',height:'100%'});
  }

  render() {
    return (
       <div className={((this.props.tcgData.smsSendState.currentState==='in_progress')||(this.props.tcgData.qrGenerationState.currentState==='in_progress')||(this.props.tcgData.qrScanState.currentState==='in_progress'))?'ControlsGroup animateBg':'ControlsGroup'}>
        <div className='QRTestGroup'>
         <div className='QRTestStatus'>
         <div className='QRTSIndAndTxt'>
           <div className='QRTSIndicators'>
            <div className='QRTSIndIconsContWr'>
             <div className='QRTSIndIconsContIco'>
              <div className={this.iCok(this.props.tcgData.smsSendState.currentState)}>&#x2714;</div>
              <div className={this.iCerr(this.props.tcgData.smsSendState.currentState)}>&#x2718;</div>
              <SMSSendIcon className={this.iC(this.props.tcgData.smsSendState.currentState)}/>
             </div>
             <div className='QRTSIndIconsContTxt'>
              <div className='QRTSIndIconsMiniCont'>
               <div className='QRTSIndIconsMicroCont'>
                <div className='QRTSIndIconsNanoCont0'>t&#x305;:</div>
                <div className='QRTSIndIconsNanoCont1'>{(this.props.tcgData.smsSendStats.in_progress/1000).toFixed(2)+'s'}</div>
               </div>
              </div>
             </div>
            </div> {/*end -- QRTSIndIconsContWr*/}
            <div className='QRTSIndIconsContWr'>
             <div className='QRTSIndIconsContIco'>
              <div className={this.iCok(this.props.tcgData.qrGenerationState.currentState)}>&#x2714;</div>
              <div className={this.iCerr(this.props.tcgData.qrGenerationState.currentState)}>&#x2718;</div>
              <QRGenIcon   className={this.iC(this.props.tcgData.qrGenerationState.currentState)}/>
             </div>
             <div className='QRTSIndIconsContTxt'>
              <div className='QRTSIndIconsMiniCont'>
               <div className='QRTSIndIconsMicroCont'>
                <div className='QRTSIndIconsNanoCont0'>t&#x305;:</div>
                <div className='QRTSIndIconsNanoCont1'>{(this.props.tcgData.qrGenerationStats.in_progress/1000).toFixed(2)+'s'}</div>
               </div>
              </div>
             </div>
            </div> {/*end -- QRTSIndIconsContWr*/}
            <div className='QRTSIndIconsContWr'>
             <div className='QRTSIndIconsContIco'>
              <div className={this.iCok(this.props.tcgData.qrScanState.currentState)}>&#x2714;</div>
              <div className={this.iCerr(this.props.tcgData.qrScanState.currentState)}>&#x2718;</div>
              <QRReadIcon  className={this.iC(this.props.tcgData.qrScanState.currentState)}/>
             </div>
             <div className='QRTSIndIconsContTxt'>
              <div className='QRTSIndIconsMiniCont'>
               <div className='QRTSIndIconsMicroCont'>
                <div className='QRTSIndIconsNanoCont0'>t&#x305;:</div>
                <div className='QRTSIndIconsNanoCont1'>{(this.props.tcgData.qrScanStats.in_progress/1000).toFixed(2)+'s'}</div>
               </div>
              </div>
             </div>
            </div> {/*end -- QRTSIndIconsContWr*/}
           </div>{/*end -- QRTSIndicators*/}
           <div className='QRTStext' dangerouslySetInnerHTML={{__html:this.props.tcgData.uiStatTopVal}}></div>
          </div>{/*end -- QRTSIndAndTxt*/}
         </div>{/*end -- QRTestStatus_IndAndTxt*/}
         <hr className='hrClass1'/>
         <div className='preSetsToEnc'>

          <EUIFormSelect className = 'encodeTestDataSel'
                         value     = {this.props.tcgData.uiSelVal}
                         onChange  = {this.props.onSelChange}
                         options   = {itemsSel}
                         firstOption = "Select"/>
          <EUIButton 
           className='encBtn'
           type='default-success'
           size='lg'
           onClick   = {this.props.onPressEnc}>
           Encode
          </EUIButton>

         </div>
         <hr className='hrClass2'/>
        <TextField
          id                 = 'sndAddr' 
          value              = {this.props.tcgData.uiAddrVal}
          onChange           = {this.props.onTxtAddrChange}
          floatingLabelText  = 'SMS Recipient(s) phone(s)'
          fullWidth          = {true}
          className          = 'sndAddr'/>
        <TextField
          type                     = 'text'
          className                = 'txtArea'
          multiLine                = {true}
          floatingLabelFixed       = {false}
          floatingLabelStyle       = {{left:'5px'}}
          floatingLabelText        = {this.props.tcgData.uiTxtArVal.length + ' characters so far.'}
          rows                     = {9}
          rowsMax                  = {9}
          fullWidth                = {true}
          value                    = {this.props.tcgData.uiTxtArVal}
          onChange                 = {this.props.onTxtArChange}/>

          <EUIButton 
           type='default-success'
           className = 'sndBtn'
           size      = 'lg'
           onClick   = {this.props.onPressSnd}>
           Send
          </EUIButton>

        </div>
        <div className='CamGroup'>
{/*<FC fcData={this.props.qrData.fcData} flipItFC={this.props.flipQR}/>*/}
         <div className='UITestGroup'>
          <div className='IndTestGroup'>
           <div className='IndTitleWrapper'>Spinners</div>
           <div className='IndTestGroupInvis'>
            <div className='IndMiniTestGroup'>
             <div className='radioTitleWrapper'>SMS</div>
             <EUIRadio className='radioWrapperOff'        onClick={()=>{ this.props.setISMS({status:'off',         tstamp:Date.now()})}} name='indsms' label='Off' value='off'         checked={'off'===this.props.tcgData.smsSendState.currentState}/>
             <EUIRadio className='radioWrapperInProgress' onClick={()=>{ this.props.setISMS({status:'in_progress', tstamp:Date.now()})}} name='indsms' label='On'  value='in_progress' checked={'in_progress'===this.props.tcgData.smsSendState.currentState}/>
             <EUIRadio className='radioWrapperOk'         onClick={()=>{ this.props.setISMS({status:'ok',          tstamp:Date.now()})}} name='indsms' label='Ok'  value='ok'          checked={'ok'===this.props.tcgData.smsSendState.currentState}/>
             <EUIRadio className='radioWrapperErr'        onClick={()=>{ this.props.setISMS({status:'err',         tstamp:Date.now()})}} name='indsms' label='Err' value='err'         checked={'err'===this.props.tcgData.smsSendState.currentState}/>
            </div> {/*IndMiniTestGroup*/}
            <div className='IndMiniTestGroup'>
             <div className='radioTitleWrapper'>Gen</div>
             <EUIRadio className='radioWrapperOff'        onClick={()=>{this.props.setIQRG({status:'off',         tstamp:Date.now()})}} name='indqrg' label='Off' value='off'         checked={'off'===this.props.tcgData.qrGenerationState.currentState}/>
             <EUIRadio className='radioWrapperInProgress' onClick={()=>{this.props.setIQRG({status:'in_progress', tstamp:Date.now()})}} name='indqrg' label='On'  value='in_progress' checked={'in_progress'===this.props.tcgData.qrGenerationState.currentState}/>
             <EUIRadio className='radioWrapperOk'         onClick={()=>{this.props.setIQRG({status:'ok',          tstamp:Date.now()})}} name='indqrg' label='Ok'  value='ok'          checked={'ok'===this.props.tcgData.qrGenerationState.currentState}/>
             <EUIRadio className='radioWrapperErr'        onClick={()=>{this.props.setIQRG({status:'err',         tstamp:Date.now()})}} name='indqrg' label='Err' value='err'         checked={'err'===this.props.tcgData.qrGenerationState.currentState}/>
            </div> {/*IndMiniTestGroup*/}
            <div className='IndMiniTestGroup'>
             <div className='radioTitleWrapper'>Scan</div>
             <EUIRadio className='radioWrapperOff'        onClick={()=>{this.props.setIQRR({status:'off',         tstamp:Date.now()})}} name='indqrr' label='Off' value='off'         checked={'off'===this.props.tcgData.qrScanState.currentState}/>
             <EUIRadio className='radioWrapperInProgress' onClick={()=>{this.props.setIQRR({status:'in_progress', tstamp:Date.now()})}} name='indqrr' label='On'  value='in_progress' checked={'in_progress'===this.props.tcgData.qrScanState.currentState}/>
             <EUIRadio className='radioWrapperOk'         onClick={()=>{this.props.setIQRR({status:'ok',          tstamp:Date.now()})}} name='indqrr' label='Ok'  value='ok'          checked={'ok'===this.props.tcgData.qrScanState.currentState}/>
             <EUIRadio className='radioWrapperErr'        onClick={()=>{this.props.setIQRR({status:'err',         tstamp:Date.now()})}} name='indqrr' label='Err' value='err'         checked={'err'===this.props.tcgData.qrScanState.currentState}/>
            </div> {/*IndMiniTestGroup*/}
           </div> {/*IndTestGroupInvis*/}
          </div> {/*IndTestGroup*/}
         </div>
        </div>
       </div>
    );
  }
}

TCG.defaultProps = {
  tcgData:{
        uiSelIdx:            '',
        uiSelVal:            '',
        uiAddrVal:           '',
        uiTxtArVal:          '',
        uiTxtArStat:          '0 chars',
        uiStatTopVal:        'Idle...',
        smsSendState:        {currentState:'off',timestamp:Date.now()},   /*'off'-'in_progress'-'ok'-'err'; and timestamp is the moment this, current state has started*/
        smsSendStats:        {'off':0,'in_progress':0,'ok':0,'err':0}, /*total times spent by system in the designated state*/
        qrGenerationState:   {currentState:'off',timestamp:Date.now()},   /*'off'-'in_progress'-'ok'-'err'; and timestamp is the moment this, current state has started*/
        qrGenerationStats:   {'off':0,'in_progress':0,'ok':0,'err':0},
        qrScanState:         {currentState:'off',timestamp:Date.now()},   /*'off'-'in_progress'-'ok'-'err'; and timestamp is the moment this, current state has started*/
        qrScanStats:         {'off':0,'in_progress':0,'ok':0,'err':0},
    fcData:{
      modId:              'fc',
      side0Up:            true,
      containerFront:     'Side #QR0',
      containerBack:      'Side #QR1',
      containerSize:      {width:'256px', height:'256px'},
      perspective:        '1000px',
      flipAxis:           0,
      flipDirection:      0,
      flipNumber:         0,
      flipTimingFunction: 'ease',
      flipDuration:       '0.6s',
      useSimpleMode:      true
    }
  }
}


TCG.propTypes = {
  tcgData:  PropTypes.shape({
    uiSelIdx:            PropTypes.string.isRequired,
    uiSelVal:            PropTypes.string.isRequired,
    uiAddrVal:           PropTypes.string.isRequired,
    uiTxtArVal:          PropTypes.string.isRequired,
    uiTxtArStat:         PropTypes.string.isRequired,
    uiStatTopVal:        PropTypes.string.isRequired,
    smsSendState:        PropTypes.shape({
         currentState: PropTypes.oneOf(['off','in_progress','ok','err']).isRequired,
         timestamp:    PropTypes.number.isRequired
        }).isRequired,
    smsSendStats:        PropTypes.shape({ 
          off:         PropTypes.number.isRequired,
          in_progress: PropTypes.number.isRequired,
          ok:          PropTypes.number.isRequired,
          err:         PropTypes.number.isRequired
        }).isRequired,
    qrGenerationState:   PropTypes.shape({
         currentState: PropTypes.oneOf(['off','in_progress','ok','err']).isRequired,
         timestamp:    PropTypes.number.isRequired
       }).isRequired,
    qrGenerationStats:   PropTypes.shape({ 
          off:         PropTypes.number.isRequired,
          in_progress: PropTypes.number.isRequired,
          ok:          PropTypes.number.isRequired,
          err:         PropTypes.number.isRequired
        }).isRequired,
    qrScanState:         PropTypes.shape({
         currentState: PropTypes.oneOf(['off','in_progress','ok','err']).isRequired,
         timestamp:    PropTypes.number.isRequired
       }).isRequired,
    qrScanStats:         PropTypes.shape({ 
          off:         PropTypes.number.isRequired,
          in_progress: PropTypes.number.isRequired,
          ok:          PropTypes.number.isRequired,
          err:         PropTypes.number.isRequired
        }).isRequired,
      fcData:  PropTypes.shape({
        modId:                PropTypes.string.isRequired,
        side0Up:              PropTypes.bool.isRequired,
        containerFront:       PropTypes.string.isRequired, 
        containerBack:        PropTypes.string.isRequired, 
        containerSize:        PropTypes.shape({width:PropTypes.string.isRequired,height:PropTypes.string.isRequired}).isRequired, 
        perspective:          PropTypes.string.isRequired, 
        flipAxis:             PropTypes.oneOf([0,1]), 
        flipDirection:        PropTypes.oneOf([0,1]), 
        flipNumber:           PropTypes.number, 
        flipTimingFunction:   PropTypes.string, 
        flipDuration:         PropTypes.string, 
        universalFlipControl: PropTypes.arrayOf(PropTypes.shape({  
          axis:            PropTypes.oneOf([0,1]).isRequired, 
          direction:       PropTypes.oneOf([0,1]).isRequired, 
          flips:           PropTypes.number.isRequired, 
          timingFunction:  PropTypes.string.isRequired, 
          duration:        PropTypes.string.isRequired, 
          finalPivotAngle: PropTypes.number.isRequired 
        })),
        useSimpleMode:     PropTypes.bool.isRequired
      }).isRequired
  }).isRequired,
  flipTCGCam:            PropTypes.func.isRequired,
  updateContentCam:      PropTypes.func.isRequired,
  storeKeyFCCam:         PropTypes.func.isRequired,
  updateSizeCam:         PropTypes.func.isRequired,
  onSelChange:           PropTypes.func.isRequired,
  onPressEnc:            PropTypes.func.isRequired,
  onPressSnd:            PropTypes.func.isRequired,
  onTxtArChange:         PropTypes.func.isRequired,
  onTxtAddrChange:       PropTypes.func.isRequired,
  setISMS:               PropTypes.func, /*For tests. Remove, once in production*/
  setIQRG:               PropTypes.func, /*For tests. Remove, once in production*/
  setIQRR:               PropTypes.func, /*For tests. Remove, once in production*/
}

export default TCG
