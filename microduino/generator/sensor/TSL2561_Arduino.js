'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.TSL2561LightReady = function() {

  var TSL2561Include="#include <Adafruit_Sensor.h>\n";
  TSL2561Include+="#include <Wire.h>\n";
  TSL2561Include+="#include <Adafruit_TSL2561_U.h>\n";

  Blockly.Arduino.definitions_['var_TSL2561Include'] = TSL2561Include;

  var TSL2561Var='float lightTSL2561=0.0;\n';
  TSL2561Var+='Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_LOW, 12345);\n';

  Blockly.Arduino.definitions_['var_TSL2561defineVar'] = TSL2561Var;

  var code='sensors_event_t event;\n';
  code+='tsl.getEvent(&event);\n';
  code+='if (event.light) lightTSL2561=event.light;\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.TSL2561Light = function() {

  var code='lightTSL2561';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};