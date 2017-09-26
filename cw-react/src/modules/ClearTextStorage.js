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
class ClearTextStorage {

 public storeCleartextMsg(clearMsg) {
  let id=-1;//On success return id of the record, on failure - negative error code.
  //....
  return id;
 }

 public retrieveCleartextMsg(id) {
  let chunks = [];
  //....
  return new CleartextMsg(chunks);
 }

 public findCleartextMsgs(...) {//to,from,msgHash,timestamp_sent,timestamp_stored (==) and order by (id,to,form,timestamp_sent,timestamp_stored).
  let id = [];
  //....
  return id[];
 }

 public deleteCleartextMsg(id) {
  let id=-1; //On success return id of the deleted CleartextMsg, on failure - negative error code.
  //....
  return id;
 }

}

export default ClearTextStorage
