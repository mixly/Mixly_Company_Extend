'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Microduino_KEYDigital = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var pin = this.getFieldValue('KPin');
  //var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  //Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', INPUT_PULLUP);';
  
  var code='';
  code+='if(Key'+pin+'.read()=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.Microduino_KEYAnalog = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var joyStickAction = this.getFieldValue('joyStickAction');
  var pin = this.getFieldValue('KPin');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+joyStickAction+''] = 'Key Key'+joyStickAction+'('+pin+', INPUT);';
  
  var code='';
  code+='if(Key'+joyStickAction+'.read('+min+', '+max+')=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.oldKEYDigital = function() {

  var pin = this.getFieldValue('KPin');
  //var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_keyOld'] = '#include <Microduino_KeyOld.h>';
  //Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  Blockly.Arduino.definitions_['var_keyOld_'+pin+''] = 'KeyOld KeyOld'+pin+'('+pin+', INPUT_PULLUP);';
  
  var code='';
  code+='(KeyOld'+pin+'.read('+check+'))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.oldKEYAnalog = function() {
  var pin = this.getFieldValue('KPin');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');

  Blockly.Arduino.definitions_['define_keyOld'] = '#include <Microduino_KeyOld.h>';
  Blockly.Arduino.definitions_['var_keyOld_'+pin+''] = 'KeyOld KeyOld'+pin+'('+pin+', INPUT);';
  
  var code='';
  code+='(KeyOld'+pin+'.read(PRESS, '+min+', '+max+'))';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

