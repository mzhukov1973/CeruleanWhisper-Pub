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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FC from './FC'
import QRCode from '../modules/QRCode'
//import qrDataObj from '../modules/qrDataObj'

class QRC extends Component {

  generateModId()
  {
   const res = Date.now().toString(16).slice(4);
   this.props.storeKeyFC(res);
   return res;
  }
  modId        = this.generateModId(); /*Unique key-string to identify each new instance of this module (and object, created from this class)*/
  modPrefix    = 'QRC_' + this.props.qrData.fcData.modId + '_QRC_'
  instCSSRules = {}

  static baseCSSRules = {
    '.QRTopStatus':'{\nposition:absolute;\nfont-size:1em;\nline-height:1.2em;\ntop:calc(-2.4em - 6px);\nleft:0;\nline-height:1.2em;\nheight:calc(2.4em + 6px);\nmargin:0;\npadding:1px;\npadding-bottom:5px;\nborder:1px solid rgba(0,0,0,1);\nborder-radius:3px;\nborder-bottom-left-radius:0;\nborder-bottom-right-radius:0;\nbackground-color: rgba(220,220,220,0.8);\nz-index:0;\ntext-align:left;\n}\n',
    '.transpContainer':'{\nfont-size:1em;\nline-height:1.2em;\n;border:none;\npadding:0;\nmargin:0;\nmargin-top:0;\n}\n'
  }

  reGenerateCSSRules = () => /*Not a universal solution at this moment, just bulk-generate all the rules and place them in one sheet, then store it in instanced variable.*/
  {
   let result = null, newRuleIdx = 0, style = document.createElement('style');
   style.appendChild(document.createTextNode(''));
   document.head.appendChild(style);
   let stSh = style.sheet;
   for (let i in QRC.baseCSSRules) 
   {
    if (!QRC.baseCSSRules.hasOwnProperty(i)) {continue;}
    let clSelExploded = i.split(' ');
    clSelExploded.forEach((currVal,idx,array)=>{clSelExploded[idx]=currVal.slice(0,1)+this.modPrefix+currVal.slice(1);});
    let newClSel = clSelExploded.join(' ');
    newRuleIdx = stSh.insertRule((newClSel+'\n'+QRC.baseCSSRules[i]), stSh.cssRules.length);
    result = stSh.cssRules[newRuleIdx];
    this.instCSSRules[i]={'newSel':newClSel,'rule':result};
   }
  }

  qrCode = new QRCode(
                      undefined, 
                      {
                       text:         this.props.qrData.text, 
                       width:        Number(this.props.qrData.width), 
                       height:       Number(this.props.qrData.height), 
                       colorDark:    this.props.qrData.colorDark, 
                       colorLight:   this.props.qrData.colorLight, 
                       correctLevel: QRCode.CorrectLevel[this.props.qrData.correctLevel],
                       useCnv:       (this.props.qrData.QRCodeFrmt==='cnv')?true:false,
                       useDOM:       (this.props.qrData.QRCodeFrmt==='dom')?true:false,
                       useSVG:       (this.props.qrData.QRCodeFrmt==='svg')?true:false,
                       appendToDOM:  false
                      }
                     )

  componentWillMount = function() {
   /*Genereate unique CSS rules for this component 
   (using the same key, that was sent for the same purposes to FC)*/
   this.reGenerateCSSRules();
   this.QRTopStatus     = this.instCSSRules['.QRTopStatus'].rule;
   this.QRTopStatus.style.width  = 'calc( '+this.props.qrData.width+'px - 0%)';
 }
  
  componentDidMount = function() {
  //   When component has mounted, initialise QRData structure
  //and generate a test QR code:
   this.props.updateContent({sd0:this.qrCode.HTMLContent});

  }

  render() {
    return (
              <div className={this.modPrefix+'transpContainer'}>
               <div className={this.modPrefix+'QRTopStatus'} dangerouslySetInnerHTML={{__html:this.props.qrData.qrTopStatusVal}}></div>
               <FC fcData={this.props.qrData.fcData} flipItFC={this.props.flipQR}/>
              </div>
    );
  }
}


QRC.defaultProps = {
  qrData:{
    text:           'Placeholder',
    width:          256,
    height:         256,
    colorDark:      '#000000',
    colorLight:     '#ffffff',
    correctLevel:   'H',
    QRCodeFrmt:     'svg',
    qrTopStatusVal: 'QR Status',
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

  QRC.propTypes = {
    qrData:  PropTypes.shape({
      text:           PropTypes.string.isRequired,
      width:          PropTypes.number.isRequired,
      height:         PropTypes.number.isRequired,
      colorDark:      PropTypes.string.isRequired,
      colorLight:     PropTypes.string.isRequired,
      correctLevel:   PropTypes.oneOf(['L','M','Q','H']).isRequired,
      QRCodeFrmt:     PropTypes.oneOf(['cnv','dom','svg']).isRequired,
      qrTopStatusVal: PropTypes.string.isRequired,
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
    flipQR:                  PropTypes.func.isRequired,
    updateContent:           PropTypes.func.isRequired,
    storeKeyFC:              PropTypes.func.isRequired
  }
  

export default QRC
