'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.microduinoCrash = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getFieldValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="down") {
  	code+='!digitalRead('+digitalPin+')';
  } else {
  	code+='digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoTuch = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getFieldValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="down") {
  	code+='!digitalRead('+digitalPin+')';
  } else {
  	code+='digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoPIR = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getFieldValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="high") {
  	code+='digitalRead('+digitalPin+')';
  } else {
  	code+='!digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoMic = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getFieldValue('action');
//Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';

  var code='';

  if(action=="high") {
  	code+='digitalRead('+digitalPin+')';
  } else {
  	code+='!digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoLight = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getFieldValue('action');


  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';


  var code='';

  if(action=="high") {
    code+='digitalRead('+digitalPin+')';
  } else {
    code+='!digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};