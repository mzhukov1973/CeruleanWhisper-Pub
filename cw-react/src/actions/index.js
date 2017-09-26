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
//FC:
export const FC_FLIP  = 'FLIP_CONTAINER_FLIP'
export const FC_INIT  = 'FLIP_CONTAINER_INIT'
export const QR_STORE_KEY = 'QR_STORE_UINQUE_KEY_FOR_FC'
//QR:
//Deal with prepared outgoing sequence (from this, pub programm to priv programm):
export const QR_OUT_SEQ  = {
                            CHUNK:{/*FROM QRC to TCG or sequence operator, deal with CHUNKS in a SEQUENCE*/
                                   REQ_NEXT: 'QR_OUT_SEQUENCE_REQUEST_NEXT_CHUNK_FROM_CURRENT_SEQUENCE',
                                   REQ_PREV: 'QR_OUT_SEQUENCE_REQUEST_PREVIOUS_CHUNK_FROM_CURRENT_SEQUENCE',
                                   REQ_NUM:  'QR_OUT_SEQUENCE_REQUEST_SENDING_SPECIFIC_CHUNK_BY_NUM_FROM_CURRENT_SEQUENCE',
                                   REQ_FREE: 'QR_OUT_SEQUENCE_REQUEST_SENDING_SPECIFIC_CHUNK_BY_NUM_FROM_SPECIFIC_SEQUENCE',
                                  },
                              SEQ:{/*FROM QRC to TCG or sequence operator, deal with SEQUENCES*/
                                   REQ_NO:  'QR_OUT_SEQUENCE_REQUEST_START_SEQUENCE_NUMBER_NO',
                                   REQ_NEXT:'QR_OUT_SEQUENCE_REQUEST_START_NEXT_UNSENT_SEQUENCE',
                                   REQ_STOP:'QR_OUT_SEQUENCE_REQUEST_STOP_TO_SENDING_CURRENT_SEQUENCE'
                                  },
                            CHUNK_SND:'QR_OUT_SEQUENCE_SENDING_A_CHUNK_TO_ENCODE_AND_DISPLAY',
                            CHUNK_ERR:'QR_OUT_SEQUENCE_UNABLE_TO_SEND_REQUESTED_CHUNK',
                            CHUNK_SND:'QR_OUT_SEQUENCE_SENDING_A_CHUNK_TO_ENCODE_AND_DISPLAY',
                            SEQ_ERR:'QR_OUT_SEQUENCE_UNABLE_TO_START_REQUESTED_SEQUENCE',
                            SEQ_SND:'QR_OUT_SEQUENCE_STARTNG_REQUESTED_SEQUENCE'
                           }
export const QR_SEQ   = {CRE:'QR_SEQUENCE_CREATE', DEL:'QR_SEQUENCE_DELETE'}
export const QR_CALC  = {REQ:'QR_CALCULATE_REQUEST', OK:'QR_CALCULATE_SUCCESS', FAIL:'QR_CALCULATE_FAILURE'}
export const QR_READ  = {REQ:'QR_READ_REQUEST',      OK:'QR_READ_SUCCESS',      FAIL:'QR_READ_FAILURE'}
export const QR_FLIP  = 'QR_CONTAINER_FLIP'
export const QR_INIT  = 'QR_CONTAINER_INIT'
export const QR_CONT_UPDATE  = 'QR_CONTAINER_CONTENT_UPDATE'
//TCG: (TestControlsGroup)
export const TCG_CAM_FLIP        = 'TCG_CAM_CONTAINER_FLIP'
export const TCG_CAM_CONT_UPDATE = 'TCG_CAM_CONTAINER_CONTENT_UPDATE'
export const TCG_CAM_STORE_KEY   = 'TCG_CAM_STORE_UINQUE_KEY_FOR_FC'
export const TCG_CAM_SIZE_UPDATE = 'TCG_CAM_CONTAINER_SIZE_UPDATE'
export const TCG_SEL             = 'TCG_SELECT_CHANGE' 
export const TCG_TXTA_CHANGE     = {
                                    PRG:'TCG_TEXTAREA_INNERHTML_CHANGED_PROGRAMMATICALY',
                                    KBD:'TCG_TEXTAREA_INNERHTML_CHANGED_BY_USER_ACTION',
                                   }
export const TCG_TXTADDR_CHANGE  = {
                                    PRG:'TCG_MESSAGE_RECIPIENTS_ADDRESSES_TEXT_CONTROL_CHANGED_PROGRAMMATICALY',
                                    KBD:'TCG_MESSAGE_RECIPIENTS_ADDRESSES_TEXT_CONTROL_CHANGED_BY_USER_ACTION'
                                   }
export const TCG_TOPST_SET       = 'TCG_TOP_STATUS_TEXT_SET' 
export const TCG_TOGGLE_TIMER    = {
                                    ISMS:'TCG_TOGGLE_TIMER_ISMS',
                                    IQRG:'TCG_TOGGLE_TIMER_IQRG',
                                    IQRR:'TCG_TOGGLE_TIMER_IQRR'
                                   }
export const TCG_STAT_TIMER    = {
                                  ISMS:'TCG_STAT_TIMER_ISMS',
                                  IQRG:'TCG_STAT_TIMER_IQRG',
                                  IQRR:'TCG_STAT_TIMER_IQRR'
                                 }

//TCG(Sagas):
export const TCG_ENC_PREP = {REQ:'TCG_PREP_MESSAGE_FOR_ENCODING_TO_QR_REQUEST',      OK:'TCG_PREP_MESSAGE_FOR_ENCODING_TO_QR_SUCCESS',      FAIL:'TCG_PREP_MESSAGE_FOR_ENCODING_TO_QR_FAILURE'}
export const TCG_SND = {REQ:'TCG_SEND_MESSAGE_REQUEST',      OK:'TCG_SEND_MESSAGE_SUCCESS',      FAIL:'TCG_SEND_MESSAGE_FAILURE'}

//===============Creators below here:
