'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.serialBegin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');


  var flip = this.getFieldValue('FLIP');


  Blockly.Arduino.setups_['setup_baud'] = 'Serial.begin('+flip+');';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.serialPrint = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var serialData = Blockly.Arduino.valueToCode(this, 'serialData', Blockly.Arduino.ORDER_ATOMIC) || '';

  //var flip = this.getFieldValue('FLIP');
  var code='Serial.print('+serialData+');\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  // code+=branch;
  // code+='} while( oled.nextPage() );\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
  
};

Blockly.Arduino.serialPrintln = function() {
  var serialData = Blockly.Arduino.valueToCode(this, 'serialData', Blockly.Arduino.ORDER_ATOMIC) || '';
  var code='Serial.println('+serialData+');\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
  
};





