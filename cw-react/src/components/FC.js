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

class FC extends Component {

  static defaultProps = {
    fcData:{
     modId:               'FC',
     side0Up:             true,
     containerFront:      'Side #---',
     containerBack:       'Side #---',
     containerSize:       {width:'256px', height:'256px'},
     perspective:         '1000px',
     flipAxis:            0,
     flipDirection:       0,
     flipNumber:          0,
     flipTimingFunction:  'ease',
     flipDuration:        '0.6s',
     useSimpleMode:       true
   }
  }

  static propTypes = {
    fcData:PropTypes.shape({
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
     useSimpleMode:        PropTypes.bool.isRequired
   }).isRequired
    , flipItFC:               PropTypes.func.isRequired
  }

  static baseCSSRules = {
    '.flip-container':'{\nfont-size:1em;\nline-height:1.2em;\nperspective:1000px;\nborder:none;\npadding:0;\ntext-align:center;\norder:1;\nmin-width:256px;\nwidth:256px;\nmin-height:256px;\nheight:256px;\n}\n',
    '.flipper':       '{\nfont-size:1em;\nline-height:1.2em;\ntransition:0.6s;\ntransform-style:preserve-3d;\nposition:relative;\nmin-height:100%;\nheight:100%;\nmin-width:100%;\nwidth:100%;\n}\n',
    '.front, .back':  '{\nfont-size:1em;\nline-height:1.2em;\nbackface-visibility:hidden;\ntransition:0.6s;\ntransform:rotateY(0deg);\nposition:absolute;\ntop:0;\nleft:0;\n}\n',
    '.front':         '{\ntransform:rotateY(0deg);\nz-index:2;\nbackground:rgba(0,0,0,0);\nmin-width:100%;\nwidth:100%;\nmin-height:100%;\nheight:100%;\n}\n',
    '.back':          '{\ntransform:rotateY(-180deg);\ntransform-style:preserve-3d;\nbackground:rgba(0,0,0,0);\nmin-width:100%;\nwidth:100%;\nmin-height:100%;\nheight:100%;\n}\n',
    '.hhover .flipper, .flip-container.hover .flipper, #flip-toggle.flip .flipper':'{\ntransform:rotateY(180deg);\nfilter:FlipH;\n}\n',
    '.frontDeco':     '{\nfont-size:1em;\nline-height:1.2em;\nborder:1px solid black;\nborder-radius:5px;\nbox-shadow:0px 0px 5px 0px rgba(0,0,0,1);\nbackground-color:rgba(220,220,220,1);\npadding:5px;\n}\n',
    '.backDeco':      '{\nfont-size:1em;\nline-height:1.2em;\nborder:1px solid black;\nborder-radius:5px;\nbox-shadow:0px 0px 5px 0px rgba(0,0,0,1);\nbackground-color:rgba(120,120,120,1);\npadding:5px;\n}\n'
  }

  modPrefix = 'FC_' + this.props.fcData.modId + '_FC_'

  instCSSRules = {}

  reGenerateCSSRules = () => /*Not a universal solution at this moment, just bulk-generate all the rules and place them in one sheet, then store it in instanced variable.*/
  {
   let result = null, newRuleIdx = 0, style = document.createElement('style');
   // WebKit hack (by David Walsh):
   style.appendChild(document.createTextNode(''));
   document.head.appendChild(style);
   let stSh = style.sheet;
   for (let i in FC.baseCSSRules) 
   {
    if (!FC.baseCSSRules.hasOwnProperty(i)) {continue;}
    //1. explode by ' '; 
    //2. inset modPrefix between first character of each selector (should be either '.' or '#');
    //3. reassemble the now unique selector.
    let clSelExploded = i.split(' ');
    clSelExploded.forEach((currVal,idx,array)=>{clSelExploded[idx]=currVal.slice(0,1)+this.modPrefix+currVal.slice(1);});
    let newClSel = clSelExploded.join(' ');
    newRuleIdx = stSh.insertRule((newClSel+'\n'+FC.baseCSSRules[i]), stSh.cssRules.length);
    result = stSh.cssRules[newRuleIdx];
    this.instCSSRules[i]={'newSel':newClSel,'rule':result};
   }
  }

  componentWillMount = function() {
  this.reGenerateCSSRules();
  this.flipC     = this.instCSSRules['.flip-container'].rule;
  this.flipper   = this.instCSSRules['.flipper'].rule;
  this.frontBack = this.instCSSRules['.front, .back'].rule;
  this.front     = this.instCSSRules['.front'].rule;
  this.back      = this.instCSSRules['.back'].rule;
  this.longOne   = this.instCSSRules['.hhover .flipper, .flip-container.hover .flipper, #flip-toggle.flip .flipper'].rule;
  this.frontDeco = this.instCSSRules['.frontDeco'].rule;
  this.backDeco  = this.instCSSRules['.backDeco'].rule; 
 }

  setAxisDirFlipNum = function(axis = 0, dir = 0, numRot = 0) {
    let ax='Y',minus='-',plus='',flip='FlipH';
    if (axis===0)  {ax='Y';flip='FlipH';} else if (axis===1) {ax='X';flip='FlipV'}
    if (dir===0)  {minus='-';plus='';} else if (dir===1) {minus='';plus='-';}
    this.longOne.style.transform='rotate'+ax+'('+plus+(numRot*360+180)+'deg)';
    this.longOne.style.filter=flip;
    this.frontBack.style.transform='rotate'+ax+'('+plus+'0deg)';
    this.front.style.transform='rotate'+ax+'('+plus+'0deg)';
    this.back.style.transform='rotate'+ax+'('+minus+'-180deg)';
  }

  addCSSRule = function(ruleContent = '') {
    let stSh, style = document.createElement('style'), newRuleIdx = 0;
    style.appendChild(document.createTextNode(''));document.head.appendChild(style);stSh=style.sheet;newRuleIdx=stSh.insertRule(ruleContent,stSh.cssRules.length);
    return stSh.cssRules[newRuleIdx];
  }

  //Returns an array of keyframe lines:
  genKeyFramesForOneStep = function(i,lng,bfDur,totDur,bfFlips) {
    let perc='', frCont='', shrtCtrl  = this.props.fcData.universalFlipControl, ax = 'Y', minus = '-', plus = '', plusS=1;
    if (shrtCtrl[i].axis===0)       {ax='Y';                 } else if (shrtCtrl[i].axis===1)      {ax='X';               }
    if (shrtCtrl[i].direction===0)  {minus='-'; plus=''; plusS=1;    } else if (shrtCtrl[i].direction===1) {minus=''; plus='-'; plusS=-1;  }
    this.frontBack.style.transform = 'rotate'+ax+'('+plus+'0deg)';
    this.front.style.transform     = 'rotate'+ax+'('+plus+'0deg)';
    this.back.style.transform      = 'rotate'+ax+'('+minus+'-180deg)';
    if ((i===0)&&(i===lng)){perc   = (((Number(shrtCtrl[i].duration.slice(0,-1))+bfDur)*100)/totDur).toFixed(0)+'%';frCont = '{transform: rotate'+ax+'('+((plusS*shrtCtrl[i].flips+bfFlips)*360+plusS*180+plusS*shrtCtrl[i].finalPivotAngle)+'deg);}';}else if (i===0){perc   = (((Number(shrtCtrl[i].duration.slice(0,-1))+bfDur)*100)/totDur).toFixed(0)+'%';frCont = '{transform: rotate'+ax+'('+((plusS*shrtCtrl[i].flips+bfFlips)*360)+'deg);}';}else if (i===lng) {perc   = (((Number(shrtCtrl[i].duration.slice(0,-1))+bfDur)*100)/totDur).toFixed(0)+'%';frCont = '{transform: rotate'+ax+'('+((plusS*shrtCtrl[i].flips+bfFlips)*360+plusS*180+plusS*shrtCtrl[i].finalPivotAngle)+'deg);}';}else {perc   = (((Number(shrtCtrl[i].duration.slice(0,-1))+bfDur)*100)/totDur).toFixed(0)+'%';frCont = '{transform: rotate'+ax+'('+((plusS*shrtCtrl[i].flips+bfFlips)*360)+'deg);}';}
   return (perc+' '+frCont);
  }

  //generate all keyframes from user input and create @keyframes... rule, unique for this module:
  prepareScenario = () => {
   let beforeFlips=0,beforeDuration=0,totalDuration=0,keyFramesArray = [],keyFramesString='', clSel='', ruleBody='';
   for(let i=0;i<this.props.fcData.universalFlipControl.length;i++){totalDuration+=Number(this.props.fcData.universalFlipControl[i].duration.slice(0,-1));}
   for(let i=0;i<this.props.fcData.universalFlipControl.length;i++){keyFramesArray.push(this.genKeyFramesForOneStep(i,(this.props.fcData.universalFlipControl.length-1),beforeDuration,totalDuration,beforeFlips));beforeDuration+=Number(this.props.fcData.universalFlipControl[i].duration.slice(0,-1));beforeFlips+=Number(this.props.fcData.universalFlipControl[i].flips)*(1-2*Number(this.props.fcData.universalFlipControl[i].direction));}
   //@keyframes: 
   keyFramesString='@keyframes fc'+this.modPrefix+'LongKF {\n';for (let i=0;i<keyFramesArray.length;i++){keyFramesString += keyFramesArray[i]+'\n';}keyFramesString +='}\n';
   this.addCSSRule(keyFramesString);
   //animation+:
   clSel    = '.fc'+this.modPrefix+'Long';
   ruleBody = '{\nanimation-name: fc'+this.modPrefix+'LongKF;\nanimation-duration: '+totalDuration+'s;\nanimation-timing-function: linear;\nanimation-delay: 0s;\nanimation-iteration-count: 1;\nanimation-direction: normal;\nanimation-fill-mode: forwards;\n}\n';
   this.addCSSRule((clSel+'P \n'+ruleBody));
   //animation-:
   ruleBody = '{\nanimation-name: fc'+this.modPrefix+'LongKF;\nanimation-duration: '+totalDuration+'s;\nanimation-timing-function: linear;\nanimation-delay: 0s;\nanimation-iteration-count: 1;\nanimation-direction: reverse;\nanimation-fill-mode: forwards;\n}\n';
   this.addCSSRule((clSel+'M \n'+ruleBody));
   return clSel;
  }

  componentDidMount = function() {
    this.flipC.style.perspective=this.props.fcData.perspective;
    this.flipC.style.minWidth='calc('+this.props.fcData.containerSize.width+' + 12px)';
    this.flipC.style.width='calc('+this.props.fcData.containerSize.width+' + 12px)';
    this.flipC.style.minHeight='calc('+this.props.fcData.containerSize.height+' + 12px)';
    this.flipC.style.height='calc('+this.props.fcData.containerSize.height+' + 12px)';
    this.front.style.minWidth=this.props.fcData.containerSize.width;
    this.front.style.width=this.props.fcData.containerSize.width;
    this.front.style.minHeight=this.props.fcData.containerSize.height;
    this.front.style.height=this.props.fcData.containerSize.height;
    this.back.style.minWidth=this.props.fcData.containerSize.width;
    this.back.style.width=this.props.fcData.containerSize.width;
    this.back.style.minHeight=this.props.fcData.containerSize.height;
    this.back.style.height=this.props.fcData.containerSize.height;
    if (!this.props.fcData.useSimpleMode) { 
    this.animClassName = this.prepareScenario().slice(1); 
    //this.flippedStateClass = (this.props.fcData.side0Up)?this.modPrefix+'flip-container':this.modPrefix+'flip-container '+this.modPrefix+'hhover'; 
   }
    else {
     this.flipper.style.transition=this.props.fcData.flipDuration+' '+this.props.fcData.flipTimingFunction;
     this.frontBack.style.transition=this.props.fcData.flipDuration+' '+this.props.fcData.flipTimingFunction;
     this.setAxisDirFlipNum(this.props.fcData.flipAxis,this.props.fcData.flipDirection,this.props.fcData.flipNumber);
     //this.flippedStateClass = (this.props.fcData.side0Up)?this.modPrefix+'flip-container':this.modPrefix+'flip-container '+this.modPrefix+'hhover';
    }
  }

  render() {
    return (
            <div className={(this.props.fcData.useSimpleMode)?((this.props.fcData.side0Up)?this.modPrefix+'flip-container':this.modPrefix+'flip-container '+this.modPrefix+'hhover'):(this.modPrefix+'flip-container')} id={this.modPrefix+'flip-toggle'} onClick={this.props.flipItFC}>
             <div className={(!this.props.fcData.useSimpleMode)?((this.props.fcData.side0Up)?(this.modPrefix+'flipper '):(this.modPrefix+'flipper '+this.animClassName+'P')):(this.modPrefix+'flipper')} id={this.modPrefix+'flipper'}>
              <div className={this.modPrefix+'front '+this.modPrefix+'frontDeco'} id={this.modPrefix+'side0'} dangerouslySetInnerHTML={{__html:this.props.fcData.containerFront}}></div>
              <div className={this.modPrefix+'back '+this.modPrefix+'backDeco'} id={this.modPrefix+'side1'} dangerouslySetInnerHTML={{__html:this.props.fcData.containerBack}}></div>
             </div>
            </div>
    );
  }
}

export default FC
