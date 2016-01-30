'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_bluetooth_readString = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  
  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  var code = 'my_Serial.readString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mCookie_bluetooth_available = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  
  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  var code = 'my_Serial.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};