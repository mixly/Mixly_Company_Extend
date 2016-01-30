'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.nRF_Init = function() {
  var Channel = this.getFieldValue('CHANNEL');
  var baud = this.getFieldValue('BAUD');
  var Interval = this.getFieldValue('INTERVAL');

  Blockly.Arduino.definitions_['define_include'] = '#include <RF24Network.h>\n'
	+'#include <RF24.h>\n'
	+'#include <SPI.h>';
  Blockly.Arduino.definitions_['define_option'] = 'RF24 radio(9,10);\n'
 	 +'RF24Network network(radio);\n' 
 	 +'const uint16_t this_node = 1;\n'
 	 +'const uint16_t other_node = 0;\n'
 	 +'const unsigned long interval = '+Interval+';\n'
 	 +'unsigned long last_sent;\n';
  Blockly.Arduino.setups_['setup_option'] = 'Serial.begin('+baud+');\n'
 	 +'SPI.begin();\n'
 	 +'radio.begin();\n'
   +'network.begin(/*channel*/ '+Channel+', /*node address*/ this_node);\n';

  var code = '';

  return code;
};

Blockly.Arduino.nRF_Send = function() {
  var Interval = this.getFieldValue('INTERVAL');
  var Struct_Name = this.getFieldValue('Struct_Name');
  Blockly.Arduino.definitions_['send_option'] = 'const unsigned long interval = '+Interval+';\n';
 
  var code = 'network.update();\n'
  +'unsigned long now = millis();\n'
  +'if ( now - last_sent >= interval  )\n'
  +' {\n'
  +'last_sent = now;\n'
  +'RF24NetworkHeader header(/*to node*/ other_node);\n'
  +'network.write(header,&'+Struct_Name+',sizeof('+Struct_Name+'));\n'
  +'}\n';
  return code;
};


Blockly.Arduino.nRF_Read = function() {
  var Receive_Name = this.getFieldValue('Struct_Name');
  
  var code = 'network.update();\n'
  +'while ( network.available() )\n'
  +'{\n'
  +'RF24NetworkHeader header;\n'
  +'network.read(header,&'+Receive_Name+',sizeof('+Receive_Name+'));\n';
  return code;
};