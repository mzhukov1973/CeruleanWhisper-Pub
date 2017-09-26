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
class MsgEventLog {

 private const evTypes = {
'SMS_RECEIVED':0,                            /*evParams object: From, Size                                            */
'SMS_YIELDED_CHUNKS':0,                      /*evParams object: From, chunkNum, chunkHash, msgHash (?..chunksTotal??) */
'SMS_DISCARDED':0,                           /*evParams object: From                                                  */
'CHUNK_ADDED_TO_CIPHER_MSG':0,               /*evParams object: msgHash, chunkNum, From, msgHash                      */
'CIPHER_MSG_COMPLETE':0,
'CIPHER_MSG_DECODED':0,
'CIPHER_MSG_DECODING_FAILED':0,
'CLEARTEXT_MSG_CREATED':0,
'CIPHER_MSG_DELETED':0,
'CLEARTEXT_MSG_STORED':0,
'CLEARTEXT_MSG_RETRIEVED_FROM_STORAGE':0,
'CIPHER_MSG_STORED':0,
'CIPHER_MSG_RETRIEVED_FROM_STORAGE':0,
'CIPHER_MSG_CREATED':0,
'CHUNK_CREATED':0,
'QRCODE_CREATED':0,
'QRCODE_DISPLAYED':0,
'QRCODE_REPORTED_READ':0,
'QRCODE_READ':0,
'QRCODE_DESTROYED':0,
'CHUNK_DESTROYED':0,
'QRCODE_YIELDED_CHUNK':0,
'QRCODE_REQUESTED':0,
'QRCODE_REQUEST_RECEIVED':0,
'QRCODE_REQUEST_HONOURED':0,
'QRCODE_REQUEST_FULFILLED':0,
'CHUNK_SENT_OUT_VIA_SMS':0,
'SMS_SENT':0,
'CLEARTEXT_MSG_EDIT_OPENED':0,
'CLEARTEXT_MSG_SAVED':0,
'CLEARTEXT_MSG_CREATED':0,
'CLEARTEXT_MSG_ENCODED':0,
'CLEARTEXT_MSG_LIST_RETRIEVED':0,
'CLEARTEXT_MSG_DISPLAYED':0
};

 public logEvent(evType,evParams) {
  let timestamp=0;//timestamp of the logging event if successfully logget or negative error code if it failed
  //....
  return timestamp;
 }

}

 public findEvents(...) {
  let events = [];
  //....
  return events;
 }

 public deleteEvents(...) {
  let deleted_events = [];
  //....
  return deleted_events;
 }

 public retrieveEvent(...) {
  let event = {};
  //....
  return event;
 }

export default MsgEventLog
