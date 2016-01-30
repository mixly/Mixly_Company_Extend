'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_Audio_Serial = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var DEVICE = this.getTitleValue('PIN1');
  var MODE = this.getTitleValue('PIN2');
  var Volce = Blockly.Arduino.valueToCode(this, 'Vol', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['define_JQ6500'] = '#include "JQ6500.h"\n';
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>\n';
  
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = 'JQ6500 AUDIO(&'+dropdown_pin+');';
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = 'JQ6500 AUDIO(&mySerial);';
  }
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_MODE'] = 'AUDIO.init('+DEVICE+','+MODE+','+Volce+');';
};

Blockly.Arduino.mCookie_Audio_Play = function() {
  var code='AUDIO.play();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Pose = function() {
  var code='AUDIO.pause();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Next = function() {
  var code='AUDIO.next();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Prev = function() {
  var code='AUDIO.prev();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_VolUp = function() {
  var code='AUDIO.volUp();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_VolDown = function() {
  var code='AUDIO.volDown();\n';
  return code;
};
