'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_AM2321 = function() {
var Tem_Hum = this.getTitleValue('direction');
var code='readByAM2321('+Tem_Hum+')';

Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
Blockly.Arduino.definitions_['AM2321'] = '#include <AM2321.h>';
Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';

var joyName='readByAM2321';
var code1 = 'float ' +joyName+'(int num){\n'
+  'AM2321 am2321;\n'
+  'am2321.read();\n'
+  'float sensor_tem=am2321.temperature/10.0;\n'
+  'float sensor_hum=am2321.humidity/10.0;\n'
+  'delay(500);\n'
+  'if(num==1)\n'
+  'return sensor_tem;\n'
+  'else if(num==2)\n'
+  'return sensor_hum;}\n'

 Blockly.Arduino.definitions_[joyName] = code1; 
 return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
	};