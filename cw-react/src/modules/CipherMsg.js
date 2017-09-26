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
class CipherMsg {
 let chunks = [], to = '', from = '', msgHash = '', chunksTotal = 0, valid = true, complete = false;

 constructor(chunks) {
  for (const chunk of chunks)
  {
   if (!chunk.valid) {continue;}
   if (this.to.length == 0) {this.to=chunk.to;} else if (this.to != chunk.to) {continue;} else {this.to = chunk.to;}
   if (this.from.length == 0) {this.from=chunk.from;} else if (this.from != chunk.from) {continue;} else {this.from = chunk.from;}
   if (this.msgHash.length == 0) {this.msgHash=chunk.msgHash;} else if (this.msgHash != chunk.msgHash) {continue;} else {this.msgHash = chunk.msgHash;}
   if (this.chunksTotal.length == 0) {this.chunksTotal=chunk.chunksTotal;} else if (this.chunksTotal != chunk.chunksTotal) {continue;} else {this.chunksTotal = chunk.chunksTotal;}
   this.chunks.push({'chunkNum':chunk.chunkNum, 'chunkHash':chunk.chunkHash, 'chunkTxt':chunk.chunkTxt});
   this.complete = this.isComplete();
  }
 }

 isComplete() {
  for (let i=0;i < this.totalChunks;i++) { if (this.chunks.findIndex((el)=>{el.chunkNum === i}) === -1) {return false;} }
  return true;
 }

 addChunk(chunk) {
  if ((!chunk.valid)||
      (this.to != chunk.to)||
      (this.from != chunk.from)||
      (this.msgHash != chunk.msgHash)||
      (this.chunksTotal != chunk.chunksTotal)||
      (this.chunks.findIndex((el)=>{el.chunkNum === chunk.chunkNum}) !== -1)
     ) {return false;}
  this.chunks.push({'chunkNum':chunk.i,'chunkHash':chunk.chunkHash, 'chunkTxt':chunk.chunkTxt});
  this.complete = this.isComplete();
  return true;
 }

 delChunk(chunkNum) {
  let chunkIdx = this.chunks.findIndex((el)=>{el.chunkNum === chunkNum});
  if (chunkIdx === -1) {return false;}
  this.chunks.splice(chunkIdx,1);
  return true;
 }

 decrypt() {
  let clearTxt = '';
  if (!this.isComplete()) {return false;}
  return new CleartextMsg(clearTxt,this.to,this.from);
 }
}

export default CipherMsg
