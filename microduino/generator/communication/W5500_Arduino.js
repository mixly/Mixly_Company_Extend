'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.W5500_Init = function() {
  Blockly.Arduino.definitions_['define_buffer'] = '#define buffer_NUM 200';
  Blockly.Arduino.definitions_['define_parameter'] = 'byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};\n'
  +'IPAddress ip(192,168,199,123);\n'
  +'IPAddress gateway(192,168,199, 1);\n'
  +'IPAddress subnet(255, 255, 255, 0);\n'
  +'EthernetServer server(80);\n'
  +'byte buffer[buffer_NUM];';
  Blockly.Arduino.definitions_['define_unit'] = 'EthernetClient client;';

  Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(115200);';
  Blockly.Arduino.setups_['setup_Serverbegin'] = 'Serial.begin(115200);\n'
  +'Ethernet.begin(mac, ip, gateway, subnet);\n'
  +'server.begin();\n'
  +'Serial.print("server is at ");\n'
  +'Serial.println(Ethernet.localIP());';
  
  var code = 'server.available();';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
};
