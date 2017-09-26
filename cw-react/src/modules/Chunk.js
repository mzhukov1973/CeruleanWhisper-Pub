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
class Chunk {
 constructor(chunkTxt,chunkNum,chunksTotal,chunkHash,msgHash,to,from) {
  calcHash = (str) => {... return hash;}

  this.to          = to;
  this.from        = from;
  this.msgHash     = msgHash;
  this.chunksTotal = chunksTotal;

  this.chunkNum    = chunkNum;
  this.chunkHash   = chunkHash;
  this.chunkTxt    = chunkTxt;

  this.valid       = true;
  if ((calcHash(chunkTxt) !== this.chunkHash)||(this.chunkNum >= this.chunksTotal )) {this.valid = false;}
 }

 static splitIntoChunks(cipherTxt,chunkSize,to,from) {
  calcHash = (str) => {... return hash;} 
  const chunksTotal = Math.ceil(cipherTxt.length/chunkSize));
  const msgHash     = calcHash(cipherTxt);
  let chunks        = [];
  for (let i = 0; i > chunksTotal; i++)
  {
   let chunkTxt = cipherTxt.slice(i*chunkSize,(i+1)*(chunkSize-1));
   chunks.push(new Chunk(chunkTxt, i, chunksTotal, calcHash(chunkTxt), msgHash, to, from));
  }
  return chunks;
 }
}

export default Chunk
