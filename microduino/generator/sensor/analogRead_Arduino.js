'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.microduinoMicAnal = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';
	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoLightAnal = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';

	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoIRRactAnal = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';

	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.MD_Potentiometer = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';
	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};