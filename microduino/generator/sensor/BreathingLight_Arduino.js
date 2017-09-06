'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.BreathingLightH = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDPinNumber = this.getFieldValue('LEDPinNumber');
  var LEDFrequency = Blockly.Arduino.valueToCode(this, 'LEDFrequency', Blockly.Arduino.ORDER_ATOMIC)

  var code='';

  code+='for(int breathI=0;breathI<=255;breathI++){\n';
  code+='    analogWrite('+LEDPinNumber+',breathI);\n';
  code+='    delay('+LEDFrequency+'*1000/500);\n';
  code+='}\n';

  return code;
};

Blockly.Arduino.BreathingLightX = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDPinNumber = this.getFieldValue('LEDPinNumber');
  var LEDFrequency = Blockly.Arduino.valueToCode(this, 'LEDFrequency', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code+='for(int breathI=255;breathI>=0;breathI--){\n';
  code+='    analogWrite('+LEDPinNumber+',breathI);\n';
  code+='    delay('+LEDFrequency+'*1000/500);\n';
  code+='}\n';

  return code;
};