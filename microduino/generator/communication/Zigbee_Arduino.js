'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.Zigbee_AT = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin+'';
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  Blockly.Arduino.definitions_['define_String1'] = 'String myStringSoftCom="";';  
  Blockly.Arduino.definitions_['define_String2'] = 'String myStringHardCom="";';  

  Blockly.Arduino.setups_['setup_Zigbee'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_Zigbee_Serial'] = 'Serial.begin(9600);';

  var code = 'while (Serial.available() > 0)\n';
   code += '{\n';
   code += 'myStringHardCom += char(Serial.read());\n';
   code += 'delay(2);\n';
   code += '}\n';
   code += 'if(myStringHardCom!="")\n';
   code += 'mySerial.println(myStringHardCom)\n';
   code += 'myStringHardCom="";\n';  
   code += 'while(mySerial.available() > 0)\n';
   code += '{\n';
   code += 'myStringSoftCom += char(mySerial.read());\n';
   code += 'delay(2);\n';
   code += '}\n';    
   code += 'if (myStringSoftCom.length() > 0)\n';  
   code += '{\n';  
   code += 'Serial.print(myStringSoftCom);\n';    
   code += 'myStringSoftCom="";\n';  
   code += '}\n'; 
   code += 'delay(100);\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Zigbee_Init = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var BRate = Blockly.Arduino.valueToCode(this, 'BRate', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['define_SoftwareSerials'] = '#include <SoftwareSerial.h>';

  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin+'';
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  
  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin('+BRate+');';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin('+BRate+');';


  var code = '';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.Zigbee_Read = function() {

  var code = 'my_Serial.readString()';
  
  return  [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Zigbee_Send = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
 
  var code = 'my_Serial.println('+str+');\n';
 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.Zigbee_Available = function() {
  var code = 'my_Serial.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.VariableIs = function() {
  var VariableName = Blockly.Arduino.valueToCode(this, 'VariableName', Blockly.Arduino.ORDER_ATOMIC)
  var VariableIs = Blockly.Arduino.valueToCode(this, 'VariableIs', Blockly.Arduino.ORDER_ATOMIC)

  code = ''+VariableName+''+'=='+''+VariableIs+'';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
