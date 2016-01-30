'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.smartRF_Init_Send = function() {
  var flip = this.getFieldValue('BAUD');
  var Frequency = this.getFieldValue('FREQ');
  var SenderADDRESS = this.getFieldValue('SenderADDRESS');
  var ReceiverADDRESS = this.getFieldValue('ReceiverADDRESS');

  Blockly.Arduino.definitions_['define_smartRF_include'] = '#include "EEPROM.h"\n'
	+'#include "cc1101.h"\n';
  Blockly.Arduino.definitions_['define_smartRF_option'] = 'byte syncWord[] = {19, 9};\n'
 	 +'byte senderAddress = '+SenderADDRESS+';\n' 
 	 +'byte receiverAddress = '+ReceiverADDRESS+';\n'
 	 +'CC1101 cc1101;\n';
  Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin('+flip+');\n'
	 +' Serial.println("start");\n';
  Blockly.Arduino.setups_['setup_smartRF_Option'] = 'cc1101.init();\n'
  	 +'cc1101.setCarrierFreq('+Frequency+');\n'
  	 +'cc1101.setSyncWord(syncWord, false);\n'
  	 +'cc1101.setDevAddress(senderAddress, false);\n'
  	 +'Serial.println("device initialized");\n'
  	 +'Serial.print("set sender address to ");\n'
  	 +'Serial.println(senderAddress);\n'
  	 +'Serial.println("done");\n';
  var code = '\n';

  return code;
};


Blockly.Arduino.smartRF_Init_Read = function() {
  var flip = this.getFieldValue('BAUD');
  var Frequency = this.getFieldValue('FREQ');
  var ReceiverADDRESS = this.getFieldValue('ReceiverADDRESS');

  Blockly.Arduino.definitions_['define_smartRF_include'] = '#include "EEPROM.h"\n'
  +'#include "cc1101.h"\n';
  Blockly.Arduino.definitions_['define_smartRF_option'] = 'byte syncWord[] = {19, 9};\n'
   +'byte receiverAddress = '+ReceiverADDRESS+';\n'
   +'CC1101 cc1101;\n'
   +'boolean packetAvailable = false;\n'
   +'void cc1101signalsInterrupt(void){\n'
   +'packetAvailable = true;\n'
   +'}\n';
  Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin('+flip+');\n'
   +' Serial.println("start");\n';
  Blockly.Arduino.setups_['setup_smartRF_Option'] = 'cc1101.init();\n'
  +'cc1101.setCarrierFreq('+Frequency+');\n'
  +'cc1101.setSyncWord(syncWord, false);\n'
  +'cc1101.setDevAddress(receiverAddress, false);\n'
  +'cc1101.enableAddressCheck();\n'
  +'cc1101.setRxState();\n'
  +'attachInterrupt(0, cc1101signalsInterrupt, FALLING);\n'
  +'Serial.println("setup done");\n';
  var code = '\n';

  return code;
};




Blockly.Arduino.smartRF_Send = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var smartRF_Data = this.getFieldValue('smartRF_Data');
  var smartRF_Data_Length = this.getFieldValue('smartRF_Data_Length');
  
  var code = 'CCPACKET '+smartRF_Data+';\n'
  +'data.length='+smartRF_Data_Length+';\n'
  +branch
  +'if(cc1101.sendData('+smartRF_Data+'))\n'
  +'{\n'
  +'Serial.print("ok ");\n'
  +'}else{\n'
  +'Serial.print("failed ");\n'
  +'}\n';

    return code;
};

Blockly.Arduino.smartRF_Read = function() {
  var smartRF_Read_Data = this.getFieldValue('smartRF_REC_Data');

  var code = ' if(packetAvailable){\n'
  +'packetAvailable = false;\n'
  +'CCPACKET '+smartRF_Read_Data+';'
  +'detachInterrupt(0);\n'
  +'if(cc1101.receiveData(&'+smartRF_Read_Data+') > 0){\n'
  +'if ('+smartRF_Read_Data+'.crc_ok && '+smartRF_Read_Data+'.length > 1){\n'
  +'Serial.print("'+smartRF_Read_Data+': len");\n'
  +'Serial.print('+smartRF_Read_Data+'.length);\n'
  +'Serial.print(" data1: ");\n'
  +'Serial.println('+smartRF_Read_Data+'.data[1]);\n'
  +'}\n'
  +'}\n'
  +'attachInterrupt(0, cc1101signalsInterrupt, FALLING);\n'
  +'}\n'
  +'}\n';
    return code;
};