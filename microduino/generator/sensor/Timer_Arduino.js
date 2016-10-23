'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.MicroduinoTimer = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'TimerDOing');
  var timerName = this.getFieldValue('timerName');
  var intervalTime = Blockly.Arduino.valueToCode(this, 'intervalTime', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_'+timerName+'Timer'] = '#define INTERVAL_'+timerName+' '+intervalTime;
  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='';

  code+='if ('+timerName+'lastTime > millis()) '+timerName+'lastTime = millis();\n';
  code+='if(millis()-'+timerName+'lastTime>INTERVAL_'+timerName+') {\n';
  code+=branch;
  code+='  '+timerName+'lastTime = millis();\n';
  code+='} \n';

  return code;
};


Blockly.Arduino.MicroduinoTimerBegin = function() {

  var timerName = this.getFieldValue('timerName');

  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='';

  code+=timerName+'lastTime = millis();\n';

  return code;
};


Blockly.Arduino.MicroduinoTimerOut = function() {

  var timerName = this.getFieldValue('timerName');
  var intervalTime = Blockly.Arduino.valueToCode(this, 'intervalTime', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_'+timerName+'Timer'] = '#define INTERVAL_'+timerName+' '+intervalTime;
  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='(millis() - '+timerName+'lastTime > INTERVAL_'+timerName+')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];

};


Blockly.Arduino.MicroduinoTimerDuration = function() {

  var timerName = this.getFieldValue('timerName');

  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='(millis() - '+timerName+'lastTime)';

  return [code, Blockly.Arduino.ORDER_ATOMIC];

};


