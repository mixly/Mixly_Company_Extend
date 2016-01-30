'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Microduino_KEYGET = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var pin = this.getFieldValue('KPin');
  var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  
  Blockly.Arduino.setups_['setup_Serial_key'] = 'Serial.begin(9600);';

if(check=='PRESS'||check=='RELEASE')
  var code='  if (Key'+pin+'.read('+check+'))\n'
  +'   Serial.println("KEY Key'+pin+'(digital)!");\n';
else
	var code='   if (Key'+pin+'.read(PRESS, '+min+', '+max+'))\n'
+'    Serial.println("KEY Key'+pin+'(analog)!");\n';
  return code;
};