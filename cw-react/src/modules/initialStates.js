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
export const qrDataInit = {
	text:          'Placeholder',
	width:          256,
	height:         256,
	colorDark:      '#000000',
	colorLight:     '#ffffff',
        correctLevel:   'H',
        QRCodeFrmt:     'svg',
        qrTopStatusVal: 'QR Code',
        fcData:{
                modId:               'qrFC',
                containerFront:      'Side #QR0',
                containerBack:       'Side #QR1',
                side0Up:             true,
                containerSize:       {width:'256px', height:'256px'},
                perspective:         '1000px',
                flipAxis:            0,
                flipDirection:       0,
                flipNumber:          0,
                flipTimingFunction:  'ease',
                flipDuration:        '0.6s',
                universalFlipControl:[  
                 {axis:0,direction:0,flips:0,timingFunction:'ease',duration:'1s',finalPivotAngle:0}
                ],
                useSimpleMode: true
               }
             }

export const tcgDataInit = {
        uiSelIdx:            '',
        uiSelVal:            '',
        uiAddrVal:           '',
        uiTxtArVal:          '',
        uiTxtArStat:         '0 chars',
        uiStatTopVal:        'Idle...',
        smsSendState:        {currentState:'off',timestamp:Date.now()},   /*'off'-'in_progress'-'ok'-'err'; and timestamp is the moment this, current state has started*/
        smsSendStats:        {'off':0,'in_progress':0,'ok':0,'err':0}, /*total times spent by system in the designated state*/
        qrGenerationState:   {currentState:'off',timestamp:Date.now()},   /*'off'-'in_progress'-'ok'-'err'; and timestamp is the moment this, current state has started*/
        qrGenerationStats:   {'off':0,'in_progress':0,'ok':0,'err':0},
        qrScanState:         {currentState:'off',timestamp:Date.now()},   /*'off'-'in_progress'-'ok'-'err'; and timestamp is the moment this, current state has started*/
        qrScanStats:         {'off':0,'in_progress':0,'ok':0,'err':0},
        fcData:{
                modId:               'qrFC',
                containerFront:      'Side #QR0',
                containerBack:       'Side #QR1',
                side0Up:             true,
                containerSize:       {width:'256px', height:'256px'},
                perspective:         '1000px',
                flipAxis:            0,
                flipDirection:       0,
                flipNumber:          0,
                flipTimingFunction:  'ease',
                flipDuration:        '0.6s',
                universalFlipControl:[  
                 {axis:0,direction:0,flips:0,timingFunction:'ease',duration:'1s',finalPivotAngle:0}
                ],
                useSimpleMode: true
               },
        seqToQR:             [{status:'empty', firstFreshChunk:false, nextChunk:false, prevChunk:false, currChunk:false, chunks:[{status:'fresh',payload:''}]}]
}
