'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.xJoystick = function() {
  var xName = this.getFieldValue('xName');

  Blockly.Arduino.definitions_['var_Anolg'+xName] = '#define Pin_X '+xName;
  Blockly.Arduino.setups_['setup_pinModeX'] = 'pinMode(Pin_X,INPUT);';


  var code="analogRead(Pin_X)";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.yJoystick = function() {
  var yName = this.getFieldValue('yName');

  Blockly.Arduino.definitions_['var_Anolg'+yName] = '#define Pin_Y '+yName;
  Blockly.Arduino.setups_['setup_pinModeY'] = 'pinMode(Pin_Y,INPUT);';


  var code="analogRead(Pin_Y)";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

