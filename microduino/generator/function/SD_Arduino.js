'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.SD_Write = function() {
  var File_Name = Blockly.Arduino.valueToCode(this, 'File_Name', Blockly.Arduino.ORDER_ATOMIC)
  var Content = Blockly.Arduino.valueToCode(this, 'Content', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['define_SD'] = '#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_Pin'] = '#define Pin 7\n';
  Blockly.Arduino.definitions_['define_File_Name'] = 'File myFile;\n';

  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n'
  Blockly.Arduino.setups_['setup_Init'] = 'Serial.println("Initializing SD card...");\n'
  +'if (!SD.begin(Pin)) {\n'
  +'Serial.println("initialization failed!");\n'
  +'return;\n'
  +'}\n'
  +'Serial.println("initialization done.");\n';

  var code='myFile = SD.open("'+File_Name+'", FILE_WRITE);\n';
  code+='if (myFile) {\n';
  code+='myFile.print('+Content+');\n';
  code+='myFile.close();\n';
  code+='Serial.println("Write done.");\n';
  code+='}else{\n';
  code+='Serial.println("error opening '+File_Name+'");\n'
  code+='}\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.SD_Read = function() {
  var File_Name = Blockly.Arduino.valueToCode(this, 'File_Name', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['define_SD'] = '#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_Pin'] = '#define Pin 7\n';
  Blockly.Arduino.definitions_['define_File_Name'] = 'File myFile;\n';

  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n'
  Blockly.Arduino.setups_['setup_Init'] = 'Serial.println("Initializing SD card...");\n'
  +'if (!SD.begin(Pin)) {\n'
  +'Serial.println("initialization failed!");\n'
  +'return;\n'
  +'}\n'
  +'Serial.println("initialization done.");\n';

  var code='myFile = myFile = SD.open("'+File_Name+'");\n';
  code+='if (myFile) {\n';
  code+='while (myFile.available()) {\n';
  code+='data+=char(myFile.read());\n';
  code+='}\n';
  code+='}else{\n';
  code+='Serial.println("error opening '+File_Name+'");\n'
  code+='}\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
