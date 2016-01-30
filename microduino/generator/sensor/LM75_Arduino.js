'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.lm75 = function() {


  var lm75Include="#include <inttypes.h>\n";
  lm75Include+="#include <Wire.h>\n";
  lm75Include+="#include <lm75.h>\n";

  Blockly.Arduino.definitions_['var_lm75Include'] = lm75Include;
  Blockly.Arduino.definitions_['var_lm75defineVar'] = "TempI2C_LM75 termo = TempI2C_LM75(0x48,TempI2C_LM75::nine_bits);\n";

  var code="termo.getTemp()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
