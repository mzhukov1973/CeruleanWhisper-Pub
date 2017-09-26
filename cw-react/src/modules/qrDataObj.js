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
const qrDataObj = {
 data:{
       header:{tag:'h', value:{
                               lastCommand:       {tag:'el',  value:''},
                               currentCommand:    {tag:'ec',  value:''},
                               lastCommandStatus: {tag:'st',  value:{
                                                                     code:  {tag:'cd',  value:''},
                                                                     error: {tag:'er',  value:''}
                                                                    }
                                                  },
                               localTime:         {tag:'lt', value:''},
                               synchroTime:       {tag:'sy', value:''},
                               list:              {tag:'l',  value:{
                                                              item:      {tag:'it', value:''},
                                                              type:      {tag:'t',  value:''}, 
                                                              pages:     {tag:'p',  value:''}, 
                                                              timestamp: {tag:'d',  value:''}
                                                             }
                                            },
                               hashes:{tag:'c', value:{
                                                       payloadWhole: {suffix:'pw', value:''}, 
                                                       payloadPage:  {suffix:'pp', value:''}, 
                                                       lastCommand:  {suffix:'lc', value:''}
                                                      }
                                      }
                              }
              },
       body:{tag:'b', value:{
                             sms:{tag:'s', value:{
                                                  recipient: {tag:'r', value:''},
                                                  msg:       {tag:'m', value:''}
                                                 }
                                 }
                            }
            }
      },

 //Base64 encode/decode UTF-8 string:
 utoa: function(str) {return window.btoa(unescape(encodeURIComponent(str)));},
 atou: function(str) {return decodeURIComponent(escape(window.atob(str)));},

 //Draw custom-formatted (a-la XML) string from qrDataObjs' data structure:
 getVal: function(dat)
 {
  let out='';
  if (typeof dat !== 'object') {return dat;}
  for (let prop in dat)
  {
   if (!dat.hasOwnProperty(prop)) {continue;}
   if (dat[prop].tag !== undefined)
   {
    out += '<'+dat[prop].tag+'>' + qrDataObj.getVal(dat[prop].value) + '</'+dat[prop].tag+'>';
   }
   else if (dat[prop].suffix !== undefined)
   {
    out+= dat[prop].value + dat[prop].suffix+' ';
   }
  }
  return out;
 },

 //Read all data from qrDataObj data structure, format it as per rules and Base64 encode:
 generateQRText: function() {return this.utoa(this.getVal(this.data));}
}

export default qrDataObj

//Just for tests:
/*
 qrDataObj.data.header.value.lastCommand.value = 'Test commmand #1';
 qrDataObj.data.header.value.lastCommandStatus.value.code.value = '1';
 qrDataObj.data.header.value.lastCommandStatus.value.error.value = 'None';
 qrDataObj.data.header.value.currentCommand.value = 'Test commmand #2';
 qrDataObj.data.header.value.localTime.value = '2014-12-04 14:54:22';
 qrDataObj.data.header.value.synchroTime.value = '2015-03-04 09:07:58';
 qrDataObj.data.header.value.list.value.item.value = '1/1';
 qrDataObj.data.header.value.list.value.type.value = 'l';
 qrDataObj.data.header.value.list.value.pages.value = '2/3(140)';
 qrDataObj.data.header.value.list.value.timestamp.value = '2010-08-09 12:09:01';
 qrDataObj.data.header.value.hashes.value.payloadWhole.value = 'a34f55a0';
 qrDataObj.data.header.value.hashes.value.payloadPage.value = '4545456b';
 qrDataObj.data.header.value.hashes.value.lastCommand.value = '0a090b80';
 qrDataObj.data.body.value.sms.value.recipient.value = '+79161234567';
 qrDataObj.data.body.value.sms.value.msg.value = 'Собственно сообщение, ура!';
 console.log(qrDataObj.generateQRText());
*/