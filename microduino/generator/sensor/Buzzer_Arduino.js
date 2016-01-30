'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.BuzzerTone = function() {
var buzzerNum = this.getFieldValue('buzzerNumber');
var Frequency = Blockly.Arduino.valueToCode(this, 'Frequency', Blockly.Arduino.ORDER_ATOMIC)
var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)
Blockly.Arduino.definitions_['define_BuzzerPin'+buzzerNum] = '#define BuzzerPin'+buzzerNum+' '+BuzzerPin;

Blockly.Arduino.setups_['setup_Buzzer'+buzzerNum] = 'pinMode(BuzzerPin'+buzzerNum+',OUTPUT);';

var code='tone(BuzzerPin'+buzzerNum+','+Frequency+');\n';
return code;
};


Blockly.Arduino.BuzzerNoTone = function() {

var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)

var buzzerNum = this.getFieldValue('buzzerNumber');

Blockly.Arduino.definitions_['define_BuzzerPin'+buzzerNum] = '#define BuzzerPin'+buzzerNum+' '+BuzzerPin;

Blockly.Arduino.setups_['setup_Buzzer'+buzzerNum] = 'pinMode(BuzzerPin'+buzzerNum+',OUTPUT);';

var code='noTone(BuzzerPin'+buzzerNum+');\n';
return code;
};